import { describe, it, expect } from "bun:test";
import { nNotification, plainText, newInPack, pickCopy, normSearch, nCard, nAuction, notifHref, validateCards, httpUrl } from "./schema.js";

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

describe("pickCopy", () => {
  const row = (id, cardId, is_shiny, obtained_at) => ({ id, card: { id: cardId }, is_shiny, obtained_at });
  const rows = [row("old", "c1", false, "2026-09-01"), row("new", "c1", false, "2026-10-06"), row("shiny", "c1", true, "2026-10-01"), row("x", "c2", false, "2026-10-06")];
  it("takes the same finish, then the newest copy", () => {
    expect(pickCopy(rows, { id: "c1", is_shiny: false }).id).toBe("new");
    expect(pickCopy(rows, { id: "c1", is_shiny: true }).id).toBe("shiny");
  });
  it("is null when no copy is mine", () => {
    expect(pickCopy(rows, { id: "c9" })).toBe(null);
    expect(pickCopy(null, { id: "c1" })).toBe(null);
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

// --- what mutation testing showed was not checked ------------------------------------------------
import { RNAME, RARITIES, RARITIES_DESC, nBid, nTrade, nMessage } from "./schema.js";

describe("rarities", () => {
  it("names each rarity as the game does, commonest first and rarest first", () => {
    expect(RNAME).toEqual({ C: "Commun", PC: "Peu Commun", R: "Rare", SR: "Super Rare", UR: "Ultra Rare", L: "Légendaire" });
    expect(RARITIES).toEqual(["C", "PC", "R", "SR", "UR", "L"]);
    expect(RARITIES_DESC).toEqual(["L", "UR", "SR", "R", "PC", "C"]);
  });
});

describe("httpUrl and notifHref, every case", () => {
  it("keeps http and https links only", () => {
    expect([httpUrl("https://a.fr/x"), httpUrl("http://a.fr"), httpUrl("ftp://a.fr"), httpUrl("javascript:alert(1)"), httpUrl("not a url"), httpUrl(undefined)])
      .toEqual(["https://a.fr/x", "http://a.fr", null, null, null, null]);
  });
  it("leads each kind of notification to its screen, only with what it needs", () => {
    expect(notifHref({ type: "marketplace_outbid", data: { auction_id: "a 1" } })).toBe("/marketplace/a%201");
    expect(notifHref({ type: "marketplace_outbid", auction_id: "b" })).toBe("/marketplace/b");
    expect(notifHref({ type: "marketplace_outbid", data: {} })).toBe(null);
    expect(notifHref({ type: "xmarketplace_outbid", data: { auction_id: "a" } })).toBe(null);
    expect(notifHref({ type: "trade_offer" })).toBe("/trades");
    expect(notifHref({ type: "my_trade_offer" })).toBe(null);
    expect(notifHref({ type: "battle_invite", data: { battle_id: "x" } })).toBe("/battle");
    expect(notifHref({ type: "battle_invite", data: {} })).toBe(null);
    expect(notifHref({ type: "guild_invite" })).toBe("/guild");
    expect(notifHref({ type: "other" })).toBe(null);
  });
});

describe("nCard, nAuction and nBid, defaults", () => {
  it("reads a bare card with its defaults", () => {
    expect(nCard({ id: "c", rarity: "R", q_score: "12.5", pageviews: 0, summary: "", wikipedia_url: "https://fr.wikipedia.org/wiki/X", nsfw_image: 1 }))
      .toEqual({ id: "c", title: "", category: "", image_url: null, rarity: "R", atk: 0, def: 0, q_score: 12.5, pageviews: 0, summary: null, wikipedia_url: "https://fr.wikipedia.org/wiki/X", nsfw_image: true });
    expect(nCard({ id: "c", title: "T", q_score: null })).toMatchObject({ title: "T", q_score: null, pageviews: null, nsfw_image: false });
  });
  it("reads every field of an auction, and nothing it was not sent", () => {
    const a = nAuction({ id: "x", card: { id: "c", rarity: "L" }, is_shiny: 1, base_amount: 5, current_bid: 9, final_price: 12, status: "settled_sold", end_at: "e", created_at: "c", settled_at: "s", base_repriced_at: "r",
      seller: { username: "Alix" }, seller_id: "a", current_bidder_id: "b", current_bidder: { username: "Basile" }, winner_id: "w", winner: { username: "Wanda" }, owned: 1 }, "a");
    expect(a).toEqual({ id: "x", card: nCard({ id: "c", rarity: "L" }), is_shiny: true, base: 5, bid: 9, price: 9, finalPrice: 12, status: "sold", endAt: "e", createdAt: "c", settledAt: "s", repricedAt: "r",
      seller: "Alix", sellerId: "a", currentBidderId: "b", bidder: "Basile", winnerId: "w", winner: "Wanda", mine: true, ownsCard: true });
    expect(nAuction({ id: "y", card_id: "c" })).toEqual({ id: "y", card: nCard({ id: "c" }), is_shiny: false, base: null, bid: null, price: null, finalPrice: null, status: "active", endAt: null, createdAt: null, settledAt: null, repricedAt: null,
      seller: null, sellerId: null, currentBidderId: null, bidder: null, winnerId: null, winner: null, mine: false, ownsCard: false });
    expect(nAuction({ id: "z", seller_id: null }, null).mine).toBe(false);
    expect(nAuction({ id: "z", base_amount: 4 }).price).toBe(4);
    expect(nAuction({ id: "z", status: "settled_unsold" }).status).toBe("unsold");
  });
  it("reads a bid", () => {
    expect(nBid({ id: "b", amount: 7, bidder: { username: "Alix" }, bidder_id: "a", placed_at: "t" })).toEqual({ id: "b", amount: 7, bidder: "Alix", bidderId: "a", at: "t" });
    expect(nBid({ id: "b", amount: 7 })).toEqual({ id: "b", amount: 7, bidder: null, bidderId: null, at: null });
  });
});

describe("nNotification, every kind", () => {
  const n = (type, data = {}, extra = {}) => nNotification({ id: "1", type, data, ...extra });
  it("tells each kind in plain words, with its detail when the data has it", () => {
    expect([n("marketplace_outbid", { card_title: "X", new_bid: 1200 }).message, n("marketplace_auction_won", { card_title: "X", final_price: 5 }).message, n("marketplace_auction_sold", { card_title: "X" }).message])
      .toEqual(["X, nouvelle offre de 1 200 WikiBidous", "X pour 5 WikiBidous", "X"]);
    expect(["marketplace_outbid", "marketplace_auction_won", "marketplace_auction_sold", "marketplace_auction_unsold", "marketplace_wishlist_listed", "trade_offer", "trade_countered", "trade_accepted", "friend_request", "battle_invite", "guild_invite"].map((t) => n(t).title))
      .toEqual(["Enchère dépassée", "Enchère gagnée", "Carte vendue", "Vente terminée sans acheteur", "Carte souhaitée en vente", "Offre d'échange", "Contre-offre", "Échange accepté", "Demande d'ami", "Défi", "Invitation de guilde"]);
    expect([n("marketplace_auction_unsold", { card_title: "X" }), n("marketplace_wishlist_listed", { card_title: "Y" }), n("trade_offer", { initiator_username: "A" }), n("trade_countered", { initiator_username: "B" }), n("trade_accepted", { recipient_username: "C" }), n("friend_request", { requester_username: "D" }), n("battle_invite", { challenger_username: "E" }), n("guild_invite", { guild_name: "G", inviter_username: "F" }), n("guild_invite", { guild_name: "G" })].map((x) => x.message))
      .toEqual(["X", "Y", "de A", "de B", "par C", "de D", "de E", "G, de F", "G"]);
  });
  it("keeps an unknown kind's own text, cleaned, and its state", () => {
    expect(n("new_thing", { title: "🎉 Bravo !!", message: "Tu as  gagné ! " }, { read: 1, created_at: "t" })).toEqual({ id: "1", type: "new_thing", title: "Bravo", message: "Tu as gagné", read: true, at: "t", href: null });
    expect(nNotification({ id: "2" })).toEqual({ id: "2", type: null, title: "Notification", message: "", read: false, at: null, href: null });
  });
});

describe("pickCopy and validateCards, edges", () => {
  it("prefers the same finish, then the newest; none of mine is null", () => {
    const row = (id, shiny, t) => ({ id, is_shiny: shiny, obtained_at: t, card: { id: "c" } });
    expect(pickCopy([row("a", false, "2026-01-01"), row("b", true, "2026-03-01"), row("c", false, "2026-02-01")], { id: "c", is_shiny: false }).id).toBe("c");
    expect(pickCopy([row("a", false, "2026-01-01"), row("b", true, "2026-03-01")], { id: "c", is_shiny: true }).id).toBe("b");
    expect(pickCopy([row("a", false, null), row("b", false, "2026-01-01")], { id: "c" }).id).toBe("b");
    expect(pickCopy(null, { id: "c" })).toBe(null);
  });
  it("warns only when more than half the cards lost both their id and rarity", () => {
    const warn = console.warn; const said = []; console.warn = (m) => said.push(m);
    try {
      expect(validateCards("x", [{ id: null }, { id: null }, { id: 1, rarity: "C" }])).toBe(false);
      expect(validateCards("x", [{ id: null }, { id: 1 }])).toBe(true);
      expect(validateCards("x", [{ id: null, rarity: "C" }, { id: null, rarity: "R" }])).toBe(true);
      expect(validateCards("x", [])).toBe(true);
    } finally { console.warn = warn; }
    expect(said.length).toBe(1);
    expect(said[0]).toContain("x: 2/3 cards failed");
  });
});

describe("nTrade and nMessage", () => {
  const t = {
    id: "t", status: "pending", initiator_id: "me", recipient_id: "a", recipient: { id: "a", username: "Alix", avatar_url: "p.png" }, initiator_wikibidous: 5, recipient_wikibidous: 0,
    parent_trade_id: "p", created_at: "c", updated_at: "u",
    items: [
      { id: "i1", user_card_id: "u1", offered_by: "me", is_shiny: true, snapshot_rarity: "L", snapshot_atk: 9, snapshot_def: 8, card: { id: "c1", rarity: "C", atk: 1, def: 1 } },
      { id: "i2", user_card_id: "u2", offered_by: "a", card_id: "c2" },
      { id: "i3", user_card_id: "u3", offered_by: "a", card: { id: "c3", rarity: "R", atk: 3, def: 4, is_shiny: true } },
    ],
  };
  it("reads a trade I sent: what I give, what I get, the coins and the snapshot stats", () => {
    const r = nTrade(t, "me");
    expect(r).toMatchObject({ id: "t", status: "pending", incoming: false, other: { id: "a", username: "Alix", avatar: "p.png" }, giveCoins: 5, getCoins: 0, parentId: "p", createdAt: "c", updatedAt: "u" });
    expect(r.give).toEqual([{ itemId: "i1", userCardId: "u1", is_shiny: true, card: nCard({ id: "c1", rarity: "L", atk: 9, def: 8 }) }]);
    expect(r.get.map((x) => [x.itemId, x.card.id, x.card.rarity, x.card.atk, x.card.def, x.is_shiny])).toEqual([["i2", "c2", undefined, 0, 0, false], ["i3", "c3", "R", 3, 4, true]]);
  });
  it("reads the same trade from the other side, with defaults for what is missing", () => {
    const r = nTrade({ ...t, initiator: null, status: undefined, updated_at: undefined, parent_trade_id: undefined, recipient_wikibidous: undefined, items: undefined }, "a");
    expect(r).toMatchObject({ status: "pending", incoming: true, other: { id: "me", username: "?", avatar: null }, giveCoins: 0, getCoins: 5, parentId: null, updatedAt: "c", give: [], get: [] });
    expect(nTrade({ id: "x", initiator_id: "b", recipient_id: "me" }, "me").createdAt).toBe(null);
  });
  it("reads a chat message", () => {
    expect(nMessage({ id: "m", sender_id: "me", content: "Salut", created_at: "t" }, "me")).toEqual({ id: "m", mine: true, content: "Salut", at: "t" });
    expect(nMessage({ id: "m", sender_id: "a" }, "me")).toEqual({ id: "m", mine: false, content: "", at: null });
  });
});

describe("plainText, in the middle", () => {
  it("drops only the trailing exclamation marks, never one inside the text", () => {
    expect(plainText("Bravo ! Tu as gagné !")).toBe("Bravo ! Tu as gagné");
    expect(plainText("Vite!!")).toBe("Vite");
  });
});
