<script>
  import Card from "./Card.svelte";
  import { data, RNAME } from "../wm/index.js";
  let { auction, balance = null, onclose, onwallet } = $props();

  const nf = (n) => (n == null ? "-" : Number(n).toLocaleString("fr"));

  let a = $state(auction);
  let bids = $state(auction.bids || []);
  let iBid = $state(false); // have I bid on this auction this session

  async function refresh() {
    try {
      const fresh = await data.auction(auction.id);
      a = fresh; bids = fresh.bids || [];
      const min = (fresh.price ?? fresh.base ?? 0) + 1;
      if (Number(amount) < min) amount = String(min);
    } catch {}
  }
  refresh();
  // Live: poll the auction while open (no websocket exists for auctions on the site).
  $effect(() => { const t = setInterval(refresh, 4000); return () => clearInterval(t); });

  // Live 1-second clock for the countdown.
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 1000); return () => clearInterval(t); });
  let secsLeft = $derived(Math.max(0, Math.round((Date.parse(a.endAt || "") - now) / 1000)));
  let ended = $derived(!a.endAt ? false : secsLeft <= 0);
  let urgency = $derived(ended ? "end" : secsLeft < 60 ? "crit" : secsLeft < 300 ? "warn" : "ok");
  function fmtLeft(s) {
    if (s <= 0) return "Terminée";
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
    if (d) return `${d} j ${h} h`;
    if (h) return `${h} h ${String(m).padStart(2, "0")} m`;
    if (m) return `${m} m ${String(ss).padStart(2, "0")} s`;
    return `${ss} s`;
  }
  const relTime = (t) => {
    const d = Date.parse(t || ""); if (isNaN(d)) return "";
    const m = Math.round((now - d) / 60000);
    if (m < 1) return "à l'instant";
    if (m < 60) return `${m} min`;
    const h = Math.round(m / 60); if (h < 24) return `${h} h`;
    return `${Math.round(h / 24)} j`;
  };

  let price = $derived(a.price ?? a.bid ?? a.base ?? 0);
  let minBid = $derived(price + 1);
  let leading = $derived(!!(a.currentBidderId && data.userId && a.currentBidderId === data.userId));
  let outbid = $derived(iBid && !leading);

  let amount = $state(String((auction.price ?? auction.base ?? 0) + 1));
  let busy = $state(false), msg = $state(""), msgOk = $state(false);
  let bal = $state(balance);
  $effect(() => { bal = balance; });
  let tooPoor = $derived(bal != null && Number(amount) > bal);

  function setAmount(v) { amount = String(Math.max(1, Math.round(v))); }
  async function bid() {
    const v = Number(amount);
    if (!(v >= 1)) { msg = "Montant invalide."; msgOk = false; return; }
    busy = true; msg = "";
    try {
      const d = await data.placeBid(a.id, v);
      iBid = true; msgOk = true; msg = `Enchère placée à ${nf(d.current_bid)} pts.`;
      if (d.bidder_balance != null) bal = d.bidder_balance;
      onwallet?.();
      await refresh();
    } catch (e) {
      msgOk = false; msg = e?.message || "Enchère refusée.";
      if (e?.min) amount = String(e.min);
    } finally { busy = false; }
  }

  // Bid-history chart: amount over time (base -> each bid).
  let chart = $derived.by(() => {
    const rows = [...bids].filter((b) => b.at).sort((x, y) => Date.parse(x.at) - Date.parse(y.at));
    const series = [];
    const startT = Date.parse(a.createdAt || rows[0]?.at || "") || (rows[0] ? Date.parse(rows[0].at) : 0);
    if (a.base != null && startT) series.push({ t: startT, v: a.base });
    for (const b of rows) series.push({ t: Date.parse(b.at), v: b.amount });
    if (series.length < 2) return null;
    const vs = series.map((p) => p.v), min = Math.min(...vs), max = Math.max(...vs), span = max - min || 1;
    const ts = series.map((p) => p.t), t0 = ts[0], t1 = ts[ts.length - 1] || t0 + 1, tspan = t1 - t0 || 1;
    const W = 100, H = 44, pad = 3;
    const P = series.map((p) => [pad + ((p.t - t0) / tspan) * (W - 2 * pad), pad + (1 - (p.v - min) / span) * (H - 2 * pad)]);
    const d = P.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    return { d, area: d + ` L${P[P.length - 1][0].toFixed(1)} ${H} L${P[0][0].toFixed(1)} ${H} Z`, min, max };
  });

  let modalEl;
  function onKey(e) { if (e.key === "Escape") onclose?.(); }
  $effect(() => { const html = document.documentElement; const prev = html.style.overflow; html.style.overflow = "hidden"; return () => { html.style.overflow = prev; }; });
