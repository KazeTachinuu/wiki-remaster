// A card's market, by rarity: a card can change rarity, and its sales keep the rarity they sold
// at, so prices only compare within one rarity (the game's own Pro market view groups them so).

/**
 * One rarity's market: the average every account sees (the summary), and from a Pro account's
 * sale list the price series (oldest first), count, min, max and the 10 latest sales.
 */
export function rarityMarket(market, rarity) {
  const sales = (market?.sales || []).filter((s) => s.rarity === rarity && s.price != null).sort((a, b) => a.at - b.at);
  const prices = sales.map((s) => s.price);
  const avg = market?.averages?.[rarity] ?? (prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : null);
  return {
    avg,
    series: sales,
    count: prices.length,
    min: prices.length ? Math.min(...prices) : null,
    max: prices.length ? Math.max(...prices) : null,
    recent: sales.slice(-10).reverse(),
  };
}

/**
 * The numbers the card detail leads with: last sale and cheapest listing as a % gap to the
 * market price (the sold average), and a quick-sale price.
 * @param {{ avg, series }} rm  one rarity's market (rarityMarket)
 * @param {number|null} cheapest  the cheapest live normal copy of the card, if any
 */
export function marketVerdict(rm, cheapest) {
  const pct = (v) => (rm.avg && v != null ? Math.round(((v - rm.avg) / rm.avg) * 100) : null);
  const last = rm.series.at(-1)?.price ?? null;
  // 1 under the cheapest listing, capped at the market price
  const sellAt = cheapest != null ? Math.max(1, Math.min(cheapest - 1, rm.avg ?? cheapest)) : rm.avg;
  return { last, lastPct: pct(last), cheapest, cheapestPct: pct(cheapest), sellAt };
}

const quantile = (sorted, q) => {
  const i = q * (sorted.length - 1), lo = Math.floor(i);
  return lo + 1 < sorted.length ? sorted[lo] + (sorted[lo + 1] - sorted[lo]) * (i - lo) : sorted[lo];
};
/** A step that reads well on an axis (1, 2, 2.5 or 5 times a power of ten). */
function niceStep(raw) {
  const p = 10 ** Math.floor(Math.log10(raw || 1));
  return p * ([1, 2, 2.5, 5, 10].find((m) => m * p >= raw) ?? 10);
}
const DAY = 86400e3;

/** Periods the analysis offers: [id, label, days (null = everything)]. */
export const PERIODS = [["7", "7 j", 7], ["30", "30 j", 30], ["90", "90 j", 90], ["all", "Tout", null]];
/** Sales of the last `days` days (all of them for null). */
export const inPeriod = (series, days, now = Date.now()) => (days == null ? series : series.filter((s) => s.at >= now - days * DAY));

/**
 * The figures a sale list leads with: count, last, median, average, min, max (null when empty).
 * @param {Array<{ price: number, at: number }>} series  oldest first
 */
export function saleStats(series) {
  const p = series.map((s) => s.price).sort((a, b) => a - b);
  if (!p.length) return { count: 0, last: null, median: null, avg: null, min: null, max: null };
  return { count: p.length, last: series.at(-1).price, median: Math.round(quantile(p, 0.5)), avg: Math.round(p.reduce((a, b) => a + b, 0) / p.length), min: p[0], max: p.at(-1) };
}

/** The start of the day (or of the week, Monday) holding `t`, local time: a chart group's key. */
export function groupStart(t, week = false) {
  const d = new Date(t);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - (week ? (d.getDay() + 6) % 7 : 0)).getTime();
}

/**
 * The price chart of one rarity's sales, as geometry in percent of the plot (x and y from 0 to
 * 100, y down). Sales are grouped by day (by week past 120 days) for the volume and the readout;
 * the line is a moving median: at each day, the median of the sales around it, over a window
 * wide enough to hold a tenth of them (shorter when the market is busy, longer when it is quiet),
 * so two or three sales a day read as a trend, not a zigzag. The band is that window's middle
 * half (25th to 75th percentile). The scale follows the typical prices (5th to 95th percentile,
 * the market price inside), so a sale at 50 times the usual price does not flatten the rest:
 * what goes past it sits on the edge, flagged `out`. Each sale is a dot, for the full view.
 * Null under two sales.
 * @param {Array<{ price: number, at: number }>} series  sales, any order
 * @param {{ avg?: number|null, label?: (t: number) => string }} opts
 */
