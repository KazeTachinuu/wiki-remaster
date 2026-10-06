import { describe, it, expect } from "bun:test";
import { shapeOf, diffShapes } from "./contract.js";

describe("shapeOf", () => {
  it("records every field path with its types, array elements merged", () => {
    expect(shapeOf({ total: 3, collection: [{ id: 1, card: { rarity: "C" } }, { id: 2, card: { rarity: "L" } }] })).toEqual({
      collection: "array", "collection[]": "object", "collection[].card": "object", "collection[].card.rarity": "string", "collection[].id": "number", total: "number",
    });
  });
  it("marks fields missing from some elements optional, and unions types", () => {
    const s = shapeOf({ trades: [{ parent: null, x: 1 }, { parent: 7 }] });
    expect(s["trades[].parent"]).toBe("null|number");
    expect(s["trades[].x"]).toBe("?|number");
  });
  it("collapses keys that are data (ids, rarity codes) so the shape keeps one form", () => {
    expect(shapeOf({ owners: { 12: ["a"], 9876: ["b"] } })).toEqual({ owners: "object", "owners.{id}": "array", "owners.{id}[]": "string" });
    expect(shapeOf({ summary: { SR: { avg: 3 } } })).toEqual(shapeOf({ summary: { C: { avg: 9 } } }));
  });
});

describe("diffShapes", () => {
  const before = shapeOf({ total: 3, collection: [{ id: 1, card: { title: "a", atk: 5 } }], note: null });
  it("finds a removed field and a changed type, and lists new fields apart", () => {
    const after = shapeOf({ total: "3", collection: [{ id: 1, card: { name: "a", atk: 5 } }], note: null });
    expect(diffShapes(before, after)).toEqual({ removed: ["collection[].card.title"], changed: ["total: number -> string"], added: ["collection[].card.name"] });
  });
  it("is quiet about an empty array, a null turning into a value, and an optional field", () => {
    expect(diffShapes(before, shapeOf({ total: 0, collection: [], note: "x" }))).toEqual({ removed: [], changed: [], added: [] });
    const opt = shapeOf({ a: [{ x: 1 }, {}] });
    expect(diffShapes(opt, shapeOf({ a: [{}] })).removed).toEqual([]);
    const bidder = shapeOf({ auction: { bidder: { id: 1 } } });
    expect(diffShapes(bidder, shapeOf({ auction: { bidder: null } })).removed).toEqual([]);
  });
});
