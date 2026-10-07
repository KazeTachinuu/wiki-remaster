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

// --- what mutation testing showed was not checked ------------------------------------------------
import { nMe, nPlayer, TIERS, FAMILIES, galleryName, SHOWCASE } from "./social.js";

describe("nMe and nPlayer", () => {
  it("reads my profile with its defaults: public unless said, Pro only when said", () => {
    expect(nMe({ id: "i", username: "Moi", avatar_url: "a.png", avatar_pos_x: 10, avatar_pos_y: 90, is_public: false, created_at: "2026-09-01", is_pro: 1 }))
      .toEqual({ id: "i", username: "Moi", avatar: "a.png", ax: 10, ay: 90, isPublic: false, joinedAt: "2026-09-01", isPro: true });
    expect(nMe({ id: "i", username: "Moi" })).toMatchObject({ isPublic: true, joinedAt: null, isPro: false });
    expect(nMe(null)).toBe(null);
    expect(nUser({ id: "x" }).username).toBe("?");
  });
  it("reads another player and where we stand", () => {
    expect(nPlayer({ profile: { id: "p", username: "Alix" }, lastSeenAt: "t", isOwn: 0, isFriend: 1, friendshipId: "f" }))
      .toMatchObject({ id: "p", lastSeenAt: "t", isOwn: false, isFriend: true, friendshipId: "f" });
    expect(nPlayer({ profile: { id: "p", username: "Alix" } })).toMatchObject({ lastSeenAt: null, isOwn: false, isFriend: false, friendshipId: null });
  });
});

describe("seenLabel boundaries", () => {
  const now = Date.parse("2026-10-07T12:00:00Z");
  const ago = (min) => seenLabel(new Date(now - min * 6e4).toISOString(), now);
  it("switches unit exactly at 5 min, 1 h, 1 day, 30 days and 12 months", () => {
    expect([4, 5, 59, 60, 23 * 60 + 59, 24 * 60].map(ago)).toEqual(["En ligne récemment", "Vu il y a 5 min", "Vu il y a 59 min", "Vu il y a 1 h", "Vu il y a 23 h", "Vu il y a 1 j"]);
    expect([29 * 1440, 30 * 1440, 359 * 1440, 360 * 1440].map(ago)).toEqual(["Vu il y a 29 j", "Vu il y a 1 mois", "Vu il y a 11 mois", "Vu il y a plus d'un an"]);
    expect(seenLabel("not a date", now)).toBe(null);
    expect(seenLabel(new Date(now + 6e5).toISOString(), now)).toBe("En ligne récemment");
  });
});

describe("showcaseOf, edges", () => {
  const uc = (id) => ({ id, card: { id: "c" + id, rarity: "C", atk: 1, def: 2 }, snapshot_atk: 10, snapshot_def: 20 });
  it("keeps the 40 places, the snapshot stats, and only places in range with a card", () => {
    const shelf = showcaseOf({ showcase: [{ position: 0, user_card: uc("a") }, { position: 40, user_card: uc("b") }, { position: -1, user_card: uc("c") }, { position: 3, user_card: { id: "d" } }, { position: 39, user_card: uc("e") }], galleries: [{ gallery_index: 2, name: "Top" }, { gallery_index: "x", name: "bad" }, { gallery_index: 4, name: 7 }] }, (x) => x);
    expect(shelf.places.length).toBe(SHOWCASE.places);
    expect(shelf.places.map((p, i) => p && i).filter((x) => x !== null)).toEqual([0, 39]);
    expect(shelf.places[0].card).toMatchObject({ atk: 10, def: 20 });
    expect(shelf.names).toEqual({ 2: "Top" });
    expect(showcaseOf({}, (x) => x)).toEqual({ places: Array(40).fill(null), names: {} });
  });
  it("names a gallery by its given name, else by its number", () => {
    expect([galleryName(0, { 0: "Rares" }), galleryName(1, { 0: "Rares" }), galleryName(2, undefined)]).toEqual(["Rares", "Vitrine 2", "Vitrine 3"]);
  });
});

