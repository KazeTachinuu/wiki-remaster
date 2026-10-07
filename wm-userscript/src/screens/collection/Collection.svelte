<script>
  // My collection, whatever its size, asked of the game's server one page at a time as the grid
  // scrolls, like the game's own collection page: searched (titles and descriptions), filtered by
  // rarity or tag, ordered by rarity, date added or name, favourites first when asked. A 20 000-card
  // collection opens like a 50-card one, and nothing is read that is not shown.
  import RarityChips from "../../components/RarityChips.svelte";
  import PickMark from "../../components/PickMark.svelte";
  import { pickSound } from "../../sound/sfx.js";
  import { play } from "../../sound/sound.js";
  import DiscardConfirm from "./DiscardConfirm.svelte";
  import { selectionFor, asideReason, discardInBatches, matchesFilter, firstN, tagCounts, PICK_ORDERS } from "../../wm/discard.js";
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

  // Bulk discard, over the whole collection (wm/discard.js): choosing starts by reading the light
  // list of every copy; "Tout sélectionner" takes what the filters show, minus what a player keeps
  // (favourites, vitrine, shiny, a trade); the choice leaves after a few seconds to undo, then in
  // batches of 50 as the game's own page sends them.
  const UNDO_S = 5;
  let selecting = $state(false);
  let picked = $state(new Set());
  let copies = $state.raw(null); // every copy, light, once read (null before)
  let read = $state(0); // copies read so far
  let readError = $state(false);
  let showcaseIds = $state.raw(new Set());
  let include = $state(false); // "les inclure": the kept-back ones too (never one in a trade)
  let asking = $state(false); // the confirmation is open
  let run = $state(null); // { phase: "wait" | "send" | "done", ... } in the floating bar
  let lastPick = null; // for a Shift-click range

  const filterNow = $derived({ rarity: filter, favOnly, tag: tagFilter, q: query });
  const ctx = $derived({ locked: new Set(stream.meta?.pending ?? []), showcase: showcaseIds });
  const sel = $derived(copies ? selectionFor(copies, filterNow, ctx, include) : null);
  const whyAside = (it) => asideReason({ id: it.id, cardId: it.card.id, starred: it.starred, shiny: it.is_shiny }, ctx);
  const isLocked = (it) => whyAside(it) === "En échange";
  const rows = $derived(stream.items);
  const onScreen = $derived(rows.filter((it) => picked.has(it.id)).length);
  // what "Sélectionner N" draws from: every copy the filters show minus the kept ones; without the
  // full list (it failed to read), the cards shown
  const takeable = $derived(sel ? sel.take : rows.filter((it) => include ? !isLocked(it) : !whyAside(it)).map((it) => ({ id: it.id, at: it.obtained_at })));
  const QUICK = [50, 100, 500];
  let pickOrder = $state("oldest");
  let want = $state(null); // the number asked for (null: none, Infinity: all)
  // the tag chips' counts, under the other filters (once the full list is read)
  const tagN = $derived(copies ? tagCounts(copies.filter((c) => matchesFilter(c, { ...filterNow, tag: "" }))) : null);
  const asideCount = $derived(sel ? sel.aside.length : rows.filter(whyAside).length);
  const asideKinds = $derived([...new Set((sel ? sel.aside.map((x) => x.why) : rows.map(whyAside).filter(Boolean)))].map((w) => w.toLowerCase()).join(", "));

  // a new search or filter starts a new choice, as on the game's page
  $effect(() => { void [query, filter, favOnly, tagFilter]; untrack(() => { picked = new Set(); include = false; lastPick = null; want = null; }); });

  async function readCopies() {
    readError = false; read = 0;
    data.showcase().then((sh) => (showcaseIds = new Set(sh.places.filter(Boolean).map((p) => p.id))), () => {});
    try { copies = await data.myCopies({ onProgress: (n) => (read = n) }); }
    catch { readError = true; }
  }
  function toggleSelecting() {
    selecting = !selecting;
    picked = new Set(); include = false; lastPick = null; want = null;
    if (selecting && !copies) readCopies();
  }
  function onCardClick(it, e) {
    if (!selecting) { selected = it; return; }
    if (isLocked(it)) return;
    const n = new Set(picked);
    if (e?.shiftKey && lastPick) {
      const ids = rows.map((r) => r.id), a = ids.indexOf(lastPick), b = ids.indexOf(it.id);
      if (a >= 0 && b >= 0) for (const r of rows.slice(Math.min(a, b), Math.max(a, b) + 1)) if (!isLocked(r)) n.add(r.id);
      pickSound(false);
    } else {
      pickSound(n.has(it.id));
      n.has(it.id) ? n.delete(it.id) : n.add(it.id);
    }
    lastPick = it.id;
    picked = n;
  }
  // "Sélectionner N": the first N, oldest or newest first, in place of the current choice
  function take(n) {
    want = n;
    picked = new Set(firstN(takeable, n ?? 0, pickOrder).map((c) => c.id));
    pickSound(!picked.size);
  }
  const clearPicks = () => { pickSound(true); picked = new Set(); want = null; };
  const typed = (e) => { const n = Math.min(takeable.length, Math.max(0, Math.floor(Number(e.currentTarget.value) || 0))); take(n || null); };
  function toggleInclude() {
    include = !include;
    if (!include && sel) { const n = new Set(picked); for (const x of sel.aside) n.delete(x.copy.id); picked = n; }
    if (want != null) take(want); // the number asked for now counts the kept-back ones too
  }

  // the chosen copies, light: from the full list, or from the cards shown when it is missing
  const chosen = () => {
    const byId = new Map((copies ?? []).map((c) => [c.id, c]));
    for (const it of rows) if (!byId.has(it.id)) byId.set(it.id, { id: it.id, rarity: it.card.rarity, title: it.card.title });
    return [...picked].map((id) => byId.get(id)).filter(Boolean);
  };

  // gone for good: out of the list, the grid, the counts
  function removeCopies(ids) {
    const gone = new Set(ids);
    const lost = {};
    for (const c of copies ?? []) if (gone.has(c.id)) lost[c.rarity] = (lost[c.rarity] ?? 0) + 1;
    for (const it of rows) if (gone.has(it.id) && !copies) lost[it.card.rarity] = (lost[it.card.rarity] ?? 0) + 1;
    if (copies) copies = copies.filter((c) => !gone.has(c.id));
    if (stream.meta?.counts) stream.meta = { ...stream.meta, counts: Object.fromEntries(Object.entries(stream.meta.counts).map(([r, k]) => [r, Math.max(0, k - (lost[r] ?? 0))])) };
    changed(ids);
  }

  let token = 0;
  async function discard() {
    asking = false;
    const ids = [...picked], mine = ++token;
    run = { phase: "wait", n: ids.length, left: UNDO_S };
    for (let s = UNDO_S; s > 0; s--) {
      if (token !== mine) return;
      run = { ...run, left: s };
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (token !== mine) return;
    run = { phase: "send", n: ids.length, batch: 1, of: Math.ceil(ids.length / 50), sent: 0, stop: false };
    const r = await discardInBatches(ids, (b) => data.bulkDiscard(b), { onProgress: (p) => (run = { ...run, ...p }), stopped: () => run?.stop });
    if (r.gone.length) removeCopies(r.gone);
    if (r.unsure.length) { copies = null; changed(); } // a batch may have gone through in part: read again
    picked = new Set(r.refused); // refused ones stay mine, still chosen to show which
    play(r.gone.length && !r.error ? "success" : "error");
    run = { phase: "done", gone: r.gone.length, refused: r.refused.length, unsent: r.unsent.length, error: r.error?.message ?? null };
    onwallet?.();
    if (!r.refused.length && !r.error) selecting = false; // all done: back to browsing
    const shown = run;
    setTimeout(() => { if (run === shown) run = null; }, 6000);
  }
  const undo = () => { token++; run = null; };

  const onKey = (e) => {
    if (e.key !== "Escape" || !selecting || selected || asking) return;
    if (run?.phase === "wait") return undo();
    picked.size ? (picked = new Set()) : toggleSelecting();
  };
  const plural = (n, word) => `${n.toLocaleString("fr")} ${word}${n > 1 ? "s" : ""}`;
</script>

<svelte:window onkeydown={onKey} />

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
        <button class="iconbtn" class:on={selecting} onclick={toggleSelecting}>
          <Icon name="select" /><span>{selecting ? "Annuler" : "Sélectionner"}</span>
        </button>
      </div>
    </div>
  </div>

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
      {#if tags.list?.length}
        <!-- tags, a filter of their own: combined with the rarity, never replacing it -->
        <div class="tag-row" role="group" aria-label="Étiquettes">
          <span class="tag-row-label"><Icon name="tag" />Étiquettes</span>
          <button class="rl" class:on={!tagFilter} onclick={() => (tagFilter = "")}><span class="rl-name">Toutes</span></button>
          <button class="rl" class:on={tagFilter === "none"} onclick={() => (tagFilter = tagFilter === "none" ? "" : "none")}>
            <span class="rl-name">Sans étiquette</span>{#if tagN}<span class="rl-n">{tagN.none.toLocaleString("fr")}</span>{/if}
          </button>
          {#each tags.list as t (t.id)}
            <button class="rl tf-chip" class:on={tagFilter === t.id} style="--tc:{t.color ?? 'var(--fg-soft)'}" onclick={() => (tagFilter = tagFilter === t.id ? "" : t.id)}>
              <i class="tag-dot"></i><span class="rl-name">{t.name}</span>{#if tagN}<span class="rl-n">{(tagN[t.id] ?? 0).toLocaleString("fr")}</span>{/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}

  {#if selecting && stream.started}
    <!-- what the filters show, across the whole collection, and one click to take it -->
    <div class="sel-line">
      {#if copies}
        <span class="sel-n">{plural(sel.matches.length, "carte")}</span>
      {:else if readError}
        <span class="sel-n">{plural(rows.length, "carte")} affichée{rows.length > 1 ? "s" : ""}</span>
        <span class="sel-aside">Collection entière illisible pour le moment · <button onclick={readCopies}>Réessayer</button></span>
      {:else}
        <span class="sel-n"><span class="spin"></span>Lecture de votre collection{read ? ` · ${read.toLocaleString("fr")}` : ""}</span>
      {/if}
      {#if (copies || readError) && asideCount}
        <span class="sel-aside">{include ? "En échange laissées de côté" : `${asideCount.toLocaleString("fr")} laissée${asideCount > 1 ? "s" : ""} de côté (${asideKinds})`} · <button onclick={toggleInclude}>{include ? "les laisser" : "les inclure"}</button></span>
      {/if}
      {#if copies || readError}
        <div class="sel-pick">
          <span class="sel-label">Sélectionner</span>
          {#each QUICK.filter((k) => k < takeable.length) as k (k)}
            <button class="rl" class:on={want === k} onclick={() => take(k)}><span class="rl-name">{k}</span></button>
          {/each}
          <button class="rl" class:on={want === Infinity} disabled={!takeable.length} onclick={() => take(Infinity)}><span class="rl-name">Tout</span><span class="rl-n">{takeable.length.toLocaleString("fr")}</span></button>
          <input class="sel-num" type="number" inputmode="numeric" min="1" max={takeable.length} placeholder="nombre" aria-label="Nombre de cartes à sélectionner"
            value={want != null && want !== Infinity ? want : ""} onchange={typed} onkeydown={(e) => e.key === "Enter" && typed(e)} />
          <select class="sel-order" bind:value={pickOrder} onchange={() => want != null && take(want)} aria-label="Lesquelles">
            {#each PICK_ORDERS as [id, label] (id)}<option value={id}>{label}</option>{/each}
          </select>
          {#if picked.size}<button class="sel-clear" onclick={clearPicks}>Tout désélectionner</button>{/if}
        </div>
      {/if}
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
        {@const why = selecting && !picked.has(it.id) ? whyAside(it) : null}
        <button class="card-btn" class:picking={selecting} class:picked={selecting && picked.has(it.id)} class:aside={why}
          disabled={selecting && why === "En échange"} title={why ?? undefined}
          onclick={(e) => onCardClick(it, e)} aria-label={it.card.title} use:lazy.watch={it.card}>
          <Card card={it.card} count={it.count} shiny={it.is_shiny} starred={it.starred} value={values[it.card.id]} />
          {#if selecting}
            <PickMark on={picked.has(it.id)} />
            {#if why}<span class="pick-why">{why}</span>{/if}
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

<!-- one floating bar: the choice, then a few seconds to undo, then the batches, then the outcome -->
{#if run}
  <div class="bulk-bar run" role="status" aria-live="polite">
    {#if run.phase === "wait"}
      <span class="bulk-text">{plural(run.n, "carte")} défaussée{run.n > 1 ? "s" : ""} dans {run.left} s</span>
      <button class="btn" onclick={undo}>Annuler</button>
    {:else if run.phase === "send"}
      <span class="bulk-text">Défausse · lot {run.batch} sur {run.of}</span>
      <span class="bulk-prog" aria-hidden="true"><i style="width:{(run.sent / run.n) * 100}%"></i></span>
      <button class="btn" disabled={run.stop} onclick={() => (run = { ...run, stop: true })}>{run.stop ? "Arrêt..." : "Arrêter"}</button>
    {:else}
      <span class="bulk-text">
        {#if run.gone}{plural(run.gone, "carte")} défaussée{run.gone > 1 ? "s" : ""} · <b>+{run.gone.toLocaleString("fr")} WikiBidou{run.gone > 1 ? "s" : ""}</b>{/if}
        {#if run.refused}{run.gone ? " · " : ""}{run.refused} refusée{run.refused > 1 ? "s" : ""} par le jeu (toujours à vous){/if}
        {#if run.error}{run.gone ? " · " : ""}{run.error}{/if}
        {#if !run.gone && !run.refused && !run.error}Défausse arrêtée{/if}
      </span>
      <button class="btn" onclick={() => (run = null)}>OK</button>
    {/if}
  </div>
{:else if selecting && picked.size > 0}
  <div class="bulk-bar">
    <span class="bulk-text">{plural(picked.size, "sélectionnée")}{#if picked.size > onScreen}<small class="bulk-off">dont {(picked.size - onScreen).toLocaleString("fr")} plus bas</small>{/if}</span>
    <button class="btn danger" onclick={() => (asking = true)}>Défausser · +{picked.size.toLocaleString("fr")} WB</button>
  </div>
{/if}

{#if asking}
  <DiscardConfirm copies={chosen()} onconfirm={discard} onclose={() => (asking = false)} />
{/if}

{#if selected}
  <CardModal item={selected} onclose={() => (selected = null)} onaction={(kind) => { changed(kind === "unsure" ? null : [selected.id]); onwallet?.(); }} onchange={rowChanged} />
{/if}
