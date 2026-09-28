<script>
  import Card from "./Card.svelte";
  import CardModal from "./CardModal.svelte";
  import Icon from "./Icon.svelte";
  import SearchBox from "./SearchBox.svelte";
  import Pager from "./Pager.svelte";
  import { data, RNAME, RARITIES_DESC } from "../wm/index.js";
  import { nf } from "./format.js";
  import { PagedList } from "./paged.svelte.js";
  import { lazyValues } from "./lazyValues.js";
  import { settings, toggleHideStats, toggleHideSensitive } from "./settings.svelte.js";

  const SORTS = [["rarity", "Rareté"], ["name", "Nom"], ["atk", "Attaque"], ["def", "Défense"]];

  let search = $state("");
  let query = $state("");
  const prefs = settings.catalog;
  let sort = $state(prefs.sort);
  let rarity = $state(prefs.rarity);
  let wishOnly = $state(prefs.wishOnly);
  $effect(() => Object.assign(prefs, { sort, rarity, wishOnly }));
  let selected = $state(null);
  let rarityCounts = $state(null); // global tier totals, kept across searches

  // The catalog is ~2.77M cards: everything is filtered and paged server-side.
  const list = new PagedList(async (page) => {
    const d = await data.catalog({ page, sort, q: query, rarity, wishlist: wishOnly });
    if (d.rarityCounts) rarityCounts = d.rarityCounts;
    return d;
  });
  list.go(0);

  $effect(() => {
    const q = search.trim();
    const t = setTimeout(() => { if (q !== query) { query = q; list.go(0); } }, 350);
    return () => clearTimeout(t);
  });

  let values = $state({});
  const lazy = lazyValues((id, v) => (values[id] = v), { concurrency: 4 });
  $effect(() => () => lazy.destroy());

  const refilter = (change) => { change(); list.go(0); };
  const cards = $derived(list.data?.cards);
  // Browsing has a total; a search only says whether more pages exist.
  const hasNext = $derived(query || list.data?.total == null ? !!list.data?.hasMore : (list.page + 1) * 50 < list.data.total);
  const catalogTotal = $derived(rarityCounts ? Object.values(rarityCounts).reduce((a, b) => a + b, 0) : null);
</script>

<div class="coll-head">
  <div>
    <h1>Toutes les cartes</h1>
    <div class="meta">
      {#if catalogTotal}{nf(catalogTotal)} cartes dans le jeu{/if}
      {#if query}· résultats pour « {query} »{/if}
    </div>
  </div>
  <div class="coll-tools">
    <SearchBox bind:value={search} placeholder="Rechercher dans 2,7 M de cartes..." />
    <div class="tool-actions">
      <div class="isel" title="Trier">
        <Icon name="sort" />
        <select value={sort} onchange={(e) => refilter(() => (sort = e.currentTarget.value))} aria-label="Trier">
          {#each SORTS as [v, label]}<option value={v}>{label}</option>{/each}
        </select>
      </div>
      <button class="iconbtn" class:on={wishOnly} onclick={() => refilter(() => (wishOnly = !wishOnly))} title="N'afficher que ma liste de souhaits">
        <Icon name="heart" filled={wishOnly} width={1.7} /><span>Souhaits</span>
      </button>
      <button class="iconbtn" class:on={settings.hideStats} onclick={toggleHideStats} title="Afficher ou masquer l'ATK et la DEF">
        <Icon name={settings.hideStats ? "eyeOff" : "eye"} /><span>ATK/DEF</span>
      </button>
      <button class="iconbtn" class:on={!settings.hideSensitive} onclick={toggleHideSensitive} title="Afficher ou flouter les images sensibles">
        <Icon name={settings.hideSensitive ? "eyeOff" : "eye"} /><span>Sensible</span>
      </button>
    </div>
  </div>
</div>

{#if rarityCounts}
  <div class="rarity-panel">
    <div class="rarity-meter" role="group" aria-label="Filtrer par rareté">
      {#each RARITIES_DESC as r}
        {#if rarityCounts[r]}
          <button class="rm-seg" class:sel={rarity === r} class:dim={rarity && rarity !== r}
            style="--rc:var(--r-{r.toLowerCase()}); flex-grow:{rarityCounts[r]}"
            title="{RNAME[r]} : {nf(rarityCounts[r])}" aria-label="{RNAME[r]} : {nf(rarityCounts[r])}"
            onclick={() => refilter(() => (rarity = rarity === r ? "" : r))}></button>
        {/if}
      {/each}
    </div>
    <div class="rarity-legend">
      <button class="rl" class:on={!rarity} onclick={() => refilter(() => (rarity = ""))}><span class="rl-name">Toutes</span></button>
      {#each RARITIES_DESC as r}
        {#if rarityCounts[r]}
          <button class="rl" class:on={rarity === r} onclick={() => refilter(() => (rarity = rarity === r ? "" : r))}>
            <span class="rl-dot" style="background:var(--r-{r.toLowerCase()})"></span>
            <span class="rl-name">{RNAME[r]}</span><span class="rl-n">{nf(rarityCounts[r])}</span>
          </button>
        {/if}
      {/each}
    </div>
  </div>
{/if}

{#if list.error}
  <div class="empty"><b>Impossible de charger les cartes.</b><button class="btn" onclick={() => list.go()}>Réessayer</button></div>
{:else if !cards}
  <div class="grid">{#each Array(12) as _}<div class="wc skeleton"></div>{/each}</div>
{:else if cards.length === 0}
  <div class="empty"><b>Aucune carte ne correspond</b><div>Essayez un autre terme de recherche.</div></div>
{:else}
  <div class="grid" class:dim={list.loading}>
    {#each cards as c (c.id)}
      <button class="card-btn" onclick={() => (selected = c)} aria-label={c.title} use:lazy.watch={c}>
        <Card card={c} owned={c.owned} wishlisted={c.wishlisted} value={values[c.id]} />
      </button>
    {/each}
  </div>
  <Pager page={list.page} {hasNext} loading={list.loading} ongo={(p) => list.go(p)} />
{/if}

{#if selected}
  <CardModal item={{ card: selected }} readonly onclose={() => (selected = null)} />
{/if}
