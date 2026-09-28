/**
 * Domain layer entry point. Components import everything they need from here.
 *
 * One interface, two adapters chosen by hostname:
 *   - real: wiki-masters.com, calls the real /api/* (same origin, real session)
 *   - mock: anywhere else (localhost dev), calls the mock server's /api/*
 * Both normalize to the same shapes the components consume (see ./schema.js).
 */

import { MockData } from "./adapters/mock.js";
import { RealData } from "./adapters/real.js";

const isReal = /(^|\.)wiki-masters\.com$/.test(location.hostname);

/** The active data adapter for this host. */
export const data = isReal ? RealData : MockData;

// Re-export the pieces components use directly.
export { RNAME, RARITIES, normSearch } from "./schema.js";
export { initCapture, refreshProfile } from "./api.js";
export { session, recordPull } from "./session.js";

// --- Market value cache ---------------------------------------------------------

// Session cache of a single representative market value per card, so the collection
// can show and sort by value without refetching. Values persist for the page's life.
const marketCache = new Map(); // card id -> number | null

/** A card's representative market value (sold average, else lowest ask, else null). */
export async function marketValueFor(card) {
  if (marketCache.has(card.id)) return marketCache.get(card.id);
  try {
    const s = await data.marketStats(card);
    const v = s ? (s.soldAvg ?? s.lowestAsk ?? null) : null;
    marketCache.set(card.id, v); // cache a legitimately derived value (incl. a real null)
    return v;
  } catch {
    return null; // transient failure: do not cache, allow a retry next time
  }
}
