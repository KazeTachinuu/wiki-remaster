<script>
  // A card grid you can pick from: one slim toolbar (`lead`, then search, rarity chips, sort), then
  // the grid, which fills the rest and scrolls on its own. Each card shows its estimated value;
  // copies locked in a pending trade come last, greyed with their reason. Same pick overlay as the
  // collection's bulk select, plus the card's rarity glow.
  import Card from "../../components/Card.svelte";
  import { pickSound } from "../../sound/sfx.js";
  import Icon from "../../components/Icon.svelte";
  import SearchBox from "../../components/SearchBox.svelte";
  import { untrack } from "svelte";
  import { debouncedSearch } from "../../lib/paged.svelte.js";
  import { inView } from "../../lib/inView.js";
  import { pickList, allValued, PICK_SORTS } from "./pickList.js";
  import RarityChips from "../../components/RarityChips.svelte";
  import PickMark from "../../components/PickMark.svelte";
  // error: the cards could not be loaded (not "no cards"), with onretry to try again.
  // more: loads the next page (loadingMore while it does); moreError: that page failed, the cards
  // above stay and "Réessayer" asks the same page again.
  // values + watch + load: a valueMap; each card's value loads once it scrolls into view, all of
  // them when sorting by value.
  // onquery: the server searches, filters and sorts the cards (a page at a time): the search,
  // rarity and sort go to onquery({ q, rarity, sort }). The estimated value is ours, not the
  // server's: that order ranks the cards loaded so far (no page is read for it).
  // more: loads the next page, called as the end of the grid comes near.
  let { items = [], picked, locked = new Set(), loading = false, error = false, onretry, onpick,
        more = null, loadingMore = false, moreError = false, values, watch, load, lead, onquery } = $props();
  let q = $state("");
  let rarity = $state("");
  let sort = $state("rarity");
  const isLocked = (it) => locked.has(it.id) || locked.has(it.card.id);
  // The value sort reads a snapshot, never the live map (values arrive one by one as cards scroll
  // in): taken when the sort is chosen and again once every value is in, so cards only move then.
  let ranked = $state.raw(new Map());
  const settled = $derived(sort === "value" && allValued(items, values));
  $effect(() => {
    if (sort !== "value") return;
    load?.(items);
    void settled;
    ranked = untrack(() => new Map(values));
  });
  const shown = $derived(pickList(items, { sort, values: ranked, isLocked }));

  // ask again on each change (the search once typing pauses), never on mount
  let asked = { q: "", rarity: "", sort: "rarity" };
  const ask = (change) => {
    const next = { ...asked, ...change };
    if (next.q === asked.q && next.rarity === asked.rarity && next.sort === asked.sort) return;
    asked = next;
    onquery(next);
  };
  debouncedSearch(() => q, (text) => ask({ q: text }));
  // a rarity or sort change carries the search as typed, so it costs one request, not two
  // the value order is ours: the server reads those pages in its rarity order
  $effect(() => ask({ rarity, sort: sort === "value" ? "rarity" : sort, q: untrack(() => q).trim() }));
  // (the owner of `more` paces those requests)

</script>

<div class="picker">
  <div class="picker-bar">
    {@render lead?.()}
    <SearchBox bind:value={q} placeholder="Rechercher..." />
    <RarityChips class="picker-chips" scroll value={rarity} onchange={(r) => (rarity = r)} />
    <div class="isel" title="Trier les cartes">
      <Icon name="sort" />
      <select bind:value={sort} aria-label="Trier">{#each PICK_SORTS as [id, label]}<option value={id}>{label}</option>{/each}</select>
    </div>
  </div>
  <div class="picker-scroll">
    {#if sort === "value" && more}<p class="sort-hint">Classées par valeur parmi les {items.length} cartes chargées.</p>{/if}
    <div class="grid picker-grid" class:dim={loading}>
      {#each shown as it (it.id)}
        {@const off = isLocked(it)}
        {@const on = picked.has(it.id)}
        <button class="card-btn" class:picking={picked.size} class:picked={on} disabled={off} onclick={() => { pickSound(on); onpick(it); }} aria-pressed={on} title={off ? "Déjà dans un échange en attente" : it.card.title} use:watch={it.card}>
          <Card card={it.card} shiny={it.is_shiny} stats={false} value={values.get(it.card.id)} />
          <PickMark {on} />
          {#if off}<span class="pick-lock">Échange en attente</span>{/if}
        </button>
      {:else}
        {#if error && !loading}<div class="empty"><b>Impossible de charger ces cartes.</b><button class="btn" onclick={onretry}>Réessayer</button></div>
        {:else}<div class="empty"><b>{loading ? "Chargement..." : items.length || q || rarity ? "Aucune carte ne correspond" : "Aucune carte"}</b></div>{/if}
      {/each}
    </div>
    {#if more}
      <!-- the next page loads as the end comes near; a failed page waits for "Réessayer" -->
      <div class="picker-more" use:inView={{ key: `${items.length}:${loadingMore}`, onEnter: () => { if (!loadingMore && !moreError) more(); } }}>
        {#if moreError && !loadingMore}<span class="modal-msg">Impossible de charger la suite.</span><button class="btn" onclick={more}>Réessayer</button>
        {:else}<span class="loading-more"><span class="spin"></span></span>{/if}
      </div>
    {/if}
  </div>
</div>
