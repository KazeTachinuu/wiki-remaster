/**
 * Mock adapter (localhost dev). Talks to the local mock API's /api/* and normalizes to the
 * same shapes as the real adapter, so components behave identically without the real site.
 */

import { json, postJson } from "../api.js";
import { nCard, nAuction, nBid, nNotification, normSearch, validateCards } from "../schema.js";

export const MockData = {
  isReal: false,
  canReset: true,
  canAct: true,
  userId: "me",

  async profile() {
    const p = await json("/api/profile");
    return {
      username: p.username,
      packs_remaining: p.packs_remaining,
      pack_cap: p.pack_cap,
      currency: p.currency_balance,
      next_regen_seconds: p.next_regen_seconds,
      is_pro: !!p.is_pro,
    };
  },

  async openPack() {
    const d = await json("/api/packs/open", { method: "POST" });
    if (d.error) throw new Error(d.error);
    return {
      cards: d.cards.map((c) => ({ ...nCard(c), is_new: c.is_new, is_shiny: c.is_shiny })),
      packs_remaining: d.packs_remaining,
      currency: d.currency_balance,
    };
  },

  async collection(opts = {}) {
    const d = await json("/api/my-collection");
    const items = d.collection.map((it) => {
      const card = nCard(it.card);
      return {
        id: it.id,
        card,
        count: it.count,
        is_shiny: it.is_shiny,
        starred: it.starred,
        obtained_at: it.obtained_at || null,
        _s: normSearch(card.title + " " + (card.category || "")),
      };
    });
    const stats = { ...d.stats, loading: false };
    opts.onPartial?.({ items: items.slice(), stats });
    return { items, stats };
  },

  async cards() {
    const d = await json("/api/cards");
    return { cards: d.cards.map(nCard) };
  },

  // Catalog (dev): the mock returns the whole small fixture; we filter/own/wishlist locally.
  // NOTE: this client-side filter is fine ONLY because the mock catalog is tiny. The real
  // catalog is ~2.77M rows and MUST stay server-paged (see RealData.catalog).
  async catalog(opts = {}) {
    const rarity = opts.rarity ? `&rarity=${opts.rarity}` : "";
    const wishlist = opts.wishlist ? "&wishlist=1" : "";
    const d = await json(`/api/cards?page=${opts.page ?? 0}&sort=${opts.sort || "rarity"}&q=${encodeURIComponent(opts.q || "")}${rarity}${wishlist}`);
    const owned = new Set(d.ownedCardIds || []);
    const wish = new Set(d.wishlistCardIds || []);
    const cards = (d.cards || []).map((c) => ({ ...nCard(c), owned: owned.has(c.id), wishlisted: wish.has(c.id) }));
    validateCards("catalog", cards);
    return { cards, total: d.total ?? null, hasMore: !!d.searchHasMore, rarityCounts: d.rarityCounts || null };
  },

  async marketplace(opts = {}) {
    const rarity = opts.rarity ? `&rarity=${opts.rarity}` : "";
    const d = await json(`/api/marketplace?page=${opts.page ?? 0}&q=${encodeURIComponent(opts.q || "")}${rarity}`);
    return { auctions: (d.auctions || []).map(nAuction), page: d.page ?? 0, hasMore: !!d.hasMore };
  },

  async marketplaceMine() {
    try { return await json("/api/marketplace/mine"); }
    catch { return { sellingCount: 0, maxConcurrentAuctions: 5 }; }
  },

  async createAuction(item, { price, durationHours } = {}) {
    const r = await fetch(`/api/marketplace`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ card_id: item.card?.id, base_amount: price, duration_minutes: Math.round((durationHours || 0) * 60) }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(d.error || "Mise en vente refusée."); e.code = d.code; throw e; }
    return d;
  },

  async placeBid(auctionId, amount) {
    const r = await fetch(`/api/marketplace/${auctionId}/bid`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ amount }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(d.error || "Enchère refusée."); e.code = d.code; e.min = d.min; throw e; }
    return d;
  },

  async auction(id) {
    const d = await json(`/api/marketplace/${id}`);
    return { ...nAuction(d.auction || {}), bids: (d.bids || []).map(nBid) };
  },

  wishlistAdd: (cardId) => postJson("/api/wishlist", { card_id: cardId }),
  wishlistRemove: (cardId) => postJson("/api/unwishlist", { card_id: cardId }),

  async notifications() {
    try {
      const d = await json("/api/notifications");
      return (d.notifications || []).map(nNotification);
    } catch { return []; }
  },

  reset: () => json("/api/reset", { method: "POST" }),
  discard: (ucId) => postJson("/api/discard", { user_card_id: ucId }),

  async marketStats(card) {
    // Deterministic synthesis for local dev, seeded by card id so a card's value is stable.
    const base = { C: 8, PC: 20, R: 45, SR: 110, UR: 260, L: 600 }[card.rarity] || 20;
    let s = [...String(card.id)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
    const next = () => { s = (s * 1103515245 + 12345) >>> 0; return s / 4294967296; };
    const count = 3 + Math.floor(next() * 6);
    const sold = Array.from({ length: count }, () => Math.round(base * (0.7 + next() * 0.8)));
    const mean = (a) => Math.round(a.reduce((x, y) => x + y, 0) / a.length);
    const now = Date.now();
    const soldSeries = sold.map((price, i) => ({ price, t: now - (count - i) * 86400000 }));
    return {
      soldCount: sold.length,
      soldAvg: mean(sold),
      soldMin: Math.min(...sold),
      soldMax: Math.max(...sold),
      soldSeries,
      activeCount: 1 + Math.floor(next() * 3),
      lowestAsk: Math.round(base * 0.9),
    };
  },

  async specialAvailable() { return false; },
};
