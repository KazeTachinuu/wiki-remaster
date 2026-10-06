/**
 * Real adapter: wiki-masters.com's own /api with the live session.
 * Every call here is verified against the live site (docs/API_REFERENCE.md).
 */

import { pageLane } from "../lane.js";
import { api, getProfile, patchProfile, bumpEpoch, getUserId, refreshProfile } from "../api.js";
import { newInPack, nCard, nAuction, nBid, nNotification, nTrade, nMessage, normSearch, countsFrom, validateCards } from "../schema.js";
import { whoAmI, chatMe, otherOf, needMe } from "../trades.js";

const PAGE = 50; // server page size; the market rejects limit > 50
const PACK_CAP = 10;
// one pack per period, faster for Pro: the game's own constants (PACK_REGEN_PERIOD_MS and
// PACK_REGEN_PERIOD_PRO_MS in its client), the API does not send them
const REGEN_MS = { base: 10 * 60e3, pro: 3 * 60e3 };
let lastBalance = null;
const SAME_CARD_MS = 60e3;
const sameCards = new Map(); // card id -> { at, list: Promise }

// Trade writes carry the viewer's time zone, like the native client.
const tz = () => ({ "x-wiki-calendar-tz": Intl.DateTimeFormat().resolvedOptions().timeZone });
const ACTION_LABEL = { accept: "Acceptation de l'échange", decline: "Refus de l'échange", cancel: "Annulation de l'offre" };


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

/**
 * An opened pack (normal, Pro daily or special): its cards, the new ones marked from
 * `owned_copies` (every copy I own of them, counted after the opening, as the game reads it), and
 * those copies as collection rows for the saved collection. Without that list (the Pro and
 * special packs do not send it), nothing is marked new and `copies` is null.
 */
function packResult(d) {
  const fresh = newInPack((d.cards || []).map((c) => c.id), d.owned_copies);
  const cards = (d.cards || []).map((c) => ({ ...nCard(c), is_new: !!fresh?.has(c.id), is_shiny: !!c.is_shiny }));
  const raw = new Map((d.cards || []).map((c) => [c.id, c]));
  const copies = Array.isArray(d.owned_copies) ? mapCollection(d.owned_copies.filter((o) => raw.has(o.card_id)).map((o) => ({ ...o, card: raw.get(o.card_id) }))) : null;
  return { cards, copies };
}

