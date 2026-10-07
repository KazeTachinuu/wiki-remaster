import { describe, it, expect } from "bun:test";
import { BATCH, nCopy, matchesFilter, asideReason, selectionFor, byRarity, batches, discardInBatches } from "./discard.js";

const row = (o = {}) => ({ id: "uc1", card_id: "c1", is_shiny: false, starred: false, obtained_at: "2026-10-01T10:00:00Z", cards: { rarity: "C", wikipedia_title: "Écluse de Guerlédan" }, user_card_tags: [], ...o });
const copy = (o = {}) => ({ ...nCopy(row()), ...o });

describe("nCopy", () => {
  it("reads a copy from the game's database, with its rarity, title and tags", () => {
    expect(nCopy(row({ is_shiny: true, starred: true, user_card_tags: [{ tag_id: "t1" }, null, {}] }))).toStrictEqual({
      id: "uc1", cardId: "c1", rarity: "C", title: "Écluse de Guerlédan", shiny: true, starred: true, tags: ["t1"], at: "2026-10-01T10:00:00Z" });
  });
  it("counts a copy at the rarity it had when obtained, as the game does", () => {
    expect(nCopy(row({ snapshot_rarity: "PC" })).rarity).toBe("PC");
    expect(nCopy(row({ snapshot_rarity: null })).rarity).toBe("C");
    expect(nCopy({ id: "x", snapshot_rarity: "SR" })).toEqual({ id: "x", cardId: null, rarity: "SR", title: "", shiny: false, starred: false, tags: [], at: null });
  });
  it("drops a row without id or card, and fills what is missing", () => {
    expect([nCopy(null), nCopy(row({ id: null })), nCopy(row({ cards: null })), nCopy(row({ cards: {} }))]).toEqual([null, null, null, null]);
    expect(nCopy({ id: "x", cards: { rarity: "R" } })).toEqual({ id: "x", cardId: null, rarity: "R", title: "", shiny: false, starred: false, tags: [], at: null });
  });
});

describe("matchesFilter: the collection screen's filters", () => {
  const c = copy({ tags: ["t1"] });
  it("by rarity, favourites, tag or no tag, and title", () => {
    expect([matchesFilter(c), matchesFilter(c, { rarity: "C" }), matchesFilter(c, { rarity: "R" })]).toEqual([true, true, false]);
    expect([matchesFilter(c, { favOnly: true }), matchesFilter({ ...c, starred: true }, { favOnly: true })]).toEqual([false, true]);
    expect([matchesFilter(c, { tag: "t1" }), matchesFilter(c, { tag: "t2" }), matchesFilter(c, { tag: "none" }), matchesFilter(copy(), { tag: "none" })]).toEqual([true, false, false, true]);
    expect([matchesFilter(c, { q: "guerledan" }), matchesFilter(c, { q: "  ÉCLUSE  " }), matchesFilter(c, { q: "loire" })]).toEqual([true, true, false]);
  });
});

describe("asideReason: what a player keeps", () => {
  it("a copy in a trade first (by copy or by card id), then favourites, vitrine, shiny", () => {
    const all = copy({ starred: true, shiny: true });
    expect(asideReason(all, { locked: new Set(["uc1"]) })).toBe("En échange");
    expect(asideReason(all, { locked: new Set(["c1"]) })).toBe("En échange");
    expect(asideReason(all)).toBe("Favorite");
    expect(asideReason(copy({ shiny: true }), { showcase: new Set(["uc1"]) })).toBe("En vitrine");
    expect(asideReason(copy({ shiny: true }))).toBe("Brillante");
    expect(asideReason(copy())).toBe(null);
  });
});

describe("selectionFor: Tout sélectionner", () => {
  const list = [copy({ id: "a" }), copy({ id: "b", starred: true }), copy({ id: "c", cardId: "locked" }), copy({ id: "d", rarity: "R" }), copy({ id: "e", shiny: true })];
  const ctx = { locked: new Set(["locked"]), showcase: new Set() };
  it("takes what the filter shows, minus what a player keeps", () => {
    const s = selectionFor(list, { rarity: "C" }, ctx);
    expect(s.matches.map((c) => c.id)).toEqual(["a", "b", "c", "e"]);
    expect(s.aside.map((x) => [x.copy.id, x.why])).toEqual([["b", "Favorite"], ["c", "En échange"], ["e", "Brillante"]]);
    expect(s.take.map((c) => c.id)).toEqual(["a"]);
  });
  it("includes the kept ones when asked, never one in a trade", () => {
    expect(selectionFor(list, { rarity: "C" }, ctx, true).take.map((c) => c.id)).toEqual(["a", "b", "e"]);
  });
});

describe("byRarity", () => {
  it("counts the selection per rarity, in the order given, without empty ones", () => {
    expect(byRarity([copy(), copy({ rarity: "UR" }), copy()], ["L", "UR", "SR", "R", "PC", "C"])).toEqual([["UR", 1], ["C", 2]]);
    expect(byRarity([], ["C"])).toEqual([]);
  });
});

describe("batches", () => {
  it("cuts ids into the game's batches of 50", () => {
    const ids = Array.from({ length: 120 }, (_, i) => i);
    expect(BATCH).toBe(50);
    expect(batches(ids).map((b) => b.length)).toEqual([50, 50, 20]);
    expect(batches(ids)[1][0]).toBe(50);
    expect(batches([])).toEqual([]);
    expect(batches([1, 2, 3], 2)).toEqual([[1, 2], [3]]);
  });
});

