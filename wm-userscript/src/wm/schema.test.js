import { describe, it, expect } from "bun:test";
import { nNotification, plainText, newInPack, normSearch, nCard, nAuction, notifHref, countsFrom, validateCards, httpUrl } from "./schema.js";

describe("normSearch", () => {
  it("strips accents, lowercases, and collapses whitespace", () => {
    expect(normSearch("  Éléphant   Gris ")).toBe("elephant gris");
  });
  it("handles null and undefined", () => {
    expect(normSearch(null)).toBe("");
    expect(normSearch(undefined)).toBe("");
  });
});

describe("nCard", () => {
  it("prefers wikipedia_title, falls back to title", () => {
    expect(nCard({ id: 1, wikipedia_title: "Paris" }).title).toBe("Paris");
    expect(nCard({ id: 1, title: "Lyon" }).title).toBe("Lyon");
    expect(nCard({ id: 1 }).title).toBe("");
  });
  it("nulls the image when hide_image is set (clean no-image treatment, no broken load)", () => {
    expect(nCard({ id: 1, image_url: "x.png", hide_image: true }).image_url).toBe(null);
    expect(nCard({ id: 1, image_url: "x.png" }).image_url).toBe("x.png");
  });
  it("defaults atk/def to 0 and coerces q_score to a number", () => {
    const c = nCard({ id: 1, q_score: "0.5" });
    expect(c.atk).toBe(0);
    expect(c.def).toBe(0);
    expect(c.q_score).toBe(0.5);
  });
  it("coerces nsfw_image to a boolean", () => {
    expect(nCard({ id: 1, nsfw_image: 1 }).nsfw_image).toBe(true);
    expect(nCard({ id: 1 }).nsfw_image).toBe(false);
  });
});

describe("nAuction", () => {
  it("reads the live statuses, and an unknown ended one from its price", () => {
    const st = (a) => nAuction({ id: 1, card: { id: 2 }, ...a }).status;
    expect(st({})).toBe("active");
    expect(st({ status: "settled_sold", final_price: 40 })).toBe("sold");
    expect(st({ status: "settled_unsold" })).toBe("unsold");
    expect(st({ status: "cancelled" })).toBe("cancelled");
    expect(st({ status: "ended_somehow", final_price: 12 })).toBe("sold");
    expect(st({ status: "ended_somehow" })).toBe("unsold");
  });
  it("derives price from effective_bid, then current_bid, then base_amount", () => {
    expect(nAuction({ id: 1, card: { id: 2 }, effective_bid: 30, current_bid: 20, base_amount: 10 }).price).toBe(30);
    expect(nAuction({ id: 1, card: { id: 2 }, current_bid: 20, base_amount: 10 }).price).toBe(20);
    expect(nAuction({ id: 1, card: { id: 2 }, base_amount: 10 }).price).toBe(10);
  });
  it("builds a card from snapshot fields when card is absent", () => {
    const a = nAuction({ id: 1, card_id: 9, snapshot_rarity: "L", snapshot_atk: 5, snapshot_def: 6 });
    expect(a.card.id).toBe(9);
    expect(a.card.rarity).toBe("L");
    expect(a.card.atk).toBe(5);
  });
  it("treats the API's `owned` as owning a copy, not as being the seller", () => {
    const theirs = nAuction({ id: 1, card: { id: 2 }, seller_id: "u2", owned: true }, "u1");
    expect(theirs.mine).toBe(false);
    expect(theirs.ownsCard).toBe(true);
  });
  it("is mine only when seller_id matches my user id", () => {
    expect(nAuction({ id: 1, card: { id: 2 }, seller_id: "u1", owned: false }, "u1").mine).toBe(true);
    expect(nAuction({ id: 1, card: { id: 2 }, seller_id: "u1" }, null).mine).toBe(false);
  });
});

describe("notifHref", () => {
  it("points marketplace notifications at the auction", () => {
    expect(notifHref({ type: "marketplace_outbid", data: { auction_id: 42 } })).toBe("/marketplace/42");
  });
  it("routes friend and guild types, and null for unknown", () => {
    expect(notifHref({ type: "friend_request", data: {} })).toBe("/friends");
    expect(notifHref({ type: "guild_invite", data: {} })).toBe("/guild");
    expect(notifHref({ type: "custom", data: {} })).toBe(null);
    for (const type of ["trade_offer", "trade_countered", "trade_accepted"]) expect(notifHref({ type, data: { trade_id: 7 } })).toBe("/trades");
  });
});

describe("countsFrom", () => {
  it("tallies items by rarity code", () => {
    const items = [{ card: { rarity: "C" } }, { card: { rarity: "C" } }, { card: { rarity: "L" } }];
    expect(countsFrom(items)).toEqual({ C: 2, PC: 0, R: 0, SR: 0, UR: 0, L: 1 });
  });
});

describe("validateCards", () => {
  it("passes healthy and empty batches", () => {
    expect(validateCards("t", [])).toBe(true);
    expect(validateCards("t", [{ id: 1, rarity: "C" }, { id: 2, rarity: "R" }])).toBe(true);
  });
  it("flags a batch where most rows failed to normalize", () => {
    const broken = [{ id: null, rarity: undefined }, { id: null, rarity: undefined }, { id: 3, rarity: "C" }];
    expect(validateCards("t", broken)).toBe(false);
  });
});

describe("newInPack", () => {
  it("marks a card new when every copy I own came from this pack", () => {
    const owned = [{ card_id: "a" }, { card_id: "b" }, { card_id: "b" }, { card_id: "c" }, { card_id: "c" }];
    // a: only the copy just drawn; b: one copy before this pack; c: drawn twice, nothing before
    expect([...newInPack(["a", "b", "c", "c"], owned)].sort()).toEqual(["a", "c"]);
  });
  it("marks nothing when the response has no list", () => expect(newInPack(["a"], undefined)).toBe(null));
});

describe("nNotification", () => {
  const n = (type, data) => nNotification({ id: 1, type, data, read: false, created_at: "t" });
  it("tells each known type in plain words from its data", () => {
    expect(n("trade_offer", { title: "🔄 Nouvelle offre d'échange !", initiator_username: "alix" })).toMatchObject({ title: "Offre d'échange", message: "de alix" });
    expect(n("marketplace_auction_sold", { title: "💰 Carte vendue !", card_title: "Marie Curie", final_price: 1210 })).toMatchObject({ title: "Carte vendue", message: "Marie Curie pour 1\u202f210 WikiBidous" });
    expect(n("marketplace_outbid", { card_title: "Einstein", new_bid: 640 }).message).toBe("Einstein, nouvelle offre de 640 WikiBidous");
  });
  it("keeps the game's text, cleaned, for an unknown type or missing data", () => {
    expect(n("custom", { title: "✅ Bravo !", message: "Tout va bien 🎉" })).toMatchObject({ title: "Bravo", message: "Tout va bien" });
    expect(n("trade_offer", { title: "x", message: "🔄 Offre reçue !" }).message).toBe("Offre reçue");
  });
  it("strips emoji, joiners and trailing exclamation marks", () => expect(plainText("  ↩️ Contre-offre reçue !! ")).toBe("Contre-offre reçue"));
});

describe("httpUrl", () => {
  it("keeps http(s) links only", () => {
    expect(httpUrl("https://fr.wikipedia.org/wiki/X")).toBe("https://fr.wikipedia.org/wiki/X");
    expect(httpUrl("javascript:alert(1)")).toBe(null);
    expect(httpUrl("data:text/html,x")).toBe(null);
    expect(httpUrl("/relative")).toBe(null);
    expect(httpUrl(null)).toBe(null);
  });
});
