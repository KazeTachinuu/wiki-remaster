<script>
  // My collection, whatever its size, asked of the game's server one page at a time as the grid
  // scrolls, like the game's own collection page: searched (titles and descriptions), filtered by
  // rarity or tag, ordered by rarity, date added or name, favourites first when asked. A 20 000-card
  // collection opens like a 50-card one, and nothing is read that is not shown.
  import RarityChips from "../../components/RarityChips.svelte";
  import PickMark from "../../components/PickMark.svelte";
  import { pickSound } from "../../sound/sfx.js";
  import Card from "../../components/Card.svelte";
  import CardModal from "../../components/CardModal.svelte";
  import Icon from "../../components/Icon.svelte";
  import SearchBox from "../../components/SearchBox.svelte";
  import { untrack } from "svelte";
  import { data, RNAME, RARITIES_DESC, myCardsPage, savedFirstPage, collectionRemove, forgetCollection } from "../../wm/index.js";
  import { settings } from "../../lib/settings.svelte.js";
  import { lazyValues } from "../../lib/lazyValues.js";
  import { inView } from "../../lib/inView.js";
  import { PageStream, debouncedSearch } from "../../lib/paged.svelte.js";
  import { tags } from "../../lib/tags.svelte.js";

  let { onwallet } = $props();

  // The orders the game's server knows (its own collection page offers the same).
  const SORTS = [["rarity", "Rareté"], ["recent", "Récentes"], ["name", "Nom"]];
  // Sort and filters come back as you left them (an order no longer offered falls back to rarity).
  const prefs = settings.collection;
  let filter = $state(prefs.filter);
  let search = $state("");
  let sort = $state(SORTS.some(([id]) => id === prefs.sort) ? prefs.sort : "rarity");
  let favOnly = $state(!!prefs.favOnly);
  let tagFilter = $state(""); // a tag id, "none" (untagged) or "" (all)
  $effect(() => Object.assign(prefs, { filter, sort, favOnly }));
  // my tags, for the filter (shown once I have some)
  tags.load();
  let selected = $state(null);

  let query = $state(""); // the search once typing pauses
  debouncedSearch(() => search, (q) => (query = q));
  // favourites only: the server's favourites-first order, read until the first card that is not one
  const serverSort = $derived(favOnly ? "starred" : sort);
  const stream = new PageStream(async (page) => {
    const d = await myCardsPage({ page, q: query || undefined, rarity: filter === "ALL" ? undefined : filter, sort: serverSort, tag: tagFilter || undefined });
    if (serverSort !== "starred") return d;
    const items = d.items.filter((it) => it.starred);
    return { ...d, items, hasMore: d.hasMore && items.length === d.items.length };
  });
  // last time's first page, at once, when it is the view asked for; the fresh one replaces it
  const first = savedFirstPage();
  if (first && filter === "ALL" && sort === "rarity" && !favOnly && !tagFilter) stream.show(first);
  // a new search, filter or order asks the server again
  $effect(() => { void [query, filter, serverSort, tagFilter]; untrack(() => stream.reset()); });
  // the rarity bar and the count follow the search, not the rarity filter (the server's counts)
  const counts = $derived(stream.meta?.counts ?? {});
  const total = $derived(Object.values(counts).reduce((a, b) => a + b, 0));

  // market values, for the cards that scroll into view only (paced, see lazyValues)
  let values = $state({});
  const lazy = lazyValues((id, v) => (values[id] = v));
  $effect(() => () => lazy.destroy());

  // after our own change: the cards leave the grid at once (no reload)
  function changed(gone = null) {
    if (gone) {
      collectionRemove(gone);
      stream.drop(gone);
    } else {
      forgetCollection(); // unsure what went through: ask again rather than guess
      stream.reset();
    }
  }

  // a favourite or a tag changed in the card window: the row follows; one that no longer matches
  // the favourites or tag filter leaves it
  function rowChanged(row) {
    const fits = (!favOnly || row.starred) && (!tagFilter || (tagFilter === "none" ? !row.tags.length : row.tags.some((t) => t.id === tagFilter)));
    fits ? stream.update(row) : stream.drop([row.id]);
    collectionRemove(); // the saved first page is asked again
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
    if (bulkBusy) return; // one discard at a time: a second click never sends it twice
    bulkBusy = true;
    try {
      const r = await data.bulkDiscard([...picked]);
      const kept = new Set(r.failed || []);
      changed([...picked].filter((id) => !kept.has(id)));
      // the ones that failed are already gone (sold, traded or discarded elsewhere): out of the grid too
      if (kept.size) changed([...kept]);
      bulkMsg = `${r.discarded_count} carte${r.discarded_count > 1 ? "s" : ""} défaussée${r.discarded_count > 1 ? "s" : ""}` + (kept.size ? `, ${kept.size} déjà partie${kept.size > 1 ? "s" : ""} ailleurs` : "");
    } catch (e) {
      bulkMsg = e.message || "La défausse a échoué.";
      changed(); // some may have gone through: ask again rather than guess
    }
    bulkBusy = false;
    toggleSelecting();
    onwallet?.();
  }
  const rows = $derived(stream.items);
  const allPicked = $derived(rows.length > 0 && rows.every((it) => picked.has(it.id)));
  const plural = (n, word) => `${n.toLocaleString("fr")} ${word}${n > 1 ? "s" : ""}`;