export function priceChart(series, { avg = null, label = (t) => new Date(t).toLocaleDateString("fr", { day: "numeric", month: "short" }) } = {}) {
  const sales = (series || []).filter((s) => s.price != null && s.at).sort((a, b) => a.at - b.at);
  if (sales.length < 2) return null;
  const span = sales.at(-1).at - sales[0].at;
  const week = span > 120 * DAY;
  const groups = new Map();
  for (const s of sales) {
    const key = groupStart(s.at, week);
    (groups.get(key) ?? groups.set(key, { at: key + (week ? 3.5 : 0.5) * DAY, prices: [] }).get(key)).prices.push(s.price);
  }
  // the trend's window: about a tenth of the sales (6 to 25) wide, at least a day, at most a
  // fifth of the period
  const want = Math.min(25, Math.max(6, sales.length / 10));
  const half = Math.min(Math.max(DAY, (span * want) / sales.length), Math.max(DAY, span / 5)) / 2;
  const around = (t) => {
    let near = sales.filter((s) => Math.abs(s.at - t) <= half);
    // a quiet stretch: the nearest sales instead, enough of them that one odd sale is not a dip
    const k = Math.max(3, Math.round(want / 2));
    if (near.length < k) near = [...sales].sort((a, b) => Math.abs(a.at - t) - Math.abs(b.at - t)).slice(0, k);
    return near.map((s) => s.price).sort((a, b) => a - b);
  };
  const buckets = [...groups].sort((a, b) => a[0] - b[0]).map(([key, { at, prices }]) => {
    const own = prices.sort((a, b) => a - b), win = around(at);
    return {
      key, at, count: own.length, min: own[0], max: own.at(-1), median: Math.round(quantile(own, 0.5)),
      trend: Math.round(quantile(win, 0.5)), q1: quantile(win, 0.25), q3: quantile(win, 0.75),
    };
  });

  const all = sales.map((s) => s.price).sort((a, b) => a - b);
  let lo = Math.min(quantile(all, 0.05), avg ?? Infinity);
  let hi = Math.max(quantile(all, 0.95), avg ?? -Infinity);
  if (hi - lo < 1) { hi += 1; lo = Math.max(0, lo - 1); }
  const pad = (hi - lo) * 0.1;
  lo = Math.max(0, lo - pad); hi += pad;
  const y = (v) => Math.min(100, Math.max(0, (1 - (v - lo) / (hi - lo)) * 100));
  // x runs from the first group to the last; a sale's dot sits within its group's span
  const t0 = buckets[0].at, t1 = buckets.at(-1).at;
  const x = (t) => (t1 === t0 ? 50 : Math.min(100, Math.max(0, ((t - t0) / (t1 - t0)) * 100)));
  const f = (n) => n.toFixed(2);

  const points = buckets.map((b) => ({ ...b, x: x(b.at), y: y(b.trend), out: b.trend > hi || b.trend < lo }));
  // each group's own stretch of the x axis, halfway to its neighbours: its hover zone
  points.forEach((p, i) => {
    p.x0 = i ? (points[i - 1].x + p.x) / 2 : 0;
    p.x1 = i < points.length - 1 ? (p.x + points[i + 1].x) / 2 : 100;
  });
  // a volume bar's width: most of one group's step in time, whatever the gaps between sales
  const steps = (t1 - t0) / (week ? 7 * DAY : DAY);
  const barW = steps ? Math.min(4, Math.max(0.4, (100 / steps) * 0.7)) : 4;
  const line = points.map((p, i) => `${i ? "L" : "M"}${f(p.x)} ${f(p.y)}`).join(" ");
  const band = points.length > 1
    ? `${points.map((p, i) => `${i ? "L" : "M"}${f(p.x)} ${f(y(p.q3))}`).join(" ")} ${[...points].reverse().map((p) => `L${f(p.x)} ${f(y(p.q1))}`).join(" ")} Z`
    : null;
  const maxCount = Math.max(...points.map((p) => p.count));
  const step = niceStep((hi - lo) / 3);
  const yTicks = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) yTicks.push({ value: v, y: y(v) });
  const n = Math.min(4, points.length);
  const xTicks = n < 2 ? [{ label: label(t0), x: 50 }] : Array.from({ length: n }, (_, i) => { const t = t0 + ((t1 - t0) * i) / (n - 1); return { label: label(t), x: x(t) }; });
  return {
    grouping: week ? "week" : "day",
    points, line, band, yTicks, xTicks, maxCount, barW,
    avgY: avg == null ? null : y(avg),
    dots: sales.map((s) => ({ x: x(s.at), y: y(s.price), out: s.price > hi || s.price < lo })),
  };
}
