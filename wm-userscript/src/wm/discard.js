// Bulk discard over the whole collection, not only the cards on screen: a light list of every copy
// (data.myCopies) is filtered the way the collection screen is, the copies a player keeps are left
// aside, and the chosen ones go to the game in batches of 50, as its own collection page sends them.

import { normSearch } from "./schema.js";

/** The game's own page never sends more than a page of 50 ids in one bulk discard. */
export const BATCH = 50;

/**
 * One copy as the game's database lists it: `user_cards` with its card's title and its tags. Its
 * rarity is the one it had when obtained (`snapshot_rarity`), as the game counts it; the card's
 * current one only when that is missing.
 */
export function nCopy(row) {
  const rarity = row?.snapshot_rarity ?? row?.cards?.rarity;
  if (!row?.id || !rarity) return null;
  return {
    id: row.id,
    cardId: row.card_id ?? null,
    rarity,
    title: row.cards?.wikipedia_title ?? "",
    shiny: !!row.is_shiny,
    starred: !!row.starred,
    tags: (row.user_card_tags || []).map((t) => t?.tag_id).filter(Boolean),
    at: row.obtained_at ?? null,
  };
}

/**
 * Whether a copy shows under the collection's filters: `rarity` ("ALL" or one), `favOnly`, `tag`
 * (a tag id, "none" for untagged, "" for all) and `q`. The server also searches descriptions; the
 * light list only has titles, so a search keeps to them.
 */
export function matchesFilter(copy, { rarity = "ALL", favOnly = false, tag = "", q = "" } = {}) {
  if (rarity !== "ALL" && copy.rarity !== rarity) return false;
  if (favOnly && !copy.starred) return false;
  if (tag === "none" ? copy.tags.length : tag && !copy.tags.includes(tag)) return false;
  return !q || normSearch(copy.title).includes(normSearch(q));
}

/**
 * Why a copy stays out of "Tout sélectionner", or null. `locked`: ids of copies (or cards) in a
 * pending trade, which the game refuses to discard; `showcase`: ids of the copies in my vitrine.
 */
export function asideReason(copy, { locked = new Set(), showcase = new Set() } = {}) {
  if (locked.has(copy.id) || locked.has(copy.cardId)) return "En échange";
  if (copy.starred) return "Favorite";
  if (showcase.has(copy.id)) return "En vitrine";
  if (copy.shiny) return "Brillante";
  return null;
}

/**
 * What "Tout sélectionner" takes for these filters: `matches` (every copy shown), `aside` (kept
 * back, with their reason) and `take` (the ones selected). `include` takes the kept-back ones too,
 * except those in a trade, which the game would refuse.
 */
export function selectionFor(copies, filter, ctx, include = false) {
  const matches = copies.filter((c) => matchesFilter(c, filter));
  const aside = [], take = [];
  for (const c of matches) {
    const why = asideReason(c, ctx);
    if (why) aside.push({ copy: c, why });
    if (!why || (include && why !== "En échange")) take.push(c);
  }
  return { matches, aside, take };
}

/** Which end of the collection "Sélectionner N" takes from: the oldest copies or the newest. */
export const PICK_ORDERS = [["oldest", "les plus anciennes"], ["newest", "les plus récentes"]];

/**
 * The first `n` copies of `take` (all of them for n = Infinity), oldest or newest first by the
 * date each was obtained; a copy without a date comes last either way.
 */
export function firstN(take, n, order = "oldest") {
  const sign = order === "newest" ? -1 : 1;
  const at = (c) => (c.at ? Date.parse(c.at) : NaN);
  const sorted = [...take].sort((a, b) => {
    const x = at(a), y = at(b);
    if (Number.isNaN(x) || Number.isNaN(y)) return Number.isNaN(x) - Number.isNaN(y);
    return sign * (x - y);
  });
  return sorted.slice(0, Math.max(0, n));
}

/** How many copies carry each tag, and how many carry none: { none, [tagId]: n }. */
export function tagCounts(copies) {
  const n = { none: 0 };
  for (const c of copies) {
    if (!c.tags.length) n.none++;
    for (const t of c.tags) n[t] = (n[t] ?? 0) + 1;
  }
  return n;
}

/** The selection by rarity, rarest first: [[rarity, n], ...]. */
export function byRarity(copies, order) {
  const n = {};
  for (const c of copies) n[c.rarity] = (n[c.rarity] ?? 0) + 1;
  return order.filter((r) => n[r]).map((r) => [r, n[r]]);
}

/** The game's database answers 1 000 rows at a time at most. */
export const COPIES_PAGE = 1000;
/** The light columns of one copy: no image, no description. */
export const COPY_FIELDS = "id,card_id,is_shiny,starred,obtained_at,snapshot_rarity,cards(rarity,wikipedia_title),user_card_tags(tag_id)";

/**
 * Every copy, slice after slice: `slice(from, size)` returns raw rows (see nCopy); `onProgress(n)`
 * after each. A short slice is the last one.
 */
export async function readAllCopies(slice, { size = COPIES_PAGE, onProgress = () => {} } = {}) {
  const out = [];
  for (let from = 0; ; from += size) {
    const rows = (await slice(from, size)) || [];
    for (const r of rows) { const c = nCopy(r); if (c) out.push(c); }
    onProgress(out.length);
    if (rows.length < size) return out;
  }
}

/** Ids cut into the game's batches. */
export const batches = (ids, size = BATCH) => Array.from({ length: Math.ceil(ids.length / size) }, (_, i) => ids.slice(i * size, (i + 1) * size));

/**
 * Discard `ids` batch after batch with `send(batch) -> { discarded_count, failed }`, telling
 * `onProgress({ batch, of, sent })` before each. Stops at the first batch that throws (later ones
 * are not sent) or when `stopped()` says so. Returns `{ gone, refused, unsent, error }`: the ids
 * discarded, the ones the game refused (still mine), the ones never sent, and the error if any. A
 * batch that threw may have gone through in part: its ids are `unsure`.
 */
export async function discardInBatches(ids, send, { onProgress = () => {}, stopped = () => false } = {}) {
  const parts = batches(ids);
  const out = { gone: [], refused: [], unsent: [], unsure: [], error: null };
  for (let i = 0; i < parts.length; i++) {
    if (stopped()) { out.unsent = parts.slice(i).flat(); break; }
    onProgress({ batch: i + 1, of: parts.length, sent: out.gone.length + out.refused.length });
    try {
      const r = await send(parts[i]);
      const refused = new Set(r?.failed || []);
      for (const id of parts[i]) (refused.has(id) ? out.refused : out.gone).push(id);
    } catch (e) {
      out.error = e;
      out.unsure = parts[i];
      out.unsent = parts.slice(i + 1).flat();
      break;
    }
  }
  return out;
}
