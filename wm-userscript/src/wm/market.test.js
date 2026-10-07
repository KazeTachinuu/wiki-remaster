import { describe, it, expect } from "bun:test";
import { rarityMarket, marketVerdict, priceChart, saleStats, inPeriod } from "./market.js";

const market = {
  averages: { R: 40, C: 9 },
  sales: [
    { rarity: "R", price: 30, at: 2 }, { rarity: "R", price: 50, at: 1 }, { rarity: "C", price: 9, at: 3 }, { rarity: "SR", price: 120, at: 4 },
  ],
};

describe("rarityMarket", () => {
  it("keeps one rarity's sales, oldest first, with its stats and latest sales", () => {
    const r = rarityMarket(market, "R");
    expect(r).toMatchObject({ avg: 40, basis: "median", count: 2, min: 30, max: 50 });
    expect(r.series.map((s) => s.price)).toEqual([50, 30]);
    expect(r.recent.map((s) => s.price)).toEqual([30, 50]);
  });
  it("prices at the median of the sales, which one extreme sale does not move", () => {
    const sales = [10, 12, 11, 13, 2222].map((price, i) => ({ rarity: "C", price, at: i }));
    expect(rarityMarket({ averages: { C: 454 }, sales }, "C")).toMatchObject({ avg: 12, basis: "median" });
  });
  it("without sales (no Pro account), the game's average", () => {
    expect(rarityMarket({ averages: { L: 300 } }, "L")).toMatchObject({ avg: 300, basis: "average" });
    expect(rarityMarket({ averages: {} }, "L")).toMatchObject({ avg: null, basis: null, count: 0, recent: [] });
  });
});

describe("marketVerdict", () => {
  const rm = { avg: 200, series: [{ price: 180 }, { price: 250 }] };
  it("gaps to the market price, in %", () => {
    expect(marketVerdict(rm, 150)).toMatchObject({ last: 250, lastPct: 25, cheapest: 150, cheapestPct: -25 });
  });
  it("quick sale: just under the cheapest listing, never above the market", () => {
    expect(marketVerdict(rm, 150).sellAt).toBe(149);
    expect(marketVerdict(rm, 400).sellAt).toBe(200);
    expect(marketVerdict(rm, null).sellAt).toBe(200);
    expect(marketVerdict(rm, 1).sellAt).toBe(1);
  });
  it("no sales: no gaps", () => {
    expect(marketVerdict({ avg: null, series: [] }, 90)).toMatchObject({ last: null, lastPct: null, cheapestPct: null, sellAt: 89 });
  });
});

describe("priceChart", () => {
  const day = (d, h = 10) => new Date(2026, 9, d, h).getTime();
  const sale = (d, price, h) => ({ price, at: day(d, h) });
  const label = () => "";

  it("puts one point per day at its median, in date order", () => {
    const c = priceChart([sale(1, 10), sale(1, 30), sale(1, 20), sale(3, 40), sale(2, 25)], { label });
    expect(c.grouping).toBe("day");
    expect(c.points.map((p) => [p.median, p.count, p.min, p.max])).toEqual([[20, 3, 10, 30], [25, 1, 25, 25], [40, 1, 40, 40]]);
    expect(c.points.every((p) => p.trend >= 10 && p.trend <= 40)).toBe(true);
    expect(c.points[0].x).toBeLessThan(c.points[1].x);
    expect(c.points[1].x).toBeLessThan(c.points[2].x);
    expect(c.maxCount).toBe(3);
  });
  it("keeps a lone extreme sale off the scale and off the trend", () => {
    // a steady climb from 51 to 60 over ten days; one day with a single sale at 2222
    const series = Array.from({ length: 30 }, (_, i) => sale(1 + (i % 10), 51 + (i % 10)));
    series.push(sale(11, 2222));
    const c = priceChart(series, { avg: 56, label });
    const ys = c.points.map((p) => p.y);
    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(30); // the climb uses the height
    expect(c.points.every((p) => !p.out)).toBe(true); // the trend ignores the spike
    expect(c.points.at(-1).max).toBe(2222); // its day still reads it
    expect(c.dots.filter((d) => d.out)).toHaveLength(1); // its dot sits on the edge
    expect(c.yTicks.every((t) => t.value < 2222)).toBe(true);
  });
  it("smooths a quiet market into a trend: a flat price stays flat despite noise", () => {
    // two sales a day for 30 days, alternating 40 and 60
    const series = Array.from({ length: 60 }, (_, i) => ({ price: i % 2 ? 60 : 40, at: day(1, 0) + i * 12 * 3600e3 + 3600e3 }));
    const c = priceChart(series, { label });
    const trends = c.points.slice(3, -3).map((p) => p.trend);
    expect(Math.max(...trends) - Math.min(...trends)).toBeLessThanOrEqual(10);
  });
  it("gives each day its own stretch of the axis, uneven gaps included", () => {
    const c = priceChart([sale(1, 10), sale(2, 12), sale(3, 11), sale(20, 15), sale(21, 14)], { label });
    expect(c.points[0].x0).toBe(0);
    expect(c.points.at(-1).x1).toBe(100);
    c.points.slice(1).forEach((p, i) => expect(p.x0).toBeCloseTo(c.points[i].x1));
    expect(c.barW).toBeLessThan(100 / 20); // a bar fits in one day's step
  });
  it("groups by week past four months", () => {
    const series = Array.from({ length: 60 }, (_, i) => ({ price: 10 + i, at: new Date(2026, 4, 1 + i * 3).getTime() }));
    const c = priceChart(series, { label });
    expect(c.grouping).toBe("week");
    expect(c.points.length).toBeLessThan(60);
  });
  it("needs two sales, and draws a single day in the middle", () => {
    expect(priceChart([sale(1, 10)])).toBe(null);
    expect(priceChart([sale(1, 10, 9), sale(1, 12, 9)], { label }).points[0].x).toBe(50);
  });
});

