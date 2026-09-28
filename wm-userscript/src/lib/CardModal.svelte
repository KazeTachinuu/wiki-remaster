<script>
  import Card from "./Card.svelte";
  import Icon from "./Icon.svelte";
  import { data, RNAME, marketValueFor } from "../wm/index.js";
  import { settings } from "./settings.svelte.js";
  import { nf } from "./format.js";

  // `item` is an owned copy ({ id, card, count, ... }), or { card } when `readonly`.
  let { item, onclose, onaction, readonly = false } = $props();
  const c = $derived(item.card);

  let tab = $state("details");
  let summary = $state(item.card.summary || "");
  let sumState = $state(item.card.summary ? "done" : "loading");
  let market = $state(null);
  let marketState = $state("idle");
  let mval = $state(null);

  let confirmDiscard = $state(false);
  let sellOpen = $state(false);
  let busy = $state(false);
  let done = $state(false);
  let msg = $state("");
  let msgOk = $state(false);
  let modalEl;

  // Cards from a pack or the catalog may lack the article extract: fetch it from Wikipedia.
  if (!c.summary) {
    fetch("https://fr.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(c.title))
      .then((r) => (r.ok ? r.json() : {}))
      .then((d) => (summary = d.extract || ""), () => {})
      .finally(() => (sumState = summary ? "done" : "none"));
  }
  marketValueFor(c).then((v) => (mval = v));

  $effect(() => {
    if (tab !== "market" || marketState !== "idle") return;
    marketState = "loading";
    data.marketStats(c).then((m) => { market = m; marketState = "done"; }, () => (marketState = "error"));
  });

  const DURATIONS = [1, 3, 6, 12, 24, 48, 72];
  let price = $state("");
  let durationH = $state(24);

  function openSell() {
    sellOpen = true;
    msg = "";
    if (!price && mval != null) price = String(mval);
  }

  async function act(action, okMsg) {
    busy = true;
    msg = "";
    try {
      await action();
      onaction?.();
      done = true;
      msgOk = true;
      msg = okMsg;
    } catch (e) {
      msgOk = false;
      msg = e.message;
    }
    busy = false;
  }
  const sell = () => act(() => data.createAuction(item, { price: Math.round(Number(price)), durationHours: durationH }), "Carte mise en vente.");
  const discard = () => act(() => data.discard(item.id), "Carte défaussée. +1 point.");

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

  // Sold price over time (Pro only), from at least two sales.
  const chart = $derived.by(() => {
    const s = market?.soldSeries;
    if (!s || s.length < 2) return null;
    const prices = s.map((p) => p.price);
    const min = Math.min(...prices), max = Math.max(...prices), span = max - min || 1;
    const W = 100, H = 40, pad = 3;
    const pts = s.map((p, i) => [pad + (i / (s.length - 1)) * (W - 2 * pad), pad + (1 - (p.price - min) / span) * (H - 2 * pad)]);
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    return { d, area: `${d} L${pts.at(-1)[0].toFixed(1)} ${H} L${pts[0][0].toFixed(1)} ${H} Z`, min, max, first: dshort(s[0].t), last: dshort(s.at(-1).t) };
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

<div class="modal-backdrop" onclick={() => onclose?.()} role="presentation">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="wm-modal-title" tabindex="-1" bind:this={modalEl} onclick={(e) => e.stopPropagation()}>
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
            {#if c.pageviews != null}<div class="fact"><div class="fk" title="Vues de l'article Wikipédia sur 30 jours">Popularité (30 j)</div><div class="fv">{nf(c.pageviews)}</div></div>{/if}
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
            <p class="modal-sum muted">Marché indisponible pour le moment.</p>
          {:else if market}
            {#if market.soldAvg != null}
              <div class="market-avg">
                <div class="ma-label">Prix moyen du marché</div>
                <div class="ma-value">{nf(market.soldAvg)} <span>pts</span></div>
              </div>
            {:else}
              <p class="modal-sum muted">Aucune vente enregistrée pour cette carte.</p>
            {/if}
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
            {/if}
            {#if !market.isPro}
              <div class="rarity-note">Historique détaillé des ventes réservé aux membres Pro. La moyenne reste visible.</div>
            {/if}
          {/if}
        </div>
      {/if}
      {#if msg}<div class="modal-msg" class:ok={msgOk}>{msg}</div>{/if}
    </div>
  </div>
</div>
