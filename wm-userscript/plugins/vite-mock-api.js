/**
 * Dev-only mock of wiki-masters.com's /api, mounted on the Vite server (no second process).
 * Routes and shapes mirror the live site (docs/API_REFERENCE.md), so the app runs the real
 * adapter against it. State is in memory and resets on restart.
 */

import { CATALOG, RARITY_WEIGHTS } from "../mock/catalog.js";

const PAGE = 50;
const PACK_SIZE = 5;
const PACK_CAP = 10;
const REGEN_SECONDS = 45;
const SHINY_CHANCE = 0.03;
// active auctions at once: the game's MAX_CONCURRENT_AUCTIONS_REGULAR / _PRO
const MAX_AUCTIONS = { base: 5, pro: 10 };
const START_BALANCE = 113;
const PRICE = { C: 8, PC: 20, R: 45, SR: 110, UR: 260, L: 600 };
const RANK = { L: 5, UR: 4, SR: 3, R: 2, PC: 1, C: 0 };

const norm = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const iso = (t = Date.now()) => new Date(t).toISOString();
const byTitle = (a, b) => a.wikipedia_title.localeCompare(b.wikipedia_title, "fr");
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

export default function mockApiPlugin() {
  return {
    name: "vite-mock-api",
    configureServer(server) {
      const byRarity = {};
      for (const c of CATALOG) (byRarity[c.rarity] ||= []).push(c);

      let seq = 0;
      const state = {
        profile: { username: "Toi", packs_remaining: PACK_CAP, packs_last_regen_at: Date.now(), wikibidous_balance: START_BALANCE, pity_counter: 0, is_pro: true, is_vip: false, special_packs: false },
        proDaily: null, // the calendar day the Pro daily pack was claimed
        specialAt: 0, // when the next special pack can be opened
        collection: new Map(), // user card id -> { id, card, count, is_shiny, starred, obtained_at }
        bids: new Map(), // auction id -> [{ id, amount, bidder, bidder_id, placed_at }]
        listings: new Map(), // my auctions: id -> raw auction
        read: new Set(), // read notification ids
      };

      const addOwned = (card, is_shiny) => {
        const id = "uc_" + ++seq;
        state.collection.set(id, { id, card, count: 1, is_shiny, starred: false, obtained_at: iso() });
      };
      // One of each Legendary look: plain, gold (no image), onyx (shiny, no image), onyx over a photo.
      const L = CATALOG.find((c) => c.rarity === "L" && c.image_url) || CATALOG[0];
      const legend = (id, over, shiny) => addOwned({ ...L, ...over, id, rarity: "L", rarity_order: 5 }, shiny);
      // A big collection for load tests: WM_MOCK_CARDS=1000 (and WM_MOCK_SHINY=1 for all shiny,
      // WM_MOCK_NOIMG=1 for none with a picture) seeds that many copies of the catalogue's cards.
      const SEED = { cards: Number(process.env.WM_MOCK_CARDS) || 0, shiny: Number(process.env.WM_MOCK_SHINY ?? SHINY_CHANCE), noImg: process.env.WM_MOCK_NOIMG === "1" };
      function seedCollection() {
        legend("L_img", {}, false);
        legend("L_gold", { wikipedia_title: "Légendaire (sans image)", image_url: null }, false);
        legend("L_onyx", { wikipedia_title: "Légendaire brillante", image_url: null }, true);
        legend("L_onyx_img", { wikipedia_title: "Légendaire brillante (image)" }, true);
        for (let i = 0; i < SEED.cards; i++) {
          const base = CATALOG[i % CATALOG.length];
          addOwned({ ...base, id: `${base.id}~${i}`, wikipedia_title: `${base.wikipedia_title} ${i + 1}`, ...(SEED.noImg ? { image_url: null } : {}) }, Math.random() < SEED.shiny);
        }
      }
      seedCollection();

      const ownsCard = (cardId) => [...state.collection.values()].some((u) => u.card.id === cardId);

      // --- trades ---------------------------------------------------------------------
      // Three friends with deterministic collections, and trades shaped like the live data:
      // two incoming offers (one with coins), a counter-offer chain (with coins), and an offer I sent.
      const FRIENDS = [
        { id: "u_k4rma", username: "K4rma", avatar_url: null },
        { id: "u_doobii", username: "doobii", avatar_url: CATALOG.find((c) => c.image_url)?.image_url || null },
        { id: "u_march", username: "Marchandise", avatar_url: null },
      ];
      const ME = { id: "me", username: state.profile.username, avatar_url: null };
      // doobii owns the whole catalog plus a shiny second copy of every fourth card: more than one
      // page (PAGE rows), like real collections, so paging, search and filters run on the server
      const ownedBy = (n) => (n === 1 ? [...CATALOG.map((card) => [card, false]), ...CATALOG.filter((_, i) => i % 4 === 0).map((card) => [card, true])]
        : CATALOG.filter((_, i) => i % 3 === n).map((card, i) => [card, i === 2]));
      const friendCards = new Map(FRIENDS.map((f, n) => [f.id, ownedBy(n).map(([card, is_shiny], i) => ({
        id: `${f.id}_uc_${i}`, card, count: 1, is_shiny, starred: false, obtained_at: iso(), user_id: f.id, owned_by_viewer: ownsCard(card.id), tags: [],
      }))]));
      const userOf = (id) => (id === "me" ? ME : FRIENDS.find((f) => f.id === id));
      const cardOfCopy = (owner, ucId) => (owner === "me" ? state.collection.get(ucId) : friendCards.get(owner)?.find((u) => u.id === ucId));
      const item = (tradeId, owner, uc) => ({ id: "ti_" + ++seq, card: { ...uc.card, is_shiny: uc.is_shiny }, card_id: uc.card.id, is_shiny: uc.is_shiny, trade_id: tradeId,
        offered_by: owner, user_card_id: uc.id, snapshot_rarity: uc.card.rarity, snapshot_atk: uc.card.atk, snapshot_def: uc.card.def });
      const trade = (o) => ({ status: "pending", parent_trade_id: null, initiator_wikibidous: 0, recipient_wikibidous: 0, created_at: iso(), updated_at: iso(), ...o,
        initiator: userOf(o.initiator_id), recipient: userOf(o.recipient_id) });
      // Rebuilt by /api/reset (after the collection, since the seeded offers use my first copies).
      function seedTrades() {
        const mine = [...state.collection.values()];
        state.trades = [
          trade({ id: "tr_doobii", initiator_id: "u_doobii", recipient_id: "me", created_at: ago(7 * 86400000), updated_at: ago(7 * 86400000) }),
          trade({ id: "tr_k_root", initiator_id: "me", recipient_id: "u_k4rma", status: "countered", created_at: ago(5 * 3600000), updated_at: ago(5 * 3600000) }),
          trade({ id: "tr_k_counter", initiator_id: "u_k4rma", recipient_id: "me", status: "declined", parent_trade_id: "tr_k_root", recipient_wikibidous: 100, created_at: ago(4 * 3600000), updated_at: ago(3600000) }),
          trade({ id: "tr_march", initiator_id: "me", recipient_id: "u_march", initiator_wikibidous: 20, created_at: ago(2 * 3600000), updated_at: ago(2 * 3600000) }),
          trade({ id: "tr_k_new", initiator_id: "u_k4rma", recipient_id: "me", initiator_wikibidous: 30, created_at: ago(40 * 60000), updated_at: ago(40 * 60000) }),
        ];
        const seed = (t, give, get) => { t.items = [...give.map((uc) => item(t.id, "me", uc)), ...get.map(([owner, uc]) => item(t.id, owner, uc))]; };
        const [k0, k1, , k3, k4] = friendCards.get("u_k4rma"), [d0] = friendCards.get("u_doobii"), [m0, m1] = friendCards.get("u_march");
        seed(state.trades[0], [mine[1]], [["u_doobii", d0]]);
        seed(state.trades[1], [mine[0]], [["u_k4rma", k0]]);
        seed(state.trades[2], [mine[0]], [["u_k4rma", k1]]);
        seed(state.trades[3], [mine[2]], [["u_march", m0], ["u_march", m1]]);
        seed(state.trades[4], [mine[3]], [["u_k4rma", k3], ["u_k4rma", k4]]);
        state.chats = new Map(FRIENDS.map((f) => [f.id, [
          { id: "m_" + f.id + "_1", sender_id: f.id, recipient_id: "me", content: "Salut, ça te dit un échange ?", created_at: ago(26 * 3600000), read: true },
          { id: "m_" + f.id + "_2", sender_id: "me", recipient_id: f.id, content: "Carrément, je regarde ta collection.", created_at: ago(25 * 3600000), read: true },
        ]]));
        state.humanRequired = false;
      }
      seedTrades();
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

      // --- market -------------------------------------------------------------------
      // Stable auctions per catalog card (about 30% of cards are listed 2-4 times, like the
      // real market, so same-card comparison has something to compare), plus my listings.
      const ends = new Map();
      const copies = (card) => (rng(card.id + "dup")() < 0.3 ? 2 + Math.floor(rng(card.id + "n")() * 3) : 1);
      function synthAuction(card, k = 0) {
        const next = rng(k ? `${card.id}~${k}` : card.id);
        const id = k ? `auc_${card.id}~${k}` : "auc_" + card.id;
        const base = Math.round(PRICE[card.rarity] * 0.8);
        if (!ends.has(id)) ends.set(id, Date.now() + Math.round(next() * 20 + 1) * 3600000);
        const history = state.bids.get(id);
        const bid = history?.at(-1)?.amount ?? (next() < 0.5 ? Math.round(PRICE[card.rarity] * (1 + next())) : null);
        const top = history?.at(-1)?.bidder_id ?? (bid != null ? "other" : null);
        return {
          id, card_id: card.id, card, is_shiny: k === 2 || next() < 0.06, status: "active",
          base_amount: base, current_bid: bid, effective_bid: bid ?? base, current_bidder_id: top,
          final_price: null, created_at: iso(ends.get(id) - 86400000), end_at: iso(ends.get(id)),
          settled_at: null, base_repriced_at: null, winner_id: null,
          seller: { username: ["louizor", "Nebubulae", "Kaze", "Nova", "Orion"][Math.floor(next() * 5)] },
          seller_id: "other", owned: ownsCard(card.id), // owned = I own a copy, like the real API
        };
      }
      const findAuction = (id) => {
        if (state.listings.has(id)) return state.listings.get(id);
        const [, cid, k] = String(id).match(/^auc_(.+?)(?:~(\d+))?$/) || [];
        const card = CATALOG.find((c) => String(c.id) === cid);
        return card ? synthAuction(card, Number(k || 0)) : null;
      };
      // A card's sales by the rarity they sold at: about a third of the cards also sold at the
      // rarity just below (a card's rarity can change), like the live summary keyed by rarity.
      const RARITY_BELOW = { PC: "C", R: "PC", SR: "R", UR: "SR", L: "UR" };
      const soldRarities = (card) => { const next = rng(card.id + "r"); return next() < 0.35 && RARITY_BELOW[card.rarity] ? [card.rarity, RARITY_BELOW[card.rarity]] : [card.rarity]; };
      const summary = (card) => {
        const next = rng(card.id);
        if (next() < 0.3) return {};
        return Object.fromEntries(soldRarities(card).map((r) => [r, { average: Math.round(PRICE[r] * (0.7 + next() * 0.8)) }]));
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

        // Mock-only: the real profile comes from Supabase, see src/wm/api.js.
        if (p === "/api/profile") { regen(); return send(res, 200, { ...p_, next_regen_seconds: nextRegenSeconds(), regen_seconds: REGEN_SECONDS, pack_cap: PACK_CAP }); }
        if (p === "/api/reset" && m === "POST") {
          state.collection.clear(); state.listings.clear(); state.bids.clear();
          Object.assign(p_, { packs_remaining: PACK_CAP, wikibidous_balance: START_BALANCE, pity_counter: 0 });
          state.proDaily = null; state.specialAt = 0;
          seedCollection(); seedTrades();
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
        if (p === "/api/__profile" && m === "POST") { Object.assign(p_, await readBody(req)); return send(res, 200, { ok: true }); }

        if (p === "/api/my-collection") {
          const all = [...state.collection.values()].sort((a, b) => RANK[b.card.rarity] - RANK[a.card.rarity]);
          const rarityCounts = Object.fromEntries(Object.keys(RANK).map((r) => [r, all.filter((u) => u.card.rarity === r).length]));
          return send(res, 200, { collection: all.slice(page * PAGE, page * PAGE + PAGE), total: all.length, rarityCounts, tagOptions: [], pendingTradeCardIds: pendingCopies("me") });
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
          if (q("mine") === "1") {
            const mine = [...state.listings.values()];
            const bidding = [...state.bids.keys()].map(findAuction).filter((a) => a && a.status === "active");
            return send(res, 200, {
              auctions: [], page: 1, limit: 1, hasMore: false, mine: true, maxConcurrentAuctions: MAX_AUCTIONS[p_.is_pro ? "pro" : "base"],
              selling: mine.filter((a) => a.status === "active"), bidding, won: [], history: mine.filter((a) => a.status !== "active"),
            });
          }
          const pg = Math.max(1, page) - 1; // 1-based like the real server, page=0 aliases page 1
          const src = filterCards(CATALOG, url);
          const all = src.flatMap((c) => Array.from({ length: copies(c) }, (_, k) => synthAuction(c, k)));
          const by = { price_asc: (a, b) => a.effective_bid - b.effective_bid, price_desc: (a, b) => b.effective_bid - a.effective_bid, ending_soon: (a, b) => a.end_at.localeCompare(b.end_at) };
          if (by[q("sort")]) all.sort(by[q("sort")]);
          return send(res, 200, { auctions: all.slice(pg * PAGE, pg * PAGE + PAGE), page: pg + 1, limit: PAGE, hasMore: pg * PAGE + PAGE < all.length });
        }

        if (p === "/api/marketplace" && m === "POST") {
          const b = await readBody(req);
          const uc = state.collection.get(b.card_id); // the user card id, like the real server
          if (!uc) return send(res, 409, { error: "Vous ne possédez pas cette carte" });
          if (!(b.base_amount >= 1)) return send(res, 400, { error: "Prix invalide." });
          if ([...state.listings.values()].filter((a) => a.status === "active").length >= MAX_AUCTIONS[p_.is_pro ? "pro" : "base"]) return send(res, 409, { error: "Limite de ventes atteinte." });
          state.collection.delete(uc.id);
          const aid = "mine_" + ++seq;
          const now = Date.now();
          state.listings.set(aid, {
            id: aid, card_id: uc.card.id, card: uc.card, is_shiny: uc.is_shiny, status: "active", user_card: uc,
            base_amount: b.base_amount, current_bid: null, effective_bid: b.base_amount, current_bidder_id: null,
            final_price: null, created_at: iso(now), end_at: iso(now + b.duration_minutes * 60000),
            settled_at: null, base_repriced_at: null, winner_id: null, seller: { username: p_.username }, seller_id: "me", owned: false,
          });
          return send(res, 201, { auction_id: aid });
        }

        if ((id = match(p, /^\/api\/marketplace\/([^/]+)\/bid$/)?.[0]) && m === "POST") {
          const a = findAuction(id);
          const { amount } = await readBody(req);
          const min = (a?.current_bid ?? a?.base_amount - 1) + 1;
          if (!a || a.seller_id === "me") return send(res, 409, { error: "Enchère impossible." });
          if (!(amount >= min)) return send(res, 409, { error: `Mise trop basse (minimum ${min} wikibidous)`, code: "bid_too_low", min });
          const hist = state.bids.get(id) || [];
          const held = hist.at(-1)?.bidder_id === "me" ? hist.at(-1).amount : 0; // raising my own bid
          if (amount - held > p_.wikibidous_balance) return send(res, 409, { error: "Solde insuffisant." });
          hist.push({ id: "b" + ++seq, amount, bidder: { username: p_.username }, bidder_id: "me", placed_at: iso() });
          state.bids.set(id, hist);
          p_.wikibidous_balance -= amount - held; // only the top bid is held, like the real server
          return send(res, 200, { auction_id: id, current_bid: amount, bidder_balance: p_.wikibidous_balance });
        }

        if ((id = match(p, /^\/api\/marketplace\/([^/]+)\/reprice$/)?.[0]) && m === "POST") {
          const a = state.listings.get(id);
          const { new_base_amount: v } = await readBody(req);
          if (!a) return send(res, 404, { error: "Enchère introuvable." });
          const half = (Date.parse(a.created_at) + Date.parse(a.end_at)) / 2;
          if (Date.now() < half) return send(res, 409, { error: "La baisse de prix n'est possible qu'après la moitié du temps écoulée" });
          if (!(v >= 1 && v < a.base_amount)) return send(res, 400, { error: "Indiquez un montant inférieur à la mise de départ actuelle" });
          Object.assign(a, { base_amount: v, effective_bid: a.current_bid ?? v, base_repriced_at: iso() });
          return send(res, 200, { ok: true });
        }

        if ((id = match(p, /^\/api\/marketplace\/([^/]+)\/settle$/)?.[0]) && m === "POST") {
          const a = state.listings.get(id);
          if (!a || Date.parse(a.end_at) > Date.now()) return send(res, 409, { error: "Enchère pas encore terminée." });
          Object.assign(a, { status: a.current_bid ? "settled_sold" : "settled_unsold", settled_at: iso(), final_price: a.current_bid });
          if (!a.current_bid) state.collection.set(a.user_card.id, a.user_card);
          return send(res, 200, { status: a.status });
        }

        if ((id = match(p, /^\/api\/marketplace\/([^/]+)$/)?.[0])) {
          const a = findAuction(id);
          if (!a) return send(res, 404, { error: "Enchère introuvable." });
          if (m === "DELETE") {
            if (a.seller_id !== "me" || a.current_bid) return send(res, 409, { error: "Impossible d'annuler" });
            Object.assign(a, { status: "cancelled", settled_at: iso() });
            state.collection.set(a.user_card.id, a.user_card);
            return send(res, 200, { status: "cancelled" });
          }
          const { user_card, ...auction } = a;
          return send(res, 200, { auction, bids: (state.bids.get(id) || []).slice().reverse() });
        }

        if ((id = match(p, /^\/api\/marketplace\/cards\/([^/]+)\/sales$/)?.[0])) {
          const card = CATALOG.find((c) => c.id === id) || [...state.collection.values()].find((u) => u.card.id === id)?.card;
          if (!card) return send(res, 404, { error: "Carte introuvable." });
          if (q("scope") === "summary") return send(res, 200, { wikipedia_title: card.wikipedia_title, summary: summary(card), isPro: p_.is_pro });
          const next = rng(card.id + "sales");
          // each sale keeps the rarity it sold at (the older ones at the rarity below, when it changed)
          const rs = soldRarities(card);
          const sales = Array.from({ length: 3 + Math.floor(next() * 6) }, (_, i) => {
            const rarity = i < 2 ? rs.at(-1) : rs[0];
            return { id: `${card.id}_s${i}`, rarity, final_price: Math.round(PRICE[rarity] * (0.7 + next() * 0.8)), settled_at: iso(Date.now() - (9 - i) * 86400000) };
          });
          return send(res, 200, { sales });
        }

        if (p === "/api/notifications") {
          if (m === "PATCH") {
            const { ids } = await readBody(req);
            for (const n of NOTIFS) if (!ids || ids.includes(n.id)) state.read.add(n.id);
            return send(res, 200, { success: true });
          }
          return send(res, 200, { notifications: NOTIFS.map((n) => ({ ...n, read: n.read || state.read.has(n.id) })) });
        }

        if (p === "/api/human-check" && m === "POST") {
          const { token } = await readBody(req);
          if (!token) return send(res, 400, { error: "La vérification a échoué. Réessaie." });
          state.humanRequired = false;
          return send(res, 200, { ok: true });
        }
        if (p === "/api/friends") {
          return send(res, 200, {
            friendships: FRIENDS.map((f, i) => ({ id: "fr_" + i, status: "accepted", requester: f, addressee: ME, requester_id: f.id, addressee_id: "me", created_at: ago(9 * 86400000) })),
            counts: { accepted: FRIENDS.length, incoming: 0, outgoing: 0 },
          });
        }
        if ((id = match(p, /^\/api\/profile\/([^/]+)\/collection$/)?.[0])) {
          const f = FRIENDS.find((x) => x.username === decodeURIComponent(id));
          if (!f) return send(res, 404, { error: "Profil introuvable." });
          // like the live route (checked by test:prod): filtered by q and rarity, rarity order (L first)
          // unless sort=name (any other sort value also gives name order), total only with a search
          const all = filterCards(friendCards.get(f.id), url, (r) => r.card)
            .sort(q("sort") ? (a, b) => byTitle(a.card, b.card) : (a, b) => RANK[b.card.rarity] - RANK[a.card.rarity] || byTitle(a.card, b.card));
          return send(res, 200, { collection: all.slice(page * PAGE, page * PAGE + PAGE), total: q("q") ? all.length : null, rarityCounts: {}, tagOptions: [], profileId: f.id, pendingTradeCardIds: pendingCopies(f.id) });
        }
        if ((id = match(p, /^\/api\/chat\/([^/]+)$/)?.[0])) {
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
// Shaped like the live rows (types, titles and data keys recorded by test:prod, see
// docs/api-shapes.json): every row carries its own data.title and data.message.
const NOTIFS = [
  { id: "n0", type: "trade_offer", data: { title: "🔄 Nouvelle offre d'échange !", message: "doobii vous propose un échange.", trade_id: "tr_doobii", initiator_id: "u_doobii", initiator_username: "doobii" }, read: false, created_at: ago(2 * 60000) },
  { id: "n1", type: "marketplace_outbid", data: { title: "📉 Vous avez été surenchéri", message: "Quelqu'un a surenchéri sur Albert Einstein.", auction_id: "auc_card_1", card_id: "card_1", card_title: "Albert Einstein", new_bid: 640, previous_bid: 600 }, read: false, created_at: ago(5 * 60000) },
  { id: "n2", type: "battle_invite", data: { title: "Nouveau défi !", message: "K4rma vous défie en duel.", battle_id: "b1", challenger_id: "u_k4rma", challenger_username: "K4rma" }, read: false, created_at: ago(40 * 60000) },
  { id: "n3", type: "trade_accepted", data: { title: "✅ Offre acceptée !", message: "Marchandise a accepté votre offre.", trade_id: "tr_march", recipient_id: "u_march", recipient_username: "Marchandise" }, read: true, created_at: ago(3 * 3600000) },
  { id: "n4", type: "marketplace_auction_sold", data: { title: "💰 Carte vendue !", message: "Marie Curie s'est vendue 210 WikiBidous.", auction_id: "auc_card_2", card_id: "card_2", card_title: "Marie Curie", final_price: 210 }, read: true, created_at: ago(26 * 3600000) },
  { id: "n5", type: "marketplace_auction_unsold", data: { title: "Enchère terminée sans acheteur", message: "Votre vente de Léonard de Vinci s'est terminée sans enchère.", auction_id: "auc_card_3", card_id: "card_3", card_title: "Léonard de Vinci" }, read: true, created_at: ago(30 * 3600000) },
];
