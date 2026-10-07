import { describe, it, expect } from "bun:test";
import { nUser, friendshipsOf, relationOf, waitingBy, achievementsOf, progressOf, tierOf, nextUp, galleryCount, seenLabel, showcaseOf, filledGalleries } from "./social.js";

const u = (id, username) => ({ id, username, avatar_url: null, avatar_pos_x: 30, avatar_pos_y: 70 });
const rows = [
  { id: "f1", status: "accepted", requester_id: "me", requester: u("me", "Moi"), addressee: u("z", "zoé") },
  { id: "f2", status: "accepted", requester_id: "a", requester: u("a", "Alix"), addressee: u("me", "Moi") },
  { id: "f3", status: "pending", requester_id: "d", requester: u("d", "Dorian"), addressee: u("me", "Moi") },
  { id: "f4", status: "pending", requester_id: "me", requester: u("me", "Moi"), addressee: u("e", "Elsa") },
];

describe("friendshipsOf", () => {
  it("splits friends, received and sent requests, the other player on each", () => {
    const s = friendshipsOf(rows, "me");
    expect(s.friends.map((r) => r.user.username)).toEqual(["Alix", "zoé"]);
    expect(s.incoming.map((r) => [r.fid, r.user.username])).toEqual([["f3", "Dorian"]]);
    expect(s.outgoing.map((r) => [r.fid, r.user.username])).toEqual([["f4", "Elsa"]]);
    expect(s.friends[0].user).toMatchObject({ ax: 30, ay: 70 });
  });
  it("places a found player against my friendships", () => {
    const s = friendshipsOf(rows, "me");
    expect(["a", "e", "d", "x"].map((id) => relationOf(id, s))).toEqual(["friend", "sent", "received", null]);
  });
});

describe("waitingBy", () => {
  it("counts per friend the offers to answer and the ones sent", () => {
    const w = waitingBy([
      { status: "pending", initiator_id: "a", recipient_id: "me" },
      { status: "pending", initiator_id: "a", recipient_id: "me" },
      { status: "pending", initiator_id: "me", recipient_id: "a" },
      { status: "pending", initiator_id: "me", recipient_id: "b" },
      { status: "accepted", initiator_id: "c", recipient_id: "me" },
    ], "me");
    expect(Object.fromEntries(w)).toEqual({ a: { toAnswer: 2, sent: 1 }, b: { toAnswer: 0, sent: 1 } });
  });
});

describe("nUser", () => {
  it("centres an avatar without a framing", () => {
    expect(nUser({ id: "x", username: "X" })).toEqual({ id: "x", username: "X", avatar: null, ax: 50, ay: 50 });
  });
});

describe("achievementsOf", () => {
  const list = [
    { id: "3", code: "trades_5", title: "T", wikibidous_reward: 10 },
    { id: "1", code: "collect_250", title: "C250", wikibidous_reward: 25 },
    { id: "2", code: "collect_50", title: "C50", wikibidous_reward: 10 },
    { id: "4", code: "auction_master", title: "A", wikibidous_reward: 5 },
    { id: "5", code: "night_owl", title: "N", wikibidous_reward: 5 },
    { id: "6", code: "fifty_ur", title: "U", wikibidous_reward: 300 },
  ];
  it("tells what is waiting to be claimed", () => {
    const a = achievementsOf(list, [{ achievement_id: "1", unlocked_at: "t", claimed_at: null }, { achievement_id: "2", unlocked_at: "t", claimed_at: "t" }]);
    expect(Object.fromEntries(a.map((x) => [x.code, x.state]))).toMatchObject({ collect_250: "claim", collect_50: "done", trades_5: "locked" });
  });
  it("files achievements it never saw by what their code says, the rest under Autres", () => {
    const fam = Object.fromEntries(achievementsOf(list, []).map((x) => [x.code, x.family]));
    expect(fam).toEqual({ trades_5: "trades", collect_250: "collection", collect_50: "collection", auction_master: "market", night_owl: "other", fifty_ur: "collection" });
  });
  it("orders by reward, the easiest first", () => {
    expect(achievementsOf(list, []).filter((x) => x.family === "collection").map((x) => x.code)).toEqual(["collect_50", "collect_250", "fifty_ur"]);
  });
});

