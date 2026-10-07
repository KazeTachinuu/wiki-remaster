// Friends, profile and achievements, as the game's own pages read them (checked against its
// client): pure, for screens/social/*.

/** A player as the game sends them: their avatar is a card's picture, framed by a position in %. */
export const nUser = (o) => (o ? { id: o.id, username: o.username || "?", avatar: o.avatar_url || null, ax: o.avatar_pos_x ?? 50, ay: o.avatar_pos_y ?? 50 } : null);

/** My profile row (get_my_profile, or a profile write's answer): public or not, since when. */
export const nMe = (p) => p && { ...nUser(p), isPublic: p.is_public ?? true, joinedAt: p.created_at || null, isPro: !!p.is_pro };

/**
 * When a player was last seen, in the game's own words: "En ligne récemment" (under 5 minutes),
 * "Vu il y a 12 min", "Vu il y a 3 h", "Vu il y a 4 j", "Vu il y a 2 mois", "Vu il y a plus d'un an".
 */
export function seenLabel(iso, now = Date.now()) {
  const ms = now - Date.parse(iso ?? "");
  if (!Number.isFinite(ms)) return null;
  const min = Math.floor(Math.max(0, ms) / 6e4);
  if (min < 5) return "En ligne récemment";
  if (min < 60) return `Vu il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `Vu il y a ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `Vu il y a ${d} j`;
  const mo = Math.floor(d / 30);
  return mo < 12 ? `Vu il y a ${mo} mois` : "Vu il y a plus d'un an";
}

/** Another player's profile (`/api/profile/{name}`): who they are, and where we stand. */
export const nPlayer = (d) => ({
  ...nMe(d.profile), lastSeenAt: d.lastSeenAt ?? null, isOwn: !!d.isOwn, isFriend: !!d.isFriend, friendshipId: d.friendshipId ?? null,
});

/** A showcase as the game sends it (mine or another player's): its places and its galleries' names. */
export function showcaseOf(d, rowOf) {
  const places = Array(SHOWCASE.places).fill(null);
  for (const s of d.showcase || []) {
    const uc = s.user_card;
    if (s.position >= 0 && s.position < SHOWCASE.places && uc?.card) {
      places[s.position] = rowOf({ ...uc, card: { ...uc.card, rarity: uc.snapshot_rarity ?? uc.card.rarity, atk: uc.snapshot_atk ?? uc.card.atk, def: uc.snapshot_def ?? uc.card.def } });
    }
  }
  const names = {};
  for (const g of d.galleries || []) if (Number.isInteger(g.gallery_index) && typeof g.name === "string") names[g.gallery_index] = g.name;
  return { places, names };
}

/** The galleries with at least one card, each with its name and its cards in place order. */
export const filledGalleries = (shelf) =>
  Array.from({ length: SHOWCASE.maxGalleries }, (_, g) => ({ g, name: galleryName(g, shelf.names), rows: shelf.places.slice(g * SHOWCASE.perGallery, (g + 1) * SHOWCASE.perGallery).filter(Boolean) }))
    .filter((x) => x.rows.length);

/**
 * My friendships (`/api/friends`), split as the game's page does: my friends, the requests I
 * received, the ones I sent. Each keeps the friendship id (what accept, decline and cancel take)
 * and the other player.
 */
export function friendshipsOf(rows, me) {
  const out = { friends: [], incoming: [], outgoing: [] };
  for (const f of rows) {
    const from = f.requester_id ?? f.requester?.id;
    const mine = from === me;
    const row = { fid: f.id, since: f.updated_at || f.created_at || null, user: nUser(mine ? f.addressee : f.requester) };
    if (!row.user) continue;
    if (f.status === "accepted") out.friends.push(row);
    else if (f.status === "pending") (mine ? out.outgoing : out.incoming).push(row);
  }
  const byName = (a, b) => a.user.username.localeCompare(b.user.username, "fr", { sensitivity: "base" });
  out.friends.sort(byName);
  return out;
}

/**
 * My pending trades per friend (the light `/api/trades?active=1` rows): how many wait for my
 * answer and how many wait for theirs. Only the latest offer of a negotiation is pending.
 */
export function waitingBy(rows, me) {
  const by = new Map();
  for (const t of rows) {
    if (t.status && t.status !== "pending") continue;
    const mine = t.initiator_id === me;
    const other = mine ? t.recipient_id : t.initiator_id;
    const w = by.get(other) ?? { toAnswer: 0, sent: 0 };
    if (mine) w.sent++; else w.toAnswer++;
    by.set(other, w);
  }
  return by;
}

