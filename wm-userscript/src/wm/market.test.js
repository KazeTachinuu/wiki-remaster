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
