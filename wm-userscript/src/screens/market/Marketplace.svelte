<script>
  import RarityChips from "../../components/RarityChips.svelte";
  import { untrack } from "svelte";
  import Card from "../../components/Card.svelte";
  import AuctionModal from "./AuctionModal.svelte";
  import WatchPanel from "./WatchPanel.svelte";
  import { watches } from "../../lib/watches.svelte.js";
  import { countByCard } from "../../wm/compare.js";
  import Icon from "../../components/Icon.svelte";
  import SearchBox from "../../components/SearchBox.svelte";
  import Pager from "../../components/Pager.svelte";
  import { data } from "../../wm/index.js";
  import { gapTag, bargains, DEALS } from "../../wm/auction.js";
  import { lazyValues } from "../../lib/lazyValues.js";
  import { SvelteMap } from "svelte/reactivity";
  import { nf, countdown, secondsUntil } from "../../lib/format.js";
  import { PagedList, debouncedSearch } from "../../lib/paged.svelte.js";
  import { reuse } from "../../lib/reuse.js";
  import { scrollFade } from "../../lib/scrollFade.js";
  import { settings } from "../../lib/settings.svelte.js";

  // each sale's market price (the card's average at its rarity, cached a day), asked as its tile
  // comes into view, for the gap beside its price
  const worth = new SvelteMap(); // "card id|rarity" -> value
  const worthKey = (c) => `${c.id}|${c.rarity}`;
  const worthOf = lazyValues((_, v, card) => worth.set(worthKey(card), v));
  $effect(() => () => worthOf.destroy());

  let { profile, onwallet, openId = null } = $props();

  const SORTS = [["recent", "Plus récentes"], ["ending_soon", "Fin proche"], ["price_asc", "Prix croissant"], ["price_desc", "Prix décroissant"]];

  const prefs = settings.market;
  let tab = $state(prefs.tab);
  let search = $state("");
  let query = $state("");
  let sort = $state(prefs.sort);
  let rarity = $state(prefs.rarity);
  $effect(() => Object.assign(prefs, { tab, sort, rarity, deal }));
  let selected = $state(null);
  let watching = $state(null); // the alerts window: { prefill } (the search, when one is typed)
  // a watch's sales: the market searched as it watches
  function showWatch(w) {
    watching = null; tab = "browse";
    search = query = w.q; rarity = w.rarity;
    list.go(0);
  }

  let quiet = false; // a refresh nobody asked for: no loading bar
  const list = new PagedList((page) => data.marketplace({ page, sort, q: query, rarity, quiet }));
  list.go(0);

  debouncedSearch(() => search, (q) => { if (q !== query) { query = q; list.go(0); } });

  // --- Affaires: the bargains among every sale seen this visit ---------------------------------
  // The game cannot filter by market price, so the sales of every page read (browsing, and "Voir
  // plus de ventes" cheapest first, where bargains are) gather in a pool; each gets its market
  // price (paced, cached a day) and the filter runs over them all. Finished sales drop out.
  // Market prices are asked only while Affaires is open: browsing the other tabs reads the prices
  // of the tiles in view, nothing more.
  const pool = new SvelteMap(); // auction id -> sale
  const addToPool = (sales) => { for (const a of sales ?? []) { pool.set(a.id, a); if (tab === "deals") worthOf.load(a.card); } };
  $effect(() => { const s = list.data?.auctions; if (s) untrack(() => addToPool(s)); });
  // opening Affaires prices the sales already gathered
  $effect(() => { if (tab === "deals") untrack(() => { for (const a of pool.values()) worthOf.load(a.card); }); });
  let deal = $state(prefs.deal ?? "good");
  let dealRarity = $state("");
  let maxPrice = $state(null);
  let scan = $state({ key: null, page: 0, more: true, loading: false, error: false });
  async function scanMore() {
    if (scan.loading || !scan.more) return;
    scan.loading = true; scan.error = false;
    try {
      const d = await data.marketplace({ page: scan.page, sort: "price_asc", rarity: dealRarity });
      addToPool(d.auctions);
      scan.page++; scan.more = d.hasMore;
    } catch { scan.error = true; }
    scan.loading = false;
  }
  // opening the tab, or another rarity: read its cheapest sales first
  $effect(() => { if (tab === "deals" && scan.key !== dealRarity) untrack(() => { scan = { key: dealRarity, page: 0, more: true, loading: false, error: false }; scanMore(); }); });
  const worthOfSale = (a) => worth.get(worthKey(a.card));
  // every threshold's bargains, so each chip shows its count before it is chosen
  const byDeal = $derived(Object.fromEntries(DEALS.map((d) => [d.id, bargains([...pool.values()], worthOfSale, { cap: d.cap, max: maxPrice > 0 ? maxPrice : null, rarity: dealRarity, now })])));
  const found = $derived(byDeal[deal] ?? byDeal.good);
  const live = $derived([...pool.values()].filter((a) => a.status === "active" && Date.parse(a.endAt) > now && (!dealRarity || a.card.rarity === dealRarity)));
  const pricing = $derived(live.filter((a) => !worth.has(worthKey(a.card))).length);

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
    ["deals", "Affaires", "Affaires"],
    ["selling", `Mes ventes ${mine ? `${mine.selling.length}/${mine.max}` : ""}`],
    ["bidding", `Mes enchères ${mine?.bidding.length || ""}`, `Enchères ${mine?.bidding.length || ""}`],
    ["won", `Remportées ${count(mine?.won)}`, `Gagnées ${count(mine?.won)}`],
    ["history", "Historique"],
  ]);
  const shown = $derived(tab === "browse" ? list.data?.auctions : tab === "deals" ? found : mine?.[tab]);
  // same card listed several times on this page: the tile says so, the dialog compares them
  const dupes = $derived(tab === "browse" ? countByCard(shown) : new Map());
  const EMPTY = {
    browse: "Aucune enchère ne correspond.",
    deals: "Aucune vente à ce prix parmi celles vues pour l'instant.",
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
        <button class="iconbtn watch-btn" class:on={query} onclick={() => (watching = { prefill: query ? { q: query, rarity } : null })}
          title={query ? `Être prévenu des nouvelles ventes de « ${query} »` : "Mes alertes du marché"}>
          <Icon name="bell" />{query ? "Créer une alerte" : "Alertes"}{#if !query && watches.list.length}<span class="tab-n">{watches.list.length}</span>{/if}
        </button>
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
    <button role="tab" aria-selected={tab === id} class:on={tab === id} onclick={(e) => { tab = id; e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" }); }}><span class="lbl-long">{label}</span><span class="lbl-short">{short ?? label}</span></button>
  {/each}
</div>

{#if tab === "browse"}
  <RarityChips class="mkt-filter" value={rarity} onchange={(r) => refilter(() => (rarity = r))} />
{:else if tab === "deals"}
  <div class="deal-bar">
    <div class="deal-caps" role="radiogroup" aria-label="Prix par rapport au marché">
      {#each DEALS as d (d.id)}<button role="radio" aria-checked={deal === d.id} class:on={deal === d.id} onclick={() => (deal = d.id)}>{d.label}<span class="deal-n">{byDeal[d.id].length}</span></button>{/each}
    </div>
    <label class="deal-max"><span class="auc-coin"></span><input type="number" min="1" inputmode="numeric" placeholder="Prix max" bind:value={maxPrice} aria-label="Prix maximum" /></label>
  </div>
  <RarityChips class="mkt-filter" value={dealRarity} onchange={(r) => (dealRarity = r)} />
  <div class="deal-status" role="status">
    <span><b>{found.length}</b> affaire{found.length > 1 ? "s" : ""} parmi {live.length} vente{live.length > 1 ? "s" : ""} vue{live.length > 1 ? "s" : ""}{#if pricing}{" · "}<span class="deal-pricing"><span class="spin"></span>{pricing} prix en cours</span>{/if}</span>
    {#if scan.error}<span class="modal-msg">Lecture du marché impossible.</span>{/if}
    {#if scan.more || scan.error}<button class="btn deal-more" disabled={scan.loading} onclick={scanMore}>{#if scan.loading}<span class="spin"></span>{/if}Voir plus de ventes</button>{/if}
  </div>
{/if}

{#if (tab === "browse" && list.error) || (tab !== "browse" && tab !== "deals" && mineError)}
  <div class="empty"><b>Marché indisponible pour le moment.</b><button class="btn" onclick={() => (tab === "browse" ? list.go() : loadMine())}>Réessayer</button></div>
{:else if !shown || (tab === "deals" && !live.length && scan.loading)}
  <div class="grid">{#each Array(10) as _}<div class="wc skeleton"></div>{/each}</div>
{:else if shown.length === 0}
  <div class="empty"><b>{EMPTY[tab]}</b>
    {#if tab === "deals"}
      {@const wider = DEALS.find((d) => d.id !== deal && byDeal[d.id].length)}
      {#if wider}<button class="btn" onclick={() => (deal = wider.id)}>Voir « {wider.label} » : {byDeal[wider.id].length} vente{byDeal[wider.id].length > 1 ? "s" : ""}</button>
      {:else if scan.more}<button class="btn" disabled={scan.loading} onclick={scanMore}>Voir plus de ventes</button>{/if}
    {/if}
  </div>
{:else}
  <div class="grid" class:dim={tab === "browse" && list.loading}>
    {#each shown as a (a.id)}
      {@const gap = gapTag(a.price, worth.get(worthKey(a.card)))}
      <div class="auc-item" use:worthOf.watch={a.card}>
        <button class="card-btn" onclick={() => (selected = a)} aria-label={a.card.title}>
          <Card card={a.card} shiny={a.is_shiny} />
        </button>
        <div class="auc-meta">
          <span class="auc-price-line"><span class="auc-bid" title={a.bid != null ? "Enchère actuelle" : "Mise de départ"}><span class="auc-coin"></span>{nf(a.price)}</span>
            {#if gap}<span class="auc-gap" data-z={gap.zone} title="Prix du marché : {nf(worth.get(worthKey(a.card)))} WikiBidous">{gap.text}</span>{/if}</span>
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

{#if watching}<WatchPanel prefill={watching.prefill} onclose={() => (watching = null)} onsearch={showWatch} />{/if}

{#if selected}
  {#key selected.id}
    <AuctionModal auction={selected} balance={profile?.currency ?? null} {onwallet} onclose={closeModal} onswitch={(a) => (selected = a)} />
  {/key}
{/if}
