<script>
  import Card from "./Card.svelte";
  import CardModal from "./CardModal.svelte";
  import { data, RNAME, marketValueFor } from "../wm/index.js";
  import { createQueue } from "./queue.js";
  import { settings, toggleHideStats, toggleHideSensitive } from "./settings.svelte.js";

  const RARITIES = ["L", "UR", "SR", "R", "PC", "C"];
  const nf = (n) => Number(n).toLocaleString("fr");

  const SORTS = [["rarity", "Rareté"], ["name", "Nom"], ["atk", "Attaque"], ["def", "Défense"]];

  let cards = $state(null);
  let rarityCounts = $state(null); // global tier totals (informational, never a completion %)
  let total = $state(null); // null while searching (q present)
  let hasMore = $state(false);
  let page = $state(0);
  let search = $state("");
  let qActive = $state("");
  let sort = $state("rarity"); // verified: rarity | name | atk | def
  let rarity = $state(""); // verified server filter: rarity=<tier>
  let wishOnly = $state(false); // verified server filter: wishlist=1
  let loading = $state(false);
  let error = $state("");
  let selected = $state(null);

  // Lazy, on-demand market value (PRO-gated on the real API -> null; never swept for the
  // whole 2.77M catalog, only for cards actually in the viewport).
  let values = $state({});
  const vq = createQueue({ concurrency: 4 });
  const cardById = new Map();
  let io = null;
  function enqueueValue(id) {
    if (values[id] !== undefined || !cardById.has(id)) return;
    vq.push(id, async () => { const v = await marketValueFor(cardById.get(id)).catch(() => null); values[id] = v ?? null; });
  }
  function watchValue(node, card) {
    if (typeof IntersectionObserver !== "undefined" && !io) {
      io = new IntersectionObserver((es) => {
        for (const e of es) if (e.isIntersecting) { const id = e.target.__id; if (id) { enqueueValue(id); io.unobserve(e.target); } }
      }, { rootMargin: "300px" });
    }
    node.__id = card.id; io?.observe(node);
    return { update(c) { node.__id = c.id; }, destroy() { io?.unobserve(node); } };
  }

  // A request token guards against out-of-order responses (debounced q + page changes).
  let reqToken = 0;
  async function load() {
    const my = ++reqToken;
    loading = true; error = "";
    try {
      const d = await data.catalog({ page, sort, q: qActive, rarity, wishlist: wishOnly });
      if (my !== reqToken) return; // a newer request superseded this one
      cards = d.cards;
      total = d.total; hasMore = d.hasMore;
      if (d.rarityCounts) rarityCounts = d.rarityCounts;
      cardById.clear();
      for (const c of d.cards) cardById.set(c.id, c);
    } catch (e) {
      if (my !== reqToken) return;
      error = "Impossible de charger les cartes."; cards = [];
    } finally {
      if (my === reqToken) loading = false;
    }
  }
  load();

  // Debounce the search box into a server query; every change resets to page 0.
  let deb;
  $effect(() => {
    const s = search.trim();
    clearTimeout(deb);
    deb = setTimeout(() => { if (s !== qActive) { qActive = s; page = 0; load(); } }, 350);
    return () => clearTimeout(deb);
  });
  $effect(() => () => { io?.disconnect(); io = null; clearTimeout(deb); });

  // Two pagination regimes: browsing uses total; searching (q) has no total, only hasMore.
  let hasNext = $derived(qActive ? hasMore : (total != null ? (page + 1) * 50 < total : hasMore));
  let catalogTotal = $derived(rarityCounts ? RARITIES.reduce((n, r) => n + (rarityCounts[r] || 0), 0) : total);

  function go(delta) { page = Math.max(0, page + delta); load(); }
  // Every filter/sort change is server-side and resets to the first page.
  function setRarity(r) { rarity = rarity === r ? "" : r; page = 0; load(); }
  function setSort(s) { sort = s; page = 0; load(); }
  function toggleWishOnly() { wishOnly = !wishOnly; page = 0; load(); }

  async function toggleWishlist(card) {
    const next = !card.wishlisted;
    card.wishlisted = next; // optimistic
    try { next ? await data.wishlistAdd(card.id) : await data.wishlistRemove(card.id); }
    catch { card.wishlisted = !next; } // roll back on failure, never claim a fake success
  }
</script>

