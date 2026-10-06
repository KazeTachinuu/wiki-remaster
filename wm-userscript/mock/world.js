// The mock's world: six players in two groups of friends, their collections, the market they
// trade on, their trades, chats and notifications. Built once from the catalogue (real cards from
// mock/snapshot.json when present) with a fixed seed, so the same world comes back on every start.
// Everything is plain data; plugins/vite-mock-api.js serves it and applies the writes.
//
// Players (invented names; "me" is the logged-in player):
//   me, Alix, Basile, Capucine   one group of friends
//   Capucine, Dorian, Elsa       the other (Capucine is in both); Dorian asks me to be friends

const DAY = 86400e3, HOUR = 3600e3, MIN = 60e3;

function rng(seed) {
  let s = 0;
  for (const ch of String(seed)) s = Math.imul(s ^ ch.codePointAt(0), 2654435761);
  return () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)) >>> 0) / 4294967296;
}

export const PLAYERS = [
  { id: "me", username: "Toi" },
  { id: "u_alix", username: "Alix" },
  { id: "u_basile", username: "Basile" },
  { id: "u_capucine", username: "Capucine" },
  { id: "u_dorian", username: "Dorian" },
  { id: "u_elsa", username: "Elsa" },
];
const GROUP = { me: "A", u_alix: "A", u_basile: "A", u_capucine: "AB", u_dorian: "B", u_elsa: "B" };
// accepted friendships, and one request still waiting (Dorian -> me)
export const FRIENDSHIPS = [
  ["u_alix", "me"], ["u_basile", "me"], ["u_capucine", "me"], ["u_alix", "u_basile"],
  ["u_capucine", "u_dorian"], ["u_capucine", "u_elsa"], ["u_dorian", "u_elsa"],
];
export const FRIEND_REQUESTS = [["u_dorian", "me"]];
// Proportions measured on a real account and the live market (October 2026):
//   a collection: C 66 %, PC 23 %, R 8.4 %, SR 2.5 %, UR 0.5 %, L almost none; 47 % without a
//   picture; shiny next to none (0 in 1291); no duplicate copies
//   the market: higher rarities (R 28 %, SR 24 %, PC 20 %, UR 16 %, L 6 %, C 6 %), listings of 1
//   to 12 h, almost none with a bid yet
// Collections hold up to a couple hundred cards: the snapshot has 240 distinct cards, and real
// collections have no duplicates (WM_MOCK_CARDS seeds a bigger one for load tests).
const SIZE = { me: 200, u_alix: 150, u_basile: 120, u_capucine: 170, u_dorian: 140, u_elsa: 110 };
const ODDS = [["C", 66], ["PC", 23], ["R", 8.4], ["SR", 2.5], ["UR", 0.5], ["L", 0.1]];
const MARKET_ODDS = [["R", 28], ["SR", 24], ["PC", 20], ["UR", 16], ["L", 6], ["C", 6]];
const SHINY = 0.003, BID_SHARE = 0.15;

/**
 * Build the world from the catalogue. `price(card)` is a card's typical price (its snapshot
 * average, else its rarity's). Returns plain data:
 *   players, friendships, requests,
 *   collections: Map(playerId -> [{ id, card, is_shiny, starred, obtained_at }]),
 *   auctions: [{ ...live auction shape, bids: [...] }], trades: [...], chats: Map(friendId -> [...]),
 *   notifications: [...] (mine)
 */