describe("saleStats and periods", () => {
  const at = (daysAgo) => Date.UTC(2026, 9, 6) - daysAgo * 86400e3;
  const series = [{ price: 10, at: at(40) }, { price: 30, at: at(20) }, { price: 20, at: at(5) }, { price: 1000, at: at(1) }];
  it("leads with count, last, median, average, min and max", () => {
    expect(saleStats(series)).toEqual({ count: 4, last: 1000, median: 25, avg: 265, min: 10, max: 1000 });
    expect(saleStats([]).median).toBe(null);
  });
  it("keeps the sales of a period", () => {
    expect(inPeriod(series, 7, at(0)).map((s) => s.price)).toEqual([20, 1000]);
    expect(inPeriod(series, null, at(0))).toHaveLength(4);
  });
});

// --- what mutation testing showed was not checked ------------------------------------------------
import { groupStart, PERIODS } from "./market.js";

// bun test runs in UTC: the sales at midday UTC sit at their day's midday mark
describe("priceChart, exact geometry", () => {
  const D = 86400e3, t0 = Date.UTC(2026, 9, 5, 12);
  const s = [[0, 10], [0, 30], [1, 20], [2, 40], [3, 1000]].map(([d, p]) => ({ at: t0 + d * D, price: p }));
  const c = priceChart(s, { avg: 25, label: (t) => String(new Date(t).getUTCDate()) });
  const r2 = (n) => Math.round(n * 100) / 100;
  it("draws each day at its trend, with its own spread and hover zone", () => {
    expect(c.grouping).toBe("day");
    expect(c.points.map((p) => [p.count, p.min, p.max, p.median, p.trend, r2(p.q1), r2(p.q3), r2(p.x), r2(p.y), p.out, r2(p.x0), r2(p.x1)])).toEqual([
      [2, 10, 30, 20, 20, 15, 25, 0, 97.75, false, 0, 16.67],
      [1, 20, 20, 20, 20, 15, 25, 33.33, 97.75, false, 16.67, 50],
      [1, 40, 40, 40, 40, 30, 520, 66.67, 95.49, false, 50, 83.33],
      [1, 1000, 1000, 1000, 40, 30, 520, 100, 95.49, false, 83.33, 100],
    ]);
  });
  it("keeps the extreme sale's dot on the edge, flagged, and the market price inside the scale", () => {
    expect(c.dots.map((d) => [r2(d.x), r2(d.y), d.out])).toEqual([[0, 98.87, false], [0, 96.62, false], [33.33, 97.75, false], [66.67, 95.49, false], [100, 0, true]]);
    expect(r2(c.avgY)).toBe(97.18);
    expect(c.maxCount).toBe(2);
    expect(c.barW).toBe(4);
  });
  it("labels round steps and four dates, and draws the line and the band", () => {
    expect(c.yTicks.map((t) => [t.value, r2(t.y)])).toEqual([[0, 100], [500, 43.67]]);
    expect(c.xTicks.map((t) => [t.label, r2(t.x)])).toEqual([["5", 0], ["6", 33.33], ["7", 66.67], ["8", 100]]);
    expect(c.line).toBe("M0.00 97.75 L33.33 97.75 L66.67 95.49 L100.00 95.49");
    expect(c.band).toBe("M0.00 97.18 L33.33 97.18 L66.67 41.42 L100.00 41.42 L100.00 96.62 L66.67 96.62 L33.33 98.31 L0.00 98.31 Z");
  });
  it("without a market price draws no market line; ignores sales without a price or a date", () => {
    const d = priceChart([...s, { at: t0, price: null }, { at: 0, price: 5 }]);
    expect(d.avgY).toBe(null);
    expect(d.dots.length).toBe(5);
    expect(priceChart(null)).toBe(null);
  });
  it("on a flat price, widens the scale around it", () => {
    const flat = priceChart([{ at: t0, price: 50 }, { at: t0 + D, price: 50 }]);
    expect(flat.points.every((p) => p.y > 0 && p.y < 100)).toBe(true);
    expect(flat.yTicks.length).toBeGreaterThan(0);
  });
});

