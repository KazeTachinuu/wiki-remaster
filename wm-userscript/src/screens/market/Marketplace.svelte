<script>
  import RarityChips from "../../components/RarityChips.svelte";
  import { untrack } from "svelte";
  import Card from "../../components/Card.svelte";
  import AuctionModal from "./AuctionModal.svelte";
  import { countByCard } from "../../wm/compare.js";
  import Icon from "../../components/Icon.svelte";
  import SearchBox from "../../components/SearchBox.svelte";
  import Pager from "../../components/Pager.svelte";
  import { data } from "../../wm/index.js";
  import { nf, countdown, secondsUntil } from "../../lib/format.js";
  import { PagedList, debouncedSearch } from "../../lib/paged.svelte.js";
  import { reuse } from "../../lib/reuse.js";
  import { scrollFade } from "../../lib/scrollFade.js";
  import { settings } from "../../lib/settings.svelte.js";

  let { profile, onwallet, openId = null } = $props();

  const SORTS = [["recent", "Plus récentes"], ["ending_soon", "Fin proche"], ["price_asc", "Prix croissant"], ["price_desc", "Prix décroissant"]];

  const prefs = settings.market;
  let tab = $state(prefs.tab);
  let search = $state("");
  let query = $state("");
  let sort = $state(prefs.sort);
  let rarity = $state(prefs.rarity);
  $effect(() => Object.assign(prefs, { tab, sort, rarity }));
  let selected = $state(null);

  let quiet = false; // a refresh nobody asked for: no loading bar
  const list = new PagedList((page) => data.marketplace({ page, sort, q: query, rarity, quiet }));
  list.go(0);

  debouncedSearch(() => search, (q) => { if (q !== query) { query = q; list.go(0); } });

  // My listings, bids, wins and history (one call).
  let mine = $state(null);
  let mineError = $state(false); // my listings/bids failed to load: show a retry, never an endless skeleton
  // my sales, bids, wins and history; unchanged rows keep their objects (nothing redrawn)
  const loadMine = (quiet = false) => {
    mineError = false;
    return data.myMarket({ quiet }).then((m) => (mine = { ...m, selling: reuse(mine?.selling, m.selling), bidding: reuse(mine?.bidding, m.bidding), won: reuse(mine?.won, m.won), history: reuse(mine?.history, m.history) }), () => (mineError = !mine));
  };
  loadMine();

  // One shared clock for every countdown on the page.
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 30000); return () => clearInterval(t); });

  const refilter = (change) => { change(); list.go(0); };
  // opened from a link or notification (/marketplace/<id>): show that auction
  $effect(() => {
    // reacts to the URL only (untrack): switching listings inside the dialog must not snap back
    if (openId && untrack(() => selected?.id) !== openId) data.auction(openId).then((a) => (selected = a), () => history.replaceState({}, "", "/marketplace"));
  });
  function closeModal() {
    selected = null;
    if (openId) history.replaceState({}, "", "/marketplace");
    loadMine(true);
    // what changed while the auction was open (a bid, a sale) lands quietly: no dimmed grid, and
    // the listings that did not change are not redrawn
    quiet = true;
    list.refresh((old, fresh) => ({ ...fresh, auctions: reuse(old?.auctions, fresh.auctions) })).finally(() => (quiet = false));
    onwallet?.();
  }

  function statusLabel(a) {
    if (a.status === "active") return countdown(secondsUntil(a.endAt, now));
    if (a.status === "sold") return a.finalPrice != null ? `Vendue ${nf(a.finalPrice)}` : "Vendue";
    return a.status === "cancelled" ? "Annulée" : "Invendue";
  }

  // The game sends my wins and past sales as one list of the latest 50 at most, with no way to page
  // further back (checked live): at the cap the count says "50+" and the list says why it stops.
  const MINE_CAP = 50;
  const count = (l) => (!l?.length ? "" : l.length >= MINE_CAP ? `${MINE_CAP}+` : `${l.length}`);
  const capped = $derived((tab === "won" || tab === "history") && (mine?.[tab]?.length ?? 0) >= MINE_CAP);

  // [id, label, phone label]: a phone shows the short names, the row scrolls with a fading edge
  const tabs = $derived([
    ["browse", "Toutes les ventes", "Tout"],
    ["selling", `Mes ventes ${mine ? `${mine.selling.length}/${mine.max}` : ""}`],
    ["bidding", `Mes enchères ${mine?.bidding.length || ""}`, `Enchères ${mine?.bidding.length || ""}`],
    ["won", `Remportées ${count(mine?.won)}`],
    ["history", "Historique"],
  ]);
  const shown = $derived(tab === "browse" ? list.data?.auctions : mine?.[tab]);
  // same card listed several times on this page: the tile says so, the dialog compares them
  const dupes = $derived(tab === "browse" ? countByCard(shown) : new Map());
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
    <div class="meta lead">Enchérissez sur des cartes ou vendez les vôtres contre des WikiBidous</div>
  </div>
  {#if tab === "browse"}
    <div class="coll-tools">
      <SearchBox bind:value={search} loading={search.trim() !== query || list.loading} placeholder="Rechercher une carte au marché..." />
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

<div class="tabs" role="tablist" use:scrollFade={{ axis: "x" }}>
  {#each tabs as [id, label, short]}
    <button role="tab" aria-selected={tab === id} class:on={tab === id} onclick={() => (tab = id)}><span class="lbl-long">{label}</span><span class="lbl-short">{short ?? label}</span></button>
  {/each}
</div>

{#if tab === "browse"}
  <RarityChips class="mkt-filter" value={rarity} onchange={(r) => refilter(() => (rarity = r))} />
{/if}

{#if (tab === "browse" && list.error) || (tab !== "browse" && mineError)}
  <div class="empty"><b>Marché indisponible pour le moment.</b><button class="btn" onclick={() => (tab === "browse" ? list.go() : loadMine())}>Réessayer</button></div>
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
        <div class="auc-foot">
          <span class="auc-seller" class:lead={a.currentBidderId === data.userId && a.status === "active"}>
            {a.mine ? "Votre vente" : a.currentBidderId === data.userId && a.status === "active" ? "Vous êtes en tête" : a.seller ? `Vendu par ${a.seller}` : ""}
          </span>
          {#if dupes.get(a.card.id) > 1}<span class="auc-dup" title="Cette carte est en vente {dupes.get(a.card.id)} fois sur cette page">x{dupes.get(a.card.id)}</span>{/if}
        </div>
      </div>
    {/each}
  </div>
  {#if capped}<p class="mine-cap">Le jeu ne renvoie que les {MINE_CAP} plus récentes.</p>{/if}
  {#if tab === "browse"}
    <Pager page={list.page} hasNext={list.data.hasMore} loading={list.loading} ongo={(p) => list.go(p)} />
  {/if}
{/if}

{#if selected}
  {#key selected.id}
    <AuctionModal auction={selected} balance={profile?.currency ?? null} {onwallet} onclose={closeModal} onswitch={(a) => (selected = a)} />
  {/key}
{/if}
