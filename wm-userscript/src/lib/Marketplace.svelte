<script>
  import Card from "./Card.svelte";
  import AuctionModal from "./AuctionModal.svelte";
  import { data, RNAME } from "../wm/index.js";
  let { profile, onwallet } = $props();

  const nf = (n) => (n == null ? "-" : Number(n).toLocaleString("fr"));
  const RARITIES = ["L", "UR", "SR", "R", "PC", "C"];

  let auctions = $state(null);
  let page = $state(0);
  let hasMore = $state(false);
  let search = $state("");
  let qActive = $state("");
  let rarity = $state(""); // verified server filter: rarity=<tier>
  let loading = $state(false);
  let error = $state("");
  let selected = $state(null);
  let mine = $state({ sellingCount: 0, maxConcurrentAuctions: 5 });

  data.marketplaceMine?.().then((m) => (mine = m)).catch(() => {});

  function openBid(a) { selected = a; }

  let reqToken = 0;
  async function load() {
    const my = ++reqToken;
    loading = true; error = "";
    try {
      const d = await data.marketplace({ page, q: qActive, rarity });
      if (my !== reqToken) return;
      auctions = d.auctions; hasMore = d.hasMore;
    } catch (e) {
      if (my !== reqToken) return;
      error = "Marché indisponible pour le moment."; auctions = [];
    } finally { if (my === reqToken) loading = false; }
  }
  load();

  let deb;
  $effect(() => {
    const s = search.trim();
    clearTimeout(deb);
    deb = setTimeout(() => { if (s !== qActive) { qActive = s; page = 0; load(); } }, 350);
    return () => clearTimeout(deb);
  });

  // A single shared clock drives every countdown, instead of one timer per card.
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 30000); return () => clearInterval(t); });
  function timeLeft(endAt) {
    const end = Date.parse(endAt || "");
    if (isNaN(end)) return "";
    let s = Math.max(0, Math.round((end - now) / 1000));
    if (s <= 0) return "Terminée";
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60);
    if (d) return `${d} j ${h} h`;
    if (h) return `${h} h ${String(m).padStart(2, "0")}`;
    return `${m} min`;
  }

  function go(delta) { page = Math.max(0, page + delta); load(); }
  function setRarity(r) { rarity = rarity === r ? "" : r; page = 0; load(); }

  // Bidding / listing writes are UNVERIFIED, so they are never POSTed from here, they go
  // to the real site (the overlay steps aside; the "WikiMasters +" pill brings it back).
  function toNative() { try { localStorage.setItem("wm-off", "1"); } catch {} location.assign("/marketplace"); }
</script>

<div class="coll-head">
  <div>
    <h1>Marché</h1>
    <div class="meta">Enchérissez sur des cartes ou vendez les vôtres contre des WikiBidous</div>
  </div>
  <div class="coll-tools">
    <div class="search-wrap">
      <svg class="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.4-3.4"/></svg>
      <input class="search" type="search" placeholder="Rechercher une carte au marché..." bind:value={search} />
      {#if search}<button class="search-clear" onclick={() => (search = "")} aria-label="Effacer la recherche"><svg class="x-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>{/if}
    </div>
    <div class="tool-actions">
      <span class="chip" title="Vos ventes en cours">
        <svg class="cico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 9 6 5h12l1.5 4M5.5 9v10h13V9"/></svg>
        Ventes <b>{mine.sellingCount}</b>/{mine.maxConcurrentAuctions}
      </span>
      <button class="iconbtn" onclick={toNative} title="Vendre ou enchérir se fait sur le site officiel">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/></svg>
        <span>Vendre / enchérir</span>
      </button>
    </div>
  </div>
</div>

<div class="rarity-legend mkt-filter">
  <button class="rl" class:on={rarity === ""} onclick={() => setRarity("")}><span class="rl-name">Toutes</span></button>
  {#each RARITIES as r}
    <button class="rl" class:on={rarity === r} onclick={() => setRarity(r)}>
      <span class="rl-dot" style="background:var(--r-{r.toLowerCase()})"></span>
      <span class="rl-name">{RNAME[r]}</span>
    </button>
  {/each}
</div>

{#if error}
  <div class="empty"><b>{error}</b><button class="btn" onclick={load}>Réessayer</button></div>
{:else if !auctions}
  <div class="grid">{#each Array(10) as _}<div class="wc skeleton"></div>{/each}</div>
{:else if auctions.length === 0}
  <div class="empty"><b>Aucune enchère en cours</b><div>{qActive ? "Essayez un autre terme." : "Revenez plus tard."}</div></div>
{:else}
  <div class="grid" class:dim={loading}>
    {#each auctions as a (a.id)}
      <div class="auc-item">
        <button class="card-btn" onclick={() => openBid(a)} aria-label={a.card.title}>
          <Card card={a.card} shiny={a.is_shiny} />
        </button>
        <div class="auc-meta">
          <span class="auc-bid" title={a.bid != null ? "Enchère actuelle" : "Mise de départ"}>
            <span class="auc-coin"></span>{nf(a.price)}
          </span>
          <span class="auc-end">{timeLeft(a.endAt)}</span>
        </div>
        {#if a.seller}<div class="auc-seller">Vendu par {a.seller}</div>{/if}
      </div>
    {/each}
  </div>

  <div class="pager">
    <button class="btn pager-btn" disabled={page === 0 || loading} onclick={() => go(-1)}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      Précédent
    </button>
    <span class="pager-info">Page {page + 1}</span>
    <button class="btn pager-btn" disabled={!hasMore || loading} onclick={() => go(1)}>
      Suivant
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </button>
  </div>
{/if}

{#if selected}
  <AuctionModal auction={selected} balance={profile?.currency ?? null} onwallet={onwallet} onclose={() => (selected = null)} />
{/if}