describe("rarityMarket and marketVerdict, edges", () => {
  it("ignores sales of another rarity or without a price, and lists the 10 latest, newest first", () => {
    const sales = Array.from({ length: 12 }, (_, i) => ({ rarity: "R", price: i + 1, at: i }));
    const rm = rarityMarket({ sales: [...sales, { rarity: "L", price: 999, at: 99 }, { rarity: "R", price: null, at: 50 }] }, "R");
    expect([rm.count, rm.min, rm.max, rm.avg, rm.basis]).toEqual([12, 1, 12, 7, "median"]);
    expect(rm.recent.map((s) => s.price)).toEqual([12, 11, 10, 9, 8, 7, 6, 5, 4, 3]);
    expect(rarityMarket(null, "R")).toEqual({ avg: null, basis: null, series: [], count: 0, min: null, max: null, recent: [] });
  });
  it("quick sale: at least 1, the market price when nothing is listed", () => {
    const rm = { avg: 100, series: [{ price: 80 }] };
    expect(marketVerdict(rm, 1).sellAt).toBe(1);
    expect(marketVerdict(rm, null)).toEqual({ last: 80, lastPct: -20, cheapest: null, cheapestPct: null, sellAt: 100 });
    expect(marketVerdict({ avg: null, series: [] }, 30)).toEqual({ last: null, lastPct: null, cheapest: 30, cheapestPct: null, sellAt: 29 });
  });
});

describe("saleStats, periods and groups", () => {
  it("rounds the median of an even list and the average", () => {
    expect(saleStats([{ price: 1, at: 1 }, { price: 2, at: 2 }, { price: 4, at: 3 }, { price: 10, at: 4 }])).toEqual({ count: 4, last: 10, median: 3, avg: 4, min: 1, max: 10 });
  });
  it("keeps a period's sales, the boundary included", () => {
    const now = 100 * 86400e3, at = (d) => ({ at: now - d * 86400e3 });
    expect(inPeriod([at(7), at(8), at(0)], 7, now).length).toBe(2);
    expect(inPeriod([at(400)], null, now).length).toBe(1);
    expect(PERIODS.map(([id, label, days]) => [id, label, days])).toEqual([["7", "7 j", 7], ["30", "30 j", 30], ["90", "90 j", 90], ["all", "Tout", null]]);
  });
  it("starts a day at midnight and a week on Monday", () => {
    const wed = new Date(2026, 9, 7, 15).getTime(), sun = new Date(2026, 9, 11, 9).getTime();
    expect(groupStart(wed)).toBe(new Date(2026, 9, 7).getTime());
    expect(groupStart(wed, true)).toBe(new Date(2026, 9, 5).getTime());
    expect(groupStart(sun, true)).toBe(new Date(2026, 9, 5).getTime());
  });
});
