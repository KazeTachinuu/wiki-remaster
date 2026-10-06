// Same-card market comparison: every live listing of one card, side by side.
// Shiny and normal copies do not trade at the same price, so each is compared within its own
// finish: "cheapest" and the gap to it are computed per finish, never across. Time is not a
// matter of finish, so "ends soonest" is across every listing.

/**
 * @param {Array} listings  normalized auctions (nAuction) of one card
 * @param {number} now      ms timestamp, for "ends soonest"
 * @returns {{ rows: Array, stats: { count, min, avg } }}  rows sorted by finish then price;
 *   each row is the auction plus `gap` (vs the cheapest of its finish), `cheapest`, `soonest`.
 */
export function compareListings(listings, now = Date.now()) {
  const live = listings.filter((a) => a.status === "active" && Date.parse(a.endAt) > now && a.price != null);
  const rows = [];
  const soonest = Math.min(...live.map((a) => Date.parse(a.endAt)));
  for (const shiny of [false, true]) {
    const group = live.filter((a) => !!a.is_shiny === shiny).sort((a, b) => a.price - b.price || Date.parse(a.endAt) - Date.parse(b.endAt));
    if (!group.length) continue;
    const min = group[0].price;
    for (const a of group) rows.push({ ...a, gap: a.price - min, cheapest: a.price === min, soonest: live.length > 1 && Date.parse(a.endAt) === soonest });
  }
  const prices = rows.filter((r) => !r.is_shiny).map((r) => r.price);
  const pool = prices.length ? prices : rows.map((r) => r.price);
  return {
    rows,
    stats: { count: rows.length, min: pool.length ? Math.min(...pool) : null, avg: pool.length ? Math.round(pool.reduce((s, p) => s + p, 0) / pool.length) : null },
  };
}

/** Listings per card id on one market page, to badge tiles whose card is listed several times. */
export function countByCard(auctions) {
  const n = new Map();
  for (const a of auctions || []) n.set(a.card.id, (n.get(a.card.id) || 0) + 1);
  return n;
}
