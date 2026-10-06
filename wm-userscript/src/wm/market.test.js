import { describe, it, expect } from "bun:test";
import { marketRarities, rarityMarket } from "./market.js";

const market = {
  averages: { R: 40, C: 9 },
  sales: [
    { rarity: "R", price: 30, at: 2 }, { rarity: "R", price: 50, at: 1 }, { rarity: "C", price: 9, at: 3 }, { rarity: "SR", price: 120, at: 4 },
  ],
};

describe("marketRarities", () => {
  it("puts the current rarity first, then every other one sold, rarest first", () => {
    expect(marketRarities(market, "R")).toEqual(["R", "SR", "C"]);
    expect(marketRarities(null, "PC")).toEqual(["PC"]);
  });
});

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
