// Trade logic, pure and UI-free: which tab a trade belongs to, what each side is worth, whether
// the deal is fair, and the counter-offer chain. Labels live here, once.

import { nf } from "../lib/format.js";

export const STATUS = {
  pending: "En attente",
  countered: "Contre-offre",
  declined: "Refusé",
  accepted: "Accepté",
  cancelled: "Annulé",
};
export const statusLabel = (s) => STATUS[s] || s;
/** The two sides of a deal, always from my point of view. */
export const SIDE = { give: "Vous donnez", get: "Vous recevez" };

/** Thrown instead of guessing a split when "me" is unknown (a wrong split could get a bad trade accepted). */
export const NO_ME = "Session pas encore prête : rechargez la page puis réessayez.";
export function needMe(me) {
  if (!me) throw new Error(NO_ME);
  return me;
}

/**
 * Who "me" is: the captured user id, else the party carrying my username (the captured profile),
 * else the one party present in every trade. Null when none of these can tell.
 */
export function whoAmI(raw, userId, username = null) {
  if (userId) return userId;
  if (username) {
    for (const t of raw) {
      if (t.initiator?.username === username) return t.initiator_id ?? t.initiator.id;
      if (t.recipient?.username === username) return t.recipient_id ?? t.recipient.id;
    }
  }
  let common = null;
  for (const t of raw) {
    const pair = [t.initiator_id, t.recipient_id];
    common = common ? common.filter((id) => pair.includes(id)) : pair;
  }
  return common?.length === 1 ? common[0] : null;
}

/**
 * Who "me" is in the conversation with `friendId`: the captured user id, else the party of any
 * trade or message there that is not the friend (every row in it is between the two of us).
 * Null only when the conversation is empty, where nothing needs it.
 */
export function chatMe(friendId, trades, messages, userId) {
  if (userId) return userId;
  const ids = [...trades.flatMap((t) => [t.initiator_id, t.recipient_id]), ...messages.flatMap((m) => [m.sender_id, m.recipient_id])];
  return ids.find((id) => id && id !== friendId) ?? null;
}

const newest = (a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt));

/** Reçues = pending sent to me, Envoyées = pending I sent, Historique = everything settled. */
export function tradeTabs(trades) {
  const pending = trades.filter((t) => t.status === "pending");
  return {
    incoming: pending.filter((t) => t.incoming).sort(newest),
    outgoing: pending.filter((t) => !t.incoming).sort(newest),
    history: trades.filter((t) => t.status !== "pending").sort(newest),
  };
}

/** A side's estimated worth: known card values plus coins; cards without a value are counted apart. */
export function sideValue(items, coins, values) {
  let total = coins || 0, unknown = 0;
  for (const it of items) {
    const v = values.get(it.card.id);
    if (v == null) unknown++;
    else total += v;
  }
  return { total, unknown };
}

/**
 * Fair or not, from my side: within 15 % of the larger side is "balanced". A card without a known
 * value (no sales yet, or its value still loading) makes the comparison "unknown" rather than
 * counting it as worth 0; `unknown` says how many cards are missing.
 */
export function verdict(give, get) {
  const diff = get.total - give.total;
  const unknown = (give.unknown || 0) + (get.unknown || 0);
  if (unknown) return { kind: "unknown", diff, unknown };
  const scale = Math.max(give.total, get.total);
  if (!scale || Math.abs(diff) <= scale * 0.15) return { kind: "balanced", diff };
  return { kind: diff > 0 ? "advantage" : "disadvantage", diff };
}

const BALANCE = { unknown: () => "Valeur incertaine", balanced: () => "Équilibré", advantage: (d) => `+${nf(d)} pour vous`, disadvantage: (d) => `${nf(d)} pour vous` };
/** A verdict in one short line (list rows, composer bar). */
export const balanceLabel = (v) => BALANCE[v.kind](v.diff);
const TITLE = { unknown: BALANCE.unknown(), balanced: BALANCE.balanced(), advantage: "À votre avantage", disadvantage: "À votre désavantage" };
/** A verdict as a title, without the amount (the trade detail shows it apart). */
export const verdictTitle = (v) => TITLE[v.kind];

const sideShort = (cards, coins) => [cards && String(cards), coins && `${nf(coins)} wb`].filter(Boolean).join(" + ") || "rien";
/** A deal in a few words for the phone bar ("2 contre 1", "1 + 50 wb contre 3"); null while nothing is picked. */
export function offerSummary(giveCards, giveCoins, getCards, getCoins) {
  if (!giveCards && !giveCoins && !getCards && !getCoins) return null;
  return `${sideShort(giveCards, giveCoins)} contre ${sideShort(getCards, getCoins)}`;
}

const cardsWord = (n) => `${n} carte${n > 1 ? "s" : ""}`;
const withCoins = (cards, coins, word) => [cards && (word ? cardsWord(cards) : String(cards)), coins && `${nf(coins)} wb`].filter(Boolean).join(" + ");
/** A trade in one list line, my side first: "2 cartes contre 1", "1 carte + 50 wb contre 2". */
export function dealLine(giveCards, giveCoins, getCards, getCoins) {
  // the word "carte" once, on the first side that has cards; each side held on one line with
  // "contre" leading the second (no-break spaces), so a narrow row breaks only before "contre"
  // rather than leave "wb" or a count on its own
  const mineWord = giveCards > 0;
  const keep = (s) => s.replaceAll(" ", "\u00a0");
  return `${keep(withCoins(giveCards, giveCoins, true) || "rien")} ${keep(`contre ${withCoins(getCards, getCoins, !mineWord) || "rien"}`)}`;
}

const BADGE = { unknown: () => "?", balanced: () => "=", advantage: (d) => `+${nf(d)}`, disadvantage: (d) => nf(d) };
/** A verdict as a list badge: the signed gap in points, "=" when balanced, "?" when a value is missing. */
export const balanceBadge = (v) => BADGE[v.kind](v.diff);

/** The row `delta` steps from the selected one (arrow keys), held at the ends; the first row when none is selected. */
export function stepIn(list, id, delta) {
  if (!list.length) return null;
  const i = list.findIndex((t) => t.id === id);
  if (i < 0) return list[0];
  return list[Math.min(list.length - 1, Math.max(0, i + delta))];
}

/** The row to select once `id` leaves the list (answered): the next one, else the one before, else none. */
export function afterLeaving(list, id) {
  const i = list.findIndex((t) => t.id === id);
  if (i < 0) return null;
  return list[i + 1] ?? list[i - 1] ?? null;
}

/** The counter-offer chain this trade belongs to, oldest first. */
export function chainOf(trade, all) {
  const byId = new Map(all.map((t) => [t.id, t]));
  let root = trade;
  while (root.parentId && byId.has(root.parentId)) root = byId.get(root.parentId);
  const chain = [root];
  for (let cur = root; ; ) {
    const next = all.find((t) => t.parentId === cur.id);
    if (!next) break;
    chain.push(next);
    cur = next;
  }
  return chain;
}

/** The friend in a friendship (whichever side is not me). */
export function otherOf(f, me) {
  const o = f.requester?.id === needMe(me) ? f.addressee : f.requester;
  return { id: o?.id, username: o?.username || "?", avatar: o?.avatar_url || null };
}
