/**
 * Real adapter: wiki-masters.com's own /api with the live session.
 * Every call here is verified against the live site (docs/API_REFERENCE.md).
 */

import { api, getProfile, patchProfile, bumpEpoch, getUserId, refreshProfile } from "../api.js";
import { nCard, nAuction, nBid, nNotification, normSearch, countsFrom, validateCards } from "../schema.js";

const PAGE = 50; // server page size; the market rejects limit > 50
const PACK_CAP = 10;
const REGEN_MS = 600000; // ponytail: assumed 1 pack / 10 min, the API does not expose the interval

// Catalog ids already owned, to flag new cards on pack open.
let ownedIds = null;

const qs = (params) =>
  new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== "" && v !== false)).toString();

function mapCollection(rows) {
  return rows.map((it) => {
    const card = nCard(it.card);
    return {
      id: it.id, // user card id: what discard, bulk-discard and selling expect
      card,
      count: it.count ?? 1,
      is_shiny: !!it.is_shiny,
      starred: !!it.starred,
      obtained_at: it.obtained_at || null,
      _s: normSearch(card.title + " " + card.category),
    };
  });
}

export const RealData = {
  isReal: true,
  canReset: false,
  get userId() { return getUserId(); },

  async profile() {
    if (getProfile()?.packs_remaining == null) await refreshProfile();
    const p = getProfile() || {};
    const balance = await api("/api/wikibidous").then((d) => d.balance, () => p.wikibidous_balance ?? null);
    const packs = p.packs_remaining ?? null;
    const last = Date.parse(p.packs_last_regen_at || "");
    const regen = packs != null && packs < PACK_CAP && !isNaN(last);
    return {
      username: p.username || null,
      packs_remaining: packs,
      pack_cap: PACK_CAP,
      currency: balance,
      next_regen_seconds: regen ? Math.max(0, Math.round((last + REGEN_MS - Date.now()) / 1000)) : null,
      is_pro: !!p.is_pro,
    };
  },

  async openPack() {
    ownedIds ??= await this.collection().then((c) => new Set(c.items.map((it) => it.card.id)), () => null);
    let d;
    try {
      d = await api("/api/packs/open", { method: "POST" });
    } catch (e) {
      if (e.data?.packs_remaining != null) { bumpEpoch(); patchProfile({ packs_remaining: e.data.packs_remaining }); }
      if (e.data?.human_verification_required) e.code = "human_verification";
      throw e;
    }
    bumpEpoch();
    patchProfile({ packs_remaining: d.packs_remaining });
    const cards = (d.cards || []).map((c) => {
      const is_new = !!ownedIds && !ownedIds.has(c.id);
      ownedIds?.add(c.id);
      return { ...nCard(c), is_new, is_shiny: !!c.is_shiny };
    });
    return { cards, packs_remaining: d.packs_remaining };
  },

  /**
   * Every page of the collection (50 per page, `limit` ignored). Page 0 streams first via
   * onPartial. Pages are merged by id: the server's rarity order has no tiebreak, so a card
   * gained mid-load shifts rows and the same row can land on two pages.
   */
  async collection({ onPartial } = {}) {
    const first = await api("/api/my-collection?sort=rarity&page=0&stats=1");
    const rows = new Map();
    const add = (list) => { for (const it of mapCollection(list || [])) rows.set(it.id, it); };
    add(first.collection);
    const items = () => [...rows.values()];
    const total = first.total ?? rows.size;
    const stats = (loading) => ({
      unique: total,
      total: items().reduce((n, it) => n + it.count, 0),
      counts: first.rarityCounts || countsFrom(items()),
      loading,
    });
    const pages = Math.ceil(total / PAGE);
    if (pages > 1) {
      onPartial?.({ items: items(), stats: stats(true) });
      await Promise.all(
        Array.from({ length: pages - 1 }, (_, i) =>
          api(`/api/my-collection?sort=rarity&page=${i + 1}&stats=0`).then((d) => {
            add(d.collection);
            onPartial?.({ items: items(), stats: stats(true) });
          })
        )
      );
    }
    ownedIds = new Set(items().map((it) => it.card.id));
    return { items: items(), stats: stats(false) };
  },

  /** The full catalog (~2.77M cards): always server-paged and searched. Pages are 0-based. */
  async catalog({ page = 0, sort = "rarity", q, rarity, wishlist } = {}) {
    const d = await api(`/api/cards?${qs({ page, sort, q, rarity, wishlist: wishlist && 1 })}`);
    const owned = new Set(d.ownedCardIds);
    const wished = new Set(d.wishlistCardIds);
    const cards = (d.cards || []).map((c) => ({ ...nCard(c), owned: owned.has(c.id), wishlisted: wished.has(c.id) }));
    validateCards("catalog", cards);
    return { cards, total: d.total ?? null, hasMore: !!d.searchHasMore, rarityCounts: d.rarityCounts || null };
  },

  /** Market browse. Pages are 1-based on the server (page=0 aliases page 1); ours are 0-based. */
  async marketplace({ page = 0, sort = "recent", q, rarity } = {}) {
    const d = await api(`/api/marketplace?${qs({ page: page + 1, limit: PAGE, sort, q, rarity })}`);
    return { auctions: (d.auctions || []).map(nAuction), hasMore: !!d.hasMore };
  },

  /** My market: listings, active bids, wins, and finished history, in one call. */
  async myMarket() {
    const d = await api("/api/marketplace?page=1&limit=1&mine=1");
    const list = (k) => (d[k] || []).map(nAuction);
    return { selling: list("selling"), bidding: list("bidding"), won: list("won"), history: list("history"), max: d.maxConcurrentAuctions ?? 5 };
  },

  async auction(id) {
    const d = await api(`/api/marketplace/${id}`);
    return { ...nAuction(d.auction), bids: (d.bids || []).map(nBid) };
  },

  /** List an owned copy. `card_id` is the user card id, not the catalog id. Returns { auction_id }. */
  createAuction: (item, { price, durationHours }) =>
    api("/api/marketplace", { method: "POST", body: { card_id: item.id, base_amount: price, duration_minutes: Math.round(durationHours * 60) } }),

  /** 409 bid_too_low carries `min`. The amount is held from the balance immediately. */
  placeBid: (id, amount) => api(`/api/marketplace/${id}/bid`, { method: "POST", body: { amount } }),

  /** Lower the starting price. Only below the current base, and only past half the duration. */
  reprice: (id, amount) => api(`/api/marketplace/${id}/reprice`, { method: "POST", body: { new_base_amount: amount } }),

  /** Cancel my listing; the card returns to the collection. */
  cancelAuction: (id) => api(`/api/marketplace/${id}`, { method: "DELETE" }),

  /** Finalize an ended auction. */
  settle: (id) => api(`/api/marketplace/${id}/settle`, { method: "POST" }),

  /**
   * Price data. The summary average is open to everyone and keyed by rarity (a card's rarity
   * can change; old sales keep theirs). The full sale history is Pro-only (403 pro_required).
   */
  async marketStats(card) {
    const d = await api(`/api/marketplace/cards/${card.id}/sales?scope=summary`);
    const stats = { soldAvg: d.summary?.[card.rarity]?.average ?? null, soldSeries: [], soldCount: 0, soldMin: null, soldMax: null, isPro: !!d.isPro };
    if (!d.isPro) return stats;
    const sales = (await api(`/api/marketplace/cards/${card.id}/sales`).catch(() => ({}))).sales || [];
    const series = sales
      .filter((s) => s.final_price != null)
      .map((s) => ({ price: s.final_price, t: Date.parse(s.settled_at || "") || 0 }))
      .sort((a, b) => a.t - b.t);
    const prices = series.map((s) => s.price);
    if (prices.length) {
      Object.assign(stats, { soldSeries: series, soldCount: prices.length, soldMin: Math.min(...prices), soldMax: Math.max(...prices) });
      stats.soldAvg ??= Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    }
    return stats;
  },

  notifications: () => api("/api/notifications").then((d) => (d.notifications || []).map(nNotification)),

  /** Mark notifications read; no ids marks all. */
  markRead: (ids) => api("/api/notifications", { method: "PATCH", body: ids ? { ids } : {} }),

  /** +1 WikiBidou per card. Returns { balance }. */
  discard: (userCardId) => api(`/api/user-cards/${userCardId}/discard`, { method: "POST" }),

  /** Returns { discarded_count, failed[] }. */
  bulkDiscard: (userCardIds) => api("/api/user-cards/bulk-discard", { method: "POST", body: { card_ids: userCardIds } }),

  /** A native special/Pro pack is claimable (opened on the native site). */
  specialAvailable: () => api("/api/packs/special").then((d) => !!d.available, () => false),
};
