<script>
  import { sounded } from "../sound/sfx.js";
  import Card from "./Card.svelte";
  import { anchorCentered } from "../lib/anchor.js";
  import Icon from "./Icon.svelte";
  import ListingCompare from "./ListingCompare.svelte";
  import PriceChart from "./PriceChart.svelte";
  import MarketAnalysis from "./MarketAnalysis.svelte";
  import { rarityMarket, marketVerdict } from "../wm/market.js";
  import { compareListings } from "../wm/compare.js";
  import { data, RNAME, marketValueFor } from "../wm/index.js";
  import { tags } from "../lib/tags.svelte.js";
  import { settings } from "../lib/settings.svelte.js";
  import { nf } from "../lib/format.js";

  // `item` is an owned copy ({ id, card, count, ... }), or { card } when `readonly`.
  // onchange(row): the copy changed here (a favourite, a tag), for whoever shows it
  let { item, onclose, onaction, onchange, readonly = false } = $props();
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

  // Favourite and tags of this copy (mine, not a card from the catalogue or a friend's): changed at
  // once on screen, written to the game's database, put back if the write fails.
  const owned = $derived(!readonly && !!item.id);
  let starred = $state(!!item.starred);
  let cardTags = $state.raw(item.tags ?? []);
  let tagText = $state("");
  const changedRow = () => onchange?.({ ...item, starred, tags: cardTags });
  $effect(() => { if (owned) tags.load(); });
  async function toggleStar() {
    const was = starred;
    starred = !was;
    try { await data.setStarred(item.id, starred); changedRow(); }
    catch (e) { starred = was; msgOk = false; msg = e.message; }
  }
  async function addTag() {
    const name = tagText.trim();
    if (!name || busy) return;
    busy = true;
    try {
      const tag = await tags.named(name);
      if (!cardTags.some((t) => t.id === tag.id)) {
        await data.tagCard(item.id, tag.id);
        cardTags = [...cardTags, tag];
        changedRow();
      }
      tagText = "";
    } catch (e) { msgOk = false; msg = e.message; }
    busy = false;
  }
  async function removeTag(tag) {
    const was = cardTags;
    cardTags = cardTags.filter((t) => t.id !== tag.id);
    try { await data.untagCard(item.id, tag.id); changedRow(); }
    catch (e) { cardTags = was; msgOk = false; msg = e.message; }
  }
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

  // kind: what happened to the card ("sell" | "discard"), for whoever holds the collection; "unsure"
  // when the answer was lost on the way (the write may have gone through: ask the list again).
  // One action at a time: a second click never sends it twice; a copy already gone (sold, traded
  // or discarded elsewhere) leaves the list instead of showing an error.
  async function act(kind, action, okMsg) {
    if (busy) return;
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
      if (e.status === 404) {
        onaction?.(kind);
        done = true;
        msg = "Cette carte n'est déjà plus dans votre collection.";
      } else {
        msg = e.message;
        if (e.uncertain) onaction?.("unsure");
      }
    }
    busy = false;
  }
  const sell = () => act("sell", () => sounded(() => data.createAuction(item, { price: Math.round(Number(price)), durationHours: durationH })), "Carte mise en vente.");
  const discard = () => act("discard", () => data.discard(item.id), "Carte défaussée. +1 point.");

  function onKey(e) {
    if (e.key === "Escape") return analysis ? (analysis = false) : onclose?.();
    if (analysis) return; // the analysis has the screen and its own focus
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
  // the full market (Pro, two sales or more): over the whole window, back returns here
  let analysis = $state(false);

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
    <div class="modal-card">
      <Card card={c} big caption={false} count={item.count} shiny={item.is_shiny} starred={owned ? false : item.starred} />
      {#if owned}<button class="modal-star" class:on={starred} onclick={toggleStar} aria-pressed={starred} aria-label={starred ? "Retirer des favoris" : "Ajouter aux favoris"} title={starred ? "Retirer des favoris" : "Ajouter aux favoris"}><Icon name="star" filled={starred} width={1.8} /></button>{/if}
    </div>
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
          {#if owned}
            <div class="modal-tags">
              <span class="mk-h">Étiquettes</span>
              <div class="tag-row">
                {#each cardTags as t (t.id)}<span class="tag-chip" style:--tc={t.color}>{t.name}<button onclick={() => removeTag(t)} aria-label="Retirer l'étiquette {t.name}"><Icon name="close" width={2} /></button></span>{/each}
                <form class="tag-add" onsubmit={(e) => { e.preventDefault(); addTag(); }}>
                  <input bind:value={tagText} list="wm-tag-names" maxlength="48" placeholder={cardTags.length ? "Ajouter..." : "Ajouter une étiquette..."} aria-label="Ajouter une étiquette" />
                  <datalist id="wm-tag-names">{#each (tags.list ?? []).filter((t) => !cardTags.some((x) => x.id === t.id)) as t (t.id)}<option value={t.name}></option>{/each}</datalist>
                </form>
              </div>
            </div>
          {/if}
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
              {#if rm.count > 1}
                <section class="mk-price">
                  <div class="mk-price-head">
                    <h3 class="mk-h">Évolution des prix</h3>
                    <button class="link-btn" onclick={() => (analysis = true)}>Analyse complète<Icon name="next" width={2} /></button>
                  </div>
                  <PriceChart series={rm.series} avg={rm.avg} />
                </section>
              {/if}
            {:else}
              <p class="modal-sum muted">Aucune vente de cette carte pour le moment.</p>
            {/if}
          {/if}
          <!-- what can be bought now comes before the history -->
          {#if marketState !== "error"}<ListingCompare {listings} soldAvg={rm.avg} {now} onpick={openListing} />{/if}
          {#if market && rm.count > 1}
            <button class="mk-all" onclick={() => (analysis = true)}>
              <span>Toutes les ventes <b>{nf(rm.count)}</b></span><span class="mk-all-go">Analyse complète<Icon name="next" width={2} /></span>
            </button>
          {/if}
        </div>
      {/if}
      {#if msg}<div class="modal-msg" class:ok={msgOk}>{msg}</div>{/if}
    </div>
  </div>
</div>

{#if analysis}
  <MarketAnalysis card={c} {rm} {listings} {now} onclose={() => (analysis = false)} onpick={openListing} />
{/if}
