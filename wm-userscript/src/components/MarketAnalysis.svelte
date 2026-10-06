<script>
  // A card's market in full (Pro): the sale history over a chosen period, its key figures, the
  // chart with every sale and the volume, the sales beside it (a day picked on the chart narrows
  // them to that day), and what is for sale now. Opens over the card's window, the whole screen;
  // back (or Escape) returns to the card.
  import Icon from "./Icon.svelte";
  import PriceChart from "./PriceChart.svelte";
  import ListingCompare from "./ListingCompare.svelte";
  import { PERIODS, inPeriod, saleStats, priceChart, groupStart } from "../wm/market.js";
  import { RNAME } from "../wm/index.js";
  import { nf } from "../lib/format.js";

  // rm: the card's market at its rarity (rarityMarket); listings: its live copies, or null
  let { card, rm, listings, now, onclose, onpick } = $props();

  // the shortest period that holds every sale is the same as "Tout": offer only those that narrow
  const all = $derived(rm.series);
  const periods = $derived(PERIODS.map(([id, label, days]) => ({ id, label, days, n: inPeriod(all, days, now).length }))
    .filter((p, i, list) => p.days == null || (p.n > 1 && p.n < all.length && p.n !== list[i - 1]?.n)));
  let period = $state("all");
  const days = $derived(periods.find((p) => p.id === period)?.days ?? null);
  const series = $derived(inPeriod(all, days, now));
  const st = $derived(saleStats(series));
  // sales the chart pins to its edge (far above or below the usual prices)
  const outside = $derived(priceChart(series, { avg: rm.avg })?.dots.filter((d) => d.out).length ?? 0);

  const SORTS = [["recent", "Récentes"], ["high", "Plus chères"], ["low", "Moins chères"]];
  let sort = $state("recent");
  // a day (a week) picked on the chart narrows the list to its sales; a new period lets it go
  let day = $state(null);
  $effect(() => { void period; day = null; });
  const listed = $derived(day ? series.filter((s) => groupStart(s.at, day.week) === day.key) : series);
  const rows = $derived([...listed].sort(sort === "high" ? (a, b) => b.price - a.price : sort === "low" ? (a, b) => a.price - b.price : (a, b) => b.at - a.at));
  const dday = (g) => (g.week ? "semaine du " : "") + new Date(g.key).toLocaleDateString("fr", { day: "numeric", month: "short" });
  const vsMedian = (p) => (st.median ? Math.round(((p - st.median) / st.median) * 100) : null);
  const dtime = (t) => new Date(t).toLocaleString("fr", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  let root = $state();
  $effect(() => { root?.focus(); });
  const FIGURES = $derived([
    ["Ventes", nf(st.count)], ["Dernière", nf(st.last)], ["Médiane", nf(st.median)],
    ["Moyenne", nf(st.avg)], ["Min", nf(st.min)], ["Max", nf(st.max)],
  ]);
</script>

<section class="ma" role="dialog" aria-modal="true" aria-labelledby="wm-ma-title" tabindex="-1" bind:this={root}>
  <header class="tp-head ma-head">
    <button class="iconbtn ma-back" onclick={onclose} aria-label="Retour à la carte"><Icon name="prev" width={2} /></button>
    <div class="tp-title">
      <h2 id="wm-ma-title">Analyse du marché</h2>
      <span class="tp-sub"><span class="nowrap">{card.title}</span><span class="ma-rar" data-r={card.rarity}>{RNAME[card.rarity] || card.rarity}</span></span>
    </div>
  </header>

  <div class="ma-body">
    {#if periods.length > 1}
      <div class="pill-picks ma-periods" role="radiogroup" aria-label="Période">
        {#each periods as p (p.id)}
          <button role="radio" aria-checked={period === p.id} class:on={period === p.id} onclick={() => (period = p.id)}>{p.label}</button>
        {/each}
      </div>
    {/if}

    <div class="ma-figs">
      {#each FIGURES as [label, value] (label)}<div class="ma-fig"><span class="mk-h">{label}</span><b>{value}</b></div>{/each}
    </div>

    <div class="ma-main">
      <section class="ma-chart">
        <PriceChart {series} avg={rm.avg} full picked={day?.key ?? null} onpick={(g) => (day = g)} />
        <p class="ma-legend">
          <span><i class="lg-line"></i>tendance</span>
          <span><i class="lg-band"></i>la moitié des prix autour</span>
          <span><i class="lg-dot"></i>une vente</span>
          {#if rm.avg != null}<span><i class="lg-avg"></i>prix du marché {nf(rm.avg)}</span>{/if}
          {#if outside}<span><i class="lg-out"></i>hors échelle ({outside})</span>{/if}
        </p>
      </section>

      <!-- the sales, beside the chart and as tall: the list scrolls in its own panel -->
      <section class="ma-sales" aria-label="Ventes">
        <div class="ma-sales-head">
          <h3 class="mk-h">Ventes <span>{nf(listed.length)}</span></h3>
          {#if day}
            <button class="ma-day" onclick={() => (day = null)} aria-label="Revenir à toutes les ventes de la période">{dday(day)}<Icon name="close" width={2} /></button>
          {:else}
            <span class="ma-hint">un jour du graphique les filtre</span>
          {/if}
        </div>
        <div class="ma-sort" role="radiogroup" aria-label="Trier les ventes">
          {#each SORTS as [id, label] (id)}<button role="radio" aria-checked={sort === id} class:on={sort === id} onclick={() => (sort = id)}>{label}</button>{/each}
        </div>
        <ol class="ma-list">
          {#each rows as s (s.id ?? s.at)}
            {@const g = vsMedian(s.price)}
            <li>
              <span class="ma-when">{dtime(s.at)}</span>
              <span class="ma-gap" class:up={g > 0} class:down={g < 0}>{g == null || g === 0 ? "" : `${g > 0 ? "+" : ""}${g} %`}</span>
              <b><span class="auc-coin"></span>{nf(s.price)}</b>
            </li>
          {/each}
        </ol>
        {#if all.length >= 200 && !day}<p class="ma-note">Les 200 dernières ventes : tout ce que le jeu renvoie.</p>{/if}
      </section>
    </div>

    <section class="ma-live">
      <ListingCompare {listings} soldAvg={rm.avg} {now} onpick={onpick} />
    </section>
  </div>
</section>
