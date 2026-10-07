/**
 * Real adapter: wiki-masters.com's own /api with the live session.
 * Every call here is verified against the live site (docs/API_REFERENCE.md).
 */

import { api, supabase, getProfile, patchProfile, bumpEpoch, getUserId, refreshProfile, sessionReady } from "../api.js";
import { newInPack, pickCopy, nCard, nAuction, nBid, nNotification, nTrade, nMessage, validateCards } from "../schema.js";
import { whoAmI, chatMe, otherOf, needMe } from "../trades.js";
import { nUser, nMe, nPlayer, showcaseOf, friendshipsOf, waitingBy, achievementsOf } from "../social.js";

const PAGE = 50; // server page size; the market rejects limit > 50
const PACK_CAP = 10;
// one pack per period, faster for Pro: the game's own constants (PACK_REGEN_PERIOD_MS and
// PACK_REGEN_PERIOD_PRO_MS in its client), the API does not send them
const REGEN_MS = { base: 10 * 60e3, pro: 3 * 60e3 };
let lastBalance = null;
const SAME_CARD_MS = 60e3;
const sameCards = new Map(); // card id -> { at, list: Promise }
const marketMemo = new Map(); // card id -> { at, stats: Promise }: a card reopened within SAME_CARD_MS

// Trade writes carry the viewer's time zone, like the native client.
const tz = () => ({ "x-wiki-calendar-tz": Intl.DateTimeFormat().resolvedOptions().timeZone });
const ACTION_LABEL = { accept: "Acceptation de l'échange", decline: "Refus de l'échange", cancel: "Annulation de l'offre" };


// The orders the game's server knows for a collection (mine or a friend's), as its own client asks
// them (checked by test:prod); rarity is the default and needs no parameter.
// a tag as the game stores it ({ id, name, color }), from a row of `tags` or a card's `tags`
// (sometimes wrapped as { tag: {...} })
const nTag = (t) => { const x = t?.tag ?? t; return x?.id ? { id: x.id, name: x.name ?? "", color: x.color ?? null } : null; };

