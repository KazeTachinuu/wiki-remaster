import { describe, it, expect } from "bun:test";
import { newWatch, watchLabel, matchesWatch, alertOf } from "./watch.js";

const now = Date.parse("2026-10-07T12:00:00Z");
const sale = (o = {}) => ({ id: "s1", status: "active", endAt: new Date(now + 3600e3).toISOString(), price: 40, card: { title: "Singapour", rarity: "L" }, ...o });

describe("newWatch", () => {
  it("keeps what was typed, without empty parts", () => {
    expect(newWatch({ q: "  singapour  ", rarity: "", max: "" }, "w")).toEqual({ id: "w", q: "singapour", rarity: "", max: null, under: false });
    expect(newWatch({ q: "   " })).toBe(null);
  });
  it("reads as a short label", () => {
    expect(watchLabel(newWatch({ q: "singapour", rarity: "L", max: 200, under: true }, "w"))).toBe("« singapour » · Légendaire · 200 max · sous le marché");
  });
});

describe("matchesWatch", () => {
  const w = newWatch({ q: "singapour" }, "w");
  it("keeps to the rarity, the price ceiling and running sales", () => {
    expect(matchesWatch(newWatch({ q: "singapour", rarity: "UR" }, "w"), sale(), null, now)).toBe(false);
    expect(matchesWatch(newWatch({ q: "singapour", max: 30 }, "w"), sale(), null, now)).toBe(false);
    expect(matchesWatch(w, sale({ endAt: new Date(now - 1).toISOString() }), null, now)).toBe(false);
    expect(matchesWatch(w, sale({ mine: true }), null, now)).toBe(false);
  });
  it("under the market: only once the market price is known and the price is under it", () => {
    const u = newWatch({ q: "singapour", under: true }, "w");
    expect(matchesWatch(u, sale(), null, now)).toBe(false);
    expect(matchesWatch(u, sale(), 100, now)).toBe(true);
    expect(matchesWatch(u, sale(), 45, now)).toBe(false);
  });
});

describe("alertOf", () => {
  it("is a notification of the bell that opens the sale", () => {
    const a = alertOf(newWatch({ q: "singapour" }, "w"), sale(), now);
    expect(a).toMatchObject({ id: "watch:w:s1", type: "watch", read: false, href: "/marketplace/s1", message: "Singapour à 40 WikiBidous" });
  });
});
