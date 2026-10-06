<script>
  import RarityChips from "../../components/RarityChips.svelte";
  import PickMark from "../../components/PickMark.svelte";
  import { pickSound } from "../../sound/sfx.js";
  import Card from "../../components/Card.svelte";
  import CardModal from "../../components/CardModal.svelte";
  import Icon from "../../components/Icon.svelte";
  import SearchBox from "../../components/SearchBox.svelte";
  import { data, RNAME, RARITIES_DESC, normSearch, loadCollection, collectionRemove, forgetCollection, backgroundLane } from "../../wm/index.js";
  import { settings } from "../../lib/settings.svelte.js";
  import { lazyValues } from "../../lib/lazyValues.js";

  let { onwallet } = $props();

  let items = $state(null);
  let stats = $state(null);
  let error = $state("");
  // Sort and filters come back as you left them.
  const prefs = settings.collection;
  let filter = $state(prefs.filter);
  let search = $state("");
  let sort = $state(prefs.sort);
  let favOnly = $state(prefs.favOnly);
  let shinyOnly = $state(prefs.shinyOnly);
  $effect(() => Object.assign(prefs, { filter, sort, favOnly, shinyOnly }));
  let selected = $state(null);

  // Market values, loaded as cards scroll into view. `sortVals` mirrors them for sorting and
  // `tick` re-sorts at most every 200 ms, so a sweep of 900 values is not 900 re-sorts.
  let values = $state({});
  // the value lane pauses when the game limits requests: say so instead of looking stuck
  let lanePaused = $state(false);
  $effect(() => backgroundLane.subscribe((st) => (lanePaused = st === "paused")));
  let loaded = $state(0);
  let tick = $state(0);
  const sortVals = new Map();
  let tickTimer = null;
  const lazy = lazyValues((id, v) => {
    values[id] = v;
    sortVals.set(id, v ?? -1);
    loaded++;
    tickTimer ??= setTimeout(() => { tickTimer = null; tick++; }, 200);
  });
  $effect(() => () => { lazy.destroy(); clearTimeout(tickTimer); });

  // Sorting by value needs every value: sweep the whole collection in the background.
  $effect(() => { if (sort === "value" && items) for (const it of items) lazy.load(it.card); });

  // ATK/DEF hidden (the switch in the top bar): a sort by them falls back to rarity
  $effect(() => { if (settings.hideStats && (sort === "atk" || sort === "def")) sort = "rarity"; });

  // Shows the saved copy at once; a fresh one replaces it when the saved one was not recent.
  async function load(force = false) {
    error = "";
    const show = (d, loading) => { items = d.items; stats = { ...d.stats, loading }; };
    try {
      show(await loadCollection({ force, onCached: (d) => show(d, true), onPartial: (d) => show(d, true) }), false);
    } catch {
      if (!items) error = "Impossible de charger la collection.";
      else stats = { ...stats, loading: false };
    }
  }
  load();
  // after our own change: a discard is replayed on the saved copy (no reload); anything else
  // (a sale) reloads it from the game
  function changed(discarded = null) {
    discarded ? collectionRemove(discarded) : forgetCollection();
    load();
  }

  // Bulk discard.
  let selecting = $state(false);
  let picked = $state(new Set());
  let bulkConfirm = $state(false);
  let bulkBusy = $state(false);
  let bulkMsg = $state("");

  function onCardClick(it) {
    if (!selecting) { selected = it; return; }
    const n = new Set(picked);
    pickSound(n.has(it.id));
    n.has(it.id) ? n.delete(it.id) : n.add(it.id);
    picked = n;
  }
  function toggleSelecting() {
    selecting = !selecting;
    picked = new Set();
    bulkConfirm = false;
  }
  async function bulkDiscard() {
    bulkBusy = true;
    try {
      const r = await data.bulkDiscard([...picked]);
      const failed = r.failed?.length || 0;
      const kept = new Set(r.failed || []);
      changed([...picked].filter((id) => !kept.has(id)));
      bulkMsg = `${r.discarded_count} carte${r.discarded_count > 1 ? "s" : ""} défaussée${r.discarded_count > 1 ? "s" : ""}` + (failed ? `, ${failed} en échec` : "");
    } catch (e) {
      bulkMsg = e.message || "La défausse a échoué.";
      changed(); // some may have gone through: reload rather than guess
    }
    bulkBusy = false;
    toggleSelecting();
    onwallet?.();
  }

  const RANK = Object.fromEntries(RARITIES_DESC.map((r, i) => [r, -i]));
  const SORTS = {
    rarity: (a, b) => RANK[b.card.rarity] - RANK[a.card.rarity] || b.count - a.count,
    value: (a, b) => (sortVals.get(b.card.id) ?? -1) - (sortVals.get(a.card.id) ?? -1) || RANK[b.card.rarity] - RANK[a.card.rarity],
    atk: (a, b) => b.card.atk - a.card.atk,
    def: (a, b) => b.card.def - a.card.def,
    name: (a, b) => a.card.title.localeCompare(b.card.title, "fr"),
  };

  let shown = $derived.by(() => {
    if (!items) return [];
    tick; // re-sort as values arrive
    const q = normSearch(search);
    return items
      .filter((it) =>
        (filter === "ALL" || it.card.rarity === filter) &&
        (!favOnly || it.starred) &&
        (!shinyOnly || it.is_shiny) &&
        (!q || it._s.includes(q)))
      .sort(SORTS[sort]);
  });
  let starredCount = $derived(items?.filter((it) => it.starred).length ?? 0);
  let shinyCount = $derived(items?.filter((it) => it.is_shiny).length ?? 0);
  let allPicked = $derived(shown.length > 0 && shown.every((it) => picked.has(it.id)));
  const plural = (n, word) => `${n} ${word}${n > 1 ? "s" : ""}`;
