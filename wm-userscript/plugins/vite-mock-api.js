/**
 * Dev-only mock of wiki-masters.com's /api, mounted on the Vite server (no second process).
 * Routes and shapes mirror the live site (docs/API_REFERENCE.md), so the app runs the real
 * adapter against it. State is in memory and resets on restart. The data is a world of six players
 * (mock/world.js) built from real cards (mock/snapshot.json), with a market that keeps running.
 */

import { CATALOG, RARITY_WEIGHTS, SNAPSHOT_PRICES } from "../mock/catalog.js";
import { buildWorld, advanceMarket } from "../mock/world.js";
import { pastSales, SALES_CAP } from "../mock/history.js";
import { ACHIEVEMENTS, COLLECT } from "../mock/achievements.js";

const PAGE = 50;
const PACK_SIZE = 5;
const PACK_CAP = 10;
const REGEN_SECONDS = 45;
const SHINY_CHANCE = 0.03;
// active auctions at once: the game's MAX_CONCURRENT_AUCTIONS_REGULAR / _PRO
const MAX_AUCTIONS = { base: 5, pro: 10 };
const START_BALANCE = 113;
// typical prices per rarity: the live game's (snapshot), else a rough guess
const PRICE = { C: 8, PC: 20, R: 45, SR: 110, UR: 260, L: 600, ...Object.fromEntries(Object.entries(SNAPSHOT_PRICES || {}).filter(([, v]) => v != null)) };
const RANK = { L: 5, UR: 4, SR: 3, R: 2, PC: 1, C: 0 };

const norm = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const iso = (t = Date.now()) => new Date(t).toISOString();
const byTitle = (a, b) => a.wikipedia_title.localeCompare(b.wikipedia_title, "fr");
// a collection's orders, as the live routes take them (checked by test:prod): rarity (default),
// name, added (newest first), starred (favourites first)
const byAdded = (a, b) => Date.parse(b.obtained_at || 0) - Date.parse(a.obtained_at || 0);
const collectionOrder = (sort) => ({
  name: (a, b) => byTitle(a.card, b.card),
  added: byAdded,
  starred: (a, b) => b.starred - a.starred || byAdded(a, b),
})[sort] ?? ((a, b) => RANK[b.card.rarity] - RANK[a.card.rarity] || byTitle(a.card, b.card));
// The filters the real card routes share: `q` searches title and category, `rarity` may repeat
// (rarity=PC&rarity=C). `cardOf` reads the card out of a row (a catalog card is its own card).
function filterCards(rows, url, cardOf = (c) => c) {
  const nq = norm(url.searchParams.get("q"));
  const rarities = url.searchParams.getAll("rarity");
  return rows.filter((r) => {
    const c = cardOf(r);
    return (!nq || norm(c.wikipedia_title + " " + c.category).includes(nq)) && (!rarities.length || rarities.includes(c.rarity));
  });
}

