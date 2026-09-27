<script>
  import Card from "./Card.svelte";
  import { data, RNAME, marketValueFor } from "./data.js";
  import { settings } from "./settings.svelte.js";
  let { item, onclose, onaction, readonly = false, wishlisted = false, onwishlist = null, extra = null } = $props();
  const c = $derived(item.card);

  let tab = $state("details");
  let summary = $state(item.card.summary || "");
  let sumState = $state(item.card.summary ? "done" : "loading");
  let market = $state(null);
  let marketState = $state("idle");
  let mval = $state(null); // estimated market value, shown inline in Détails

  let confirmDiscard = $state(false);
  let busy = $state(false);
  let done = $state(false);
  let msg = $state("");
  let msgOk = $state(false);
  let modalEl;

  async function loadSummary() {
    if (c.summary) return;
    try {
      const r = await fetch("https://fr.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(c.title), { headers: { Accept: "application/json" } });
      if (r.ok) summary = (await r.json()).extract || "";
    } catch {}
    sumState = summary ? "done" : "none";
  }
  loadSummary();
  marketValueFor(c).then((v) => (mval = v)).catch(() => {});

  async function loadMarket() {
    if (marketState !== "idle") return;
    marketState = "loading";
    try { market = await data.marketStats(c); marketState = market ? "done" : "error"; }
    catch { marketState = "error"; }
  }
  $effect(() => { if (tab === "market") loadMarket(); });

  // Listing a card for auction is not a verified endpoint, so we send the user to the
  // native marketplace flow instead of POSTing a guess.
  function sellNative() { try { localStorage.setItem("wm-off", "1"); } catch {} location.assign("/collection"); }
  async function discard() {
    busy = true; msg = "";
    try {
      await data.discard(item.id);
      onaction?.();
      done = true; msgOk = true; msg = "Carte défaussée. +1 point.";
    } catch { flash("La défausse a échoué."); busy = false; }
  }
  function flash(m) { msg = m; msgOk = false; }

  function onKey(e) {
    if (e.key === "Escape") { onclose?.(); return; }
    if (e.key === "Tab" && modalEl) {
      const f = [...modalEl.querySelectorAll('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])')].filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  const nf = (n) => (n == null ? "-" : n.toLocaleString("fr"));
  const fmtDate = (s) => {
    const d = new Date(s);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString("fr", { day: "numeric", month: "long", year: "numeric" });
  };
  const obtainedLabel = $derived(item.obtained_at ? fmtDate(item.obtained_at) : "");

  // Sold-price history: Y = sale price, X = time (oldest to most recent). Only shown
  // when there are at least two real sales.
  const dshort = (t) => { if (!t) return ""; try { return new Date(t).toLocaleDateString("fr", { day: "numeric", month: "short" }); } catch { return ""; } };
  let chart = $derived.by(() => {
    const s = market?.soldSeries;
    if (!s || s.length < 2) return null;
    const prices = s.map((p) => p.price);
    const min = Math.min(...prices), max = Math.max(...prices), span = max - min || 1;
    const W = 100, H = 40, pad = 3;
    const pts = s.map((p, i) => [
      pad + (i / (s.length - 1)) * (W - 2 * pad),
      pad + (1 - (p.price - min) / span) * (H - 2 * pad),
    ]);
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    return {
      d,
      area: d + ` L${pts[pts.length-1][0].toFixed(1)} ${H} L${pts[0][0].toFixed(1)} ${H} Z`,
      min, max, first: dshort(s[0].t), last: dshort(s[s.length-1].t),
    };
  });

  // Lock background scroll while the modal is open.
  $effect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { html.style.overflow = prev; };
  });

  // Move focus into the dialog on open, restore it to the trigger on close.
  // The trigger card can be detached by a grid reload (discard/auction), so guard on isConnected.
  $effect(() => {
    const trigger = document.activeElement;
    modalEl?.focus();
    return () => { if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus(); };
  });

  // Auto-close shortly after a successful auction, with the timer owned by the effect
  // so it is cleared if the modal unmounts first.
  $effect(() => {
    if (!done) return;
    const t = setTimeout(() => onclose?.(), 1000);
    return () => clearTimeout(t);
  });
</script>

<svelte:window onkeydown={onKey} />

<div class="modal-backdrop" onclick={() => onclose?.()} role="presentation">
  <!-- svelte-ignore a11y_click_events_have_key_events -- Escape closes and focus is trapped; this click only stops backdrop close -->
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="wm-modal-title" tabindex="-1" bind:this={modalEl} onclick={(e) => e.stopPropagation()}>
    <button class="modal-close" onclick={() => onclose?.()} aria-label="Fermer"><svg class="x-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>

    <div class="modal-card"><Card card={c} big caption={false} count={item.count} shiny={item.is_shiny} starred={item.starred} /></div>

    <div class="modal-info">
      <span class="modal-rar" data-r={c.rarity}>{RNAME[c.rarity] || c.rarity}</span>
      <h2 class="modal-name" id="wm-modal-title">{c.title}</h2>
      {#if c.category}<div class="modal-cat">{c.category}</div>{/if}

      <div class="modal-tabs" role="tablist" aria-label="Détails de la carte">
        <button role="tab" id="wm-tab-details" aria-selected={tab === "details"} aria-controls="wm-panel-details" class:on={tab === "details"} onclick={() => (tab = "details")}>Détails</button>
        <button role="tab" id="wm-tab-market" aria-selected={tab === "market"} aria-controls="wm-panel-market" class:on={tab === "market"} onclick={() => (tab = "market")}>Marché</button>
      </div>

      {#if tab === "details"}
        <div id="wm-panel-details" role="tabpanel" aria-labelledby="wm-tab-details" class="modal-panel">
          {#if sumState === "loading"}
            <p class="modal-sum muted">Chargement du résumé...</p>
          {:else if summary}
            <p class="modal-sum">{summary}</p>
          {/if}

          <div class="facts">
            {#if mval != null}<div class="fact"><div class="fk">Valeur estimée</div><div class="fv val">{nf(mval)} pts</div></div>{/if}
            {#if !readonly}<div class="fact"><div class="fk">Exemplaires</div><div class="fv">{item.count}{#if item.is_shiny} · brillante{/if}</div></div>{/if}
            {#if c.pageviews != null}<div class="fact"><div class="fk" title="Vues de l'article Wikipédia sur 30 jours">Popularité (30 j)</div><div class="fv">{nf(c.pageviews)}</div></div>{/if}
            {#if !settings.hideStats}
              <div class="fact"><div class="fk">Attaque</div><div class="fv atk">{nf(c.atk)}</div></div>
              <div class="fact"><div class="fk">Défense</div><div class="fv def">{nf(c.def)}</div></div>
            {/if}
          </div>
          {#if obtainedLabel}<div class="modal-obtained">Obtenue le {obtainedLabel}</div>{/if}

          {#if c.wikipedia_url}
            <a class="modal-wiki" href={c.wikipedia_url} target="_blank" rel="noopener noreferrer">Voir l'article Wikipédia</a>
          {/if}

          {#if onwishlist}
            <button class="btn wish-btn" class:on={wishlisted} onclick={onwishlist}>
              <svg viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 20.5S3.5 14.7 3.5 9.2A4.2 4.2 0 0 1 12 6.5a4.2 4.2 0 0 1 8.5 2.7c0 5.5-8.5 11.3-8.5 11.3z"/></svg>
              {wishlisted ? "Dans la liste de souhaits" : "Ajouter à la liste de souhaits"}
            </button>
          {/if}
          {#if extra}{@render extra()}{/if}

          {#if data.canAct && !readonly && !done}
            {#if confirmDiscard}
              <div class="confirm">
                <div class="confirm-text">Défausser cette carte contre <b>1 point</b> ?</div>
                <div class="af-actions">
                  <button class="btn" disabled={busy} onclick={() => (confirmDiscard = false)}>Annuler</button>
                  <button class="btn danger" disabled={busy} onclick={discard}>Défausser</button>
                </div>
              </div>
            {:else}
              <div class="actions">
                <button class="btn primary" onclick={sellNative}>Mettre en vente sur le site</button>
                <button class="btn danger" onclick={() => (confirmDiscard = true)}>Défausser, +1 pt</button>
              </div>
            {/if}
          {/if}

          <div class="modal-credit">Texte de l'article sous licence CC BY-SA 4.0</div>
        </div>
      {:else}
        <div id="wm-panel-market" role="tabpanel" aria-labelledby="wm-tab-market" class="modal-panel">
          {#if marketState === "loading"}
            <p class="modal-sum muted">Analyse du marché...</p>
          {:else if marketState === "error"}
            <p class="modal-sum muted">Marché indisponible pour le moment.</p>
          {:else if market}
            {#if chart}
              <div class="market-chart">
                <div class="mc-head">Prix de vente dans le temps</div>
                <div class="mc-plot">
                  <div class="mc-y"><span>{nf(chart.max)}</span><span>{nf(chart.min)}</span></div>
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-label="Prix de vente dans le temps">
                    <path d={chart.area} fill="var(--accent)" fill-opacity="0.12" />
                    <path d={chart.d} fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                  </svg>
                </div>
                <div class="mc-x"><span>{chart.first}</span><span>{chart.last}</span></div>
              </div>
            {/if}
            {#if market.soldCount}
              <div class="market-grid">
                <div class="mstat"><div class="l">Prix moyen</div><div class="v">{nf(market.soldAvg)}</div></div>
                <div class="mstat"><div class="l">Min</div><div class="v">{nf(market.soldMin)}</div></div>
                <div class="mstat"><div class="l">Max</div><div class="v">{nf(market.soldMax)}</div></div>
                <div class="mstat"><div class="l">Ventes</div><div class="v">{market.soldCount}</div></div>
              </div>
            {:else}
              <p class="modal-sum muted">Aucune vente enregistrée pour cette carte.</p>
            {/if}
            {#if market.activeCount}
              <div class="market-active">{market.activeCount} en vente, dès <b>{nf(market.lowestAsk)}</b></div>
            {/if}
            {#if market.soldCount || market.activeCount}
              <div class="rarity-note">Estimation d'après les annonces publiques du marché.</div>
            {/if}
          {/if}
        </div>
      {/if}

      {#if msg}<div class="modal-msg" class:ok={msgOk}>{msg}</div>{/if}
    </div>
  </div>
</div>