describe("discardInBatches", () => {
  const ids = Array.from({ length: 120 }, (_, i) => `u${i}`);
  it("sends every batch in turn, reports progress, keeps refused copies apart", async () => {
    const sent = [], progress = [];
    const r = await discardInBatches(ids, async (b) => { sent.push(b.length); return { discarded_count: b.length, failed: b.includes("u3") ? ["u3"] : [] }; }, { onProgress: (p) => progress.push(p) });
    expect(sent).toEqual([50, 50, 20]);
    expect(progress).toEqual([{ batch: 1, of: 3, sent: 0 }, { batch: 2, of: 3, sent: 50 }, { batch: 3, of: 3, sent: 100 }]);
    expect([r.gone.length, r.refused, r.unsent, r.unsure, r.error]).toEqual([119, ["u3"], [], [], null]);
  });
  it("stops at a failing batch: that one is unsure, the rest never sent", async () => {
    let n = 0;
    const boom = new Error("Le serveur du jeu ne répond pas");
    const r = await discardInBatches(ids, async (b) => { if (++n === 2) throw boom; return { failed: [] }; });
    expect([r.gone.length, r.unsure.length, r.unsure[0], r.unsent.length, r.unsent[0], r.error]).toEqual([50, 50, "u50", 20, "u100", boom]);
  });
  it("stops between batches when asked", async () => {
    let n = 0;
    const r = await discardInBatches(ids, async () => { n++; return {}; }, { stopped: () => n === 1 });
    expect([n, r.gone.length, r.unsent.length, r.unsent[0]]).toEqual([1, 50, 70, "u50"]);
  });
  it("counts a batch the game answered without a body as gone", async () => {
    const r = await discardInBatches(["a", "b"], async () => undefined);
    expect([r.gone, r.refused]).toEqual([["a", "b"], []]);
  });
  it("sends nothing for nothing", async () => {
    let n = 0;
    expect(await discardInBatches([], async () => { n++; })).toEqual({ gone: [], refused: [], unsent: [], unsure: [], error: null });
    expect(n).toBe(0);
  });
});

import { readAllCopies, COPIES_PAGE, COPY_FIELDS } from "./discard.js";
describe("readAllCopies", () => {
  it("reads slice after slice until a short one, keeping only real copies", async () => {
    const asked = [], seen = [];
    const rows = Array.from({ length: 5 }, (_, i) => row({ id: `u${i}` }));
    const got = await readAllCopies(async (from, size) => { asked.push([from, size]); return from === 4 ? [rows[4], { id: "bad" }] : rows.slice(from, from + size); }, { size: 2, onProgress: (n) => seen.push(n) });
    // the third slice is full (one copy, one broken row), so a fourth, empty, ends it
    expect(asked).toEqual([[0, 2], [2, 2], [4, 2], [6, 2]]);
    expect(seen).toEqual([2, 4, 5, 5]);
    expect(got.map((c) => c.id)).toEqual(["u0", "u1", "u2", "u3", "u4"]);
  });
  it("reads a thousand at a time, the light columns only, and survives an empty answer", async () => {
    expect(COPIES_PAGE).toBe(1000);
    expect(COPY_FIELDS).toBe("id,card_id,is_shiny,starred,obtained_at,snapshot_rarity,cards(rarity,wikipedia_title),user_card_tags(tag_id)");
    expect(await readAllCopies(async () => null)).toEqual([]);
  });
});

import { firstN, tagCounts, PICK_ORDERS } from "./discard.js";
describe("firstN: Sélectionner N", () => {
  const at = (id, d) => copy({ id, at: d });
  const list = [at("b", "2026-10-02T00:00:00Z"), at("x", null), at("a", "2026-10-01T00:00:00Z"), at("c", "2026-10-03T00:00:00Z")];
  it("takes the oldest first, or the newest, an undated copy last either way", () => {
    expect(firstN(list, 2).map((c) => c.id)).toEqual(["a", "b"]);
    expect(firstN(list, 2, "newest").map((c) => c.id)).toEqual(["c", "b"]);
    expect(firstN(list, Infinity).map((c) => c.id)).toEqual(["a", "b", "c", "x"]);
    expect(firstN(list, Infinity, "newest").map((c) => c.id)).toEqual(["c", "b", "a", "x"]);
  });
  it("never more than there are, nothing for zero or less, and leaves the list as it was", () => {
    expect(firstN(list, 99).length).toBe(4);
    expect([firstN(list, 0), firstN(list, -3)]).toEqual([[], []]);
    expect(list.map((c) => c.id)).toEqual(["b", "x", "a", "c"]);
  });
  it("offers the two orders", () => {
    expect(PICK_ORDERS.map(([id]) => id)).toEqual(["oldest", "newest"]);
  });
});

describe("tagCounts", () => {
  it("counts each tag and the untagged copies", () => {
    expect(tagCounts([copy({ tags: ["t1"] }), copy({ tags: ["t1", "t2"] }), copy(), copy()])).toEqual({ none: 2, t1: 2, t2: 1 });
    expect(tagCounts([])).toEqual({ none: 0 });
  });
});
