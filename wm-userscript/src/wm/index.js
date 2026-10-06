/**
 * Domain layer entry point. The real adapter runs on wiki-masters.com, the mock anywhere
 * else (local dev). Both return the shapes in ./schema.js.
 */

import { MockData } from "./adapters/mock.js";
import { RealData } from "./adapters/real.js";
import { load, save, drop } from "./cache.js";
import { backgroundLane, pageLane } from "./lane.js";
import { countsFrom } from "./schema.js";
import { isRateLimited } from "./api.js";

export const data = /(^|\.)wiki-masters\.com$/.test(location.hostname) ? RealData : MockData;

export { RNAME, RARITIES, RARITIES_DESC, normSearch } from "./schema.js";
export { initCapture, refreshProfile, health, activity, isRateLimited } from "./api.js";
export { session, recordPull } from "./session.js";
export { STATUS, SIDE, statusLabel, tradeTabs, sideValue, verdict, balanceLabel, verdictTitle, chainOf, timeline, offerSummary, dealLine, balanceBadge, stepIn, afterLeaving } from "./trades.js";

// --- Market values: persisted 24 h per card, fetched through one paced lane ---------------
// A value is one request per card, and a collection can hold a thousand cards. The game flags
// bursts as automation, so every value request, from every screen, shares one lane: 2 at a
// time, one start every 450 ms; a rate-limit answer pauses the lane for a minute.

const VALUE_TTL = 24 * 3600e3;
const RATE_PAUSE_MS = 60e3;
export { backgroundLane, pageLane };
const saved = Object.fromEntries(Object.entries(load("values", Infinity) || {}).filter(([, [, t]]) => Date.now() - t < VALUE_TTL));
const inflight = new Map(); // card id -> Promise, shared by concurrent callers
let saveTimer = null;

/** A card's market value: its sold average at its current rarity, or null. */
export function marketValueFor(card) {
  const hit = saved[card.id];
  if (hit) return Promise.resolve(hit[0]);
  if (!inflight.has(card.id)) {
    // A failure is not remembered, so the next view retries instead of showing "no value".
    // A rate limit pauses the lane, then this card waits in it and tries again (twice at most).
    const fetchValue = (left) => backgroundLane.run(() => data.marketValue(card)).then((v) => {
      saved[card.id] = [v, Date.now()];
      saveTimer ??= setTimeout(() => { saveTimer = null; save("values", saved); }, 1000);
      return v;
    }, (e) => {
      if (!isRateLimited(e)) return null;
      backgroundLane.pause(RATE_PAUSE_MS);
      return left > 0 ? fetchValue(left - 1) : null;
    });
    inflight.set(card.id, fetchValue(2).finally(() => inflight.delete(card.id)));
  }
  return inflight.get(card.id);
}

// --- Collection: stale-while-revalidate --------------------------------------------------

// One saved copy per browser profile: another account on the same browser sees the
// old list until the fresh load lands (seconds).
const COLLECTION_TTL = 7 * 86400e3;

// the collection's own cache key, versioned with its shape (stats.copies, at), so a shape change
// does not throw away the other caches (market values)
const COLLECTION_KEY = "collection.v4";
// A saved copy this recent is used as is: our own changes (a pack, a discard) patch it, so only a
// change made elsewhere (the original site, a trade) waits for this long or for a reload.
const COLLECTION_FRESH_MS = 5 * 60e3;
let collectionLoad = null; // one load at a time, shared by every screen asking

/**
 * Load the collection. `onCached` gets the last saved copy immediately (if any); a recent one is
 * the answer, an older one is refreshed (`force` refreshes always). Without a saved copy,
 * `onPartial` streams pages as they arrive.
 */
export function loadCollection({ onCached, onPartial, force = false } = {}) {
  const cached = load(COLLECTION_KEY, COLLECTION_TTL);
  if (cached) onCached?.(cached);
  if (cached && !force && Date.now() - cached.at < COLLECTION_FRESH_MS) return Promise.resolve(cached);
  collectionLoad ??= data.collection({ onPartial: cached ? undefined : onPartial })
    .then((fresh) => { const v = { ...fresh, at: Date.now() }; save(COLLECTION_KEY, v); return v; })
    .finally(() => (collectionLoad = null));
  return collectionLoad;
}

/** Change the saved copy in place (rows in, rows out), its counts recomputed. */
function patchCollection(change) {
  const c = load(COLLECTION_KEY, COLLECTION_TTL);
  if (!c) return;
  const items = change(c.items);
  const stats = { ...c.stats, copies: items.length, unique: new Set(items.map((it) => it.card.id)).size, counts: countsFrom(items), loading: false };
  save(COLLECTION_KEY, { ...c, items, stats });
}
/** New copies (a pack): added once each. */
export const collectionAdd = (rows) => patchCollection((items) => { const have = new Set(items.map((it) => it.id)); return [...items, ...rows.filter((r) => !have.has(r.id))]; });
/** Copies gone (a discard). */
export const collectionRemove = (ids) => patchCollection((items) => { const gone = new Set(ids); return items.filter((it) => !gone.has(it.id)); });
/** Call after a change we cannot replay on the saved copy (a sale, a trade). */
export const forgetCollection = () => drop(COLLECTION_KEY);
