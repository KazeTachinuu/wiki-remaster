<script>
  // A card's sold prices over time: the trend (a moving median of the sales around each day, per
  // week over long periods), the middle half of those sales as a band, the market price dashed.
  // `full` adds every sale as a dot and the number of sales per day under the plot (the market
  // analysis). Hover or focus a day to read it. The scale follows the usual prices; a far-off
  // sale sits on the edge (priceChart).
  import { priceChart } from "../wm/market.js";
  import { nf } from "../lib/format.js";

  // onpick(group | null): a click on a day (a week) picks it, again lets it go; `picked` is the
  // picked group's key, kept marked
  let { series, avg = null, full = false, picked = null, onpick = null } = $props();
  const dshort = (t) => new Date(t).toLocaleDateString("fr", { day: "numeric", month: "short" });
  const chart = $derived(priceChart(series, { avg, label: dshort }));
  let hover = $state(null);
  const pt = $derived(hover != null ? chart?.points[hover] : null);
  const per = $derived(chart?.grouping === "week" ? "semaine du" : "");
  // what actually sold that day (that week)
  const daySales = (p) => (p.count > 1 ? `${p.count} ventes, de ${nf(p.min)} à ${nf(p.max)}` : `1 vente à ${nf(p.min)}`);
</script>

{#if chart}
  <div class="pc" class:full>
    <div class="pc-plot">
      {#each chart.yTicks as t (t.value)}<div class="pc-grid" style:top="{t.y}%"><span>{nf(t.value)}</span></div>{/each}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {#if chart.band}<path d={chart.band} fill="var(--accent)" fill-opacity="0.12" />{/if}
        <path d={chart.line} fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
      </svg>
      {#if full}
        <!-- every sale; past the scale it sits on the edge, hollow -->
        {#each chart.dots as d, i (i)}<span class="pc-dot" class:out={d.out} style:left="{d.x}%" style:top="{d.y}%"></span>{/each}
      {/if}
      {#if chart.avgY != null}<div class="pc-avg" style:top="{chart.avgY}%"><span>marché</span></div>{/if}
      <!-- one slice per day, from halfway to the day before to halfway to the next: easy to hit,
           each a focusable readout; its mark sits at the day itself (--x) -->
      {#each chart.points as p, i (p.at)}
        <button class="pc-slice" class:on={hover === i || picked === p.key} class:pickable={!!onpick} aria-pressed={onpick ? picked === p.key : undefined}
          onclick={() => onpick?.(picked === p.key ? null : { key: p.key, at: p.at, week: chart.grouping === "week", count: p.count })} class:dense={full || chart.points.length > 24} style:left="{p.x0}%" style:width="{p.x1 - p.x0}%" style:--x="{p.x - p.x0}%" style:--y="{p.y}%"
          onpointerenter={() => (hover = i)} onpointerleave={() => hover === i && (hover = null)} onfocus={() => (hover = i)} onblur={() => (hover = null)}
          aria-label="{per} {dshort(p.at)} : tendance {nf(p.trend)} points ; {daySales(p)}"></button>
      {/each}
      {#if pt}
        <div class="pc-tip" class:flip={pt.x > 70} class:flop={pt.x < 30} style:left="{pt.x}%" style:top="{pt.y}%">
          <b><span class="auc-coin"></span>{nf(pt.trend)}<small>tendance</small></b>
          <span>{per} {dshort(pt.at)}</span>
          <span>{daySales(pt)}</span>
        </div>
      {/if}
    </div>
    {#if full}
      <div class="pc-vol" aria-hidden="true">
        {#each chart.points as p, i (p.at)}<span class:on={hover === i || picked === p.key} style:left="{p.x}%" style:height="{(p.count / chart.maxCount) * 100}%" style:width="{chart.barW}%"></span>{/each}
      </div>
    {/if}
    <div class="pc-x">{#each chart.xTicks as t, i (i)}<span style:left="{t.x}%">{t.label}</span>{/each}</div>
  </div>
{/if}