/** Where a player found by the search stands with me: friend, sent, received, or null (addable). */
export function relationOf(id, split) {
  if (split.friends.some((r) => r.user.id === id)) return "friend";
  if (split.outgoing.some((r) => r.user.id === id)) return "sent";
  if (split.incoming.some((r) => r.user.id === id)) return "received";
  return null;
}

// The families of achievements, read from what their code says (the game sends no category): a
// code no family recognises goes to "Autres", shown only when something is in it. New achievements
// the game adds land in their family without any change here.
// In display order; `rank` is the order they are tried in (the most specific word first: a
// "reject_trades" is about trades, a "sell_l" about the market).
export const FAMILIES = [
  { id: "collection", label: "Collection", rank: 3, test: /collect|first|dupe|star|showcase|pack|shiny|atk|def|_(c|pc|r|sr|ur|l)$/ },
  { id: "trades", label: "Échanges", rank: 0, test: /trade/ },
  { id: "battles", label: "Batailles", rank: 1, test: /win|streak|battle|duel/ },
  { id: "market", label: "Marché", rank: 2, test: /sell|buy|auction|bid|_wb|wb_/ },
  { id: "other", label: "Autres", rank: 4, test: /(?:)/ },
];
const TRIED = [...FAMILIES].sort((a, b) => a.rank - b.rank);
const familyOf = (code) => TRIED.find((f) => f.test.test(code ?? "")).id;

/**
 * The achievements (the `achievements` table) with mine (`user_achievements`): each with its
 * family, its reward and its state: "claim" (unlocked, reward waiting), "done", or "locked".
 * Ordered by reward within a family (the reward grows with the effort), then by title.
 */
export function achievementsOf(list, mine) {
  const got = new Map((mine || []).map((u) => [u.achievement_id, u]));
  return (list || [])
    .map((a) => {
      const u = got.get(a.id);
      const reward = a.wikibidous_reward ?? 0;
      return {
        id: a.id, code: a.code, title: a.title || a.code, description: a.description || "", icon: a.icon || "🏅", reward,
        family: familyOf(a.code), unlockedAt: u?.unlocked_at ?? null, claimedAt: u?.claimed_at ?? null,
        state: !u ? "locked" : reward > 0 && !u.claimed_at ? "claim" : "done",
      };
    })
    .sort((a, b) => a.reward - b.reward || a.title.localeCompare(b.title, "fr"));
}

// An achievement's tier, from its reward (the reward grows with the effort): its medal's colour.
export const TIERS = [
  { id: "bronze", label: "Bronze", from: 0 },
  { id: "silver", label: "Argent", from: 25 },
  { id: "gold", label: "Or", from: 100 },
  { id: "platinum", label: "Platine", from: 500 },
];
export const tierOf = (reward) => TIERS.findLast((t) => (reward ?? 0) >= t.from);

/**
 * The locked achievements closest to done (those whose progress can be counted), the nearest
 * first: what to aim for next.
 */
export function nextUp(list, progressFor, n = 3) {
  return list.filter((a) => a.state === "locked").map((a) => ({ a, p: progressFor(a) })).filter((x) => x.p)
    .sort((x, y) => y.p.have / y.p.goal - x.p.have / x.p.goal).slice(0, n);
}

/**
 * How far along a locked achievement is, read from its wording ("Posséder 2500 cartes",
 * "Posséder 10 cartes Super Rare"), so one the game adds in the same words works too: { have,
 * goal } from my collection's counts, or null when the wording says nothing countable, or when the
 * count already reaches the goal (the server knows better; no bar then rather than a wrong one).
 * `names`: rarity code -> its French name.
 */
export function progressOf(description, stats, names) {
  const m = /^poss[ée]der\s+([\d\s\u202f]+)\s+cartes?\s*(.*)$/i.exec((description || "").trim());
  if (!m || !stats) return null;
  const goal = Number(m[1].replace(/\D/g, ""));
  const tail = m[2].trim().toLowerCase().replace(/s$/, "");
  const rarity = tail ? Object.keys(names).find((r) => names[r].toLowerCase() === tail) : null;
  if (tail && !rarity) return null; // "Posséder 5 cartes shiny": not a count we know
  const have = rarity ? stats.rarityCounts?.[rarity] ?? 0 : stats.total;
  return goal > 0 && have != null && have < goal ? { have, goal } : null;
}

// The showcase: 40 places in galleries of 4; one gallery per 5 000 cards owned, up to 10 (the
// game's own rule).
export const SHOWCASE = { places: 40, perGallery: 4, maxGalleries: 10, cardsPerGallery: 5000 };
export const galleryCount = (cards) => (cards > 0 ? Math.min(SHOWCASE.maxGalleries, Math.ceil(cards / SHOWCASE.cardsPerGallery)) : 1);
export const galleryName = (i, names) => names?.[i] || `Vitrine ${i + 1}`;
