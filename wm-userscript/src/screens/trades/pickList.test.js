import { describe, it, expect } from "bun:test";
import { pickList, allValued } from "./pickList.js";

const row = (id, rarity, title, cardId = "c" + id) => ({ id, card: { id: cardId, rarity, title } });
const items = [row(1, "C", "Zèbre"), row(2, "L", "Einstein"), row(3, "R", "Abeille"), row(4, "L", "Curie")];
const values = new Map([["c1", 900], ["c2", 500], ["c4", 800]]); // c3 has no value yet
const none = () => false;
const ids = (l) => l.map((it) => it.id);

describe("pickList", () => {
  it("sorts by rarity, rarest first, then by name, whatever the values", () => {
    expect(ids(pickList(items, { sort: "rarity", values, isLocked: none }))).toEqual([4, 2, 3, 1]);
    const flipped = new Map([["c2", 999], ["c4", 1]]);
    expect(ids(pickList(items, { sort: "rarity", values: flipped, isLocked: none }))).toEqual([4, 2, 3, 1]);
  });
  it("knows when every row has a value entry, null counting as known", () => {
    expect(allValued(items, values)).toBe(false);
    expect(allValued(items, new Map([...values, ["c3", null]]))).toBe(true);
  });
  it("sorts by value, cards without a value last", () => {
    expect(ids(pickList(items, { sort: "value", values, isLocked: none }))).toEqual([1, 4, 2, 3]);
  });
  it("keeps the newest copies first", () => {
    const dated = items.map((it, k) => ({ ...it, obtained_at: `2026-10-0${k + 1}` }));
    expect(ids(pickList(dated, { sort: "recent", values, isLocked: none }))).toEqual([4, 3, 2, 1]);
  });
  it("sorts by name, accents ignored", () => {
    expect(ids(pickList(items, { sort: "name", values, isLocked: none }))).toEqual([3, 4, 2, 1]);
  });
  it("puts locked cards at the end, sorted among themselves", () => {
    const isLocked = (it) => it.id === 4 || it.id === 1;
    expect(ids(pickList(items, { sort: "rarity", values, isLocked }))).toEqual([2, 3, 4, 1]);
  });
  it("defaults to rarity order and does not touch the input", () => {
    const copy = [...items];
    pickList(items, { values });
    expect(items).toEqual(copy);
    expect(ids(pickList(items, { values }))).toEqual([4, 2, 3, 1]);
  });
});

describe("favourites first", () => {
  it("puts my favourites first, then the rarest", () => {
    const row = (id, rarity, starred = false) => ({ id, starred, card: { id, rarity, title: id } });
    const out = pickList([row("a", "L"), row("b", "C", true), row("c", "UR", true)], { sort: "starred", values: new Map() });
    expect(out.map((r) => r.id)).toEqual(["c", "b", "a"]);
  });
});
