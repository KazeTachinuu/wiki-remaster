<script>
  import { sounded } from "./sfx.js";
  import Card from "./Card.svelte";
  import { anchorCentered } from "./anchor.js";
  import Icon from "./Icon.svelte";
  import { data, RNAME, marketValueFor } from "../wm/index.js";
  import ListingCompare from "./ListingCompare.svelte";
  import { nf, ago, countdown, secondsUntil } from "./format.js";

  let { auction, balance = null, onclose, onwallet, onswitch } = $props();

  // writable deriveds: start from the props, take local updates, reset if a prop changes
  let a = $derived(auction);
  let bids = $derived(auction.bids || []);
  let iBid = $state(false);
  let bal = $derived(balance);
  let busy = $state(false);
  let msg = $state("");
  let msgOk = $state(false);
  let confirmCancel = $state(false);

  // The server has no push channel for auctions: poll while it is live.
  async function refresh() {
    try {
      const fresh = await data.auction(auction.id);
      a = fresh;
      bids = fresh.bids;
      if (Number(amount) < minBid) amount = String(minBid);
    } catch {}
  }
  refresh();
  $effect(() => {
    if (phase !== "live") return;
    const t = setInterval(() => document.visibilityState === "visible" && refresh(), 4000);
    return () => clearInterval(t);
  });

  // Every live listing of this card, side by side (null while loading, [] on failure).
  let others = $state(null);
  let soldAvg = $state(null);
  $effect(() => {
    const card = auction.card;
    let live = true; // a late answer for a card no longer shown is dropped
    data.sameCard(card).then((l) => live && (others = l), () => live && (others = []));
    marketValueFor(card).then((v) => live && (soldAvg = v));
    return () => (live = false);
  });

  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 1000); return () => clearInterval(t); });

  const secsLeft = $derived(secondsUntil(a.endAt, now) ?? 0);
  // live -> closing (time is up, not settled yet) -> sold | unsold | cancelled
  const phase = $derived(a.status !== "active" ? a.status : secsLeft > 0 ? "live" : "closing");
  const urgency = $derived(secsLeft < 60 ? "crit" : secsLeft < 300 ? "warn" : "ok");
  // Verified: the first bid may equal the base; later bids must beat the current one.
  const minBid = $derived(a.bid != null ? a.bid + 1 : a.base ?? 1);
  const leading = $derived(!!a.currentBidderId && a.currentBidderId === data.userId);
  // the list we were opened from may know it is mine before the user id is captured
  const mine = $derived(a.mine || !!auction.mine);
  // Verified: repricing opens at half the duration, downwards only, and not once bid on.
  const repriceAt = $derived((Date.parse(a.createdAt) + Date.parse(a.endAt)) / 2);
  const canReprice = $derived(mine && phase === "live" && a.bid == null && now >= repriceAt);
  const bidders = $derived(new Set(bids.map((b) => b.bidder)).size);

  let amount = $derived(String(auction.bid != null ? auction.bid + 1 : auction.base ?? 1));
  let newBase = $state("");
  const tooPoor = $derived(bal != null && Number(amount) > bal);

  async function run(action, ok) {
    busy = true;
    msg = "";
    try {
      const d = await action();
      msgOk = true;
      msg = ok(d);
      onwallet?.();
      await refresh();
    } catch (e) {
      msgOk = false;
      msg = e.message;
      if (e.min) amount = String(e.min);
    }
    busy = false;
    confirmCancel = false;
  }
  const bid = () => run(() => sounded(() => data.placeBid(a.id, Number(amount))), (d) => {
    iBid = true;
    bal = d.bidder_balance ?? bal;
    return `Enchère placée à ${nf(d.current_bid)} pts.`;
  });
  const reprice = () => run(() => data.reprice(a.id, Number(newBase)), () => `Mise de départ baissée à ${nf(Number(newBase))} pts.`);
  const cancel = () => run(() => data.cancelAuction(a.id), () => "Vente annulée, la carte revient dans votre collection.");
  const settle = () => run(() => data.settle(a.id), () => "Enchère finalisée.");

  // Price ladder: the base, then every bid in order, evenly spaced (a bidding war in the
  // last minutes of a 2-day auction stays readable).
  const chart = $derived.by(() => {
    const steps = [...bids].filter((b) => b.at).sort((x, y) => Date.parse(x.at) - Date.parse(y.at)).map((b) => b.amount);
    const vs = a.base != null ? [a.base, ...steps] : steps;
    if (vs.length < 2) return null;
    const min = Math.min(...vs), max = Math.max(...vs), span = max - min || 1;
    const W = 100, H = 40, pad = 4;
    const pts = vs.map((v, i) => [pad + (i / (vs.length - 1)) * (W - 2 * pad), pad + (1 - (v - min) / span) * (H - 2 * pad)]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) d += ` H${pts[i][0]} V${pts[i][1]}`;
    return { d, area: `${d} V${H} H${pts[0][0]} Z`, dots: pts.slice(1), min, max };
  });

  const dateLabel = (iso) => (iso ? new Date(iso).toLocaleString("fr", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "");

  $effect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { html.style.overflow = prev; };
  });
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && onclose?.()} />