</script>

{#if error}
  <div class="empty"><b>{error}</b><div>Vérifiez que vous êtes connecté, puis réessayez.</div><button class="btn" onclick={() => load(true)}>Réessayer</button></div>
{:else if !items}
  <div class="grid">{#each Array(10) as _}<div class="wc skeleton"></div>{/each}</div>
{:else}
  <div class="coll-head">
    <div>
      <h1>Ma collection</h1>
      <div class="meta">{plural(stats.unique, "carte")}{#if stats.copies !== stats.unique} · {stats.copies} exemplaires{/if}{#if stats.loading}<span class="sync"><span class="spin"></span>Mise à jour {items.length} / {stats.copies}</span>{/if}</div>
    </div>
    <div class="coll-tools">
      <SearchBox bind:value={search} placeholder="Rechercher une carte..." />
      <div class="tool-actions">
        <div class="isel" title="Trier les cartes">
          <Icon name="sort" />
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
        {#if selecting}
          <button class="iconbtn" onclick={() => { pickSound(allPicked); picked = allPicked ? new Set() : new Set(shown.map((it) => it.id)); }}>
            {allPicked ? "Tout désélectionner" : "Tout sélectionner"}
          </button>
        {/if}
        <button class="iconbtn" class:on={selecting} onclick={toggleSelecting}>
          <Icon name="select" /><span>{selecting ? "Annuler" : "Sélectionner"}</span>
        </button>
      </div>
    </div>
  </div>

  {#if sort === "value" && loaded < items.length}
    <div class="sort-hint">
      {#if lanePaused}Le jeu limite les requêtes : estimation en pause une minute, reprise automatique ({loaded} / {items.length}).
      {:else}Estimation des valeurs... {loaded} / {items.length}. Le tri s'affine au fur et à mesure.{/if}
    </div>
  {/if}
  {#if bulkMsg}<div class="sort-hint">{bulkMsg}</div>{/if}

  {#if stats.copies > 0}
    <div class="rarity-panel">
      <div class="rarity-meter" role="img" aria-label="Répartition par rareté">
        {#each RARITIES_DESC as r}
          {#if stats.counts[r]}
            <button class="rm-seg" class:sel={filter === r} class:dim={filter !== "ALL" && filter !== r}
              style="--rc:var(--r-{r.toLowerCase()}); flex-grow:{stats.counts[r]}"
              title="{RNAME[r]} : {stats.counts[r]}" aria-label="{RNAME[r]} : {stats.counts[r]}"
              onclick={() => (filter = filter === r ? "ALL" : r)}></button>
          {/if}
        {/each}
      </div>
      {#snippet extras()}
        {#if starredCount}
          <button class="rl special fav" class:on={favOnly} onclick={() => (favOnly = !favOnly)} title="Cartes favorites">
            <Icon name="star" width={1.7} class="rl-ico" /><span class="rl-name">Favoris</span><span class="rl-n">{starredCount}</span>
          </button>
        {/if}
        {#if shinyCount}
          <button class="rl special shiny" class:on={shinyOnly} onclick={() => (shinyOnly = !shinyOnly)} title="Cartes brillantes">
            <Icon name="sparkle" filled width={0} class="rl-ico" /><span class="rl-name">Brillantes</span><span class="rl-n">{shinyCount}</span>
          </button>
        {/if}
      {/snippet}
      <RarityChips value={filter === "ALL" ? "" : filter} counts={stats.counts} total={stats.copies}
        onchange={(r) => (filter = r || "ALL")} children={starredCount || shinyCount ? extras : undefined} />
    </div>
  {/if}


  {#if shown.length === 0}
    <div class="empty">
      {#if search || filter !== "ALL"}
        <b>Aucune carte ne correspond</b><div>Essayez un autre filtre ou une autre recherche.</div>
      {:else}
        <b>Rien ici pour l'instant</b><div>Ouvrez un paquet pour commencer votre collection.</div>
      {/if}
    </div>
  {:else}
    <div class="grid">
      {#each shown as it (it.id)}
        <button class="card-btn" class:picking={selecting} class:picked={selecting && picked.has(it.id)}
          onclick={() => onCardClick(it)} aria-label={it.card.title} use:lazy.watch={it.card}>
          <Card card={it.card} count={it.count} shiny={it.is_shiny} starred={it.starred} value={values[it.card.id]} />
          {#if selecting}
            <PickMark on={picked.has(it.id)} />
          {/if}
        </button>
      {/each}
    </div>
  {/if}
{/if}

{#if selecting && picked.size > 0}
  <div class="bulk-bar">
    {#if bulkConfirm}
      <span class="bulk-text">Défausser {plural(picked.size, "carte")} contre <b>{plural(picked.size, "point")}</b> ?</span>
      <button class="btn" disabled={bulkBusy} onclick={() => (bulkConfirm = false)}>Annuler</button>
      <button class="btn danger" disabled={bulkBusy} onclick={bulkDiscard}>{bulkBusy ? "Défausse..." : "Confirmer"}</button>
    {:else}
      <span class="bulk-text">{picked.size} sélectionnée{picked.size > 1 ? "s" : ""}</span>
      <button class="btn danger" onclick={() => (bulkConfirm = true)}>Défausser · +{picked.size} pts</button>
    {/if}
  </div>
{/if}

{#if selected}
  <CardModal item={selected} onclose={() => (selected = null)} onaction={(kind) => { changed(kind === "discard" ? [selected.id] : null); onwallet?.(); }} />
{/if}