describe("friendshipsOf, edges", () => {
  it("reads the requester from the nested player when the id is missing, and skips rows without a player", () => {
    const s = friendshipsOf([
      { id: "f1", status: "pending", requester: u("me", "Moi"), addressee: u("b", "Basile") },
      { id: "f2", status: "accepted", requester_id: "c", requester: null, addressee: u("me", "Moi") },
      { id: "f3", status: "declined", requester_id: "d", requester: u("d", "Dorian"), addressee: u("me", "Moi") },
      { id: "f4", status: "accepted", requester_id: "e", requester: u("e", "Élodie"), addressee: u("me", "Moi"), updated_at: "u", created_at: "c" },
      { id: "f5", status: "accepted", requester_id: "z", requester: u("z", "zack"), addressee: u("me", "Moi"), created_at: "c" },
    ], "me");
    expect(s.outgoing.map((r) => r.user.username)).toEqual(["Basile"]);
    expect(s.incoming).toEqual([]);
    expect(s.friends.map((r) => [r.user.username, r.since])).toEqual([["Élodie", "u"], ["zack", "c"]]);
  });
  it("tells a player found apart from every friendship, not just the first", () => {
    const s = friendshipsOf([
      { id: "a1", status: "pending", requester_id: "me", requester: u("me", "Moi"), addressee: u("x", "X") },
      { id: "a2", status: "pending", requester_id: "me", requester: u("me", "Moi"), addressee: u("y", "Y") },
      { id: "a3", status: "pending", requester_id: "v", requester: u("v", "V"), addressee: u("me", "Moi") },
      { id: "a4", status: "pending", requester_id: "w", requester: u("w", "W"), addressee: u("me", "Moi") },
    ], "me");
    expect(["y", "w"].map((id) => relationOf(id, s))).toEqual(["sent", "received"]);
  });
});

describe("achievementsOf, edges", () => {
  it("fills what the game left empty, and a reward of 0 has nothing to claim", () => {
    const [a] = achievementsOf([{ id: "1", code: "x_y" }], [{ achievement_id: "1", unlocked_at: "t" }]);
    expect(a).toMatchObject({ title: "x_y", description: "", icon: "🏅", reward: 0, unlockedAt: "t", claimedAt: null, state: "done" });
    const [b] = achievementsOf([{ id: "2", code: "z", title: "T", description: "D", icon: "⭐", wikibidous_reward: 5 }], []);
    expect(b).toMatchObject({ title: "T", description: "D", icon: "⭐", unlockedAt: null, state: "locked" });
    expect(achievementsOf(null, null)).toEqual([]);
  });
  it("files each family by its most specific word, whatever the code", () => {
    const fam = (code) => achievementsOf([{ id: code, code }], [])[0].family;
    expect(["reject_trades_50", "trade_spammer", "sell_l", "buy_5", "acc_wb_3000", "wins_5", "streak_3", "ten_sr", "fill_showcase", "max_atk", "five_l", "zzz"].map(fam))
      .toEqual(["trades", "trades", "market", "market", "market", "battles", "battles", "collection", "collection", "collection", "collection", "other"]);
    expect(fam(undefined)).toBe("other");
    expect(FAMILIES.map((f) => f.label)).toEqual(["Collection", "Échanges", "Batailles", "Marché", "Autres"]);
  });
  it("names the tiers", () => {
    expect(TIERS.map((t) => t.label)).toEqual(["Bronze", "Argent", "Or", "Platine"]);
    expect(tierOf(undefined).id).toBe("bronze");
  });
});

describe("nextUp, edges", () => {
  it("keeps the n nearest, by share of the goal reached", () => {
    const list = ["a", "b", "c", "d"].map((id) => ({ id, state: "locked" }));
    const p = { a: { have: 50, goal: 100 }, b: { have: 3, goal: 4 }, c: { have: 90, goal: 1000 }, d: { have: 1, goal: 2 } };
    expect(nextUp(list, (a) => p[a.id], 2).map((x) => x.a.id)).toEqual(["b", "a"]);
  });
});

describe("progressOf, edges", () => {
  const names = { L: "Légendaire", SR: "Super Rare" };
  const stats = { total: 1391, rarityCounts: { L: 3 } };
  it("reads spaced numbers and spacing, refuses an unknown kind of card whatever the counts", () => {
    expect(progressOf("Posséder 2 500 cartes", stats, names)).toEqual({ have: 1391, goal: 2500 });
    expect(progressOf("  posséder   10   carte   Légendaires  ", stats, names)).toEqual({ have: 3, goal: 10 });
    expect(progressOf("Posséder 50000 cartes brillantes", stats, names)).toBe(null);
    expect(progressOf("Posséder 10 cartes Super Rare", { total: 1391 }, names)).toEqual({ have: 0, goal: 10 });
    expect(progressOf("Il faut posséder 50000 cartes", stats, names)).toBe(null);
    expect(progressOf("Posséder 50000 cartes ou plus", stats, names)).toBe(null);
    expect(progressOf("Posséder 1391 cartes", stats, names)).toBe(null);
    expect(progressOf("Posséder 0 cartes", stats, names)).toBe(null);
    expect(progressOf("Posséder 50000 cartes", { total: null }, names)).toBe(null);
    expect(progressOf(null, stats, names)).toBe(null);
  });
});
