<script>
  import { sounded } from "../sound/sfx.js";
  import Card from "./Card.svelte";
  import { anchorCentered } from "../lib/anchor.js";
  import Icon from "./Icon.svelte";
  import ListingCompare from "./ListingCompare.svelte";
  import { rarityMarket, marketVerdict } from "../wm/market.js";
  import { compareListings } from "../wm/compare.js";
  import { data, RNAME, marketValueFor } from "../wm/index.js";
  import { settings } from "../lib/settings.svelte.js";
  import { nf } from "../lib/format.js";

  // `item` is an owned copy ({ id, card, count, ... }), or { card } when `readonly`.
  let { item, onclose, onaction, readonly = false } = $props();
  const c = $derived(item.card);

  let tab = $state("details");
  let summary = $derived(c.summary || "");
  let sumState = $derived(c.summary ? "done" : "loading");
  let market = $state(null);
  let marketState = $state("idle");
  let marketRetried = false;
  let mval = $state(null);

  let confirmDiscard = $state(false);
  let sellOpen = $state(false);
  let busy = $state(false);
  let done = $state(false);
  let msg = $state("");
  let msgOk = $state(false);
  let modalEl;

  // Cards from a pack or the catalog may lack the article extract: fetch it from Wikipedia.
  $effect(() => {
    if (c.summary) return;
    const ctl = new AbortController();
    fetch("https://fr.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(c.title), { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : {}))
      .then((d) => { summary = d.extract || ""; sumState = summary ? "done" : "none"; }, () => { if (!ctl.signal.aborted) sumState = "none"; });
    return () => ctl.abort();
  });
  $effect(() => {
    let live = true;
    marketValueFor(c).then((v) => live && (mval = v));
    return () => (live = false);
  });

  $effect(() => {
    if (tab !== "market" || marketState !== "idle") return;
    marketState = "loading";
    // a failure (often the game throttling a burst) is retried once after 3 s, then offers a retry
    data.marketStats(c).then((m) => { market = m; marketState = "done"; }, () => {
      if (marketRetried) return (marketState = "error");
      marketRetried = true;
      setTimeout(() => (marketState = "idle"), 3000);
    });
    data.sameCard(c).then((l) => (listings = l), () => (listings = []));
  });
  // the live listings of this card (null while searching), their time left kept current
  let listings = $state(null);
  let now = $state(Date.now());
  $effect(() => { if (tab !== "market") return; const t = setInterval(() => (now = Date.now()), 30e3); return () => clearInterval(t); });
  // a listing opens as its auction in the market
  function openListing(r) {
    history.pushState({}, "", `/marketplace/${r.id}`);
    onclose?.();
  }

  const DURATIONS = [1, 3, 6, 12, 24, 48, 72];
  let price = $state("");
  let durationH = $state(24);

  function openSell() {
    sellOpen = true;
    msg = "";
    if (!price && mval != null) price = String(mval);
  }

  // kind: what happened to the card ("sell" | "discard"), for whoever holds the collection
  async function act(kind, action, okMsg) {
    busy = true;
    msg = "";
    try {
      await action();
      onaction?.(kind);
      done = true;
      msgOk = true;
      msg = okMsg;
    } catch (e) {
      msgOk = false;
      msg = e.message;
    }
    busy = false;
  }
  const sell = () => act("sell", () => sounded(() => data.createAuction(item, { price: Math.round(Number(price)), durationHours: durationH })), "Carte mise en vente.");
  const discard = () => act("discard", () => data.discard(item.id), "Carte défaussée. +1 point.");

  function onKey(e) {
    if (e.key === "Escape") return onclose?.();
    if (e.key !== "Tab" || !modalEl) return;
    // Keep focus inside the dialog.
    const f = [...modalEl.querySelectorAll('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])')].filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  const obtained = $derived(item.obtained_at ? new Date(item.obtained_at).toLocaleDateString("fr", { day: "numeric", month: "long", year: "numeric" }) : "");
  const dshort = (t) => (t ? new Date(t).toLocaleDateString("fr", { day: "numeric", month: "short" }) : "");

  // The card's market: its sales at the rarity it has now. The game re-tiers cards over time and
  // keeps older sales under their old rarity, prices of a card that is no longer the same tier.
  const rm = $derived(rarityMarket(market, c.rarity));
  // the cheapest live normal copy
  const deal = $derived(listings ? compareListings(listings, now).rows.find((r) => r.cheapest && !r.is_shiny) ?? null : null);
  const v = $derived(marketVerdict(rm, deal?.price ?? null));
  const gap = (p) => (p == null ? "" : p === 0 ? "au prix du marché" : p < 0 ? `${-p} % sous le marché` : `${p} % au-dessus`);
  function sellNow() { tab = "details"; price = String(v.sellAt); openSell(); }
  let hover = $state(null); // the chart point read out (pointer or keyboard)
  const dtime = (t) => new Date(t).toLocaleString("fr", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  // Sold price over time (Pro only), from at least two sales.
  const chart = $derived.by(() => {
    const s = rm.series;
    if (!s || s.length < 2) return null;
    const prices = s.map((p) => p.price);
    const min = Math.min(...prices), max = Math.max(...prices), span = max - min || 1;
    const W = 100, H = 40, pad = 3;
    const pts = s.map((p, i) => [pad + (i / (s.length - 1)) * (W - 2 * pad), pad + (1 - (p.price - min) / span) * (H - 2 * pad)]);
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const avgY = rm.avg == null ? null : Math.min(H, Math.max(0, pad + (1 - (rm.avg - min) / span) * (H - 2 * pad)));
    return {
      d, area: `${d} L${pts.at(-1)[0].toFixed(1)} ${H} L${pts[0][0].toFixed(1)} ${H} Z`, first: dshort(s[0].at), last: dshort(s.at(-1).at),
      avgY: avgY == null ? null : (avgY / H) * 100, // in % of the plot height, like each point's y
      points: s.map((p, i) => ({ ...p, x: pts[i][0], y: (pts[i][1] / H) * 100 })),
    };
  });

  $effect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { html.style.overflow = prev; };
  });
  // Focus the dialog on open; give focus back to the trigger on close (if still in the DOM).
  $effect(() => {
    const trigger = document.activeElement;
    modalEl?.focus();
    return () => { if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus(); };
  });
  $effect(() => {
    if (!done) return;
    const t = setTimeout(() => onclose?.(), 1000);
    return () => clearTimeout(t);
  });
</script>

<svelte:window onkeydown={onKey} />

<div class="modal-backdrop" onclick={(e) => e.target === e.currentTarget && onclose?.()} role="presentation">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="wm-modal-title" tabindex="-1" bind:this={modalEl} use:anchorCentered>
    <button class="modal-close" onclick={() => onclose?.()} aria-label="Fermer"><Icon name="close" width={2} class="x-ico" /></button>
    <div class="modal-card"><Card card={c} big caption={false} count={item.count} shiny={item.is_shiny} starred={item.starred} /></div>
    <div class="modal-info">
      <span class="modal-rar" data-r={c.rarity}>{RNAME[c.rarity] || c.rarity}</span>
      <h2 class="modal-name" id="wm-modal-title">{c.title}</h2>
      {#if c.category}<div class="modal-cat">{c.category}</div>{/if}

      <div class="modal-tabs" role="tablist" aria-label="Détails de la carte">
        <button role="tab" aria-selected={tab === "details"} class:on={tab === "details"} onclick={() => (tab = "details")}>Détails</button>
        <button role="tab" aria-selected={tab === "market"} class:on={tab === "market"} onclick={() => (tab = "market")}>Marché</button>
      </div>

      {#if tab === "details"}
        <div role="tabpanel" class="modal-panel">
          {#if sumState === "loading"}
            <p class="modal-sum muted">Chargement du résumé...</p>
          {:else if summary}
            <p class="modal-sum">{summary}</p>
          {/if}
          <div class="facts">
            {#if mval != null}<div class="fact"><div class="fk">Valeur estimée</div><div class="fv val">{nf(mval)} pts</div></div>{/if}
            {#if !readonly}<div class="fact"><div class="fk">Exemplaires</div><div class="fv">{item.count}{#if item.is_shiny} · brillante{/if}</div></div>{/if}
            {#if c.pageviews != null}<div class="fact"><div class="fk" title="Vues de l'article Wikipédia sur 30 jours">Vues (30 j)</div><div class="fv">{nf(c.pageviews)}</div></div>{/if}
            {#if !settings.hideStats}
              <div class="fact"><div class="fk">Attaque</div><div class="fv atk">{nf(c.atk)}</div></div>
              <div class="fact"><div class="fk">Défense</div><div class="fv def">{nf(c.def)}</div></div>
            {/if}
          </div>
          {#if obtained}<div class="modal-obtained">Obtenue le {obtained}</div>{/if}
          {#if c.wikipedia_url}
            <a class="modal-wiki" href={c.wikipedia_url} target="_blank" rel="noopener noreferrer">Voir l'article Wikipédia</a>
          {/if}

          {#if !readonly && !done}
            {#if confirmDiscard}
              <div class="confirm">
                <div class="confirm-text">Défausser cette carte contre <b>1 point</b> ?</div>
                <div class="af-actions">
                  <button class="btn" disabled={busy} onclick={() => (confirmDiscard = false)}>Annuler</button>
                  <button class="btn danger" disabled={busy} onclick={discard}>Défausser</button>
                </div>
              </div>
            {:else if sellOpen}
              <div class="sell2">
                <div class="sell2-head">Mettre en vente</div>
                <div class="sell2-block">
                  <div class="sell2-lab">
                    <span>Prix de départ</span>
                    {#if mval != null}<button type="button" class="sell2-suggest" onclick={() => (price = String(mval))}>Estimé {nf(mval)}</button>{/if}
                  </div>
                  <div class="af-input-row">
                    <input class="af-input" type="number" min="1" step="1" inputmode="numeric" bind:value={price} placeholder="0" />
                    <span class="af-unit">pts</span>
                  </div>
                </div>
                <div class="sell2-block">
                  <div class="sell2-lab"><span>Durée de l'enchère</span></div>
                  <div class="sell2-durs">
                    {#each DURATIONS as h}
                      <button type="button" class="sell2-dur" class:on={durationH === h} onclick={() => (durationH = h)}>{h} h</button>
                    {/each}
                  </div>
                </div>
                <div class="af-actions">
                  <button class="btn" disabled={busy} onclick={() => (sellOpen = false)}>Annuler</button>
                  <button class="btn primary" disabled={busy || !(Number(price) >= 1)} onclick={sell}>{busy ? "Mise en vente..." : "Mettre en vente"}</button>
                </div>
              </div>
            {:else}
              <div class="actions">
                <button class="btn primary" onclick={openSell}>Mettre en vente</button>
                <button class="btn danger" onclick={() => (confirmDiscard = true)}>Défausser, +1 pt</button>
              </div>
            {/if}
          {/if}
          <div class="modal-credit">Texte de l'article sous licence CC BY-SA 4.0</div>
        </div>
      {:else}
        <div role="tabpanel" class="modal-panel">
          {#if marketState === "loading"}
            <p class="modal-sum muted">Analyse du marché...</p>
          {:else if marketState === "error"}
            <div class="modal-sum muted">Marché indisponible pour le moment. <button class="link-btn" onclick={() => (marketState = "idle")}>Réessayer</button></div>
          {:else if market}
            {#if rm.avg != null}
              <!-- the answers first: what it is worth, where the last sale went, the best buy now -->
              <div class="mk-kpis">
                <div class="mk-kpi">
                  <span class="mk-h">Prix du marché</span>
                  <b class="gold">{nf(rm.avg)}</b>
                  <small>{rm.count ? `${rm.count} vente${rm.count > 1 ? "s" : ""}, de ${nf(rm.min)} à ${nf(rm.max)}` : "moyenne des ventes"}</small>
                </div>
                {#if v.last != null}
                  <div class="mk-kpi">
                    <span class="mk-h">Dernière vente</span>
                    <b>{nf(v.last)}</b>
                    <small class:up={v.lastPct > 0} class:down={v.lastPct < 0}>{gap(v.lastPct)}</small>
                  </div>
                {/if}
                {#if deal}
                  <button class="mk-kpi buy" class:good={v.cheapestPct < 0} onclick={() => openListing(deal)} aria-label="Voir la vente la moins chère, {nf(deal.price)} WikiBidous">
                    <span class="mk-h">En vente dès</span>
                    <b>{nf(deal.price)}</b>
                    <small>{gap(v.cheapestPct)}<Icon name="next" width={2} /></small>
                  </button>
                {/if}
              </div>
              {#if !readonly && !done && item.count && v.sellAt}
                <div class="mk-sell">
                  <span>Pour vendre vite : <b>{nf(v.sellAt)} pts</b>{deal ? ", juste sous l'offre la moins chère" : ", le prix du marché"}</span>
                  <button class="btn primary" onclick={sellNow}>Mettre en vente</button>
                </div>
              {/if}
              {#if chart}
                {@const pt = hover != null ? chart.points[hover] : null}
                <section class="mk-price">
                  <h3 class="mk-h">Évolution des prix</h3>
                  <div class="mk-plot">
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                      <path d={chart.area} fill="var(--accent)" fill-opacity="0.12" />
                      <path d={chart.d} fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                    </svg>
                    {#if chart.avgY != null}<div class="mk-avgline" style:top="{chart.avgY}%"><span>marché</span></div>{/if}
                    <!-- one slice per sale, as wide as its share of the plot: easy to hit, each a focusable readout -->
                    {#each chart.points as p, i (p.id ?? p.at)}
                      <button class="mk-slice" class:on={hover === i} style:left="{p.x}%" style:width="{100 / chart.points.length}%" style:--y="{p.y}%"
                        onpointerenter={() => (hover = i)} onpointerleave={() => hover === i && (hover = null)} onfocus={() => (hover = i)} onblur={() => (hover = null)}
                        aria-label="{dtime(p.at)} : {nf(p.price)} points"></button>
                    {/each}
                    {#if pt}<div class="mk-tip" class:flip={pt.x > 70} class:flop={pt.x < 30} style:left="{pt.x}%" style:top="{pt.y}%"><b><span class="auc-coin"></span>{nf(pt.price)}</b>{dtime(pt.at)}</div>{/if}
                  </div>
                  <div class="mk-x"><span>{chart.first}</span><span>{chart.last}</span></div>
                </section>
              {/if}
            {:else}
              <p class="modal-sum muted">Aucune vente de cette carte pour le moment.</p>
            {/if}
          {/if}
          <!-- what can be bought now comes before the history -->
          {#if marketState !== "error"}<ListingCompare {listings} soldAvg={rm.avg} {now} onpick={openListing} />{/if}
          {#if market && rm.count}
            <details class="mk-history">
              <summary>Historique des ventes <span>{rm.recent.length}{rm.count > rm.recent.length ? ` sur ${rm.count}` : ""}</span></summary>
              <ol class="mk-list">{#each rm.recent as sale (sale.id ?? sale.at)}<li><span>{dtime(sale.at)}</span><b><span class="auc-coin"></span>{nf(sale.price)}</b></li>{/each}</ol>
            </details>
          {/if}
        </div>
      {/if}
      {#if msg}<div class="modal-msg" class:ok={msgOk}>{msg}</div>{/if}
    </div>
  </div>
</div>
