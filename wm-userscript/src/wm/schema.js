/**
 * API shapes: labels, normalizers, drift detection. The one file to touch if the API
 * renames a field. Every adapter maps raw rows through here, so components see one shape.
 * Raw shapes are documented in docs/API_REFERENCE.md.
 */
import { needMe } from "./trades.js";

/** Rarity labels, as the game names them. */
export const RNAME = { C: "Commun", PC: "Peu Commun", R: "Rare", SR: "Super Rare", UR: "Ultra Rare", L: "Légendaire" };

/** Rarity codes, most common first. */
export const RARITIES = ["C", "PC", "R", "SR", "UR", "L"];

/** Rarity codes, rarest first (filters, composition bar). */
export const RARITIES_DESC = [...RARITIES].reverse();

/** Where a notification leads when clicked (same routes as the native client). */
/** A link from the server, kept only if it is http(s): never javascript: or data:. */
export function httpUrl(u) {
  try { return /^https?:$/.test(new URL(u).protocol) ? u : null; } catch { return null; }
}

export function notifHref(n) {
  const d = n.data || {};
  const auctionId = d.auction_id || n.auction_id;
  if (/^marketplace_/.test(n.type) && auctionId) return `/marketplace/${encodeURIComponent(auctionId)}`;
  if (/^trade_/.test(n.type)) return "/trades";
  if (n.type === "battle_invite" && d.battle_id) return "/battle";
  if (n.type === "friend_request") return "/friends";
  if (n.type === "guild_invite") return "/guild";
  return null;
}

/** Accent-insensitive search key. */
export function normSearch(s) {
  return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}

/** A card from /api/cards, /api/my-collection, a pack, or an auction. */
export function nCard(c) {
  return {
    id: c.id,
    title: c.wikipedia_title || c.title || "",
    category: c.category || "",
    image_url: c.hide_image ? null : c.image_url || null, // hidden art renders as the no-image card
    rarity: c.rarity,
    atk: c.atk ?? 0,
    def: c.def ?? 0,
    q_score: c.q_score != null ? Number(c.q_score) : null,
    pageviews: c.pageviews ?? null,
    summary: c.summary || null,
    wikipedia_url: httpUrl(c.wikipedia_url),
    nsfw_image: !!c.nsfw_image,
  };
}

/**
 * A marketplace auction. `price` is what the next bid must beat.
 * The API's `owned` means "you own a copy of this card" (as in the catalog), NOT "your sale":
 * whether the sale is yours comes from `seller_id`, compared with your user id `me`.
 */
// Live statuses (checked by test:prod): active, cancelled, settled_sold, settled_unsold.
const AUCTION_STATUS = { active: "active", cancelled: "cancelled", settled_sold: "sold", settled_unsold: "unsold" };
/** An auction's state: active, sold, unsold or cancelled (an unknown ended status is read from its price). */
const auctionStatus = (a) => AUCTION_STATUS[a.status ?? "active"] ?? (a.final_price != null || a.winner_id ? "sold" : "unsold");

export function nAuction(a, me = null) {
  const card = a.card
    ? nCard(a.card)
    : nCard({ id: a.card_id, rarity: a.snapshot_rarity, atk: a.snapshot_atk, def: a.snapshot_def });
  return {
    id: a.id,
    card,
    is_shiny: !!a.is_shiny,
    base: a.base_amount ?? null,
    bid: a.current_bid ?? null,
    price: a.effective_bid ?? a.current_bid ?? a.base_amount ?? null,
    finalPrice: a.final_price ?? null,
    status: auctionStatus(a),
    endAt: a.end_at || null,
    createdAt: a.created_at || null,
    settledAt: a.settled_at || null,
    repricedAt: a.base_repriced_at || null,
    seller: a.seller?.username || null,
    sellerId: a.seller_id ?? null,
    currentBidderId: a.current_bidder_id ?? null,
    bidder: a.current_bidder?.username || null,
    winnerId: a.winner_id ?? null,
    winner: a.winner?.username || null,
    mine: !!me && a.seller_id === me,
    ownsCard: !!a.owned,
  };
}

/** A bid from GET /api/marketplace/{id}. */
export function nBid(b) {
  return { id: b.id, amount: b.amount, bidder: b.bidder?.username || null, bidderId: b.bidder_id || null, at: b.placed_at || null };
}