export function buildWorld(catalog, price, now = Date.now()) {
  const r = rng("wiki-remaster world");
  const at = (msAgo) => new Date(now - msAgo).toISOString();
  const player = (id) => PLAYERS.find((p) => p.id === id);
  const byRarity = Object.fromEntries(ODDS.map(([rr]) => [rr, catalog.filter((c) => c.rarity === rr)]));

  // each group draws mostly from its own half of the catalogue: friends share cards, the two
  // groups less so, and a common third keeps some cards everywhere
  const pool = (group, rarity) => {
    const all = byRarity[rarity] || [];
    const third = Math.ceil(all.length / 3);
    if (group === "A") return all.slice(0, third * 2);
    if (group === "B") return all.slice(third);
    return all;
  };
  const pickFrom = (odds) => { let x = r() * odds.reduce((t, [, w]) => t + w, 0); for (const [rr, w] of odds) if ((x -= w) <= 0) return rr; return odds[0][0]; };
  const pickRarity = () => pickFrom(ODDS);

  let ucSeq = 0;
  const collections = new Map();
  for (const p of PLAYERS) {
    const rows = [], owned = new Set();
    for (let i = 0; i < SIZE[p.id] * 3 && rows.length < SIZE[p.id]; i++) {
      const list = pool(GROUP[p.id], pickRarity()).filter((c) => !owned.has(c.id)); // no duplicates
      if (!list.length) continue;
      const card = list[Math.floor(r() * list.length)]; // the pool has the real share without a picture
      owned.add(card.id);
      rows.push({ id: `uc_${++ucSeq}`, card, is_shiny: r() < SHINY, starred: p.id === "me" && r() < 0.01, obtained_at: at(r() * 60 * DAY) });
    }
    collections.set(p.id, rows);
  }

  // --- the market: each player lists a few of their cards; others bid --------------------
  let aSeq = 0, bSeq = 0;
  const auctions = [];
  const listing = (sellerId, uc, { endsIn, ageMs = 0.5 * DAY, status = "active", bidders = [] }) => {
    const base = Math.max(1, Math.round(price(uc.card) * (0.7 + r() * 0.5)));
    const created = now - ageMs, end = now + endsIn;
    const bids = [];
    let top = null;
    for (const bidderId of bidders) {
      const amount = Math.round((top?.amount ?? base) * (1 + 0.08 + r() * 0.25)) + (top ? 0 : 0);
      top = { id: `b_${++bSeq}`, amount, bidder: { id: bidderId, username: player(bidderId).username, avatar_url: null }, bidder_id: bidderId, placed_at: new Date(created + (bids.length + 1) * (Math.max(end, now) - created) / (bidders.length + 2)).toISOString() };
      bids.push(top);
    }
    const sold = status === "settled_sold";
    const a = {
      id: `auc_${++aSeq}`, card_id: uc.card.id, card: uc.card, is_shiny: uc.is_shiny, status,
      base_amount: base, listing_base_amount: base, current_bid: top?.amount ?? null, effective_bid: top?.amount ?? base,
      current_bidder_id: top?.bidder_id ?? null, current_bidder: top?.bidder ?? null,
      final_price: sold ? top?.amount ?? base : null, created_at: new Date(created).toISOString(), end_at: new Date(end).toISOString(),
      settled_at: status === "active" ? null : new Date(end).toISOString(), base_repriced_at: null,
      winner_id: sold ? top?.bidder_id ?? null : null, seller_id: sellerId, seller: { id: sellerId, username: player(sellerId).username, avatar_url: null },
      user_card_id: uc.id, bids,
    };
    auctions.push(a);
    // a listed copy leaves its owner's collection
    const rows = collections.get(sellerId);
    rows.splice(rows.indexOf(uc), 1);
    return a;
  };
  const others = PLAYERS.filter((p) => p.id !== "me").map((p) => p.id);
  const takeCards = (id, n, filter = () => true) => {
    const rows = collections.get(id).filter(filter);
    return Array.from({ length: Math.min(n, rows.length) }, (_, k) => rows[Math.floor((k / n) * rows.length)]);
  };
  // the others' live listings, the market's rarity mix, ending within 1 to 12 h, few with a bid
  for (const seller of others) {
    for (let k = 0; k < 8; k++) {
      const rarity = pickFrom(MARKET_ODDS);
      const uc = collections.get(seller).find((u) => u.card.rarity === rarity) ?? collections.get(seller)[0];
      if (!uc) continue;
      const bidders = r() < BID_SHARE ? others.filter((o) => o !== seller).sort(() => r() - 0.5).slice(0, 1 + Math.floor(r() * 2)) : [];
      listing(seller, uc, { endsIn: [1, 1, 3, 6, 12][Math.floor(r() * 5)] * HOUR * (0.2 + r() * 0.8), ageMs: (0.1 + r() * 8) * HOUR, bidders });
    }
  }
  // a few cards listed several times, so the same-card comparison has something to compare
  const popular = auctions.filter((a) => a.status === "active").slice(0, 4);
  for (const a of popular) {
    for (const seller of others.filter((o) => o !== a.seller_id).slice(0, 2)) {
      const twin = collections.get(seller).find((u) => u.card.rarity === a.card.rarity) ;
      if (!twin) continue;
      const copy = { ...twin, card: a.card };
      collections.get(seller).splice(collections.get(seller).indexOf(twin), 1, copy);
      listing(seller, copy, { endsIn: (2 + r() * 30) * HOUR });
    }
  }
  // me: two live listings (one with a bid), and my history: a sale, an unsold, one cancelled
  const mine = takeCards("me", 6, (u) => u.card.rarity !== "C");
  listing("me", mine[0], { endsIn: 5 * HOUR, bidders: ["u_basile"] });
  listing("me", mine[1], { endsIn: 18 * HOUR });
  const sold = listing("me", mine[2], { endsIn: -1 * DAY, ageMs: 2 * DAY, status: "settled_sold", bidders: ["u_alix", "u_capucine"] });
  const unsold = listing("me", mine[3], { endsIn: -3 * DAY, ageMs: 4 * DAY, status: "settled_unsold" });
  collections.get("me").push(mine[3]); // an unsold card comes back
  // where I bid: leading on one, outbid on another; and one I won
  const live = auctions.filter((a) => a.status === "active" && a.seller_id !== "me");
  const bidOn = (a, amount, mineOnTop) => {
    const me = { id: `b_${++bSeq}`, amount, bidder: { id: "me", username: "Toi", avatar_url: null }, bidder_id: "me", placed_at: at(3 * HOUR) };
    a.bids.push(me);
    if (!mineOnTop) a.bids.push({ id: `b_${++bSeq}`, amount: amount + 5, bidder: { id: "u_elsa", username: "Elsa", avatar_url: null }, bidder_id: "u_elsa", placed_at: at(40 * MIN) });
    const top = a.bids.at(-1);
    Object.assign(a, { current_bid: top.amount, effective_bid: top.amount, current_bidder_id: top.bidder_id, current_bidder: top.bidder });
  };
  const leading = live.find((a) => !a.bids.length), outbid = live.find((a) => !a.bids.length && a !== leading);
  if (leading) bidOn(leading, leading.base_amount + 2, true);
  if (outbid) bidOn(outbid, outbid.base_amount + 3, false);
  const wonCard = takeCards("u_dorian", 1)[0];
  const won = wonCard && listing("u_dorian", wonCard, { endsIn: -2 * DAY, ageMs: 3 * DAY, status: "settled_sold", bidders: ["u_elsa"] });
  if (won) {
    won.bids.push({ id: `b_${++bSeq}`, amount: won.final_price + 10, bidder: { id: "me", username: "Toi", avatar_url: null }, bidder_id: "me", placed_at: at(2.1 * DAY) });
    Object.assign(won, { final_price: won.final_price + 10, current_bid: won.final_price + 10, current_bidder_id: "me", winner_id: "me" });
    collections.get("me").push({ ...wonCard, id: `uc_${++ucSeq}`, obtained_at: at(2 * DAY) });
  }
  // a month of sale history between the others: the cards that circulate get a market value.
  // A card is sold now and then by whoever holds it, so the same cards come back (real markets too).
  for (let k = 0; k < 250; k++) {
    const seller = others[k % others.length];
    const rows = collections.get(seller);
    const uc = rows[Math.floor(Math.pow(r(), 1.6) * rows.length)];
    if (!uc) continue;
    const buyer = others.filter((o) => o !== seller)[Math.floor(r() * 4)];
    listing(seller, uc, { endsIn: -(1 + r() * 30) * DAY, ageMs: (2 + r() * 30) * DAY, status: r() < 0.8 ? "settled_sold" : "settled_unsold", bidders: [buyer] });
  }

  // --- trades between friends, with their chats -------------------------------------------
  let tSeq = 0, iSeq = 0;
  const trades = [];
  const item = (tradeId, owner, uc) => ({ id: `ti_${++iSeq}`, card: { ...uc.card, is_shiny: uc.is_shiny }, card_id: uc.card.id, is_shiny: uc.is_shiny, trade_id: tradeId,
    offered_by: owner, user_card_id: uc.id, snapshot_rarity: uc.card.rarity, snapshot_atk: uc.card.atk, snapshot_def: uc.card.def });
  const trade = (from, to, give, get, o = {}) => {
    const t = { id: `tr_${++tSeq}`, status: "pending", parent_trade_id: null, initiator_wikibidous: 0, recipient_wikibidous: 0, ...o,
      initiator_id: from, recipient_id: to, initiator: player(from), recipient: player(to), created_at: at(o.ago ?? HOUR), updated_at: at(o.answered ?? o.ago ?? HOUR) };
    delete t.ago; delete t.answered;
    t.items = [...give.map((uc) => item(t.id, from, uc)), ...get.map((uc) => item(t.id, to, uc))];
    trades.push(t);
    return t;
  };
  // a copy of that rarity in the player's collection, else the closest rarity they own
  const LADDER = ["C", "PC", "R", "SR", "UR", "L"];
  const card = (id, k, rarity) => {
    const rows = collections.get(id);
    const at = LADDER.indexOf(rarity ?? "C");
    for (let d = 0; d < LADDER.length; d++) for (const rr of [LADDER[at - d], LADDER[at + d]]) {
      const some = rows.filter((u) => u.card.rarity === rr);
      if (some.length) return some[k % some.length];
    }
    return rows[k % rows.length];
  };
  // Alix offers me one of hers for two of mine (waiting for my answer)
  trade("u_alix", "me", [card("u_alix", 3, "R")], [card("me", 5, "PC"), card("me", 9, "C")], { ago: 25 * MIN });
  // Basile and me: my offer, his counter with coins, then my new offer, still waiting
  const root = trade("me", "u_basile", [card("me", 2, "R")], [card("u_basile", 1, "SR")], { status: "countered", ago: 2 * DAY, answered: 1.8 * DAY });
  const counter = trade("u_basile", "me", [card("u_basile", 4, "R")], [card("me", 2, "R")], { status: "countered", parent_trade_id: root.id, initiator_wikibidous: 40, ago: 1.8 * DAY, answered: 1.2 * DAY });
  trade("me", "u_basile", [card("me", 2, "R"), card("me", 11, "C")], [card("u_basile", 1, "SR")], { parent_trade_id: counter.id, ago: 1.2 * DAY });
  // history: Capucine accepted my offer; Alix refused one; I withdrew one to Basile
  trade("me", "u_capucine", [card("me", 7, "PC")], [card("u_capucine", 2, "PC")], { status: "accepted", ago: 4 * DAY, answered: 3.8 * DAY });
  trade("me", "u_alix", [card("me", 13, "C")], [card("u_alix", 0, "UR")], { status: "declined", recipient_wikibidous: 0, initiator_wikibidous: 120, ago: 6 * DAY, answered: 5.9 * DAY });
  trade("me", "u_basile", [card("me", 15, "C")], [card("u_basile", 6, "PC")], { status: "cancelled", ago: 9 * DAY, answered: 8.9 * DAY });

  const msg = (from, to, content, msAgo) => ({ id: `m_${from}_${to}_${msAgo}`, sender_id: from, recipient_id: to, content, created_at: at(msAgo), read: true });
  const chats = new Map([
    ["u_alix", [msg("u_alix", "me", "Salut ! Ta carte Rare m'intéresse, je t'envoie une offre.", 30 * MIN), msg("me", "u_alix", "Ok, je regarde ça.", 27 * MIN)]],
    ["u_basile", [msg("me", "u_basile", "Ta Super Rare contre ma Rare ?", 2 * DAY), msg("u_basile", "me", "Ajoute un peu, je mets 40 WikiBidous de mon côté.", 1.8 * DAY), msg("me", "u_basile", "Je préfère ajouter une carte, regarde ma nouvelle offre.", 1.2 * DAY)]],
    ["u_capucine", [msg("me", "u_capucine", "Merci pour l'échange !", 3.8 * DAY), msg("u_capucine", "me", "Avec plaisir. Dorian et Elsa cherchent aussi des Légendaires.", 3.7 * DAY)]],
  ]);

  // --- my notifications, from what happened above ----------------------------------------
  const n = [];
  const note = (type, data, msAgo, read) => n.push({ id: `n_${n.length + 1}`, user_id: "me", type, data, read, created_at: at(msAgo) });
  const alixOffer = trades[0];
  note("trade_offer", { title: "🔄 Nouvelle offre d'échange !", message: "Alix vous propose un échange.", trade_id: alixOffer.id, initiator_id: "u_alix", initiator_username: "Alix" }, 25 * MIN, false);
  if (outbid) note("marketplace_outbid", { title: "📉 Vous avez été surenchéri", message: `Elsa a surenchéri sur ${outbid.card.wikipedia_title}.`, auction_id: outbid.id, card_id: outbid.card.id, card_title: outbid.card.wikipedia_title, new_bid: outbid.current_bid, previous_bid: outbid.current_bid - 5 }, 40 * MIN, false);
  note("friend_request", { title: "Nouvelle demande d'ami !", message: "Dorian veut devenir votre ami.", requester_id: "u_dorian", requester_username: "Dorian" }, 3 * HOUR, false);
  note("trade_countered", { title: "↩️ Contre-offre reçue !", message: "Basile a fait une contre-offre.", trade_id: counter.id, initiator_id: "u_basile", initiator_username: "Basile" }, 1.8 * DAY, true);
  note("marketplace_auction_sold", { title: "💰 Carte vendue !", message: `${sold.card.wikipedia_title} s'est vendue ${sold.final_price} WikiBidous.`, auction_id: sold.id, card_id: sold.card.id, card_title: sold.card.wikipedia_title, final_price: sold.final_price }, 1 * DAY, true);
  if (won) note("marketplace_auction_won", { title: "🏆 Enchère gagnée !", message: `Vous avez remporté ${won.card.wikipedia_title}.`, auction_id: won.id, card_id: won.card.id, card_title: won.card.wikipedia_title, final_price: won.final_price }, 2 * DAY, true);
  note("marketplace_auction_unsold", { title: "Enchère terminée sans acheteur", message: `Votre vente de ${unsold.card.wikipedia_title} s'est terminée sans enchère.`, auction_id: unsold.id, card_id: unsold.card.id, card_title: unsold.card.wikipedia_title }, 3 * DAY, true);
  note("trade_accepted", { title: "✅ Offre acceptée !", message: "Capucine a accepté votre offre.", trade_id: trades.find((t) => t.status === "accepted").id, recipient_id: "u_capucine", recipient_username: "Capucine" }, 3.8 * DAY, true);

  return { players: PLAYERS, friendships: FRIENDSHIPS, requests: FRIEND_REQUESTS, collections, auctions, trades, chats, notifications: n };
}

