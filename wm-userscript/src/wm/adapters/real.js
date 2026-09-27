/**
 * Real adapter (wiki-masters.com). Calls the site's own /api/* with the live session and
 * reads the profile captured from the app's Supabase traffic (see ../api.js).
 *
 * Only verified endpoints are wired here. Unverified writes (listing, buy, cancel) route to
 * the native site from the components rather than guessing an endpoint. Wishlist writes are a
 * documented best-guess that fails safe (a rejection rolls the optimistic toggle back).
 */

import { json, postJson, getProfile, patchProfile, bumpEpoch, getUserId } from "../api.js";
import { nCard, nAuction, nBid, nNotification, normSearch, countsFrom, validateCards } from "../schema.js";

let ownedIds = new Set(); // to derive is_new on pack open
let ownedLoaded = false; // true once the collection has been read at least once

export const RealData = {
  isReal: true,
  canReset: false,
  canAct: true,

  async profile() {
    // Everything here comes from the app's own sync_profile_packs call, captured at
    // runtime. wikibidous_balance and packs_remaining are documented fields of that
    // payload; there is no separate currency endpoint.
    let balance = null;
    try { balance = (await json("/api/wikibidous")).balance; } catch {}
    const cap = getProfile() || {};
    const packs = cap.packs_remaining ?? null;
    // One pack regenerates every 10 minutes (cap 10). Compute the countdown from the
    // last regen timestamp the profile provides.
    let nextRegen = null;
    if (packs != null && packs < 10 && cap.packs_last_regen_at) {
      const last = Date.parse(cap.packs_last_regen_at);
      if (!isNaN(last)) nextRegen = Math.max(0, Math.round((last + 600000 - Date.now()) / 1000));
    }
    return {
      username: cap.username || null,
      packs_remaining: packs,
      pack_cap: 10,
      currency: balance ?? cap.wikibidous_balance ?? null,
      next_regen_seconds: nextRegen,
      is_pro: !!cap.is_pro,
    };
  },

  async openPack() {
    // Know what was already owned before deciding which cards are new.
    if (!ownedLoaded) {
      try { await this.collection(); } catch {}
    }
    // Read the raw response so we can catch the human-verification challenge the server
    // returns (the "are you still here?" Turnstile step) instead of a generic failure.
    const r = await fetch("/api/packs/open", { method: "POST", credentials: "include" });
    let d = {};
    try { d = await r.json(); } catch {}
    if (!r.ok || d.error) {
      if (d.packs_remaining != null) {
        bumpEpoch();
        patchProfile({ packs_remaining: d.packs_remaining });
      }
      if (d.human_verification_required) {
        const e = new Error("Vérification humaine requise");
        e.code = "human_verification";
        throw e;
      }
      throw new Error(d.error || "Ouverture du paquet impossible.");
    }
    const cards = (d.cards || []).map((c) => {
      const isNew = ownedLoaded ? !ownedIds.has(c.id) : false;
      ownedIds.add(c.id);
      return { ...nCard(c), is_new: isNew, is_shiny: !!c.is_shiny };
    });
    // Keep the captured pack count in sync so the wallet and Pulls counter decrement.
    // Opening a pack is free, so currency is unchanged; report the last known balance.
    if (d.packs_remaining != null) {
      bumpEpoch(); // any sync already in flight is now stale for this field
      patchProfile({ packs_remaining: d.packs_remaining });
    }
    let currency = null;
    try { currency = (await json("/api/wikibidous")).balance; } catch {}
    return { cards, packs_remaining: d.packs_remaining, currency: currency ?? getProfile()?.wikibidous_balance ?? null };
  },

  async collection(opts = {}) {
    // 50 per page, `limit` ignored. Show page 0 immediately via onPartial, then fill the
    // remaining pages in parallel and report progress, so a slow API never blocks the grid.
    const map = (arr) => arr.map((it) => {
      const card = nCard(it.card);
      return {
        id: it.id, card, count: it.count ?? 1,
        is_shiny: !!it.is_shiny, starred: !!it.starred, obtained_at: it.obtained_at || null,
        _s: normSearch(card.title + " " + (card.category || "")),
      };
    });
    const first = await json("/api/my-collection?sort=rarity&page=0&stats=1");
    const total = first.total ?? null;
    const realCounts = first.rarityCounts || null;
    let items = map(first.collection || []);
    const statsOf = (loading) => ({
      unique: total ?? items.length,
      total: items.reduce((n, it) => n + it.count, 0),
      catalog: null,
      counts: realCounts || countsFrom(items),
      loading,
    });
    if (total && total > items.length) {
      opts.onPartial?.({ items: items.slice(), stats: statsOf(true) });
      const pages = Math.ceil(total / 50);
      await Promise.all(
        Array.from({ length: pages - 1 }, (_, i) =>
          json(`/api/my-collection?sort=rarity&page=${i + 1}&stats=0`)
            .then((d) => { items = items.concat(map(d.collection || [])); opts.onPartial?.({ items: items.slice(), stats: statsOf(true) }); })
            .catch(() => {})
        )
      );
    }
    ownedIds = new Set(items.map((it) => it.card.id));
    ownedLoaded = true;
    return { items, stats: statsOf(false) };
  },

  async cards() {
    const d = await json("/api/cards?page=0&sort=rarity");
    return { cards: (d.cards || d.items || []).map(nCard) };
  },

  // Catalog: the full master set. Verified live shape (RSC-fetched):
  //   /api/cards?page&sort&q -> { cards[], total, searchHasMore, rarityCounts,
  //     ownedCardIds[], wishlistCardIds[], friendOwners{}, friendPendingOfferKeys[] }
  // total is null when q is present; searchHasMore drives pagination. 50 cards/page.
  // MUST stay server-paged/searched: the catalog is ~2.77M rows, never load-all.
  // Only sort=rarity is confirmed live; other sort values are gated until probed.
  async catalog(opts = {}) {
    const page = opts.page ?? 0;
    const sort = opts.sort || "rarity"; // verified sorts: rarity | name | atk | def
    const q = opts.q ? `&q=${encodeURIComponent(opts.q)}` : "";
    const rarity = opts.rarity ? `&rarity=${opts.rarity}` : ""; // verified param
    const wishlist = opts.wishlist ? "&wishlist=1" : ""; // verified param
    const d = await json(`/api/cards?page=${page}&sort=${sort}${q}${rarity}${wishlist}`);
    const owned = new Set(d.ownedCardIds || []);
    const wish = new Set(d.wishlistCardIds || []);
    const friends = d.friendOwners || {};
    const cards = (d.cards || []).map((c) => ({
      ...nCard(c),
      owned: owned.has(c.id),
      wishlisted: wish.has(c.id),
      friendCount: Array.isArray(friends[c.id]) ? friends[c.id].length : 0,
    }));
    validateCards("catalog", cards);
    return { cards, total: d.total ?? null, hasMore: !!d.searchHasMore, rarityCounts: d.rarityCounts || null };
  },

  // Marketplace browse. Verified live shape (2026-09-27):
  //   /api/marketplace?page&q -> { auctions[], page, limit, hasMore }, open to all.
  async marketplace(opts = {}) {
    const page = opts.page ?? 0;
    const q = opts.q ? `&q=${encodeURIComponent(opts.q)}` : "";
    const rarity = opts.rarity ? `&rarity=${opts.rarity}` : ""; // verified filter
    const d = await json(`/api/marketplace?page=${page}${q}${rarity}`);
    return { auctions: (d.auctions || []).map(nAuction), page: d.page ?? page, hasMore: !!d.hasMore };
  },

  // Verified: returns ONLY { sellingCount, maxConcurrentAuctions } (5 free / 10 PRO).
  async marketplaceMine() {
    try { return await json("/api/marketplace/mine"); }
    catch { return { sellingCount: 0, maxConcurrentAuctions: 5 }; }
  },

  // Create a listing for one owned card. VERIFIED live (2026-09-27) by capturing the real
  // request from the native sell form:
  //   POST /api/marketplace  { card_id, base_amount, duration_minutes }
  // (card_id is the catalog card id; base_amount is the starting price; duration is minutes.)
  // Fails safe: a non-2xx throws with the server's message so the caller shows the error.
  async createAuction(item, { price, durationHours } = {}) {
    const r = await fetch(`/api/marketplace`, {
      method: "POST", credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ card_id: item.card?.id, base_amount: price, duration_minutes: Math.round((durationHours || 0) * 60) }),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(d.error || "Mise en vente refusée."); e.code = d.code; throw e; }
    return d;
  },

  // Place a bid. Verified live (2026-09-27):
  //   POST /api/marketplace/{auctionId}/bid  { amount }
  //   200 -> { auction_id, current_bid, bidder_balance }
  //   409 -> { error, code:"bid_too_low", min }
  async placeBid(auctionId, amount) {
    const r = await fetch(`/api/marketplace/${auctionId}/bid`, {
      method: "POST", credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(d.error || "Enchère refusée."); e.code = d.code; e.min = d.min; throw e; }
    return d; // { auction_id, current_bid, bidder_balance }
  },

  // One auction with live state + bid history. Verified: GET /api/marketplace/{id}
  //   -> { auction:{...}, bids:[{ amount, placed_at, bidder{username} }] }
  async auction(id) {
    const d = await json(`/api/marketplace/${id}`);
    return { ...nAuction(d.auction || {}), bids: (d.bids || []).map(nBid) };
  },

  // Our own user id (captured from the app's Supabase calls), to tell if we are top bidder.
  get userId() { return getUserId(); },

  // Wishlist writes are UNVERIFIED (no endpoint in the client bundle; only the read field
  // wishlistCardIds is live). Best-guess REST, fail safe: a rejection throws so the caller
  // rolls the toggle back and shows an error rather than lying about success.
  wishlistAdd: (cardId) => postJson(`/api/cards/${cardId}/wishlist`, {}),
  wishlistRemove: (cardId) => json(`/api/cards/${cardId}/wishlist`, { method: "DELETE" }),

  async notifications() {
    try {
      const d = await json("/api/notifications");
      return (d.notifications || []).map(nNotification);
    } catch { return []; }
  },

  // Verified writes only: discard and bid. Listing/buy/cancel/wishlist are not verified,
  // so they route to the native site (see the components) instead of guessing an endpoint.
  discard: (ucId) => postJson(`/api/user-cards/${ucId}/discard`, {}),

  // Verified market source (from the client): GET /api/marketplace/cards/{cardId}/sales
  // -> { sales: [{ final_price, settled_at, rarity }] }. It is PRO-gated: a non-Pro account
  // gets { code:"pro_required" }, which the real client shows as a distinct "Pro only" state
  // (not a generic error). We mirror that: return { proRequired:true } so the tab can say so,
  // instead of claiming the market is unavailable for every card. Sold history only.
  async marketStats(card) {
    let d;
    try {
      const r = await fetch(`/api/marketplace/cards/${card.id}/sales`, { credentials: "include" });
      d = await r.json().catch(() => ({}));
      if (!r.ok) return d.code === "pro_required" ? { proRequired: true } : null;
    } catch { return null; }
    const sales = Array.isArray(d.sales) ? d.sales : null;
    if (!sales) return null;
    const priced = sales.filter((s) => s.final_price != null);
    const prices = priced.map((s) => s.final_price);
    const soldSeries = priced
      .map((s) => ({ price: s.final_price, t: Date.parse(s.settled_at || "") || 0 }))
      .sort((a, b) => a.t - b.t);
    const mean = (a) => (a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : null);
    return {
      soldCount: prices.length,
      soldAvg: mean(prices),
      soldMin: prices.length ? Math.min(...prices) : null,
      soldMax: prices.length ? Math.max(...prices) : null,
      soldSeries,
      activeCount: 0, // this endpoint is settled sales only
      lowestAsk: null,
    };
  },

  async specialAvailable() {
    // Native special/Pro pack: surface it so it is never hidden by our overlay.
    try {
      const d = await json("/api/packs/special");
      return !!(d && (d.available || (d.packs || []).length));
    } catch { return false; }
  },
};