<div class="modal-backdrop" onclick={(e) => e.target === e.currentTarget && onclose?.()} role="presentation">
  <div class="auc" role="dialog" aria-modal="true" aria-labelledby="wm-auc-title" tabindex="-1" use:anchorCentered>
    <button class="modal-close" onclick={() => onclose?.()} aria-label="Fermer"><Icon name="close" width={2} class="x-ico" /></button>

    <div class="auc-top">
      <div class="auc-card"><Card card={a.card} shiny={a.is_shiny} big caption={false} /></div>

      <div class="auc-body">
        <div class="auc-id">
          <span class="modal-rar" data-r={a.card.rarity}>{RNAME[a.card.rarity] || a.card.rarity}{a.is_shiny ? " · brillante" : ""}</span>
          <h2 class="auc-name" id="wm-auc-title">{a.card.title}</h2>
          {#if a.card.category}<div class="auc-cat">{a.card.category}</div>{/if}
          <div class="auc-by">{mine ? "Votre vente" : a.seller ? `Vendu par ${a.seller}` : ""}</div>
        </div>

        <div class="auc-state" data-phase={phase}>
          {#if phase === "sold"}
            <div class="auc-k">Vendue{a.winner ? ` à ${a.winner}` : ""}</div>
            <div class="auc-price"><span class="auc-coin"></span>{nf(a.finalPrice ?? a.price)}</div>
            <div class="auc-sub">{dateLabel(a.settledAt || a.endAt)} · {bids.length} enchère{bids.length > 1 ? "s" : ""}</div>
          {:else if phase === "unsold" || phase === "cancelled"}
            <div class="auc-k">{phase === "cancelled" ? "Vente annulée" : "Invendue"}</div>
            <div class="auc-price muted"><span class="auc-coin"></span>{nf(a.base)}</div>
            <div class="auc-sub">Mise de départ · {dateLabel(a.settledAt || a.endAt)}</div>
          {:else}
            <div class="auc-row">
              <div>
                <div class="auc-k">{a.bid != null ? "Enchère actuelle" : "Mise de départ"}</div>
                <div class="auc-price"><span class="auc-coin"></span>{nf(a.price)}</div>
              </div>
              <div class="auc-clock" data-u={phase === "closing" ? "end" : urgency}>
                <div class="auc-k">{phase === "closing" ? "Temps écoulé" : "Se termine dans"}</div>
                <div class="auc-time">{phase === "closing" ? "Terminée" : countdown(secsLeft, { seconds: true })}</div>
              </div>
            </div>
            <div class="auc-sub">
              {bids.length} enchère{bids.length > 1 ? "s" : ""}{bidders ? ` · ${bidders} enchérisseur${bidders > 1 ? "s" : ""}` : ""}
              {#if phase === "live"}<span class="auc-live"><span class="auc-dot"></span>en direct</span>{/if}
            </div>
          {/if}
        </div>

        {#if leading && phase !== "sold"}
          <div class="auc-flag lead">Vous êtes en tête</div>
        {:else if iBid && !leading && phase === "live"}
          <div class="auc-flag out">Enchère dépassée</div>
        {/if}

        <div class="auc-act">
          {#if phase === "closing"}
            {#if mine || leading}
              <button class="btn primary auc-cta" disabled={busy} onclick={settle}>Finaliser l'enchère</button>
            {:else}
              <div class="auc-note">En attente de finalisation.</div>
            {/if}
          {:else if phase === "live" && mine}
            {#if canReprice}
              <div class="auc-inline">
                <div class="af-input-row">
                  <input class="af-input" type="number" min="1" max={a.base - 1} step="1" bind:value={newBase} placeholder="Nouvelle mise de départ" />
                  <span class="af-unit">pts</span>
                </div>
                <button class="btn" disabled={busy || !(Number(newBase) >= 1 && Number(newBase) < a.base)} onclick={reprice}>Baisser</button>
              </div>
            {:else if a.bid == null}
              <div class="auc-note">Baisse du prix possible dans {countdown(Math.round((repriceAt - now) / 1000))}.</div>
            {/if}
            {#if confirmCancel}
              <div class="af-actions">
                <button class="btn" disabled={busy} onclick={() => (confirmCancel = false)}>Garder</button>
                <button class="btn danger" disabled={busy} onclick={cancel}>Confirmer l'annulation</button>
              </div>
            {:else}
              <button class="btn danger auc-cta" disabled={busy} onclick={() => (confirmCancel = true)}>Annuler la vente</button>
            {/if}
          {:else if phase === "live"}
            <div class="auc-inline">
              <div class="af-input-row">
                <input class="af-input" type="number" min={minBid} step="1" bind:value={amount} aria-label="Montant de l'enchère" />
                <span class="af-unit">pts</span>
              </div>
              <button class="btn primary" disabled={busy || tooPoor || !(Number(amount) >= minBid)} onclick={bid}>
                {busy ? "..." : "Miser"}
              </button>
            </div>
            <div class="auc-quick">
              <button onclick={() => (amount = String(minBid))}>Min {nf(minBid)}</button>
              {#each [5, 25, 100] as step}
                <button onclick={() => (amount = String(Math.max(minBid, Number(amount) + step)))}>+{step}</button>
              {/each}
            </div>
            {#if bal != null}<div class="auc-bal" class:low={tooPoor}>Solde : {nf(bal)} WikiBidous. La mise est retenue tant que vous êtes en tête.</div>{/if}
          {/if}
          {#if msg}<div class="modal-msg" class:ok={msgOk}>{msg}</div>{/if}
        </div>
      </div>
    </div>

    <ListingCompare listings={others} current={a} {soldAvg} {now} onpick={(r) => onswitch?.(r)} />

    <div class="auc-bottom">
      <section class="auc-panel">
        <h3>Évolution du prix</h3>
        {#if chart}
          <div class="auc-chart">
            <div class="mc-y"><span>{nf(chart.max)}</span><span>{nf(chart.min)}</span></div>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-label="Évolution du prix">
              <path d={chart.area} fill="var(--accent)" fill-opacity="0.1" />
              <path d={chart.d} fill="none" stroke="var(--accent)" stroke-width="1.6" vector-effect="non-scaling-stroke" />
            </svg>
            {#each chart.dots as [x, y]}<span class="auc-pt" style="left:{x}%;top:{(y / 40) * 100}%"></span>{/each}
          </div>
          <div class="auc-axis"><span>Départ {nf(a.base)}</span><span>{bids.length} enchère{bids.length > 1 ? "s" : ""}</span></div>
        {:else}
          <div class="auc-empty">Pas encore d'enchère. {phase === "live" && !mine ? "Soyez le premier." : ""}</div>
        {/if}
      </section>

      <section class="auc-panel">
        <h3>Activité</h3>
        {#if bids.length === 0}
          <div class="auc-empty">Aucune enchère.</div>
        {:else}
          <ol class="auc-feed">
            {#each bids as b, i (b.id)}
              <li class:top={i === 0} class:me={b.bidderId && b.bidderId === data.userId}>
                <span class="who">{b.bidder || "Anonyme"}</span>
                {#if i === 0}<span class="tag">{phase === "sold" ? "Gagnant" : "En tête"}</span>{/if}
                <span class="amt">{nf(b.amount)}</span>
                <span class="when">{ago(b.at, now)}</span>
              </li>
            {/each}
          </ol>
        {/if}
      </section>
    </div>
  </div>
</div>