const COLLECTION_SORT = { rarity: null, name: "name", recent: "added", starred: "starred" };

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
      tags: (it.tags || []).map(nTag).filter(Boolean),
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
  /** My id, once the game's session is known (a screen opened at once waits for it). */
  async meNow() { await sessionReady(); return needMe(this.userId); },

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
   * One page of my collection, searched (`q`: titles and descriptions), filtered (`rarity`) and
   * ordered (`sort`: see COLLECTION_SORT) by the server, 50 a page; `tag`: a tag id, or "none" for
   * the copies without one. Page 0 also carries the match
   * count and the per-rarity counts of the search (`stats=1`), and my copies locked in a pending
   * trade.
   */
  async myCards({ page = 0, q, rarity, sort, tag } = {}) {
    const d = await api(`/api/my-collection?${qs({ page, q, rarity, sort: COLLECTION_SORT[sort], tag_id: tag && tag !== "none" ? tag : null, untagged: tag === "none" ? 1 : null, stats: page ? null : 1 })}`, { quiet: page > 0 });
    const rows = d.collection || [];
    return { items: mapCollection(rows), hasMore: rows.length === PAGE, total: d.total ?? null, counts: d.rarityCounts || {}, pending: d.pendingTradeCardIds || [] };
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
  async myMarket({ quiet } = {}) {
    const d = await api("/api/marketplace?page=1&limit=1&mine=1", { quiet });
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
    const me = await this.meNow();
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
   * titles, `rarity` keeps one tier, `sort` as COLLECTION_SORT. Also the copies already locked in
   * a pending trade.
   */
  async profileCollection(username, { page = 0, q, rarity, sort } = {}) {
    const d = await api(`/api/profile/${encodeURIComponent(username)}/collection?${qs({ page, q, rarity, sort: COLLECTION_SORT[sort] })}`);
    const rows = d.collection || [];
    return { items: mapCollection(rows), pending: new Set(d.pendingTradeCardIds || []), hasMore: rows.length === PAGE };
  },

  /**
   * My copy of a card, found by the server's search of my collection (by its title, one page): a
   * card from a pack that sent no copies (the Pro and special ones) can then be sold or discarded.
   */
  async myCopy(card) {
    return pickCopy((await this.myCards({ q: card.title })).items, card);
  },

  // --- favourites and tags: written to the game's database as its own client does ---------------

  /** Mark one copy as a favourite or not (the game's collection page does the same). */
  setStarred: (userCardId, starred) => supabase(`user_cards?id=eq.${encodeURIComponent(userCardId)}`, { method: "PATCH", body: { starred }, label: starred ? "Ajout aux favoris" : "Retrait des favoris" }),

  /** My tags, by name: [{ id, name, color }]. */
  async myTags() {
    const me = await this.meNow();
    return ((await supabase(`tags?select=*&user_id=eq.${encodeURIComponent(me)}&order=name.asc`)) || []).map(nTag).filter(Boolean);
  },

  /** A new tag (or mine already named so: names are unique per player). */
  async createTag(name, color) {
    const me = await this.meNow();
    try {
      const [row] = await supabase("tags", { method: "POST", body: { user_id: me, name, color }, label: "Nouvelle étiquette" });
      return nTag(row);
    } catch (e) {
      if (e.code !== "23505") throw e;
      const [row] = await supabase(`tags?select=*&user_id=eq.${encodeURIComponent(me)}&name=eq.${encodeURIComponent(name)}`);
      return nTag(row);
    }
  },

  /** Put a tag on one copy, or take it off. */
  tagCard: (userCardId, tagId) => supabase("user_card_tags", { method: "POST", body: { user_card_id: userCardId, tag_id: tagId }, label: "Étiquette" }),
  untagCard: (userCardId, tagId) => supabase(`user_card_tags?user_card_id=eq.${encodeURIComponent(userCardId)}&tag_id=eq.${encodeURIComponent(tagId)}`, { method: "DELETE", label: "Étiquette" }),

  // --- friends, profile, showcase, achievements: the calls of the game's own pages ---------------

  /** Every friendship of mine: my friends, the requests I received and sent (see friendshipsOf). */
  async friendships() {
    const d = await api("/api/friends", { label: "Chargement de vos amis" });
    const rows = d.friendships || [];
    const asTrade = (f) => ({ initiator_id: f.requester_id ?? f.requester?.id, recipient_id: f.addressee_id ?? f.addressee?.id, initiator: f.requester, recipient: f.addressee });
    return friendshipsOf(rows, whoAmI(rows.map(asTrade), this.userId, getProfile()?.username));
  },
  /** My pending trades per friend (see waitingBy): the light read, no cards. */
  async waitingTrades() {
    const raw = (await api("/api/trades?active=1", { quiet: true })).trades || [];
    return waitingBy(raw, whoAmI(raw, this.userId, getProfile()?.username));
  },
  /** Players by name (two letters at least), as "Rechercher un joueur". */
  async searchPlayers(q) {
    const d = await api(`/api/friends/search?q=${encodeURIComponent(q)}`, { quiet: true });
    return (d.users || []).map(nUser);
  },
  requestFriend: (userId) => api("/api/friends", { method: "POST", body: { addressee_id: userId }, label: "Demande d'ami" }),
  answerFriend: (fid, accept) => api(`/api/friends/${encodeURIComponent(fid)}`, { method: "PATCH", body: { action: accept ? "accept" : "decline" }, label: accept ? "Acceptation" : "Refus" }),
  acceptAllFriends: () => api("/api/friends/accept-all", { method: "POST", label: "Acceptation des demandes" }),
  /** Cancels a request I sent. */
  dropFriendship: (fid) => api(`/api/friends/${encodeURIComponent(fid)}`, { method: "DELETE", label: "Annulation de la demande" }),

  /** My profile as the game's profile page reads it: name, avatar, public or not, since when. */
  async me() {
    return nMe(await supabase("rpc/get_my_profile", { method: "POST", body: {} }));
  },
  /** `patch`: { is_public } | { avatar_user_card_id, avatar_pos_x, avatar_pos_y } | { clear_avatar: true }. */
  async updateProfile(username, patch) {
    const d = await api(`/api/profile/${encodeURIComponent(username)}`, { method: "PATCH", body: patch, label: "Profil" });
    return d.profile ? nMe(d.profile) : null;
  },
  /** How many cards I own, and how many of each rarity (the counts alone, no cards). */
  async collectionStats() {
    const d = await api("/api/my-collection/stats", { quiet: true });
    const total = Number(d.total);
    return { total: Number.isFinite(total) ? total : null, rarityCounts: d.rarityCounts || {} };
  },

  /** My showcase: its 40 places (a copy or null each) and the names given to its galleries. */
  async showcase() {
    return showcaseOf(await api("/api/showcase", { quiet: true }), (uc) => mapCollection([uc])[0]);
  },

  // --- another player's profile, as the game's profile page reads it ---------------------------
  /** Who they are and where we stand (friends or not). A missing player throws 404. */
  async player(username) {
    return nPlayer(await api(`/api/profile/${encodeURIComponent(username)}`, { label: "Chargement du profil" }));
  },
  async playerShowcase(username) {
    return showcaseOf(await api(`/api/profile/${encodeURIComponent(username)}/showcase`, { quiet: true }), (uc) => mapCollection([uc])[0]);
  },
  /** Their card count, by rarity, and their first cards (rarest first). */
  async playerCollection(username) {
    const d = await api(`/api/profile/${encodeURIComponent(username)}/collection?page=0&stats=1`, { quiet: true });
    const total = Number(d.total);
    return { total: Number.isFinite(total) ? total : null, rarityCounts: d.rarityCounts || {}, items: mapCollection(d.collection || []) };
  },
  showcasePut: (position, userCardId) => api("/api/showcase", { method: "PUT", body: { position, user_card_id: userCardId }, label: "Vitrine" }),
  showcaseClear: (position) => api("/api/showcase", { method: "DELETE", body: { position }, label: "Vitrine" }),
  /** `name` null gives the gallery its default name back. */
  showcaseName: (index, name) => api("/api/showcase/gallery", { method: "PUT", body: { gallery_index: index, name }, label: "Vitrine" }),

  /** Every achievement, with mine (see achievementsOf). */
  async achievements() {
    const me = await this.meNow();
    const [list, mine] = await Promise.all([supabase("achievements?select=*"), supabase(`user_achievements?select=*&user_id=eq.${encodeURIComponent(me)}`)]);
    return achievementsOf(list, mine);
  },
  /** Asks the game to award what I earned since (its page does on every visit). */
  syncAchievements: () => api("/api/achievements/check", { method: "POST", body: { event: "achievements_sync" }, quiet: true }),
  /** { claimed_at, amount, already_claimed } */
  claimAchievement: (id) => api("/api/achievements/claim", { method: "POST", body: { achievement_id: id }, label: "Récompense" }),

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
   * A card reopened within a minute reuses the answer.
   */
  marketStats(card) {
    const hit = marketMemo.get(card.id);
    if (hit && Date.now() - hit.at < SAME_CARD_MS) return hit.stats;
    const stats = this.fetchMarketStats(card);
    marketMemo.set(card.id, { at: Date.now(), stats });
    stats.catch(() => marketMemo.delete(card.id)); // a failure is asked again next time
    return stats;
  },
  async fetchMarketStats(card) {
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
