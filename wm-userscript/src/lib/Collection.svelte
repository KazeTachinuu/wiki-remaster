<script>
  import Card from "./Card.svelte";
  import CardModal from "./CardModal.svelte";
  import { data, RNAME, normSearch, marketValueFor } from "../wm/index.js";
  import { settings, toggleHideStats } from "./settings.svelte.js";
  import { createQueue } from "./queue.js";

  function onToggleStats() {
    toggleHideStats();
    if (settings.hideStats && (sort === "atk" || sort === "def")) sort = "rarity";
  }

  let { onwallet } = $props();
  let items = $state(null);
  let stats = $state(null);
  let error = $state("");
  let filter = $state("ALL");
  let search = $state("");
  let sort = $state("rarity");
  let favOnly = $state(false);
  let shinyOnly = $state(false);
  let selected = $state(null);
  // Lazy, cached market value per card. Cards enqueue as they scroll into view
  // (IntersectionObserver), a bounded queue fetches them, and each result is cached
  // in wm/index.js for the page's life. Unverified marketplace shape fails safe to null
  // -> no badge, never a fabricated price. Nothing blocks first paint.
  let values = $state({}); // card.id -> number | null (undefined = not fetched yet)
  let valuesLoaded = $state(0); // count resolved (drives the "sort by value" progress hint)
  const sortVals = new Map(); // plain mirror used for sorting, so re-sorts don't depend on every key
  let valuesTick = $state(0); // throttled bump: recompute the value-sort at most a few times/sec
  const vq = createQueue({ concurrency: 5 });
  const cardById = new Map(); // id -> card, for the observer/queue to resolve work
  let io = null; // IntersectionObserver, created lazily

  let tickTimer = null;
  function scheduleTick() {
    if (tickTimer) return;
    tickTimer = setTimeout(() => { tickTimer = null; valuesTick++; }, 200);
  }
  function enqueueValue(id, front = false) {
    if (values[id] !== undefined || !cardById.has(id)) return;
    vq.push(id, async () => {
      const v = await marketValueFor(cardById.get(id)).catch(() => null);
      values[id] = v ?? null; // reactive: only this card's badge updates
      sortVals.set(id, typeof v === "number" ? v : -1);
      valuesLoaded++;
      scheduleTick();
    });
    if (front) vq.prioritize(id);
  }
  // Svelte action: register a card element so its value loads when it enters the viewport.
  function watchValue(node, it) {
    if (typeof IntersectionObserver !== "undefined" && !io) {
      io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.__cardId;
          if (id != null) { enqueueValue(id, true); io.unobserve(e.target); }
        }
      }, { rootMargin: "300px" });
    }
    node.__cardId = it.card.id;
    io?.observe(node);
    return {
      update(next) { node.__cardId = next.card.id; if (values[next.card.id] === undefined) io?.observe(node); },
      destroy() { io?.unobserve(node); },
    };
  }
  // bulk selection (for discard)
  let selecting = $state(false);
  let picked = $state(new Set());
  let bulkConfirm = $state(false);
  let bulkBusy = $state(false);

  function onCardClick(it) {
    if (!selecting) { selected = it; return; }
    const n = new Set(picked);
    n.has(it.id) ? n.delete(it.id) : n.add(it.id);
    picked = n;
  }
  function toggleSelecting() {
    selecting = !selecting;
    if (!selecting) { picked = new Set(); bulkConfirm = false; }
  }
  // Select all currently shown (respects the active filter/search), or clear.
  function toggleSelectAll() {
    picked = allShownPicked ? new Set() : new Set(shown.map((it) => it.id));
  }
  async function bulkDiscard() {
    bulkBusy = true;
    const ids = [...picked];
    try {
      await Promise.all(ids.map((id) => data.discard(id).catch(() => {})));
    } finally {
      bulkBusy = false; bulkConfirm = false; selecting = false; picked = new Set();
      await load(); onwallet?.();
    }
  }

  const RARITIES = ["L", "UR", "SR", "R", "PC", "C"]; // high to low, for the composition bar and filter
  const RANK = { L: 5, UR: 4, SR: 3, R: 2, PC: 1, C: 0 };

  async function load() {
    error = "";
    items = null;
    try {
      const d = await data.collection({ onPartial: (p) => { items = p.items; stats = p.stats; } });
      items = d.items;
      stats = d.stats;
      cardById.clear();
      for (const it of items) cardById.set(it.card.id, it.card);
    } catch (e) {
      error = "Impossible de charger la collection.";
      items = [];
      stats = { unique: 0, total: 0, catalog: null, counts: {} };
    }
  }
  load();

  // Sorting by value needs every card's value, so when that sort is chosen we enqueue
  // the whole collection as a background sweep (viewport items were prioritised first).
  // Any other sort loads values lazily, only as cards scroll into view.
  $effect(() => {
    if (sort === "value" && items) {
      for (const it of items) enqueueValue(it.card.id);
    }
  });
  // Tear down the observer and any pending tick when the screen unmounts.
  $effect(() => () => { io?.disconnect(); io = null; if (tickTimer) clearTimeout(tickTimer); });

  let shown = $derived.by(() => {
    if (!items) return [];
    valuesTick; // depend on the throttled tick so value-sort refreshes as results arrive
    const q = normSearch(search);
    let list = items.filter((it) => {
      if (filter !== "ALL" && it.card.rarity !== filter) return false;
      if (favOnly && !it.starred) return false;
      if (shinyOnly && !it.is_shiny) return false;
      if (q && !(it._s || "").includes(q)) return false;
      return true;
    });
    const val = (it) => sortVals.get(it.card.id) ?? -1;
    const cmp = {
      rarity: (a, b) => RANK[b.card.rarity] - RANK[a.card.rarity] || b.count - a.count,
      value: (a, b) => val(b) - val(a) || RANK[b.card.rarity] - RANK[a.card.rarity],
      atk: (a, b) => b.card.atk - a.card.atk,
      def: (a, b) => b.card.def - a.card.def,
      name: (a, b) => a.card.title.localeCompare(b.card.title, "fr"),
    }[sort];
    return cmp ? [...list].sort(cmp) : list;
  });

  let starredCount = $derived(items ? items.filter((it) => it.starred).length : 0);
  let hasStarred = $derived(starredCount > 0);
  let shinyCount = $derived(items ? items.filter((it) => it.is_shiny).length : 0);
  let allShownPicked = $derived(shown.length > 0 && shown.every((it) => picked.has(it.id)));
