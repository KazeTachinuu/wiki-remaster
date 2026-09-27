import { describe, it, expect } from "vitest";
import { normSearch, nCard, nAuction, nBid, notifHref, countsFrom, validateCards, RNAME } from "./schema.js";

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
  it("defaults status to active", () => {
    expect(nAuction({ id: 1, card: { id: 2 } }).status).toBe("active");
  });
});

describe("nBid", () => {
  it("flattens the bidder username", () => {
    expect(nBid({ id: 1, amount: 5, bidder: { username: "kaze" }, placed_at: "t" }))
      .toEqual({ id: 1, amount: 5, bidder: "kaze", bidderId: null, at: "t" });
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

describe("RNAME", () => {
  it("covers every rarity code", () => {
    expect(Object.keys(RNAME)).toEqual(["C", "PC", "R", "SR", "UR", "L"]);
  });
});
