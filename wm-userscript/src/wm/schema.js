/**
 * API shapes: labels, normalizers, drift detection. The one file to touch if the API
 * renames a field. Every adapter maps raw rows through here, so components see one shape.
 * Raw shapes are documented in docs/API_REFERENCE.md.
 */

/** Rarity labels, as the game names them. */
export const RNAME = { C: "Commun", PC: "Peu Commun", R: "Rare", SR: "Super Rare", UR: "Ultra Rare", L: "Légendaire" };

/** Rarity codes, most common first. */
export const RARITIES = ["C", "PC", "R", "SR", "UR", "L"];

/** Rarity codes, rarest first (filters, composition bar). */
export const RARITIES_DESC = [...RARITIES].reverse();

/** Notification titles for rows without data.title, matching the native client. */
export const NTYPE = {
  marketplace_wishlist_listed: "Liste de souhaits",
  marketplace_auction_sold: "Carte vendue",
  marketplace_auction_unsold: "Enchère non vendue",
  marketplace_outbid: "Enchère dépassée",
  auction_midpoint_nudge: "Enchère sans mise",
  battle_invite: "Nouveau défi",
  friend_request: "Demande d'ami",
  guild_invite: "Invitation de guilde",
  custom: "Message",
};

/** Where a notification leads when clicked (same routes as the native client). */
export function notifHref(n) {
  const d = n.data || {};
  const auctionId = d.auction_id || n.auction_id;
  if (/^marketplace_/.test(n.type) && auctionId) return `/marketplace/${auctionId}`;
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
    wikipedia_url: c.wikipedia_url || null,
    nsfw_image: !!c.nsfw_image,
  };
}

/** A marketplace auction. `price` is what the next bid must beat. */
export function nAuction(a) {
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
    status: a.status || "active",
    endAt: a.end_at || null,
    createdAt: a.created_at || null,
    settledAt: a.settled_at || null,
    repricedAt: a.base_repriced_at || null,
    seller: a.seller?.username || null,
    currentBidderId: a.current_bidder_id ?? null,
    bidder: a.current_bidder?.username || null,
    winnerId: a.winner_id ?? null,
    winner: a.winner?.username || null,
    owned: !!a.owned,
  };
}

/** A bid from GET /api/marketplace/{id}. */
export function nBid(b) {
  return { id: b.id, amount: b.amount, bidder: b.bidder?.username || null, bidderId: b.bidder_id || null, at: b.placed_at || null };
}

/** A notification row. */
export function nNotification(n) {
  return {
    id: n.id,
    title: n.data?.title || NTYPE[n.type] || "Notification",
    message: n.data?.message || "",
    read: !!n.read,
    at: n.created_at || null,
    href: notifHref(n),
  };
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