export const RealData = {
  isReal: true,
  canReset: false,
  get userId() { return getUserId(); },

  /**
   * Packs, coins and Pro status. `sync` asks the game for its pack count first (a pack is due);
   * `balance: false` reuses the last coin balance (a profile re-read that cannot have moved coins).
   */
  async profile({ sync = false, balance = true } = {}) {
    if (sync || getProfile()?.packs_remaining == null) await refreshProfile();
    const p = getProfile() || {};
    if (balance || lastBalance == null) lastBalance = await api("/api/wikibidous", { quiet: true }).then((d) => d.balance, () => lastBalance ?? p.wikibidous_balance ?? null);
    const packs = p.packs_remaining ?? null;
    const last = Date.parse(p.packs_last_regen_at || "");
    const regen = packs != null && packs < PACK_CAP && !isNaN(last);
    return {
      username: p.username || null,
      packs_remaining: packs,
      pack_cap: PACK_CAP,
      currency: lastBalance,
      regen_seconds: REGEN_MS[p.is_pro ? "pro" : "base"] / 1000, // one pack's wait, for the progress to the next
      next_regen_seconds: regen ? Math.max(0, Math.round((last + REGEN_MS[p.is_pro ? "pro" : "base"] - Date.now()) / 1000)) : null,
      is_pro: !!p.is_pro,
      is_vip: !!p.is_vip,
    };
  },

  async openPack() {
    let d;
    try {
      d = await api("/api/packs/open", { method: "POST" });
    } catch (e) {
      if (e.data?.packs_remaining != null) { bumpEpoch(); patchProfile({ packs_remaining: e.data.packs_remaining }); }
      throw e;
    }
    bumpEpoch();
    patchProfile({ packs_remaining: d.packs_remaining });
    return { ...packResult(d), packs_remaining: d.packs_remaining };
  },

  /** Pro's daily pack, by this device's calendar day (like the game): { eligible, claimedToday }. */
  async proDaily() {
    const d = await api("/api/packs/pro-daily", { headers: tz(), quiet: true });
    return { eligible: !!d.eligible, claimedToday: !!d.claimed_today };
  },
  openProDaily: () => api("/api/packs/pro-daily", { method: "POST", headers: tz(), label: "Ouverture du pack PRO" }).then(packResult),

  /** Special packs (the game turns them on): { packs: [{ id, name, description }], available, vip, nextAt }. */
  async specialPacks() {
    const d = await api("/api/packs/special", { quiet: true });
    return { packs: d.packs || [], available: !!d.available, vip: !!d.is_vip, nextAt: d.next_available_at || null };
  },
  openSpecial: (packId) => api("/api/packs/special", { method: "POST", body: { packId }, label: "Ouverture du pack spécial" }).then(packResult),

  /** V.I.P. out of packs: ask the game for some back. */
  async grace() {
    const d = await api("/api/packs/grace", { method: "POST", label: "Demande de paquets" });
    bumpEpoch();
    patchProfile({ packs_remaining: d.packs_remaining, packs_last_regen_at: d.packs_last_regen_at });
    return d;
  },

  /**
   * Every page of the collection (50 per page, `limit` ignored). Page 0 streams first via
   * onPartial. Pages are merged by id: the server's rarity order has no tiebreak, so a card
   * gained mid-load shifts rows and the same row can land on two pages. `pending` lists my
   * copies already locked in a pending trade (an array: the result is cached as JSON).
   */
  async collection({ onPartial } = {}) {
    const first = await api("/api/my-collection?sort=rarity&page=0&stats=1");
    const pending = first.pendingTradeCardIds || [];
    const rows = new Map();
    const add = (list) => { for (const it of mapCollection(list || [])) rows.set(it.id, it); };
    add(first.collection);
    const items = () => [...rows.values()];
    // every copy is its own row (count is always 1, checked by test:prod): `total` counts copies,
    // distinct cards are counted from the rows
    const copies = first.total ?? rows.size;
    const stats = (loading) => ({
      copies,
      unique: new Set(items().map((it) => it.card.id)).size,
      counts: first.rarityCounts || countsFrom(items()),
      loading,
    });
    const pages = Math.ceil(copies / PAGE);
    if (pages > 1) {
      onPartial?.({ items: items(), stats: stats(true) });
      await Promise.all(
        Array.from({ length: pages - 1 }, (_, i) =>
          // the remaining pages have their own "Mise à jour" pill (no global loader), paced by the
          // page lane rather than sent all at once
          pageLane.run(() => api(`/api/my-collection?sort=rarity&page=${i + 1}&stats=0`, { quiet: true })).then((d) => {
            add(d.collection);
            onPartial?.({ items: items(), stats: stats(true) });
          })
        )
      );
    }
    return { items: items(), stats: stats(false), pending };
  },

  /** The full catalog (~2.77M cards): always server-paged and searched. Pages are 0-based. */
  async catalog({ page = 0, sort = "rarity", q, rarity, wishlist } = {}) {
    const d = await api(`/api/cards?${qs({ page, sort, q, rarity, wishlist: wishlist && 1 })}`);
    const owned = new Set(d.ownedCardIds);
    const wished = new Set(d.wishlistCardIds);
    const cards = (d.cards || []).map((c) => ({ ...nCard(c), owned: owned.has(c.id), wishlisted: wished.has(c.id) }));
    validateCards("catalog", cards);
    // browsing has a total; a search (total null) only says whether more pages exist
    const total = d.total ?? null;
    return { cards, total, hasMore: total != null ? (page + 1) * PAGE < total : !!d.searchHasMore, rarityCounts: d.rarityCounts || null };
  },

  /** Market browse. Pages are 1-based on the server (page=0 aliases page 1); ours are 0-based. */
  async marketplace({ page = 0, sort = "recent", q, rarity, quiet } = {}) {
    const d = await api(`/api/marketplace?${qs({ page: page + 1, limit: PAGE, sort, q, rarity })}`, { quiet });
    return { auctions: (d.auctions || []).map((a) => nAuction(a, this.userId)), hasMore: !!d.hasMore };
  },

  /**
   * Every live listing of one card. The market only searches by text, so this searches the
   * title (no rarity filter: a card's rarity can change) and keeps the exact card id.
   */
  sameCard(card) {
    if (!card.title) return Promise.resolve([]);
    // remembered a minute: moving between listings of one card (or reopening it) asks once
    const hit = sameCards.get(card.id);
    if (hit && Date.now() - hit.at < SAME_CARD_MS) return hit.list;
    const list = (async () => {
      const out = [];
      for (let page = 0; page < 4; page++) {
        const d = await this.marketplace({ page, sort: "price_asc", q: card.title, quiet: true }); // the table has placeholder rows
        out.push(...d.auctions.filter((a) => a.card.id === card.id));
        if (!d.hasMore) break;
      }
      return out;
    })();
    sameCards.set(card.id, { at: Date.now(), list });
    list.catch(() => sameCards.delete(card.id)); // a failure is asked again next time
    return list;
  },

  /** My market: listings, active bids, wins, and finished history, in one call. */
  async myMarket() {
    const d = await api("/api/marketplace?page=1&limit=1&mine=1");
    // selling and history are my own listings by definition, even before the user id is known
    const list = (k, mine) => (d[k] || []).map((a) => ({ ...nAuction(a, this.userId), ...(mine && { mine: true }) }));
    return { selling: list("selling", true), bidding: list("bidding"), won: list("won"), history: list("history", true), max: d.maxConcurrentAuctions ?? 5 };
  },

  async auction(id) {
    const d = await api(`/api/marketplace/${id}`, { quiet: true }); // the dialog polls it every 4 s
    return { ...nAuction(d.auction, this.userId), bids: (d.bids || []).map(nBid) };
  },

  /** List an owned copy. `card_id` is the user card id, not the catalog id. Returns { auction_id }. */
  createAuction: (item, { price, durationHours }) =>
    api("/api/marketplace", { method: "POST", label: "Mise en vente", body: { card_id: item.id, base_amount: price, duration_minutes: Math.round(durationHours * 60) } }),

  /** 409 bid_too_low carries `min`. The amount is held from the balance immediately. */
  placeBid: (id, amount) => api(`/api/marketplace/${id}/bid`, { method: "POST", label: "Envoi de votre enchère", body: { amount } }),

  /** Lower the starting price. Only below the current base, and only past half the duration. */
  reprice: (id, amount) => api(`/api/marketplace/${id}/reprice`, { method: "POST", label: "Baisse du prix", body: { new_base_amount: amount } }),

  /** Cancel my listing; the card returns to the collection. */
  cancelAuction: (id) => api(`/api/marketplace/${id}`, { method: "DELETE", label: "Annulation de la vente" }),

  /** Finalize an ended auction. */
  settle: (id) => api(`/api/marketplace/${id}/settle`, { method: "POST", label: "Finalisation de l'enchère" }),

  /** Every trade (history included, full cards), seen from me. */
  async trades({ quiet = false } = {}) {
    const raw = (await api("/api/trades", { quiet, label: "Chargement des échanges" })).trades || [];
    const me = whoAmI(raw, this.userId, getProfile()?.username);
    return raw.map((t) => nTrade(t, me));
  },

  tradeAction: (id, action) => api(`/api/trades/${id}`, { method: "PATCH", body: { action }, headers: tz(), label: ACTION_LABEL[action] }),

  /** Propose (or counter, with parentId). `give`/`get` are Items ({ userCardId, card }). */
  async proposeTrade({ to, give = [], get = [], giveCoins = 0, getCoins = 0, parentId = null }) {
    const me = needMe(this.userId);
    const items = [
      ...give.map((it) => ({ user_card_id: it.userCardId, card_id: it.card.id, offered_by: me })),
      ...get.map((it) => ({ user_card_id: it.userCardId, card_id: it.card.id, offered_by: to })),
    ];
    return api("/api/trades", {
      method: "POST", headers: tz(), label: parentId ? "Envoi de la contre-offre" : "Envoi de votre offre",
      body: { recipient_id: to, items, initiator_wikibidous: giveCoins, recipient_wikibidous: getCoins, parent_trade_id: parentId ?? undefined },
    });
  },

  /** Accepted friends only (they are the ones you can trade with). */
  async friends() {
    const d = await api("/api/friends", { label: "Chargement de vos amis" });
    const list = (d.friendships || []).filter((f) => f.status === "accepted");
    // whoAmI reads trade-shaped rows: a friendship is requester -> addressee
    const asTrade = (f) => ({ initiator_id: f.requester_id ?? f.requester?.id, recipient_id: f.addressee_id ?? f.addressee?.id, initiator: f.requester, recipient: f.addressee });
    const me = whoAmI(list.map(asTrade), this.userId, getProfile()?.username);
    return list.map((f) => otherOf(f, me));
  },

  /**
   * A friend's collection page (50 per page), filtered and sorted by the server: `q` searches the
   * titles, `rarity` keeps one tier, `sort` is "name" (A to Z) or anything else for the rarity
   * order. Also the copies already locked in a pending trade.
   */
  async profileCollection(username, { page = 0, q, rarity, sort } = {}) {
    const d = await api(`/api/profile/${encodeURIComponent(username)}/collection?${qs({ page, q, rarity, sort: sort === "name" ? "name" : null })}`);
    const rows = d.collection || [];
    return { items: mapCollection(rows), pending: new Set(d.pendingTradeCardIds || []), hasMore: rows.length === PAGE };
  },

  humanCheck: (token) => api("/api/human-check", { method: "POST", body: { token }, label: "Vérification" }),

  /** The conversation with one friend, and my trades with them. */
  async chat(friendId) {
    const d = await api(`/api/chat/${friendId}`, { quiet: true });
    const trades = d.trades || [], messages = d.messages || [];
    const me = chatMe(friendId, trades, messages, this.userId);
    return { messages: messages.map((m) => nMessage(m, me)), trades: trades.map((t) => nTrade(t, me)) };
  },

  sendChat: (friendId, content) => api(`/api/chat/${friendId}`, { method: "POST", body: { content }, label: "Envoi du message" }),

  /**
   * Price data. The summary average is open to everyone and keyed by rarity (a card's rarity
   * can change; old sales keep theirs). The full sale history is Pro-only (403 pro_required).
   */
  /** A card's sold average at its current rarity: one request (the value badges need no more). */
  async marketValue(card) {
    const d = await api(`/api/marketplace/cards/${card.id}/sales?scope=summary`, { quiet: true });
    return d.summary?.[card.rarity]?.average ?? null;
  },

  /**
   * The card detail's market, by rarity (see wm/market.js): every rarity's average (the summary,
   * any account), and for Pro accounts every sale with the rarity it sold at (a second request).
   */
  async marketStats(card) {
    const d = await api(`/api/marketplace/cards/${card.id}/sales?scope=summary`, { quiet: true });
    const averages = Object.fromEntries(Object.entries(d.summary || {}).map(([r, v]) => [r, v?.average ?? null]));
    if (!d.isPro) return { averages, sales: [], isPro: false };
    const raw = (await api(`/api/marketplace/cards/${card.id}/sales`, { quiet: true }).catch(() => ({}))).sales || [];
    const sales = raw.map((s) => ({ id: s.id, rarity: s.rarity ?? card.rarity, price: s.final_price ?? null, at: Date.parse(s.settled_at || "") || 0 }));
    return { averages, sales, isPro: true };
  },

  notifications: () => api("/api/notifications", { quiet: true }).then((d) => (d.notifications || []).map(nNotification)),

  /** Mark notifications read; no ids marks all. */
  markRead: (ids) => api("/api/notifications", { method: "PATCH", body: ids ? { ids } : {}, quiet: true }),

  /** +1 WikiBidou per card. Returns { balance }. */
  discard: (userCardId) => api(`/api/user-cards/${userCardId}/discard`, { method: "POST", label: "Défausse" }),

  /** Returns { discarded_count, failed[] }. */
  bulkDiscard: (userCardIds) => api("/api/user-cards/bulk-discard", { method: "POST", label: "Défausse des cartes", body: { card_ids: userCardIds } }),

};