// Deterministic PRNG seeded by a string, so a card's synthesized market data is stable.
function rng(seed) {
  let s = [...String(seed)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return () => { s = (s * 1103515245 + 12345) >>> 0; return s / 4294967296; };
}

// players who keep their profile to their friends
const PRIVATE_PROFILES = new Set(["u_elsa"]);
// players the search finds who are not friends yet
const STRANGERS = ["Kami", "Karoube", "Kays", "Kaulain", "Karl Contout", "Margaux", "Noé", "Zélie"];

export default function mockApiPlugin() {
  return {
    name: "vite-mock-api",
    configureServer(server) {
      const byRarity = {};
      for (const c of CATALOG) (byRarity[c.rarity] ||= []).push(c);

      let seq = 0;
      const state = {
        profile: { username: "Toi", packs_remaining: PACK_CAP, packs_last_regen_at: Date.now(), wikibidous_balance: START_BALANCE, pity_counter: 0, is_pro: true, is_vip: false, special_packs: false,
          is_public: true, avatar_url: null, avatar_pos_x: 50, avatar_pos_y: 50, created_at: iso(Date.now() - 40 * 86400000) },
        proDaily: null, // the calendar day the Pro daily pack was claimed
        specialAt: 0, // when the next special pack can be opened
        collection: new Map(), // user card id -> { id, card, count, is_shiny, starred, obtained_at, tags }
        tags: [], // my tags: { id, name, color } (the game keeps them in its database, see /api/__sb)
        read: new Set(), // read notification ids
        showcase: new Map(), // showcase position -> user card id
        galleries: {}, // gallery index -> the name given to it
        achievements: new Map(), // achievement id -> { unlocked_at, claimed_at }
      };

      const addOwned = (card, is_shiny) => {
        const id = "uc_" + ++seq;
        state.collection.set(id, { id, card, count: 1, is_shiny, starred: false, obtained_at: iso() });
      };
      // The world (mock/world.js): six players in two groups of friends, their collections, a
      // market that keeps running, trades, chats and notifications, all from real cards in their
      // real proportions. Built again by /api/reset.
      const priceOf = (card) => card.avg ?? PRICE[card.rarity] ?? 10;
      const SPEED = Number(process.env.WM_MOCK_MARKET_SPEED) || 1; // simulated market minutes per minute
      // A big collection for load tests: WM_MOCK_CARDS=1000 (and WM_MOCK_SHINY=1 for all shiny,
      // WM_MOCK_NOIMG=1 for none with a picture) adds that many copies of the catalogue's cards.
      // A power user for load tests: WM_MOCK_FRIENDS=300 more friends, WM_MOCK_TRADES=600 more
      // trades with all of them, WM_MOCK_CHAIN=150 offers back and forth in one negotiation (with
      // as many chat messages).
      const LOAD = { trades: Number(process.env.WM_MOCK_TRADES) || 0, chain: Number(process.env.WM_MOCK_CHAIN) || 0, friends: Number(process.env.WM_MOCK_FRIENDS) || 0 };
      const SEED = { cards: Number(process.env.WM_MOCK_CARDS) || 0, shiny: Number(process.env.WM_MOCK_SHINY ?? SHINY_CHANCE), noImg: process.env.WM_MOCK_NOIMG === "1" };
      let world, FRIENDS = [];
      const ME = { id: "me", username: state.profile.username, avatar_url: null };
      const userOf = (id) => { const p = world.players.find((x) => x.id === id); return p && { id: p.id, username: p.username, avatar_url: null }; };
      // cards the world gives me (won auctions, unsold listings coming back) join my collection
      const drainMine = () => { for (const u of world.collections.get("me").splice(0)) state.collection.set(u.id, { ...u, count: 1 }); };
      function seedWorld() {
        world = buildWorld(CATALOG, priceOf, Date.now(), LOAD);
        state.collection = new Map();
        state.tags = [];
        drainMine();
        for (let i = 0; i < SEED.cards; i++) {
          const base = CATALOG[i % CATALOG.length];
          addOwned({ ...base, id: `${base.id}~${i}`, wikipedia_title: `${base.wikipedia_title} ${i + 1}`, ...(SEED.noImg ? { image_url: null } : {}) }, Math.random() < SEED.shiny);
        }
        FRIENDS = world.friendships.filter((f) => f.includes("me")).map(([a, b]) => userOf(a === "me" ? b : a));
        // players met by the search, not friends; requests change, so each world keeps its own list
        world.players.push(...STRANGERS.map((username, i) => ({ id: `u_s${i}`, username })));
        world.requests = world.requests.map((r) => [...r]);
        state.showcase = new Map();
        state.galleries = {};
        // a few achievements unlocked, two of them with their reward still waiting
        const day = 86400000;
        state.achievements = new Map([["first_sr", 9, true], ["collect_50", 30, true], ["collect_100", 20, true], ["first_dupe", 12, true], ["trades_5", 6, true], ["first_ur", 1, false], ["collect_250", 0.2, false]]
          .map(([code, d, claimed]) => ["ach_" + code, { unlocked_at: ago(d * day), claimed_at: claimed ? ago((d - 0.1) * day) : null }]));
        state.trades = world.trades;
        state.chats = world.chats;
        state.humanRequired = false;
      }
      seedWorld();

      const ownsCard = (cardId) => [...state.collection.values()].some((u) => u.card.id === cardId);
      const friendCards = { get: (id) => (world.collections.get(id) || []).map((u) => ({ ...u, count: 1, user_id: id, owned_by_viewer: ownsCard(u.card.id), tags: [] })) };
      const cardOfCopy = (owner, ucId) => (owner === "me" ? state.collection.get(ucId) : world.collections.get(owner)?.find((u) => u.id === ucId));
      const item = (tradeId, owner, uc) => ({ id: "ti_" + ++seq, card: { ...uc.card, is_shiny: uc.is_shiny }, card_id: uc.card.id, is_shiny: uc.is_shiny, trade_id: tradeId,
        offered_by: owner, user_card_id: uc.id, snapshot_rarity: uc.card.rarity, snapshot_atk: uc.card.atk, snapshot_def: uc.card.def });
      const trade = (o) => ({ status: "pending", parent_trade_id: null, initiator_wikibidous: 0, recipient_wikibidous: 0, created_at: iso(), updated_at: iso(), ...o,
        initiator: userOf(o.initiator_id), recipient: userOf(o.recipient_id) });
      const HUMAN = { error: "Vérification humaine requise.", code: "human_verification_required", human_verification_required: true };
      const pendingCopies = (owner) => state.trades.filter((t) => t.status === "pending").flatMap((t) => t.items).filter((i) => i.offered_by === owner).map((i) => i.user_card_id);

      // --- packs --------------------------------------------------------------------
      function regen() {
        const p = state.profile;
        if (p.packs_remaining >= PACK_CAP) { p.packs_last_regen_at = Date.now(); return; }
        const gained = Math.floor((Date.now() - p.packs_last_regen_at) / 1000 / REGEN_SECONDS);
        if (gained > 0) {
          p.packs_remaining = Math.min(PACK_CAP, p.packs_remaining + gained);
          p.packs_last_regen_at += gained * REGEN_SECONDS * 1000;
        }
      }
      function nextRegenSeconds() {
        const p = state.profile;
        if (p.packs_remaining >= PACK_CAP) return 0;
        return Math.max(0, Math.ceil(REGEN_SECONDS - ((Date.now() - p.packs_last_regen_at) / 1000) % REGEN_SECONDS));
      }
      function pickRarity() {
        if (state.profile.pity_counter >= 25) return ["SR", "UR", "L"].find((r) => byRarity[r]?.length) || "R";
        let r = Math.random() * Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
        for (const [rar, w] of Object.entries(RARITY_WEIGHTS)) if ((r -= w) <= 0) return rar;
        return "C";
      }
      // cards of the given rarities, owned once drawn (the Pro and special packs)
      function topCards(rarities, n) {
        const pool = CATALOG.filter((c) => rarities.includes(c.rarity));
        const cards = Array.from({ length: n }, (_, i) => pool[(Math.floor(Math.random() * pool.length) + i) % pool.length]);
        for (const c of cards) addOwned(c, false);
        return cards;
      }

      function drawOne(exclude) {
        const pool = byRarity[pickRarity()] || byRarity.C;
        const candidates = pool.filter((c) => !exclude.has(c.id));
        const card = (candidates.length ? candidates : pool)[Math.floor(Math.random() * (candidates.length || pool.length))];
        exclude.add(card.id);
        const is_shiny = Math.random() < SHINY_CHANCE;
        state.profile.pity_counter = ["SR", "UR", "L"].includes(card.rarity) ? 0 : state.profile.pity_counter + 1;
        addOwned(card, is_shiny);
        return { ...card, is_shiny };
      }

      // --- market: the world's, caught up on each request -------------------------------------
      const advance = () => { advanceMarket(world, Date.now(), priceOf, SPEED); drainMine(); };
      const findAuction = (id) => world.auctions.find((a) => a.id === id) ?? null;
      // an auction as the API sends it (its bids apart, `owned` = I own a copy, like the real API)
      const view = ({ bids, user_card_id, user_card, ...a }) => ({ ...a, owned: ownsCard(a.card.id) });
      // a card's sales, oldest first: the rest of the game's market (seeded, mock/history.js), then
      // the six players' own auctions as they settle
      const history = new Map();
      const salesOf = (card) => {
        if (!history.has(card.id)) history.set(card.id, pastSales(card, priceOf(card)));
        const own = world.auctions.filter((a) => a.status === "settled_sold" && a.card.id === card.id)
          .map((a) => ({ id: a.id, rarity: a.card.rarity, final_price: a.final_price, settled_at: a.settled_at }));
        return [...history.get(card.id), ...own].sort((a, b) => Date.parse(a.settled_at) - Date.parse(b.settled_at));
      };
      // a card's sold average at its rarity: from the market's history, else the snapshot's figure
      const summary = (card) => {
        const sold = salesOf(card).map((a) => a.final_price);
        const average = sold.length ? Math.round(sold.reduce((x, y) => x + y, 0) / sold.length) : card.avg ?? null;
        return average == null ? {} : { [card.rarity]: { average } };
      };

      // --- http ---------------------------------------------------------------------
      const readBody = (req) => new Promise((resolve) => {
        let d = "";
        req.on("data", (c) => (d += c));
        req.on("end", () => { try { resolve(JSON.parse(d || "{}")); } catch { resolve({}); } });
      });
      const send = (res, status, body) => {
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(body));
      };
      const match = (p, re) => p.match(re)?.slice(1);

      let fault = { status: 0, count: 0, delay: 0, match: "/api/" }; // see /api/__fault below
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api")) return next();
        const url = new URL(req.url, "http://localhost");
        const p = url.pathname;
        const m = req.method;
        const q = (k) => url.searchParams.get(k) || "";
        const page = parseInt(q("page"), 10) || 0;
        const p_ = state.profile;
        let id;

        // Dev-only fault injection, to reproduce the real backend's bad days:
        // POST /api/__fault { status: 525, count: 2, delay: 3000, match: "/api/cards" } fails the next
        // `count` matching requests with a Cloudflare-like error page and/or delays matching requests
        // by `delay` ms (`match` is a path prefix, default every /api route); {} clears it.
        // { human: true } makes every trade write and pack open answer 403 "human verification
        // required" until POST /api/human-check passes.
        if (p === "/api/__fault" && m === "POST") {
          const b = await readBody(req);
          if (b.human !== undefined) state.humanRequired = !!b.human;
          fault = { status: 0, count: 0, delay: 0, match: "/api/", ...b };
          return send(res, 200, { ...fault, human: state.humanRequired });
        }
        const hit = p.startsWith(fault.match) && p !== "/api/reset";
        if (hit && fault.delay) await new Promise((r) => setTimeout(r, fault.delay));
        if (hit && fault.count > 0) {
          fault.count--;
          return send(res, fault.status || 525, { error: "<!DOCTYPE html><title>525: SSL handshake failed</title>" });
        }

        // the check asked (/api/__fault { human: true }): every other write is refused too, worded as
        // the live game words it on its other routes (no code), until the check is passed
        if (state.humanRequired && m !== "GET" && !/^\/api\/(__|reset$|human-check$|packs\/|trades)/.test(p)) return send(res, 403, { error: "Vérification anti-bot requise." });

        // Mock-only: the real profile comes from Supabase, see src/wm/api.js.
        if (p === "/api/profile") { regen(); return send(res, 200, { ...p_, next_regen_seconds: nextRegenSeconds(), regen_seconds: REGEN_SECONDS, pack_cap: PACK_CAP }); }
        if (p === "/api/reset" && m === "POST") {
          Object.assign(p_, { packs_remaining: PACK_CAP, wikibidous_balance: START_BALANCE, pity_counter: 0, is_public: true, avatar_url: null, avatar_pos_x: 50, avatar_pos_y: 50 });
          state.proDaily = null; state.specialAt = 0; state.read.clear();
          seedWorld();
          return send(res, 200, { ok: true });
        }

        if (p === "/api/wikibidous") return send(res, 200, { balance: p_.wikibidous_balance });

        if (p === "/api/packs/open" && m === "POST") {
          if (state.humanRequired) return send(res, 403, { ...HUMAN, packs_remaining: p_.packs_remaining });
          regen();
          if (p_.packs_remaining <= 0) return send(res, 409, { error: "Plus de paquets disponibles.", packs_remaining: 0 });
          p_.packs_remaining -= 1;
          const seen = new Set();
          const cards = Array.from({ length: PACK_SIZE }, () => drawOne(seen));
          // like the live route: every copy I own of the pack's cards, counted after the opening
          const ids = new Set(cards.map((c) => c.id));
          const owned_copies = [...state.collection.values()].filter((u) => ids.has(u.card.id)).map((u) => ({ id: u.id, card_id: u.card.id, starred: u.starred, is_shiny: u.is_shiny }));
          return send(res, 200, { cards, owned_copies, packs_remaining: p_.packs_remaining });
        }
        // Pro daily pack, special packs and the V.I.P. grace, shaped like the live routes (the game's
        // own client reads them so): see docs/API_REFERENCE.md
        if (p === "/api/packs/pro-daily") {
          if (!p_.is_pro) return send(res, 403, { error: "Réservé aux membres PRO." });
          const today = new Date().toLocaleDateString("en-CA", { timeZone: req.headers["x-wiki-calendar-tz"] || "UTC" });
          const claimed = state.proDaily === today;
          if (m !== "POST") return send(res, 200, { eligible: !claimed, claimed_today: claimed, claim_date: state.proDaily });
          if (claimed) return send(res, 409, { error: "Pack PRO déjà réclamé aujourd'hui.", claim_date: today });
          state.proDaily = today;
          // the game's Pro panel: "15 cartes de rareté ++" (R or better here)
          const cards = topCards(["R", "SR", "UR", "L"], PRO_PACK_SIZE);
          return send(res, 200, { cards, eligible: false, claimed_today: true, claim_date: today });
        }
        if (p === "/api/packs/special") {
          const available = p_.is_vip || Date.now() >= state.specialAt;
          const next_available_at = available ? null : iso(state.specialAt);
          // the live site sends none (the game's feature switch is off): sample packs only when a dev
          // turns them on with /api/__profile { special_packs: true }
          const offered = p_.special_packs ? SAMPLE_SPECIAL_PACKS : [];
          if (m !== "POST") return send(res, 200, { packs: offered, available: available && offered.length > 0, is_vip: !!p_.is_vip, next_available_at });
          const { packId } = await readBody(req);
          const pack = offered.find((x) => x.id === packId);
          if (!pack) return send(res, 404, { error: "Pack introuvable." });
          if (!available) return send(res, 429, { error: "Prochain pack spécial plus tard.", next_available_at });
          if (!p_.is_vip) state.specialAt = Date.now() + SPECIAL_EVERY_MS;
          const cards = topCards(["SR", "UR", "L"], PACK_SIZE); // "SR+"
          return send(res, 200, { cards, next_available_at: p_.is_vip ? null : iso(state.specialAt) });
        }
        if (p === "/api/packs/grace" && m === "POST") {
          if (!p_.is_vip) return send(res, 403, { error: "Fonctionnalité V.I.P." });
          p_.packs_remaining = PACK_CAP; p_.packs_last_regen_at = Date.now();
          return send(res, 200, { packs_remaining: p_.packs_remaining, packs_last_regen_at: iso(p_.packs_last_regen_at) });
        }
        // dev only: switch the account's Pro / V.I.P. status (and the sample special packs) to see every variant
        // dev only: another player lists a card whose title has `q` (tests the market alerts)
        if (p === "/api/__auction" && m === "POST") {
          const { q: words = "" } = await readBody(req);
          const card = CATALOG.find((c) => norm(c.wikipedia_title).includes(norm(words)));
          if (!card) return send(res, 404, { error: "Aucune carte ne correspond." });
          const base = Math.max(1, Math.round(priceOf(card) * 0.6));
          const a = { id: `auc_dev_${++seq}`, card_id: card.id, card, is_shiny: false, status: "active", base_amount: base, listing_base_amount: base, current_bid: null, effective_bid: base,
            current_bidder_id: null, current_bidder: null, final_price: null, created_at: iso(), end_at: iso(Date.now() + 3 * 3600e3), settled_at: null, base_repriced_at: null, winner_id: null,
            seller_id: "u_dorian", seller: { id: "u_dorian", username: "Dorian", avatar_url: null }, user_card_id: "uc_dev_" + seq, bids: [] };
          world.auctions.push(a);
          return send(res, 200, { id: a.id, title: card.wikipedia_title });
        }
        if (p === "/api/__profile" && m === "POST") { Object.assign(p_, await readBody(req)); return send(res, 200, { ok: true }); }

        // favourites and tags: the live game writes them to its database (Supabase) from its client;
        // here, the same operations (the mock adapter calls them, see adapters/mock.js)
        if (p === "/api/__sb/star" && m === "PATCH") {
          const { id: ucId, starred } = await readBody(req);
          const row = state.collection.get(ucId);
          if (!row) return send(res, 404, { message: "Carte introuvable." });
          row.starred = !!starred;
          return send(res, 200, [{ id: ucId, starred: row.starred }]);
        }
        if (p === "/api/__sb/tags") {
          if (m === "GET") return send(res, 200, [...state.tags].sort((a, b) => a.name.localeCompare(b.name, "fr")));
          const { name, color } = await readBody(req);
          if (state.tags.some((t) => t.name === name)) return send(res, 409, { code: "23505", message: "duplicate key value" });
          const tag = { id: "tag_" + ++seq, name, color };
          state.tags.push(tag);
          return send(res, 201, [tag]);
        }
        if (p === "/api/__sb/card-tags") {
          const b = m === "DELETE" ? { user_card_id: q("user_card_id"), tag_id: q("tag_id") } : await readBody(req);
          const row = state.collection.get(b.user_card_id), tag = state.tags.find((t) => t.id === b.tag_id);
          if (!row || !tag) return send(res, 404, { message: "Introuvable." });
          row.tags = (row.tags ?? []).filter((t) => t.id !== tag.id);
          if (m === "POST") row.tags.push(tag);
          return send(res, m === "POST" ? 201 : 200, []);
        }

        if (p === "/api/my-collection") {
          // like the live route (checked by test:prod): `q` searches titles and descriptions,
          // `rarity` may repeat, `sort` as collectionOrder;
          // `stats=1` adds the match count and the per-rarity counts of the search (not of the
          // rarity filter); 50 a page whatever `limit` says
          const mine = [...state.collection.values()];
          const searched = filterCards(mine, new URL(url.pathname + "?" + new URLSearchParams(q("q") ? { q: q("q") } : {}), url), (r) => r.card);
          const tagged = (r) => (q("untagged") === "1" ? !r.tags?.length : !q("tag_id") || r.tags?.some((t) => t.id === q("tag_id")));
          const all = filterCards(mine, url, (r) => r.card).filter(tagged).sort(collectionOrder(q("sort"))).map((r) => ({ ...r, tags: r.tags ?? [] }));
          const stats = q("stats") === "1";
          const rarityCounts = Object.fromEntries(Object.keys(RANK).map((r) => [r, searched.filter((u) => u.card.rarity === r).length]).filter(([, n]) => n));
          return send(res, 200, { collection: all.slice(page * PAGE, page * PAGE + PAGE), total: stats ? all.length : null, rarityCounts: stats ? rarityCounts : {}, tagOptions: [], pendingTradeCardIds: pendingCopies("me") });
        }

        if ((id = match(p, /^\/api\/user-cards\/([^/]+)\/discard$/)?.[0]) && m === "POST") {
          if (!state.collection.delete(id)) return send(res, 404, { error: "Carte introuvable." });
          return send(res, 200, { balance: ++p_.wikibidous_balance });
        }
        if (p === "/api/user-cards/bulk-discard" && m === "POST") {
          const { card_ids = [] } = await readBody(req);
          const failed = card_ids.filter((ucId) => !state.collection.delete(ucId));
          p_.wikibidous_balance += card_ids.length - failed.length;
          return send(res, 200, { discarded_count: card_ids.length - failed.length, failed });
        }

        if (p === "/api/cards") {
          let list = filterCards(CATALOG.map((c, i) => ({ ...c, nsfw_image: i % 17 === 3 })), url);
          if (q("wishlist") === "1") list = [];
          const by = { name: byTitle, atk: (a, b) => b.atk - a.atk, def: (a, b) => b.def - a.def };
          list.sort(by[q("sort")] || ((a, b) => RANK[b.rarity] - RANK[a.rarity]));
          // like the live route (checked by test:prod): every tier unfiltered, only the asked tiers
          // under a rarity filter, none under a search
          const tiers = q("q") ? [] : url.searchParams.getAll("rarity").length ? url.searchParams.getAll("rarity") : Object.keys(RANK);
          const rarityCounts = Object.fromEntries(tiers.map((r) => [r, byRarity[r]?.length || 0]));
          return send(res, 200, {
            cards: list.slice(page * PAGE, page * PAGE + PAGE),
            total: q("q") ? null : list.length,
            searchHasMore: q("q") ? page * PAGE + PAGE < list.length : false,
            rarityCounts,
            ownedCardIds: CATALOG.filter((c) => ownsCard(c.id)).map((c) => c.id),
            wishlistCardIds: [],
            friendOwners: {},
          });
        }

        if (p === "/api/marketplace" && m === "GET") {
          advance();
          if (q("mine") === "1") {
            const mine = world.auctions.filter((a) => a.seller_id === "me");
            return send(res, 200, {
              auctions: [], page: 1, limit: 1, hasMore: false, mine: true, maxConcurrentAuctions: MAX_AUCTIONS[p_.is_pro ? "pro" : "base"],
              selling: mine.filter((a) => a.status === "active").map(view),
              bidding: world.auctions.filter((a) => a.status === "active" && a.bids.some((b) => b.bidder_id === "me")).map(view),
              won: world.auctions.filter((a) => a.status === "settled_sold" && a.winner_id === "me").map(view),
              history: mine.filter((a) => a.status !== "active").map(view),
            });
          }
          const pg = Math.max(1, page) - 1; // 1-based like the real server, page=0 aliases page 1
          const all = filterCards(world.auctions.filter((a) => a.status === "active"), url, (a) => a.card).map(view);
          const by = { price_asc: (a, b) => a.effective_bid - b.effective_bid, price_desc: (a, b) => b.effective_bid - a.effective_bid, ending_soon: (a, b) => a.end_at.localeCompare(b.end_at) };
          all.sort(by[q("sort")] || ((a, b) => b.created_at.localeCompare(a.created_at)));
          return send(res, 200, { auctions: all.slice(pg * PAGE, pg * PAGE + PAGE), page: pg + 1, limit: PAGE, hasMore: pg * PAGE + PAGE < all.length });
        }

        if (p === "/api/marketplace" && m === "POST") {
          const b = await readBody(req);
          const uc = state.collection.get(b.card_id); // the user card id, like the real server
          if (!uc) return send(res, 409, { error: "Vous ne possédez pas cette carte" });
          if (!(b.base_amount >= 1)) return send(res, 400, { error: "Prix invalide." });
          if (world.auctions.filter((a) => a.seller_id === "me" && a.status === "active").length >= MAX_AUCTIONS[p_.is_pro ? "pro" : "base"]) return send(res, 409, { error: "Limite de ventes atteinte." });
          state.collection.delete(uc.id);
          const aid = "mine_" + ++seq;
          const now = Date.now();
          world.auctions.push({
            id: aid, card_id: uc.card.id, card: uc.card, is_shiny: uc.is_shiny, status: "active", user_card: uc, bids: [],
            base_amount: b.base_amount, listing_base_amount: b.base_amount, current_bid: null, effective_bid: b.base_amount, current_bidder_id: null, current_bidder: null,
            final_price: null, created_at: iso(now), end_at: iso(now + b.duration_minutes * 60000),
            settled_at: null, base_repriced_at: null, winner_id: null, seller: { id: "me", username: p_.username, avatar_url: null }, seller_id: "me",
          });
          return send(res, 201, { auction_id: aid });
        }

        if ((id = match(p, /^\/api\/marketplace\/([^/]+)\/bid$/)?.[0]) && m === "POST") {
          advance();
          const a = findAuction(id);
          const { amount } = await readBody(req);
          const min = (a?.current_bid ?? a?.base_amount - 1) + 1;
          if (!a || a.status !== "active" || a.seller_id === "me") return send(res, 409, { error: "Enchère impossible." });
          if (!(amount >= min)) return send(res, 409, { error: `Mise trop basse (minimum ${min} wikibidous)`, code: "bid_too_low", min });
          const held = a.current_bidder_id === "me" ? a.current_bid : 0; // raising my own bid
          if (amount - held > p_.wikibidous_balance) return send(res, 409, { error: "Solde insuffisant." });
          const bid = { id: "b" + ++seq, amount, bidder: { id: "me", username: p_.username, avatar_url: null }, bidder_id: "me", placed_at: iso() };
          a.bids.push(bid);
          Object.assign(a, { current_bid: amount, effective_bid: amount, current_bidder_id: "me", current_bidder: bid.bidder });
          p_.wikibidous_balance -= amount - held; // only the top bid is held, like the real server
          return send(res, 200, { auction_id: id, current_bid: amount, bidder_balance: p_.wikibidous_balance });
        }

        if ((id = match(p, /^\/api\/marketplace\/([^/]+)\/reprice$/)?.[0]) && m === "POST") {
          const a = findAuction(id);
          const { new_base_amount: v } = await readBody(req);
          if (!a || a.seller_id !== "me") return send(res, 404, { error: "Enchère introuvable." });
          const half = (Date.parse(a.created_at) + Date.parse(a.end_at)) / 2;
          if (Date.now() < half) return send(res, 409, { error: "La baisse de prix n'est possible qu'après la moitié du temps écoulée" });
          if (!(v >= 1 && v < a.base_amount)) return send(res, 400, { error: "Indiquez un montant inférieur à la mise de départ actuelle" });
          Object.assign(a, { base_amount: v, effective_bid: a.current_bid ?? v, base_repriced_at: iso() });
          return send(res, 200, { ok: true });
        }

        if ((id = match(p, /^\/api\/marketplace\/([^/]+)\/settle$/)?.[0]) && m === "POST") {
          advance(); // the market settles ended auctions itself
          const a = findAuction(id);
          if (!a || a.status === "active") return send(res, 409, { error: "Enchère pas encore terminée." });
          return send(res, 200, { status: a.status });
        }

        if ((id = match(p, /^\/api\/marketplace\/([^/]+)$/)?.[0])) {
          advance();
          const a = findAuction(id);
          if (!a) return send(res, 404, { error: "Enchère introuvable." });
          if (m === "DELETE") {
            if (a.seller_id !== "me" || a.current_bid || a.status !== "active") return send(res, 409, { error: "Impossible d'annuler" });
            Object.assign(a, { status: "cancelled", settled_at: iso() });
            const uc = a.user_card ?? { id: "uc_" + ++seq, card: a.card, is_shiny: a.is_shiny, starred: false, obtained_at: iso() };
            state.collection.set(uc.id, { ...uc, count: 1 });
            return send(res, 200, { status: "cancelled" });
          }
          return send(res, 200, { auction: view(a), bids: a.bids.slice().reverse() });
        }

        if ((id = match(p, /^\/api\/marketplace\/cards\/([^/]+)\/sales$/)?.[0])) {
          const card = CATALOG.find((c) => c.id === id) || [...state.collection.values()].find((u) => u.card.id === id)?.card;
          if (!card) return send(res, 404, { error: "Carte introuvable." });
          advance();
          if (q("scope") === "summary") return send(res, 200, { wikipedia_title: card.wikipedia_title, summary: summary(card), isPro: p_.is_pro });
          // the latest SALES_CAP, newest first (the live order)
          return send(res, 200, { sales: salesOf(card).slice(-SALES_CAP).reverse() });
        }

        if (p === "/api/notifications") {
          if (m === "PATCH") {
            const { ids } = await readBody(req);
            for (const n of world.notifications) if (!ids || ids.includes(n.id)) state.read.add(n.id);
            return send(res, 200, { success: true });
          }
          advance();
          return send(res, 200, { notifications: world.notifications.map((n) => ({ ...n, read: n.read || state.read.has(n.id) })) });
        }

        if (p === "/api/human-check" && m === "POST") {
          const { token } = await readBody(req);
          if (!token) return send(res, 400, { error: "La vérification a échoué. Réessaie." });
          state.humanRequired = false;
          return send(res, 200, { ok: true });
        }
        // --- friends, as the game's Amis page uses them ---------------------------------------
        const fidOf = ([a, b]) => `fr_${a}_${b}`;
        const friendRow = (pair, status) => { const [a, b] = pair; return { id: fidOf(pair), status, requester: userOf(a), addressee: userOf(b), requester_id: a, addressee_id: b, created_at: ago(9 * 86400000), updated_at: ago(9 * 86400000) }; };
        const refreshFriends = () => { FRIENDS = world.friendships.filter((f) => f.includes("me")).map(([a, b]) => userOf(a === "me" ? b : a)); };
        if (p === "/api/friends" && m === "GET") {
          const accepted = world.friendships.filter((f) => f.includes("me")).map((f) => friendRow(f, "accepted"));
          const pending = world.requests.filter((f) => f.includes("me")).map((f) => friendRow(f, "pending"));
          const incoming = pending.filter((f) => f.addressee_id === "me").length;
          return send(res, 200, { friendships: [...accepted, ...pending], counts: { accepted: accepted.length, incoming, outgoing: pending.length - incoming } });
        }
        if (p === "/api/friends" && m === "POST") {
          const { addressee_id } = await readBody(req);
          if (!userOf(addressee_id) || addressee_id === "me") return send(res, 404, { error: "Joueur introuvable." });
          const known = [...world.friendships, ...world.requests].find((f) => f.includes("me") && f.includes(addressee_id));
          if (known) return send(res, 409, { error: "Une demande existe déjà." });
          const pair = ["me", addressee_id];
          world.requests.push(pair);
          return send(res, 200, { friendship: friendRow(pair, "pending") });
        }
        if (p === "/api/friends/search") {
          const nq = norm(q("q"));
          if (nq.length < 2) return send(res, 200, { users: [] });
          const users = world.players.filter((x) => x.id !== "me" && norm(x.username).includes(nq)).slice(0, 10).map((x) => ({ ...userOf(x.id), avatar_pos_x: 50, avatar_pos_y: 50 }));
          return send(res, 200, { users });
        }
        if (p === "/api/friends/accept-all" && m === "POST") {
          const mineIn = world.requests.filter(([, b]) => b === "me");
          world.friendships.push(...mineIn);
          world.requests = world.requests.filter((r) => !mineIn.includes(r));
          refreshFriends();
          return send(res, 200, { accepted: mineIn.length });
        }
        if ((id = match(p, /^\/api\/friends\/([^/]+)$/)?.[0])) {
          const req_ = world.requests.find((f) => fidOf(f) === id);
          if (m === "PATCH" && req_) {
            const { action } = await readBody(req);
            world.requests = world.requests.filter((f) => f !== req_);
            if (action === "accept") { world.friendships.push(req_); refreshFriends(); }
            return send(res, 200, { ok: true });
          }
          if (m === "DELETE" && req_) { world.requests = world.requests.filter((f) => f !== req_); return send(res, 200, { ok: true }); }
          return send(res, 404, { error: "Demande introuvable." });
        }

        // --- my profile, showcase and achievements, as the game's Profil and Succès pages --------
        if (p === "/api/__sb/me") return send(res, 200, { id: "me", ...p_ });
        // another player's profile, as the game's profile page reads it; Elsa keeps hers private
        const PRIVATE = PRIVATE_PROFILES;
        const playerNamed = (name) => world.players.find((x) => x.username === decodeURIComponent(name));
        const canSee = (pl) => pl.id === "me" || !PRIVATE.has(pl.id) || FRIENDS.some((f) => f.id === pl.id);
        if ((id = match(p, /^\/api\/profile\/([^/]+)$/)?.[0]) && m === "GET") {
          const pl = playerNamed(id);
          if (!pl) return send(res, 404, { error: "Profil introuvable" });
          const pair = [...world.friendships, ...world.requests].find((f) => f.includes("me") && f.includes(pl.id));
          const isFriend = world.friendships.some((f) => f.includes("me") && f.includes(pl.id));
          return send(res, 200, {
            profile: { id: pl.id, username: pl.username, avatar_url: null, avatar_pos_x: 50, avatar_pos_y: 50, is_public: !PRIVATE.has(pl.id), created_at: ago(60 * 86400000) },
            isOwn: pl.id === "me", isFriend, friendshipId: pair ? fidOf(pair) : null, pendingRequest: null, lastSeenAt: ago((pl.username.length % 5) * 3600e3 + 120e3),
          });
        }
        if ((id = match(p, /^\/api\/profile\/([^/]+)\/showcase$/)?.[0])) {
          const pl = playerNamed(id);
          if (!pl) return send(res, 404, { error: "Profil introuvable" });
          if (!canSee(pl)) return send(res, 403, { error: "Profil privé" });
          // the first cards of their collection, the rarest, laid out as a showcase of one or two galleries
          const rows = friendCards.get(pl.id).sort((a, b) => RANK[b.card.rarity] - RANK[a.card.rarity]).slice(0, pl.username.length % 2 ? 6 : 3);
          return send(res, 200, {
            showcase: rows.map((uc, i) => ({ position: i, user_card_id: uc.id, user_card: { id: uc.id, card: uc.card, is_shiny: uc.is_shiny, snapshot_rarity: uc.card.rarity, snapshot_atk: uc.card.atk, snapshot_def: uc.card.def } })),
            galleries: rows.length > 4 ? [{ gallery_index: 0, name: "Mes préférées" }] : [],
          });
        }
        if ((id = match(p, /^\/api\/profile\/([^/]+)$/)?.[0]) && m === "PATCH") {
          if (decodeURIComponent(id) !== p_.username) return send(res, 403, { error: "Profil d'un autre joueur." });
          const b = await readBody(req);
          if ("is_public" in b) p_.is_public = !!b.is_public;
          if (b.clear_avatar) Object.assign(p_, { avatar_url: null, avatar_pos_x: 50, avatar_pos_y: 50 });
          if (b.avatar_user_card_id) {
            const uc = state.collection.get(b.avatar_user_card_id);
            if (!uc?.card.image_url) return send(res, 400, { error: "Cette carte n'a pas d'image." });
            p_.avatar_url = uc.card.image_url;
          }
          if (b.avatar_pos_x != null) Object.assign(p_, { avatar_pos_x: b.avatar_pos_x, avatar_pos_y: b.avatar_pos_y });
          return send(res, 200, { profile: { id: "me", ...p_ } });
        }
        if (p === "/api/my-collection/stats") {
          const mine = [...state.collection.values()];
          const rarityCounts = Object.fromEntries(Object.keys(RANK).map((r) => [r, mine.filter((u) => u.card.rarity === r).length]).filter(([, n]) => n));
          return send(res, 200, { total: mine.length, rarityCounts, tagOptions: [] });
        }
        if (p === "/api/showcase") {
          if (m === "GET") {
            const showcase = [...state.showcase].map(([position, ucId]) => ({ position, ucId, uc: state.collection.get(ucId) })).filter((x) => x.uc)
              .map(({ position, uc }) => ({ position, user_card: { id: uc.id, card: uc.card, is_shiny: uc.is_shiny, snapshot_rarity: uc.card.rarity, snapshot_atk: uc.card.atk, snapshot_def: uc.card.def } }));
            return send(res, 200, { showcase, galleries: Object.entries(state.galleries).map(([i, name]) => ({ gallery_index: Number(i), name })) });
          }
          const { position, user_card_id } = await readBody(req);
          if (!(position >= 0 && position < 40)) return send(res, 400, { error: "Place invalide." });
          if (m === "DELETE") { state.showcase.delete(position); return send(res, 200, { ok: true }); }
          if (!state.collection.has(user_card_id)) return send(res, 404, { error: "Carte introuvable." });
          for (const [k, v] of state.showcase) if (v === user_card_id) state.showcase.delete(k); // one place per copy
          state.showcase.set(position, user_card_id);
          return send(res, 200, { ok: true });
        }
        if (p === "/api/showcase/gallery" && m === "PUT") {
          const { gallery_index, name } = await readBody(req);
          if (name) state.galleries[gallery_index] = String(name).slice(0, 40); else delete state.galleries[gallery_index];
          return send(res, 200, { ok: true });
        }
        if (p === "/api/__sb/achievements") {
          const mine = [...state.achievements].map(([achievement_id, u]) => ({ user_id: "me", achievement_id, ...u }));
          return send(res, 200, { achievements: ACHIEVEMENTS, mine });
        }
        if (p === "/api/achievements/check" && m === "POST") {
          for (const c of COLLECT) if (state.collection.size >= c.at && !state.achievements.has(c.id)) state.achievements.set(c.id, { unlocked_at: iso(), claimed_at: null });
          if (state.showcase.size >= 4 && !state.achievements.has("ach_fill_showcase")) state.achievements.set("ach_fill_showcase", { unlocked_at: iso(), claimed_at: null });
          return send(res, 200, { ok: true });
        }
        if (p === "/api/achievements/claim" && m === "POST") {
          const { achievement_id } = await readBody(req);
          const u = state.achievements.get(achievement_id), a = ACHIEVEMENTS.find((x) => x.id === achievement_id);
          if (!u || !a) return send(res, 400, { error: "Succès non débloqué." });
          if (u.claimed_at) return send(res, 200, { already_claimed: true, claimed_at: u.claimed_at });
          u.claimed_at = iso();
          p_.wikibidous_balance += a.wikibidous_reward;
          return send(res, 200, { claimed_at: u.claimed_at, amount: a.wikibidous_reward });
        }
        if ((id = match(p, /^\/api\/profile\/([^/]+)\/collection$/)?.[0])) {
          // a friend's, or my own (the live route serves mine too: the pack reveal finds a copy by it)
          const f = world.players.find((x) => x.username === decodeURIComponent(id));
          if (!f) return send(res, 404, { error: "Profil introuvable." });
          const rows = f.id === "me" ? [...state.collection.values()] : friendCards.get(f.id);
          // like the live route (checked by test:prod): filtered by q and rarity, ordered as
          // collectionOrder, total only with a search
          const all = filterCards(rows, url, (r) => r.card).sort(collectionOrder(q("sort")));
          if (f.id !== "me" && PRIVATE_PROFILES.has(f.id) && !FRIENDS.some((x) => x.id === f.id)) return send(res, 403, { error: "Profil privé" });
          const stats = q("stats") === "1";
          const rarityCounts = stats ? Object.fromEntries(Object.keys(RANK).map((r) => [r, rows.filter((u) => u.card.rarity === r).length]).filter(([, n]) => n)) : {};
          return send(res, 200, { collection: all.slice(page * PAGE, page * PAGE + PAGE), total: q("q") || stats ? all.length : null, rarityCounts, tagOptions: [], profileId: f.id, pendingTradeCardIds: pendingCopies(f.id) });
        }
        if ((id = match(p, /^\/api\/chat\/([^/]+)$/)?.[0])) {
          if (!state.chats.has(id) && FRIENDS.some((f) => f.id === id)) state.chats.set(id, []);
          const list = state.chats.get(id);
          if (!list) return send(res, 404, { error: "Conversation introuvable." });
          if (m === "POST") {
            const { content } = await readBody(req);
            if (!content?.trim()) return send(res, 400, { error: "Message vide." });
            list.push({ id: "m_" + ++seq, sender_id: "me", recipient_id: id, content: content.trim(), created_at: iso(), read: false });
            return send(res, 200, { ok: true });
          }
          return send(res, 200, { messages: list, trades: state.trades.filter((t) => [t.initiator_id, t.recipient_id].includes(id)) });
        }
        if (p === "/api/trades" && m === "GET") {
          // ?active=1 is the light shape (pending only, items without the card), like the live API.
          const list = q("active") === "1" ? state.trades.filter((t) => t.status === "pending").map(({ items, ...t }) => ({ ...t, items: items.map(({ card, ...i }) => i) })) : state.trades;
          return send(res, 200, { trades: list });
        }
        if (p === "/api/trades" && m === "POST") {
          if (state.humanRequired) return send(res, 403, HUMAN);
          const b = await readBody(req);
          const to = FRIENDS.find((f) => f.id === b.recipient_id);
          if (!to) return send(res, 400, { error: "Destinataire inconnu." });
          const items = b.items || [];
          if (!items.length && !b.initiator_wikibidous && !b.recipient_wikibidous) return send(res, 400, { error: "L'échange est vide." });
          const copies = items.map((i) => [i.offered_by, cardOfCopy(i.offered_by, i.user_card_id)]);
          if (copies.some(([, uc]) => !uc)) return send(res, 409, { error: "Une des cartes n'est plus disponible." });
          // a counter answers a pending offer that this friend sent me, nothing else
          const parent = b.parent_trade_id ? state.trades.find((x) => x.id === b.parent_trade_id) : null;
          if (b.parent_trade_id && !(parent?.status === "pending" && parent.recipient_id === "me" && parent.initiator_id === to.id)) return send(res, 409, { error: "Cet échange n'est plus en attente." });
          if ((b.initiator_wikibidous || 0) > p_.wikibidous_balance) return send(res, 409, { error: "Solde insuffisant." });
          // a copy already promised in another pending trade (the countered one aside) is locked
          const locked = new Set(state.trades.filter((t) => t.status === "pending" && t !== parent).flatMap((t) => t.items.map((i) => i.user_card_id)));
          if (items.some((i) => locked.has(i.user_card_id))) return send(res, 409, { error: "Une des cartes est déjà dans un échange en attente." });
          const t = trade({ id: "tr_" + ++seq, initiator_id: "me", recipient_id: to.id, initiator_wikibidous: b.initiator_wikibidous || 0, recipient_wikibidous: b.recipient_wikibidous || 0, parent_trade_id: b.parent_trade_id || null });
          t.items = copies.map(([owner, uc]) => item(t.id, owner, uc));
          if (parent) Object.assign(parent, { status: "countered", updated_at: iso() });
          state.trades.push(t);
          return send(res, 201, { trade_id: t.id });
        }
        if ((id = match(p, /^\/api\/trades\/([^/]+)$/)?.[0]) && m === "PATCH") {
          if (state.humanRequired) return send(res, 403, HUMAN);
          const t = state.trades.find((x) => x.id === id);
          const { action } = await readBody(req);
          const status = { accept: "accepted", decline: "declined", cancel: "cancelled" }[action];
          if (!status) return send(res, 400, { error: "Action inconnue." });
          if (!t || t.status !== "pending") return send(res, 409, { error: "Cet échange n'est plus en attente." });
          const iAmRecipient = t.recipient_id === "me";
          if ((action === "accept" || action === "decline") && !iAmRecipient) return send(res, 403, { error: "Seul le destinataire peut répondre." });
          if (action === "cancel" && iAmRecipient) return send(res, 403, { error: "Seul l'auteur peut annuler." });
          if (action === "accept") {
            const myCoins = t.recipient_wikibidous;
            if (myCoins > p_.wikibidous_balance) return send(res, 409, { error: "Solde insuffisant." });
            p_.wikibidous_balance += t.initiator_wikibidous - myCoins;
            for (const i of t.items) {
              if (i.offered_by === "me") state.collection.delete(i.user_card_id);
              else state.collection.set("uc_" + ++seq, { id: "uc_" + seq, card: CATALOG.find((c) => c.id === i.card_id) || i.card, count: 1, is_shiny: i.is_shiny, starred: false, obtained_at: iso() });
            }
          }
          Object.assign(t, { status, updated_at: iso() });
          return send(res, 200, { status });
        }

        return send(res, 404, { error: "not found" });
      });

      server.config.logger.info("  mock API mounted on /api");
    },
  };
}

const ago = (ms) => iso(Date.now() - ms);
const SPECIAL_EVERY_MS = 6 * 3600e3;
const PRO_PACK_SIZE = 15;
// made-up samples (the real packs, when the game offers some, have their own ids and names)
const SAMPLE_SPECIAL_PACKS = [
  { id: "sciences", name: "Sciences", description: "Cinq cartes Super Rare ou mieux." },
  { id: "histoire", name: "Histoire", description: "Cinq cartes Super Rare ou mieux." },
  { id: "arts", name: "Arts", description: "Cinq cartes Super Rare ou mieux." },
];