<div class="coll-head">
  <div>
    <h1>Toutes les cartes</h1>
    <div class="meta">
      {#if catalogTotal != null}{nf(catalogTotal)} cartes dans le jeu{/if}
      {#if qActive}· résultats pour « {qActive} »{/if}
    </div>
  </div>
  <div class="coll-tools">
    <div class="search-wrap">
      <svg class="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.4-3.4"/></svg>
      <input class="search" type="search" placeholder="Rechercher dans 2,7 M de cartes..." bind:value={search} />
      {#if search}<button class="search-clear" onclick={() => (search = "")} aria-label="Effacer la recherche"><svg class="x-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>{/if}
    </div>
    <div class="tool-actions">
      <div class="isel" title="Trier">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5v14M7 19l-3-3M7 5l3 3M17 19V5M17 5l3 3M17 19l-3-3"/></svg>
        <select value={sort} onchange={(e) => setSort(e.currentTarget.value)} aria-label="Trier">
          {#each SORTS as [v, lbl]}<option value={v}>{lbl}</option>{/each}
        </select>
      </div>
      <button class="iconbtn" class:on={wishOnly} onclick={toggleWishOnly} title="N'afficher que ma liste de souhaits">
        <svg viewBox="0 0 24 24" fill={wishOnly ? "currentColor" : "none"} stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 20.5S3.5 14.7 3.5 9.2A4.2 4.2 0 0 1 12 6.5a4.2 4.2 0 0 1 8.5 2.7c0 5.5-8.5 11.3-8.5 11.3z"/></svg>
        <span>Souhaits</span>
      </button>
      <button class="iconbtn" class:on={settings.hideStats} onclick={toggleHideStats} title="Afficher ou masquer l'ATK et la DEF">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 11.5S6 4.5 12 4.5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"/><circle cx="12" cy="11.5" r="3"/></svg>
        <span>ATK/DEF</span>
      </button>
      <button class="iconbtn" class:on={!settings.hideSensitive} onclick={toggleHideSensitive} title="Afficher ou flouter les images sensibles">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{#if settings.hideSensitive}<path d="M3 3l18 18"/><path d="M10.6 10.7a3 3 0 0 0 3.9 3.9"/><path d="M9.8 4.7A10.4 10.4 0 0 1 12 4.5c6 0 9.5 7 9.5 7a17.6 17.6 0 0 1-2.9 3.8M6 6.2A17.3 17.3 0 0 0 2.5 11.5s3.5 7 9.5 7c1 0 1.9-.1 2.8-.4"/>{:else}<path d="M2.5 11.5S6 4.5 12 4.5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"/><circle cx="12" cy="11.5" r="3"/>{/if}</svg>
        <span>Sensible</span>
      </button>
    </div>
  </div>
</div>

{#if rarityCounts}
  <div class="rarity-panel">
    <div class="rarity-meter" role="group" aria-label="Filtrer par rareté">
      {#each RARITIES as r}
        {#if (rarityCounts[r] || 0) > 0}
          <button class="rm-seg" class:sel={rarity === r} class:dim={rarity !== "" && rarity !== r}
            style="--rc:var(--r-{r.toLowerCase()}); flex-grow:{rarityCounts[r]}"
            title="{RNAME[r]} : {nf(rarityCounts[r])}" aria-label="{RNAME[r]} : {nf(rarityCounts[r])}"
            onclick={() => setRarity(r)}></button>
        {/if}
      {/each}
    </div>
    <div class="rarity-legend">
      <button class="rl" class:on={rarity === ""} onclick={() => setRarity("")}>
        <span class="rl-name">Toutes</span>
      </button>
      {#each RARITIES as r}
        {#if (rarityCounts[r] || 0) > 0}
          <button class="rl" class:on={rarity === r} onclick={() => setRarity(r)}>
            <span class="rl-dot" style="background:var(--r-{r.toLowerCase()})"></span>
            <span class="rl-name">{RNAME[r]}</span><span class="rl-n">{nf(rarityCounts[r])}</span>
          </button>
        {/if}
      {/each}
    </div>
  </div>
{/if}

{#if error}
  <div class="empty"><b>{error}</b><button class="btn" onclick={load}>Réessayer</button></div>
{:else if !cards}
  <div class="grid">{#each Array(12) as _}<div class="wc skeleton"></div>{/each}</div>
{:else if cards.length === 0}
  <div class="empty"><b>Aucune carte ne correspond</b><div>Essayez un autre terme de recherche.</div></div>
{:else}
  <div class="grid" class:dim={loading}>
    {#each cards as c (c.id)}
      <button class="card-btn" onclick={() => (selected = c)} aria-label={c.title} use:watchValue={c}>
        <Card card={c} owned={c.owned} wishlisted={c.wishlisted} value={values[c.id]} />
      </button>
    {/each}
  </div>

  <div class="pager">
    <button class="btn pager-btn" disabled={page === 0 || loading} onclick={() => go(-1)}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      Précédent
    </button>
    <span class="pager-info">Page {page + 1}</span>
    <button class="btn pager-btn" disabled={!hasNext || loading} onclick={() => go(1)}>
      Suivant
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </button>
  </div>
{/if}

{#if selected}
  <CardModal
    item={{ card: selected }}
    readonly={true}
    wishlisted={selected.wishlisted}
    onwishlist={() => toggleWishlist(selected)}
    onclose={() => (selected = null)}
  />
{/if}
