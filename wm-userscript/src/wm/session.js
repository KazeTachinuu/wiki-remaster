/**
 * Client-side tally of what was pulled this session. We own this data (nothing invented);
 * the Pulls recap screen re-renders after each pull and reads it fresh.
 */

/** Running totals for the current page visit. */
export const session = { packs: 0, cards: 0, newCards: 0 };

/** Record one opened pack and its cards. */
export function recordPull(cards) {
  session.packs += 1;
  session.cards += cards.length;
  session.newCards += cards.filter((c) => c.is_new).length;
}
