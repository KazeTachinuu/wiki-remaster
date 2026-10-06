import { describe, it, expect } from "bun:test";
import { rarityMarket, marketVerdict } from "./market.js";

const market = {
  averages: { R: 40, C: 9 },
  sales: [
    { rarity: "R", price: 30, at: 2 }, { rarity: "R", price: 50, at: 1 }, { rarity: "C", price: 9, at: 3 }, { rarity: "SR", price: 120, at: 4 },
  ],
};

describe("rarityMarket", () => {
  it("keeps one rarity's sales, oldest first, with its stats and latest sales", () => {
    const r = rarityMarket(market, "R");
    expect(r).toMatchObject({ avg: 40, count: 2, min: 30, max: 50 });
    expect(r.series.map((s) => s.price)).toEqual([50, 30]);
    expect(r.recent.map((s) => s.price)).toEqual([30, 50]);
  });
  it("uses the summary's average, else the sales' own", () => {
    expect(rarityMarket(market, "SR").avg).toBe(120);
    expect(rarityMarket({ averages: {} }, "L")).toMatchObject({ avg: null, count: 0, recent: [] });
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