describe("progressOf", () => {
  const names = { L: "Légendaire", SR: "Super Rare" };
  const stats = { total: 1391, rarityCounts: { L: 3, SR: 12 } };
  it("reads the goal from the wording, of all cards or of one rarity", () => {
    expect(progressOf("Posséder 2500 cartes", stats, names)).toEqual({ have: 1391, goal: 2500 });
    expect(progressOf("Posséder 10 cartes Légendaire", stats, names)).toEqual({ have: 3, goal: 10 });
    expect(progressOf("Posséder 10 cartes Légendaires", stats, names)).toEqual({ have: 3, goal: 10 });
  });
  it("shows nothing it cannot count, nor a goal already reached", () => {
    expect(progressOf("Gagner 5 batailles", stats, names)).toBe(null);
    expect(progressOf("Posséder 5 cartes brillantes", stats, names)).toBe(null);
    expect(progressOf("Posséder 10 cartes Super Rare", stats, names)).toBe(null);
    expect(progressOf("Posséder 50 cartes", null, names)).toBe(null);
  });
});

describe("tierOf and nextUp", () => {
  it("ranks an achievement by its reward", () => {
    expect([0, 10, 25, 99, 100, 500, 5000].map((r) => tierOf(r).id)).toEqual(["bronze", "bronze", "silver", "silver", "gold", "platinum", "platinum"]);
  });
  it("puts the nearest goals first, only those it can count", () => {
    const list = [{ id: "a", state: "locked" }, { id: "b", state: "locked" }, { id: "c", state: "done" }, { id: "d", state: "locked" }];
    const p = { a: { have: 1, goal: 10 }, b: { have: 9, goal: 10 }, c: { have: 5, goal: 10 } };
    expect(nextUp(list, (a) => p[a.id] ?? null).map((x) => x.a.id)).toEqual(["b", "a"]);
  });
});

describe("galleryCount", () => {
  it("opens one gallery per 5 000 cards, from one to ten", () => {
    expect([0, 1391, 5000, 5001, 80000].map(galleryCount)).toEqual([1, 1, 1, 2, 10]);
  });
});

describe("seenLabel", () => {
  const now = Date.parse("2026-10-07T12:00:00Z");
  const before = (min) => new Date(now - min * 6e4).toISOString();
  it("says when a player was last seen, as the game does", () => {
    expect([2, 12, 180, 4 * 1440, 70 * 1440, 400 * 1440].map((m) => seenLabel(before(m), now))).toEqual(["En ligne récemment", "Vu il y a 12 min", "Vu il y a 3 h", "Vu il y a 4 j", "Vu il y a 2 mois", "Vu il y a plus d'un an"]);
    expect(seenLabel(null, now)).toBe(null);
  });
});

describe("showcaseOf and filledGalleries", () => {
  it("places the cards at their rarity of the moment, and keeps only the galleries in use", () => {
    const uc = (id, rarity) => ({ id, card: { id: "c" + id, rarity: "C" }, snapshot_rarity: rarity });
    const shelf = showcaseOf({ showcase: [{ position: 0, user_card: uc("a", "L") }, { position: 5, user_card: uc("b", "SR") }], galleries: [{ gallery_index: 1, name: "Rares" }] }, (x) => x);
    expect(shelf.places[0].card.rarity).toBe("L");
    expect(filledGalleries(shelf).map((g) => [g.g, g.name, g.rows.map((r) => r.id)])).toEqual([[0, "Vitrine 1", ["a"]], [1, "Rares", ["b"]]]);
  });
});