</script>

{#if error}
  <div class="empty"><b>{error}</b><div>Vérifiez que vous êtes connecté, puis réessayez.</div><button class="btn" onclick={load}>Réessayer</button></div>
{:else if !items}
  <div class="grid">
    {#each Array(10) as _}<div class="wc skeleton"></div>{/each}
  </div>
{:else}
  <div class="coll-head">
    <div>
      <h1>Ma collection</h1>
      <div class="meta">{stats.unique} carte{stats.unique > 1 ? "s" : ""} unique{stats.unique > 1 ? "s" : ""}{stats.catalog ? ` sur ${stats.catalog}` : ""} · {stats.total} au total</div>
    </div>
    <div class="coll-tools">
      <div class="search-wrap">
        <svg class="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.4-3.4"/></svg>
        <input class="search" type="search" placeholder="Rechercher une carte..." bind:value={search} />
        {#if search}<button class="search-clear" onclick={() => (search = "")} aria-label="Effacer la recherche"><svg class="x-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>{/if}
      </div>
      <div class="tool-actions">
        <div class="isel" title="Trier les cartes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5v14M7 19l-3-3M7 5l3 3M17 19V5M17 5l3 3M17 19l-3-3"/></svg>
          <select bind:value={sort} aria-label="Trier">
            <option value="rarity">Rareté</option>
            <option value="value">Valeur estimée</option>
            {#if !settings.hideStats}
              <option value="atk">Attaque</option>
              <option value="def">Défense</option>
            {/if}
            <option value="name">Nom</option>
          </select>
        </div>
        <button class="iconbtn" class:on={settings.hideStats} onclick={onToggleStats} title="Afficher ou masquer l'ATK et la DEF sur les cartes">
          {#if settings.hideStats}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 10.7a3 3 0 0 0 3.9 3.9"/><path d="M9.8 4.7A10.4 10.4 0 0 1 12 4.5c6 0 9.5 7 9.5 7a17.6 17.6 0 0 1-2.9 3.8M6 6.2A17.3 17.3 0 0 0 2.5 11.5s3.5 7 9.5 7c1 0 1.9-.1 2.8-.4"/></svg>
          {:else}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 11.5S6 4.5 12 4.5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"/><circle cx="12" cy="11.5" r="3"/></svg>
          {/if}
          <span>ATK/DEF</span>
        </button>
        {#if data.canAct}
          {#if selecting}
            <button class="iconbtn" onclick={toggleSelectAll}>{allShownPicked ? "Tout désélectionner" : "Tout sélectionner"}</button>
          {/if}
          <button class="iconbtn" class:on={selecting} onclick={toggleSelecting}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8 12l2.8 2.8L16.5 9"/></svg>
            <span>{selecting ? "Annuler" : "Sélectionner"}</span>
          </button>
        {/if}
      </div>
    </div>
  </div>
  {#if sort === "value" && items && valuesLoaded < items.length}
    <div class="sort-hint">Estimation des valeurs... {valuesLoaded} / {items.length}. Le tri s'affine au fur et à mesure.</div>
  {/if}

  {#if stats.unique > 0}
  <div class="rarity-panel">
    <div class="rarity-meter" role="img" aria-label="Répartition par rareté">
      {#each RARITIES as r}
        {#if (stats.counts[r] || 0) > 0}
          <button
            class="rm-seg"
            class:sel={filter === r}
            class:dim={filter !== "ALL" && filter !== r}
            style="--rc:var(--r-{r.toLowerCase()}); flex-grow:{stats.counts[r]}"
            title="{RNAME[r]} : {stats.counts[r]}"
            aria-label="{RNAME[r]} : {stats.counts[r]}"
            onclick={() => (filter = filter === r ? "ALL" : r)}
          ></button>
        {/if}
      {/each}
    </div>

    <div class="rarity-legend">
      <button class="rl" class:on={filter === "ALL"} onclick={() => (filter = "ALL")}>
        <span class="rl-name">Toutes</span><span class="rl-n">{stats.unique}</span>
      </button>
      {#each RARITIES as r}
        {#if (stats.counts[r] || 0) > 0}
          <button class="rl" class:on={filter === r} onclick={() => (filter = filter === r ? "ALL" : r)}>
            <span class="rl-dot" style="background:var(--r-{r.toLowerCase()})"></span>
            <span class="rl-name">{RNAME[r]}</span>
            <span class="rl-n">{stats.counts[r]}</span>
          </button>
        {/if}
      {/each}
      {#if (hasStarred || favOnly) || (shinyCount > 0 || shinyOnly)}
        <span class="rl-sep" aria-hidden="true"></span>
      {/if}
      {#if hasStarred || favOnly}
        <button class="rl special fav" class:on={favOnly} onclick={() => (favOnly = !favOnly)} title="Cartes favorites">
          <svg class="rl-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/></svg>
          <span class="rl-name">Favoris</span><span class="rl-n">{starredCount}</span>
        </button>
      {/if}
      {#if shinyCount > 0 || shinyOnly}
        <button class="rl special shiny" class:on={shinyOnly} onclick={() => (shinyOnly = !shinyOnly)} title="Cartes brillantes">
          <svg class="rl-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.9 6.4L20 10l-6.1 1.6L12 18l-1.9-6.4L4 10l6.1-1.6z"/></svg>
          <span class="rl-name">Brillantes</span><span class="rl-n">{shinyCount}</span>
        </button>
      {/if}
    </div>
  </div>
  {/if}

  {#if stats?.loading}
    <div class="loading-more">Chargement des cartes... {items?.length ?? 0} / {stats.unique}</div>
  {/if}

  {#if shown.length === 0}
    <div class="empty">
      <b>{search || filter !== "ALL" ? "Aucune carte ne correspond" : "Rien ici pour l'instant"}</b>
      <div>{search || filter !== "ALL" ? "Essayez un autre filtre ou une autre recherche." : "Ouvrez un paquet pour commencer votre collection."}</div>
    </div>
  {:else}
    <div class="grid">
      {#each shown as it (it.card.id)}
        <button class="card-btn" class:picking={selecting} class:picked={selecting && picked.has(it.id)} onclick={() => onCardClick(it)} aria-label={it.card.title} use:watchValue={it}>
          <Card card={it.card} count={it.count} shiny={it.is_shiny} starred={it.starred} value={values[it.card.id]} />
          {#if selecting}
            <span class="pick-overlay" class:on={picked.has(it.id)}><span class="pick-check">{picked.has(it.id) ? "✓" : ""}</span></span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
{/if}

{#if selecting && picked.size > 0}
  <div class="bulk-bar">
    {#if bulkConfirm}
      <span class="bulk-text">Défausser {picked.size} carte{picked.size > 1 ? "s" : ""} contre <b>{picked.size} point{picked.size > 1 ? "s" : ""}</b> ?</span>
      <button class="btn" disabled={bulkBusy} onclick={() => (bulkConfirm = false)}>Annuler</button>
      <button class="btn danger" disabled={bulkBusy} onclick={bulkDiscard}>{bulkBusy ? "Défausse..." : "Confirmer"}</button>
    {:else}
      <span class="bulk-text">{picked.size} sélectionnée{picked.size > 1 ? "s" : ""}</span>
      <button class="btn danger" onclick={() => (bulkConfirm = true)}>Défausser · +{picked.size} pts</button>
    {/if}
  </div>
{/if}

{#if selected}
  <CardModal
    item={selected}
    onclose={() => (selected = null)}
    onaction={() => { load(); onwallet?.(); }}
  />
{/if}
