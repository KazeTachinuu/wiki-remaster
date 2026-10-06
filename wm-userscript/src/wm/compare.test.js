import { describe, it, expect } from "bun:test";
import { compareListings, countByCard } from "./compare.js";

const NOW = Date.parse("2026-10-05T12:00:00Z");
const at = (h) => new Date(NOW + h * 3600000).toISOString();
const L = (id, price, endH, extra = {}) => ({ id, price, endAt: at(endH), status: "active", is_shiny: false, card: { id: "mk" }, ...extra });

describe("compareListings", () => {
  it("sorts by price and measures each gap to the cheapest", () => {
    const { rows } = compareListings([L("a", 200, 1), L("b", 20, 1), L("c", 56, 4)], NOW);
    expect(rows.map((r) => r.id)).toEqual(["b", "c", "a"]);
    expect(rows.map((r) => r.gap)).toEqual([0, 36, 180]);
    expect(rows[0].cheapest).toBe(true);
  });
  it("tags the listing that ends first", () => {
    const { rows } = compareListings([L("a", 20, 3), L("b", 50, 1)], NOW);
    expect(rows.find((r) => r.id === "b").soonest).toBe(true);
    expect(rows.find((r) => r.id === "a").soonest).toBe(false);
  });
  it("compares shiny copies only with shiny copies", () => {
    const { rows } = compareListings([L("n", 20, 1), L("s", 300, 2, { is_shiny: true }), L("s2", 350, 2, { is_shiny: true })], NOW);
    const s = rows.find((r) => r.id === "s");
    expect(s.cheapest).toBe(true);
    expect(s.gap).toBe(0);
    expect(rows.find((r) => r.id === "s2").gap).toBe(50);
  });
  it("leaves out ended and cancelled listings", () => {
    const { stats } = compareListings([L("a", 20, 1), L("old", 5, -1), L("x", 1, 2, { status: "cancelled" })], NOW);
    expect(stats.count).toBe(1);
    expect(stats.min).toBe(20);
  });
  it("averages normal copies (shiny would skew it)", () => {
    const { stats } = compareListings([L("a", 20, 1), L("b", 40, 1), L("s", 900, 1, { is_shiny: true })], NOW);
    expect(stats).toEqual({ count: 3, min: 20, avg: 30 });
  });
  it("tags the soonest across finishes (time does not depend on shininess)", () => {
    const { rows } = compareListings([L("n", 20, 5), L("s", 300, 1, { is_shiny: true })], NOW);
    expect(rows.find((r) => r.id === "s").soonest).toBe(true);
    expect(rows.find((r) => r.id === "n").soonest).toBe(false);
  });
  it("does not tag a lone listing as ending soonest", () => {
    expect(compareListings([L("a", 20, 1)], NOW).rows[0].soonest).toBe(false);
  });
});

describe("countByCard", () => {
  it("counts listings per card", () => {
    const n = countByCard([{ card: { id: 1 } }, { card: { id: 1 } }, { card: { id: 2 } }]);
    expect(n.get(1)).toBe(2);
    expect(n.get(2)).toBe(1);
  });
});