// --- the running market -------------------------------------------------------------------
// Called on each request with the current time: catches the market up minute by minute since the
// last call. Ended listings settle (sold to the top bidder, else the card goes back), the other
// players bid now and then and list new cards to keep the market full, and every sale joins the
// price history. Events that concern me become notifications. WM_MOCK_MARKET_SPEED speeds it up.
const LIVE_TARGET = 45; // the others' live listings the market keeps
const BID_PER_MIN = 0.001; // the chance a live listing gets a bid in a given minute: about 3 an hour market-wide (bids are rare)

export function advanceMarket(world, now, price, speed = 1) {
  const r = rng(`market ${world.tick = (world.tick ?? 0) + 1}`);
  const from = world.clock ?? now;
  // simulated minutes since the last call (capped: a server left idle for days catches up a day)
  const minutes = Math.min(24 * 60, Math.floor(((now - from) * speed) / MIN));
  if (minutes < 1) { world.clock ??= now; return; }
  world.clock = from + (minutes * MIN) / speed;
  const others = world.players.filter((p) => p.id !== "me").map((p) => p.id);
  const name = (id) => world.players.find((p) => p.id === id)?.username;
  const note = (type, data) => world.notifications.unshift({ id: `n_live_${(world.noteSeq = (world.noteSeq ?? 0) + 1)}`, user_id: "me", type, data, read: false, created_at: new Date(now).toISOString() });
  for (let m = 0; m < minutes; m++) {
    const t = from + ((m + 1) * MIN) / speed;
    for (const a of world.auctions) {
      if (a.status !== "active") continue;
      // ended: settle it
      if (Date.parse(a.end_at) <= t) {
        const winner = a.current_bidder_id;
        Object.assign(a, { status: winner ? "settled_sold" : "settled_unsold", final_price: winner ? a.current_bid : null, winner_id: winner ?? null, settled_at: a.end_at });
        const back = { id: `uc_live_${a.id}`, card: a.card, is_shiny: a.is_shiny, starred: false, obtained_at: a.end_at };
        if (a.seller_id !== "me" || !winner) (winner ? world.collections.get(winner) : world.collections.get(a.seller_id))?.push(back);
        const t_ = { auction_id: a.id, card_id: a.card.id, card_title: a.card.wikipedia_title };
        if (a.seller_id === "me" && winner) note("marketplace_auction_sold", { title: "💰 Carte vendue !", message: `${a.card.wikipedia_title} s'est vendue ${a.final_price} WikiBidous.`, ...t_, final_price: a.final_price });
        else if (a.seller_id === "me") note("marketplace_auction_unsold", { title: "Enchère terminée sans acheteur", message: `Votre vente de ${a.card.wikipedia_title} s'est terminée sans enchère.`, ...t_ });
        else if (winner === "me") note("marketplace_auction_won", { title: "🏆 Enchère gagnée !", message: `Vous avez remporté ${a.card.wikipedia_title}.`, ...t_, final_price: a.final_price });
        continue;
      }
      // now and then, another player bids on it
      if (r() < BID_PER_MIN) {
        const bidder = others.filter((o) => o !== a.seller_id && o !== a.current_bidder_id)[Math.floor(r() * 3)];
        if (!bidder) continue;
        const amount = Math.round((a.current_bid ?? a.base_amount) * (1.06 + r() * 0.2)) + 1;
        const wasMine = a.current_bidder_id === "me";
        const bid = { id: `b_live_${a.id}_${a.bids.length}`, amount, bidder: { id: bidder, username: name(bidder), avatar_url: null }, bidder_id: bidder, placed_at: new Date(t).toISOString() };
        a.bids.push(bid);
        Object.assign(a, { current_bid: amount, effective_bid: amount, current_bidder_id: bidder, current_bidder: bid.bidder });
        if (wasMine) note("marketplace_outbid", { title: "📉 Vous avez été surenchéri", message: `${name(bidder)} a surenchéri sur ${a.card.wikipedia_title}.`, auction_id: a.id, card_id: a.card.id, card_title: a.card.wikipedia_title, new_bid: amount, previous_bid: a.bids.at(-2)?.amount ?? null });
      }
    }
    // the others keep the market full: a new listing when it runs low
    const live = world.auctions.filter((a) => a.status === "active" && a.seller_id !== "me").length;
    if (live < LIVE_TARGET && r() < 0.5) {
      const seller = others[Math.floor(r() * others.length)];
      const rows = world.collections.get(seller);
      const rarity = (() => { let x = r() * 100; for (const [rr, w] of MARKET_ODDS) if ((x -= w) <= 0) return rr; return "R"; })();
      const uc = rows.find((u) => u.card.rarity === rarity) ?? rows[Math.floor(r() * rows.length)];
      if (!uc) continue;
      rows.splice(rows.indexOf(uc), 1);
      const base = Math.max(1, Math.round(price(uc.card) * (0.7 + r() * 0.5)));
      const end = t + [1, 1, 3, 6, 12][Math.floor(r() * 5)] * HOUR;
      world.auctions.push({
        id: `auc_live_${(world.aucSeq = (world.aucSeq ?? 0) + 1)}`, card_id: uc.card.id, card: uc.card, is_shiny: uc.is_shiny, status: "active",
        base_amount: base, listing_base_amount: base, current_bid: null, effective_bid: base, current_bidder_id: null, current_bidder: null,
        final_price: null, created_at: new Date(t).toISOString(), end_at: new Date(end).toISOString(), settled_at: null, base_repriced_at: null, winner_id: null,
        seller_id: seller, seller: { id: seller, username: name(seller), avatar_url: null }, user_card_id: uc.id, bids: [],
      });
    }
  }
}