</script>

<svelte:window onkeydown={onKey} />

<div class="modal-backdrop" onclick={() => onclose?.()} role="presentation">
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="auc2" role="dialog" aria-modal="true" tabindex="-1" bind:this={modalEl} onclick={(e) => e.stopPropagation()}>
    <button class="modal-close" onclick={() => onclose?.()} aria-label="Fermer"><svg class="x-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>

    <div class="auc2-grid">
      <!-- main -->
      <div class="auc2-main">
        <div class="auc2-head">
          <div class="auc2-thumb"><Card card={a.card} shiny={a.is_shiny} caption={false} /></div>
          <div class="auc2-id">
            <span class="modal-rar" data-r={a.card.rarity}>{RNAME[a.card.rarity] || a.card.rarity}</span>
            <h2 class="auc2-name">{a.card.title}</h2>
            {#if a.card.category}<div class="auc2-cat">{a.card.category}</div>{/if}
            {#if a.seller}<div class="auc2-seller">Vendu par {a.seller}</div>{/if}
          </div>
        </div>

        <div class="auc2-stats">
          <div class="auc2-price">
            <div class="auc2-price-lbl">{a.bid != null ? "Enchère actuelle" : "Mise de départ"}</div>
            <div class="auc2-price-val"><span class="auc2-coin"></span>{nf(price)}</div>
          </div>
          <div class="auc2-clock" data-u={urgency}>
            <div class="auc2-clock-lbl">{ended ? "Vente" : "Temps restant"}</div>
            <div class="auc2-clock-val">{fmtLeft(secsLeft)}</div>
          </div>
        </div>

        {#if chart}
          <div class="auc2-chart">
            <div class="mc-y"><span>{nf(chart.max)}</span><span>{nf(chart.min)}</span></div>
            <svg viewBox="0 0 100 44" preserveAspectRatio="none" aria-label="Historique des enchères">
              <path d={chart.area} fill="var(--accent)" fill-opacity="0.12" />
              <path d={chart.d} fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
            </svg>
          </div>
        {/if}

        <div class="auc2-feed">
          <div class="auc2-feed-head">Activité</div>
          {#if bids.length === 0}
            <div class="auc2-feed-empty">Aucune enchère pour l'instant. Soyez le premier.</div>
          {:else}
            {#each bids.slice(0, 6) as b (b.id)}
              <div class="auc2-feed-row" class:me={b.bidder === "Toi" || (b.bidderId && b.bidderId === data.userId)}>
                <span class="auc2-feed-who">{b.bidder || "Anonyme"}</span>
                <span class="auc2-feed-amt">{nf(b.amount)} pts</span>
                <span class="auc2-feed-time">{relTime(b.at)}</span>
              </div>
            {/each}
          {/if}
        </div>
      </div>

      <!-- side: bid panel -->
      <div class="auc2-side">
        {#if leading}
          <div class="auc2-status lead">Vous êtes en tête</div>
        {:else if outbid}
          <div class="auc2-status out">Enchère dépassée</div>
        {/if}

        {#if ended}
          <div class="auc2-ended">Enchère terminée.</div>
        {:else if a.owned}
          <div class="auc2-note">C'est votre annonce.</div>
        {:else}
          <div class="auc2-box">
            <div class="auc2-box-lbl">Votre enchère <span>min {nf(minBid)} pts</span></div>
            <div class="af-input-row">
              <input class="af-input" type="number" min={minBid} step="1" bind:value={amount} />
              <span class="af-unit">pts</span>
            </div>
            <div class="auc2-quick">
              <button onclick={() => setAmount(minBid)}>Min</button>
              <button onclick={() => setAmount(Number(amount) + 5)}>+5</button>
              <button onclick={() => setAmount(Number(amount) + 25)}>+25</button>
              <button onclick={() => setAmount(Number(amount) + 100)}>+100</button>
            </div>
            <button class="btn primary auc2-cta" disabled={busy || tooPoor} onclick={bid}>
              {busy ? "Enchère..." : `Miser ${nf(Number(amount) || 0)} pts`}
            </button>
            {#if bal != null}<div class="auc2-bal" class:low={tooPoor}>Solde : {nf(bal)} WikiBidous</div>{/if}
          </div>
        {/if}
        {#if msg}<div class="modal-msg" class:ok={msgOk}>{msg}</div>{/if}
        <div class="auc2-live"><span class="auc2-dot"></span>Mise à jour en direct</div>
      </div>
    </div>
  </div>
</div>