</script>

{#if stream.error && !stream.started}
  <div class="empty"><b>Impossible de charger la collection.</b><div>Vérifiez que vous êtes connecté, puis réessayez.</div><button class="btn" onclick={() => stream.reset()}>Réessayer</button></div>
{:else}
  <div class="coll-head">
    <div>
      <h1>Ma collection</h1>
      <div class="meta">
        {#if !stream.started}<span class="sync"><span class="spin"></span>Chargement de votre collection</span>
        {:else}{plural(total, "carte") + (query ? ` pour « ${query} »` : "")}{/if}
      </div>
    </div>
    <div class="coll-tools">
      <SearchBox bind:value={search} loading={search.trim() !== query || (stream.loading && !stream.items.length)} placeholder="Rechercher une carte..." />
      <div class="tool-actions">
        <div class="isel" title="Trier les cartes">
          <Icon name="sort" />
          <select bind:value={sort} aria-label="Trier">{#each SORTS as [id, label] (id)}<option value={id}>{label}</option>{/each}</select>
        </div>
        {#if tags.list?.length}
          <div class="isel" title="Étiquette">
            <Icon name="tag" />
            <select bind:value={tagFilter} aria-label="Étiquette">
              <option value="">Étiquettes</option>
              <option value="none">Sans étiquette</option>
              {#each tags.list as t (t.id)}<option value={t.id}>{t.name}</option>{/each}
            </select>
          </div>
        {/if}
        {#if selecting}
          <button class="iconbtn" onclick={() => { pickSound(allPicked); picked = allPicked ? new Set() : new Set(rows.map((it) => it.id)); }}>
            {allPicked ? "Tout désélectionner" : "Tout sélectionner"}
          </button>
        {/if}
        <button class="iconbtn" class:on={selecting} onclick={toggleSelecting}>
          <Icon name="select" /><span>{selecting ? "Annuler" : "Sélectionner"}</span>
        </button>
      </div>
    </div>
  </div>

  {#if bulkMsg}<div class="sort-hint">{bulkMsg}</div>{/if}

  {#if total > 0}
    <div class="rarity-panel">
      <div class="rarity-meter" role="img" aria-label="Répartition par rareté">
        {#each RARITIES_DESC as r}
          {#if counts[r]}
            <button class="rm-seg" class:sel={filter === r} class:dim={filter !== "ALL" && filter !== r}
              style="--rc:var(--r-{r.toLowerCase()}); flex-grow:{counts[r]}"
              title="{RNAME[r]} : {counts[r]}" aria-label="{RNAME[r]} : {counts[r]}"
              onclick={() => (filter = filter === r ? "ALL" : r)}></button>
          {/if}
        {/each}
      </div>
      {#snippet extras()}
        <button class="rl special fav" class:on={favOnly} onclick={() => (favOnly = !favOnly)} title="Cartes favorites">
          <Icon name="star" width={1.7} class="rl-ico" /><span class="rl-name">Favoris</span>
        </button>
      {/snippet}
      <RarityChips value={filter === "ALL" ? "" : filter} {counts} {total} onchange={(r) => (filter = r || "ALL")} children={extras} />
    </div>
  {/if}

  {#if !stream.started}
    <div class="grid">{#each Array(10) as _}<div class="wc skeleton"></div>{/each}</div>
  {:else if !rows.length && !stream.loading}
    <div class="empty">
      {#if query || filter !== "ALL" || favOnly || tagFilter}
        <b>Aucune carte ne correspond</b><div>Essayez un autre filtre ou une autre recherche.</div>
      {:else}
        <b>Rien ici pour l'instant</b><div>Ouvrez un paquet pour commencer votre collection.</div>
      {/if}
    </div>
  {:else}
    <div class="grid" class:dim={stream.loading && stream.first}>
      {#each rows as it (it.id)}
        <button class="card-btn" class:picking={selecting} class:picked={selecting && picked.has(it.id)}
          onclick={() => onCardClick(it)} aria-label={it.card.title} use:lazy.watch={it.card}>
          <Card card={it.card} count={it.count} shiny={it.is_shiny} starred={it.starred} value={values[it.card.id]} />
          {#if selecting}
            <PickMark on={picked.has(it.id)} />
          {/if}
        </button>
      {/each}
    </div>
    {#if stream.hasMore && !stream.error}
      <div class="grid-more" aria-hidden="true" use:inView={{ onEnter: () => stream.more(), key: `${rows.length}:${stream.loading}` }}></div>
    {:else if stream.error}
      <div class="empty"><span class="modal-msg">Impossible de charger la suite.</span><button class="btn" onclick={() => stream.more()}>Réessayer</button></div>
    {/if}
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
  <CardModal item={selected} onclose={() => (selected = null)} onaction={(kind) => { changed(kind === "unsure" ? null : [selected.id]); onwallet?.(); }} onchange={rowChanged} />
{/if}
