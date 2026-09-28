<script>
  import Card from "./Card.svelte";
  import AuctionModal from "./AuctionModal.svelte";
  import Icon from "./Icon.svelte";
  import SearchBox from "./SearchBox.svelte";
  import Pager from "./Pager.svelte";
  import { data, RNAME, RARITIES_DESC } from "../wm/index.js";
  import { nf, countdown, secondsUntil } from "./format.js";
  import { PagedList } from "./paged.svelte.js";
  import { settings } from "./settings.svelte.js";

  let { profile, onwallet } = $props();

  const SORTS = [["recent", "Plus récentes"], ["ending_soon", "Fin proche"], ["price_asc", "Prix croissant"], ["price_desc", "Prix décroissant"]];

  const prefs = settings.market;
  let tab = $state(prefs.tab);
  let search = $state("");
  let query = $state("");
  let sort = $state(prefs.sort);
  let rarity = $state(prefs.rarity);
  $effect(() => Object.assign(prefs, { tab, sort, rarity }));
  let selected = $state(null);

  const list = new PagedList((page) => data.marketplace({ page, sort, q: query, rarity }));
  list.go(0);

  $effect(() => {
    const q = search.trim();
    const t = setTimeout(() => { if (q !== query) { query = q; list.go(0); } }, 350);
    return () => clearTimeout(t);
  });

  // My listings, bids, wins and history (one call).
  let mine = $state(null);
  const loadMine = () => data.myMarket().then((m) => (mine = m), () => {});
  loadMine();

  // One shared clock for every countdown on the page.
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 30000); return () => clearInterval(t); });

  const refilter = (change) => { change(); list.go(0); };
  function closeModal() {
    selected = null;
    loadMine();
    list.go();
    onwallet?.();
  }

  function statusLabel(a) {
    if (a.status === "active") return countdown(secondsUntil(a.endAt, now));
    if (a.status === "cancelled") return "Annulée";
    if (a.finalPrice != null) return `Vendue ${nf(a.finalPrice)}`;
    return "Invendue";
  }

  const tabs = $derived([
    ["browse", "Toutes les ventes"],
    ["selling", `Mes ventes ${mine ? `${mine.selling.length}/${mine.max}` : ""}`],
    ["bidding", `Mes enchères ${mine?.bidding.length || ""}`],
    ["won", `Remportées ${mine?.won.length || ""}`],
    ["history", "Historique"],
  ]);
  const shown = $derived(tab === "browse" ? list.data?.auctions : mine?.[tab]);
  const EMPTY = {
    browse: "Aucune enchère ne correspond.",
    selling: "Aucune vente en cours. Ouvrez une carte dans Ma collection pour la vendre.",
    bidding: "Aucune enchère en cours.",
    won: "Aucune enchère remportée.",
    history: "Aucune vente terminée.",
  };
</script>

<div class="coll-head">
  <div>
    <h1>Marché</h1>
    <div class="meta">Enchérissez sur des cartes ou vendez les vôtres contre des WikiBidous</div>
  </div>
  {#if tab === "browse"}
    <div class="coll-tools">
      <SearchBox bind:value={search} placeholder="Rechercher une carte au marché..." />
      <div class="tool-actions">
        <div class="isel" title="Trier">
          <Icon name="sort" />
          <select value={sort} onchange={(e) => refilter(() => (sort = e.currentTarget.value))} aria-label="Trier">
            {#each SORTS as [v, label]}<option value={v}>{label}</option>{/each}
          </select>
        </div>
      </div>
    </div>
  {/if}
</div>

<div class="mkt-tabs" role="tablist">
  {#each tabs as [id, label]}
    <button role="tab" aria-selected={tab === id} class:on={tab === id} onclick={() => (tab = id)}>{label}</button>
  {/each}
</div>

{#if tab === "browse"}
  <div class="rarity-legend mkt-filter">
    <button class="rl" class:on={!rarity} onclick={() => refilter(() => (rarity = ""))}><span class="rl-name">Toutes</span></button>
    {#each RARITIES_DESC as r}
      <button class="rl" class:on={rarity === r} onclick={() => refilter(() => (rarity = rarity === r ? "" : r))}>
        <span class="rl-dot" style="background:var(--r-{r.toLowerCase()})"></span><span class="rl-name">{RNAME[r]}</span>
      </button>
    {/each}
  </div>
{/if}

{#if tab === "browse" && list.error}
  <div class="empty"><b>Marché indisponible pour le moment.</b><button class="btn" onclick={() => list.go()}>Réessayer</button></div>
{:else if !shown}
  <div class="grid">{#each Array(10) as _}<div class="wc skeleton"></div>{/each}</div>
{:else if shown.length === 0}
  <div class="empty"><b>{EMPTY[tab]}</b></div>
{:else}
  <div class="grid" class:dim={tab === "browse" && list.loading}>
    {#each shown as a (a.id)}
      <div class="auc-item">
        <button class="card-btn" onclick={() => (selected = a)} aria-label={a.card.title}>
          <Card card={a.card} shiny={a.is_shiny} />
        </button>
        <div class="auc-meta">
          <span class="auc-bid" title={a.bid != null ? "Enchère actuelle" : "Mise de départ"}><span class="auc-coin"></span>{nf(a.price)}</span>
          <span class="auc-end" class:soon={a.status === "active" && secondsUntil(a.endAt, now) < 3600}>{statusLabel(a)}</span>
        </div>
        <div class="auc-seller" class:lead={a.currentBidderId === data.userId && a.status === "active"}>
          {a.owned ? "Votre vente" : a.currentBidderId === data.userId && a.status === "active" ? "Vous êtes en tête" : a.seller ? `Vendu par ${a.seller}` : ""}
        </div>
      </div>
    {/each}
  </div>
  {#if tab === "browse"}
    <Pager page={list.page} hasNext={list.data.hasMore} loading={list.loading} ongo={(p) => list.go(p)} />
  {/if}
{/if}

{#if selected}
  <AuctionModal auction={selected} balance={profile?.currency ?? null} {onwallet} onclose={closeModal} />
{/if}
