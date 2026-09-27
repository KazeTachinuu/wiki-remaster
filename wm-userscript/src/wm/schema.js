/**
 * wiki-masters.com API response schema: labels, normalizers, and drift detection.
 *
 * ┌───────────────────────────────────────────────────────────────────┐
 * │  THIS IS THE SINGLE FILE TO UPDATE IF THE API CHANGES SHAPE.       │
 * └───────────────────────────────────────────────────────────────────┘
 *
 * Every adapter (real, mock) funnels raw API rows through the normalizers here so the
 * Svelte components consume one stable shape. If the API renames a field, fix it once,
 * here. `validateCards` flags the drift at runtime instead of rendering a blank grid.
 *
 * Shapes last verified live 2026-09-27.
 */

// --- Display labels -------------------------------------------------------------

/**
 * Rarity code to display name. Exact labels used by the game (RARITY_CONFIG),
 * shared so the modal and the collection filters never drift apart.
 */
export const RNAME = { C: "Commun", PC: "Peu Commun", R: "Rare", SR: "Super Rare", UR: "Ultra Rare", L: "Légendaire" };

/** All rarity codes, most common first. */
export const RARITIES = ["C", "PC", "R", "SR", "UR", "L"];

/**
 * Notification type to title, matching the real client's labels (used when a
 * notification carries no data.title). Verified against the client bundle.
 */
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

/** Where a notification points when clicked (verified: marketplace_* to the auction). */
export function notifHref(n) {
  const d = n.data || {};
  if (/^marketplace_/.test(n.type) && (d.auction_id || n.auction_id)) return `/marketplace/${d.auction_id || n.auction_id}`;
  if (n.type === "battle_invite" && d.battle_id) return `/battle`;
  if (n.type === "friend_request") return `/friends`;
  if (n.type === "guild_invite") return `/guild`;
  return null;
}

// --- Search normalization -------------------------------------------------------

/** Accent-insensitive search key (matches how the game itself normalizes search text). */
export function normSearch(s) {
  return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}

// --- Line parsers ---------------------------------------------------------------

/**
 * Normalize a raw card row into the shape every component consumes.
 *
 * @param {object} c - Raw card from /api/cards, /api/my-collection, or a pack open.
 * @returns {{id, title, category, image_url, rarity, atk, def, q_score, pageviews, summary, wikipedia_url, nsfw_image}}
 */
export function nCard(c) {
  return {
    id: c.id,
    title: c.wikipedia_title || c.title || "",
    category: c.category || "",
    // Verified: the real card component renders art only when
    // `image_url && !hide_image && !sensitive`. Honour hide_image by treating the
    // card as art-less, so it gets the clean no-image treatment instead of a broken load.
    image_url: c.hide_image ? null : (c.image_url || null),
    rarity: c.rarity,
    atk: c.atk ?? 0,
    def: c.def ?? 0,
    q_score: c.q_score != null ? Number(c.q_score) : null,
    pageviews: c.pageviews ?? null,
    summary: c.summary || null,
    wikipedia_url: c.wikipedia_url || null,
    // Real field on /api/cards. The game blurs from a server-provided blurredCardIds set
    // gated by a hideSensitive setting; we don't get that set, so we use nsfw_image as our
    // own blur trigger (a documented substitution, honoured only when the user opts in).
    nsfw_image: !!c.nsfw_image,
  };
}

/**
 * Normalize a marketplace auction. Shape verified live (2026-09-27):
 *   { id, card{...}, base_amount, current_bid, effective_bid, final_price, end_at, status,
 *     is_shiny, seller{username}, owned, snapshot_rarity/atk/def }
 */
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
    seller: a.seller?.username || null,
    currentBidderId: a.current_bidder_id ?? null,
    owned: !!a.owned,
  };
}

/** A bid row from GET /api/marketplace/{id} -> { bids:[{ amount, placed_at, bidder{username} }] }. */
export function nBid(b) {
  return { id: b.id, amount: b.amount, bidder: b.bidder?.username || null, bidderId: b.bidder_id || null, at: b.placed_at || null };
}

/** Normalize a notification row into { id, title, message, read, at, href }. */
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

// --- Aggregates -----------------------------------------------------------------

/** Tally owned items by rarity code. */
export function countsFrom(items) {
  const counts = { C: 0, PC: 0, R: 0, SR: 0, UR: 0, L: 0 };
  for (const it of items) if (counts[it.card.rarity] != null) counts[it.card.rarity] += 1;
  return counts;
}

// --- Drift detection ------------------------------------------------------------

/**
 * Warn if a batch of normalized cards looks like the API changed shape. A card with no id
 * and no rarity almost always means a renamed field, not real data. Call after mapping a
 * page of results; logs once per batch rather than throwing, so one bad page never blanks
 * the whole grid.
 *
 * @param {string} endpoint - Human-readable source name, for the log ("catalog", "collection").
 * @param {Array} cards - Normalized cards (post nCard).
 * @returns {boolean} true if the batch looks healthy.
 */
export function validateCards(endpoint, cards) {
  if (!cards.length) return true; // empty is legitimate (filtered page, empty collection)
  const broken = cards.filter((c) => c.id == null && !c.rarity).length;
  const rate = broken / cards.length;
  if (rate > 0.5) {
    console.warn(
      `[wiki-remaster] ${endpoint}: ${Math.round(rate * 100)}% of cards failed to normalize ` +
      `(${broken}/${cards.length}). The API shape may have changed. Check src/wm/schema.js.`
    );
    return false;
  }
  return true;
}