// The game's own titles carry emoji and exclamation marks ("🔄 Nouvelle offre d'échange !"):
// each known type is told in a few plain words from its data instead (the data keys are the
// live ones, recorded in docs/api-shapes.json). An unknown type keeps the game's text, cleaned.
const wb = (n) => (n == null ? "" : ` pour ${Number(n).toLocaleString("fr")} WikiBidous`);
const NOTIF = {
  marketplace_outbid: (d) => ["Enchère dépassée", d.card_title && `${d.card_title}, nouvelle offre${wb(d.new_bid).replace(" pour", " de")}`],
  marketplace_auction_won: (d) => ["Enchère gagnée", d.card_title && `${d.card_title}${wb(d.final_price)}`],
  marketplace_auction_sold: (d) => ["Carte vendue", d.card_title && `${d.card_title}${wb(d.final_price)}`],
  marketplace_auction_unsold: (d) => ["Vente terminée sans acheteur", d.card_title],
  marketplace_wishlist_listed: (d) => ["Carte souhaitée en vente", d.card_title],
  trade_offer: (d) => ["Offre d'échange", d.initiator_username && `de ${d.initiator_username}`],
  trade_countered: (d) => ["Contre-offre", d.initiator_username && `de ${d.initiator_username}`],
  trade_accepted: (d) => ["Échange accepté", d.recipient_username && `par ${d.recipient_username}`],
  friend_request: (d) => ["Demande d'ami", d.requester_username && `de ${d.requester_username}`],
  battle_invite: (d) => ["Défi", d.challenger_username && `de ${d.challenger_username}`],
  guild_invite: (d) => ["Invitation de guilde", [d.guild_name, d.inviter_username && `de ${d.inviter_username}`].filter(Boolean).join(", ")],
};
/** The game's text without emoji or trailing exclamation marks. */
export const plainText = (s) => String(s || "").replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s*!+\s*$/, "").replace(/\s+/g, " ").trim();

/** A notification row: a short title and one line of detail, both plain. */
export function nNotification(n) {
  const d = n.data || {};
  const [title, detail] = NOTIF[n.type]?.(d) ?? [];
  return {
    id: n.id,
    title: title || plainText(d.title) || "Notification",
    message: detail || plainText(d.message),
    read: !!n.read,
    at: n.created_at || null,
    href: notifHref(n),
  };
}

/**
 * Which cards of an opened pack are new to me. `owned_copies` (in the pack response) lists every
 * copy I own of the pack's cards, counted after the opening, as the game's own client reads it:
 * a card is new when I own no more copies of it than the pack just gave. Null when the response
 * has no list (then nothing is marked new rather than guessed).
 */
export function newInPack(cardIds, ownedCopies) {
  if (!Array.isArray(ownedCopies)) return null;
  const owned = new Map(), drawn = new Map();
  for (const c of ownedCopies) owned.set(c.card_id, (owned.get(c.card_id) ?? 0) + 1);
  for (const id of cardIds) drawn.set(id, (drawn.get(id) ?? 0) + 1);
  return new Set(cardIds.filter((id) => (owned.get(id) ?? 0) <= drawn.get(id)));
}

/** Owned items tallied by rarity. */
export function countsFrom(items) {
  const counts = Object.fromEntries(RARITIES.map((r) => [r, 0]));
  for (const it of items) if (it.card.rarity in counts) counts[it.card.rarity] += 1;
  return counts;
}

/**
 * Warn once per batch when most normalized cards lack both id and rarity: that means a
 * renamed field, not real data. Never throws, so one bad page cannot blank the grid.
 */
export function validateCards(endpoint, cards) {
  if (!cards.length) return true;
  const broken = cards.filter((c) => c.id == null && !c.rarity).length;
  if (broken / cards.length <= 0.5) return true;
  console.warn(`[wiki-remaster] ${endpoint}: ${broken}/${cards.length} cards failed to normalize. The API shape may have changed, see src/wm/schema.js.`);
  return false;
}

/**
 * A trade from GET /api/trades, seen from `me`: what I give, what I get, and my coins on each side.
 * `initiator_wikibidous` are the coins the initiator puts in (and vice versa). Snapshot rarity and
 * stats win: the card may have changed since the offer was made. Throws when `me` is unknown:
 * without it every card would land on "Vous recevez" and every offer under Envoyées.
 */
export function nTrade(t, me) {
  needMe(me);
  const mine = t.initiator_id === me;
  const other = mine ? t.recipient : t.initiator;
  const item = (i) => ({
    itemId: i.id,
    userCardId: i.user_card_id,
    is_shiny: !!(i.is_shiny ?? i.card?.is_shiny),
    card: nCard({ ...(i.card || { id: i.card_id }), rarity: i.snapshot_rarity ?? i.card?.rarity, atk: i.snapshot_atk ?? i.card?.atk, def: i.snapshot_def ?? i.card?.def }),
  });
  const items = t.items || [];
  return {
    id: t.id,
    status: t.status || "pending",
    incoming: t.recipient_id === me,
    other: { id: other?.id ?? (mine ? t.recipient_id : t.initiator_id), username: other?.username || "?", avatar: other?.avatar_url || null },
    give: items.filter((i) => i.offered_by === me).map(item),
    get: items.filter((i) => i.offered_by !== me).map(item),
    giveCoins: (mine ? t.initiator_wikibidous : t.recipient_wikibidous) ?? 0,
    getCoins: (mine ? t.recipient_wikibidous : t.initiator_wikibidous) ?? 0,
    parentId: t.parent_trade_id ?? null,
    createdAt: t.created_at || null,
    updatedAt: t.updated_at || t.created_at || null,
  };
}

/** A chat message from /api/chat/{friendId}. */
export function nMessage(m, me) {
  return { id: m.id, mine: m.sender_id === me, content: m.content || "", at: m.created_at || null };
}
