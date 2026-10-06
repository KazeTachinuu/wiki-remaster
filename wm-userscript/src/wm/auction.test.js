import { describe, it, expect } from "bun:test";
import { dealOf, gaugeOf, paceOf, biddersOf } from "./auction.js";

describe("dealOf", () => {
  it("puts a price in its market zone, with the gap in words", () => {
    expect(dealOf(60, 100)).toMatchObject({ zone: "good", gap: "40 % sous le marché" });
    expect(dealOf(100, 100)).toMatchObject({ zone: "fair", gap: "au prix du marché" });
    expect(dealOf(115, 100)).toMatchObject({ zone: "fair", gap: "15 % au-dessus du marché" });
    expect(dealOf(150, 100)).toMatchObject({ zone: "warm" });
    expect(dealOf(320, 100)).toMatchObject({ zone: "bad", gap: "3,2 fois le prix du marché" });
  });
  it("is null without a market price", () => {
    expect(dealOf(10, null)).toBe(null);
  });
});

describe("gaugeOf", () => {
  it("lays the zones end to end and keeps every mark on the scale", () => {
    const g = gaugeOf(500, 100, 300);
    expect(g.zones[0].from).toBe(0);
    expect(g.zones.at(-1).to).toBe(100);
    g.zones.slice(1).forEach((z, i) => expect(z.from).toBe(g.zones[i].to));
    expect(g.price).toBeLessThanOrEqual(100);
    expect(g.market).toBeLessThan(g.mine);
  });
});

describe("paceOf", () => {
  it("counts the bids of each slice of the sale and places the present", () => {
    const start = 0, end = 4 * 3600e3, at = (h) => new Date(h * 3600e3).toISOString();
    const p = paceOf([{ at: at(0.1) }, { at: at(3.9) }, { at: at(3.95) }], start, end, 2 * 3600e3, 4);
    expect(p.counts).toEqual([1, 0, 0, 2]);
    expect(p.top).toBe(2);
    expect(p.now).toBe(50);
  });
});

describe("biddersOf", () => {
  const at = (h) => new Date(h * 3600e3).toISOString();
  const bids = [
    { bidderId: "a", bidder: "Alix", amount: 50, at: at(1) },
    { bidderId: "b", bidder: "Basile", amount: 40, at: at(2) },
    { bidderId: "a", bidder: "Alix", amount: 60, at: at(3) },
    { bidderId: "me", bidder: "Moi", amount: 10, at: at(0.5) },
  ];
  it("ranks the bidders by their best offer, with their bids' moments", () => {
    const r = biddersOf(bids, 0, 4 * 3600e3, null, 5);
    expect(r.shown.map((e) => [e.name, e.best, e.count])).toEqual([["Alix", 60, 2], ["Basile", 40, 1], ["Moi", 10, 1]]);
    expect(r.shown[0].at).toEqual([25, 75]);
  });
  it("always keeps my own lane, and counts the others", () => {
    const r = biddersOf(bids, 0, 4 * 3600e3, "me", 2);
    expect(r.shown.map((e) => e.name)).toEqual(["Alix", "Moi"]);
    expect(r.shown[1].mine).toBe(true);
    expect(r.others).toBe(1);
  });
});
