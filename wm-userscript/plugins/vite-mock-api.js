/**
 * Vite dev plugin: an in-memory mock of the wiki-masters.com /api, so `npm run dev` needs
 * no second process. Mirrors the real response shapes; state lives in memory and resets on
 * server restart. Only the routes the app actually calls are implemented.
 *
 * Active only in dev (configureServer never runs during build). Non-/api requests fall
 * through to Vite so the SPA and HMR work normally.
 */

import { CATALOG, RARITY_WEIGHTS } from "../mock/catalog.js";

const PACK_SIZE = 5;
const PACK_CAP = 10;
const REGEN_SECONDS = 45; // one pack back every 45s
const SHINY_CHANCE = 0.03;
const DUP_REWARD = 6; // WikiBidous per duplicate
const DISCARD_REWARD = 1; // flat +1 point on discard, matching wiki-masters.com

const norm = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function mockApiPlugin() {
  return {
    name: "vite-mock-api",
    configureServer(server) {
      const byRarity = {};
      for (const c of CATALOG) (byRarity[c.rarity] = byRarity[c.rarity] || []).push(c);

      let ucSeq = 0;
      const state = {
        profile: {
          username: "Toi",
          packs_remaining: PACK_CAP,
          packs_last_regen_at: Date.now(),
          currency_balance: 113,
          pity_counter: 0,
          is_pro: true,
        },
        collection: new Map(), // cardId -> { id, card, count, is_shiny, starred, obtained_at }
        wishlist: new Set(),
        bids: new Map(), // auctionId -> current highest bid
        bidHistory: new Map(), // auctionId -> [{ amount, bidder, placed_at, bidder_id }]
        sellingCount: 0, // auctions the player has created this session
      };

      // Seed a few Legendaries so the dev app shows every legendary state at a glance:
      // a normal L with image, a normal L with no image (gold marble), a shiny L with no
      // image (onyx black), and a shiny L over a photo (onyx over image).
      const Ls = CATALOG.filter((c) => c.rarity === "L");
      const withImg = Ls.find((c) => c.image_url) || Ls[0] || CATALOG[0];
      const seed = (id, over, is_shiny) =>
        state.collection.set(id, {
          id: "uc_" + id,
          card: { ...withImg, ...over, id, rarity: "L", rarity_order: 5 },
          count: 1, is_shiny, starred: false, obtained_at: new Date().toISOString(),
        });
      seed("L_img", {}, false);
      seed("L_gold", { wikipedia_title: "Légendaire (sans image)", image_url: null }, false);
      seed("L_onyx", { wikipedia_title: "Légendaire brillante", image_url: null }, true);
      seed("L_onyx_img", { wikipedia_title: "Légendaire brillante (image)" }, true);

      // --- pack economy ---------------------------------------------------------
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
        const elapsed = (Date.now() - p.packs_last_regen_at) / 1000;
        return Math.max(0, Math.ceil(REGEN_SECONDS - (elapsed % REGEN_SECONDS)));
      }
      function pickRarity() {
        if (state.profile.pity_counter >= 25) { // after 25 dry pulls, force SR or better
          const pool = ["SR", "UR", "L"].filter((r) => byRarity[r]?.length);
          return pool[Math.floor(Math.random() * pool.length)] || "R";
        }
        const total = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
        let r = Math.random() * total;
        for (const [rar, w] of Object.entries(RARITY_WEIGHTS)) if ((r -= w) <= 0) return rar;
        return "C";
      }
      function drawOne(exclude) {
        let rar = pickRarity();
        let pool = byRarity[rar];
        const order = ["L", "UR", "SR", "R", "PC", "C"];
        while ((!pool || !pool.length) && order.length) { rar = order.shift(); pool = byRarity[rar]; }
        let candidates = pool.filter((c) => !exclude || !exclude.has(c.id));
        if (!candidates.length) candidates = pool;
        const base = candidates[Math.floor(Math.random() * candidates.length)];
        exclude?.add(base.id);
        const is_shiny = Math.random() < SHINY_CHANCE;
        if (["SR", "UR", "L"].includes(rar)) state.profile.pity_counter = 0;
        else state.profile.pity_counter += 1;
        const existing = state.collection.get(base.id);
        if (existing) {
          existing.count += 1;
          if (is_shiny) existing.is_shiny = true;
          state.profile.currency_balance += DUP_REWARD;
          return { ...base, is_shiny, is_new: false };
        }
        state.collection.set(base.id, {
          id: "uc_" + ++ucSeq, card: base, count: 1, is_shiny,
          starred: false, obtained_at: new Date().toISOString(),
        });
        return { ...base, is_shiny, is_new: true };
      }
      function openPack() {
        regen();
        if (state.profile.packs_remaining <= 0) return { status: 409, body: { error: "no packs" } };
        state.profile.packs_remaining -= 1;
        const seen = new Set();
        const cards = Array.from({ length: PACK_SIZE }, () => drawOne(seen));
        return { status: 200, body: { cards, packs_remaining: state.profile.packs_remaining, currency_balance: state.profile.currency_balance, pity_counter: state.profile.pity_counter } };
      }

      // --- payloads -------------------------------------------------------------
      function profilePayload() {
        regen();
        return { ...state.profile, next_regen_seconds: nextRegenSeconds(), pack_cap: PACK_CAP };
      }
      function collectionPayload() {
        const items = [...state.collection.values()].sort(
          (a, b) => b.card.rarity_order - a.card.rarity_order || b.count - a.count
        );
        const counts = { C: 0, PC: 0, R: 0, SR: 0, UR: 0, L: 0 };
        for (const it of items) counts[it.card.rarity] += 1;
        return { collection: items, stats: { unique: items.length, total: items.reduce((n, it) => n + it.count, 0), catalog: CATALOG.length, counts } };
      }
      function findUc(id) {
        for (const it of state.collection.values()) if (it.id === id) return it;
        return null;
      }

      // One synthesized auction per card, stable across calls (seeded by id; end time fixed once).
      const auctionEnds = new Map();
      function synthAuction(card) {
        let s = [...String(card.id)].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 11);
        const next = () => { s = (s * 1103515245 + 12345) >>> 0; return s / 4294967296; };
        const base = { C: 8, PC: 20, R: 45, SR: 110, UR: 260, L: 600 }[card.rarity] || 20;
        const seller = ["louizor", "Nebubulae", "Kaze", "Nova", "Orion"][Math.floor(next() * 5)];
        const isShiny = next() < 0.06;
        let bid = next() < 0.5 ? Math.round(base * (1 + next())) : null;
        const id = "auc_" + card.id;
        if (!auctionEnds.has(id)) auctionEnds.set(id, Date.now() + Math.round(next() * 20 + 1) * 3600000);
        const stored = state.bids.get(id);
        if (stored != null) bid = stored;
        const mine = state.bids.has(id);
        return {
          id, card, card_id: card.id, is_shiny: isShiny,
          base_amount: Math.round(base * 0.8), current_bid: bid, effective_bid: bid ?? Math.round(base * 0.8),
          current_bidder_id: mine ? "me" : (bid != null ? "other" : null),
          final_price: null, status: "active", end_at: new Date(auctionEnds.get(id)).toISOString(),
          seller: { username: seller }, owned: false,
        };
      }

      // --- request handling -----------------------------------------------------
      const readBody = (req) => new Promise((resolve) => {
        let d = ""; req.on("data", (c) => (d += c));
        req.on("end", () => { try { resolve(JSON.parse(d || "{}")); } catch { resolve({}); } });
      });
      const send = (res, status, body) => {
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(body));
      };

      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api")) return next();
        const url = new URL(req.url, "http://localhost");
        const p = url.pathname;
        const method = req.method;

        if (p === "/api/profile") return send(res, 200, profilePayload());
        if (p === "/api/my-collection") return send(res, 200, collectionPayload());
        if (p === "/api/packs/open" && method === "POST") { const r = openPack(); return send(res, r.status, r.body); }
        if (p === "/api/reset" && method === "POST") {
          state.collection.clear();
          state.profile.packs_remaining = PACK_CAP;
          state.profile.currency_balance = 113;
          state.profile.pity_counter = 0;
          return send(res, 200, { ok: true });
        }
        if (p === "/api/discard" && method === "POST") {
          const b = await readBody(req);
          const it = findUc(b.user_card_id);
          if (!it) return send(res, 404, { error: "not found" });
          it.count -= 1;
          state.profile.currency_balance += DISCARD_REWARD;
          if (it.count <= 0) state.collection.delete(it.card.id);
          return send(res, 200, { ok: true, reward: DISCARD_REWARD, currency_balance: state.profile.currency_balance });
        }

        // Catalog, real-shaped: paged + q search + ownedCardIds/wishlistCardIds/rarityCounts.
        if (p === "/api/cards") {
          const q = (url.searchParams.get("q") || "").trim().toLowerCase();
          const page = parseInt(url.searchParams.get("page") || "0", 10) || 0;
          const rarity = url.searchParams.get("rarity") || "";
          const wishlistOnly = url.searchParams.get("wishlist") === "1";
          const sort = url.searchParams.get("sort") || "rarity";
          const PAGE = 50;
          let list = CATALOG.map((c, i) => ({ ...c, nsfw_image: i % 17 === 3 })); // flag a few sensitive for dev
          if (q) { const nq = norm(q); list = list.filter((c) => norm(c.wikipedia_title + " " + c.category).includes(nq)); }
          if (rarity) list = list.filter((c) => c.rarity === rarity);
          if (wishlistOnly) list = list.filter((c) => state.wishlist.has(c.id));
          if (sort === "name") list.sort((a, b) => (a.wikipedia_title || "").localeCompare(b.wikipedia_title || "", "fr"));
          else if (sort === "atk") list.sort((a, b) => (b.atk || 0) - (a.atk || 0));
          else if (sort === "def") list.sort((a, b) => (b.def || 0) - (a.def || 0));
          else list.sort((a, b) => (b.rarity_order || 0) - (a.rarity_order || 0));
          const rarityCounts = { C: 0, PC: 0, R: 0, SR: 0, UR: 0, L: 0 };
          for (const c of CATALOG) if (rarityCounts[c.rarity] != null) rarityCounts[c.rarity]++;
          const start = page * PAGE;
          return send(res, 200, {
            cards: list.slice(start, start + PAGE),
            total: q ? null : list.length,
            searchHasMore: q ? start + PAGE < list.length : false,
            rarityCounts,
            ownedCardIds: [...state.collection.keys()],
            wishlistCardIds: [...state.wishlist],
            friendOwners: {},
            friendPendingOfferKeys: [],
          });
        }

        // Marketplace browse: real-shaped auctions synthesized from the catalog (stable).
        if (p === "/api/marketplace" && method === "GET") {
          const q = (url.searchParams.get("q") || "").trim().toLowerCase();
          const page = parseInt(url.searchParams.get("page") || "0", 10) || 0;
          const rarity = url.searchParams.get("rarity") || "";
          let src = CATALOG.slice();
          if (q) { const nq = norm(q); src = src.filter((c) => norm(c.wikipedia_title + " " + c.category).includes(nq)); }
          if (rarity) src = src.filter((c) => c.rarity === rarity);
          const auctions = src.slice(page * 24, page * 24 + 24).map(synthAuction);
          return send(res, 200, { auctions, page, limit: 24, hasMore: page * 24 + 24 < src.length });
        }
        if (p === "/api/marketplace/mine") return send(res, 200, { sellingCount: state.sellingCount, maxConcurrentAuctions: 5 });

        // Create a listing (dev): mirror the shape the real adapter's best-guess sends.
        if (p === "/api/marketplace" && method === "POST") {
          const b = await readBody(req);
          const it = findUc(b.user_card_id);
          if (!it) return send(res, 404, { error: "Carte introuvable." });
          if (!(b.starting_price > 0)) return send(res, 400, { error: "Prix invalide.", code: "bad_price" });
          if (state.sellingCount >= 5) return send(res, 409, { error: "Limite de ventes atteinte.", code: "too_many" });
          it.count -= 1;
          if (it.count <= 0) state.collection.delete(it.card.id);
          state.sellingCount += 1;
          return send(res, 200, { ok: true, listing: { card_id: it.card.id, starting_price: b.starting_price, duration_hours: b.duration_hours } });
        }

        // Place a bid: mirrors { auction_id, current_bid, bidder_balance }.
        if (/^\/api\/marketplace\/[^/]+\/bid$/.test(p) && method === "POST") {
          const id = p.split("/")[3];
          const b = await readBody(req);
          const min = (state.bids.get(id) || 0) + 1;
          if (!(b.amount >= min)) return send(res, 409, { error: `Mise trop basse (minimum ${min} wikibidous)`, code: "bid_too_low", min });
          state.bids.set(id, b.amount);
          const hist = state.bidHistory.get(id) || [];
          hist.push({ id: "b" + hist.length, amount: b.amount, bidder: { username: "Toi" }, bidder_id: "me", placed_at: new Date().toISOString() });
          state.bidHistory.set(id, hist);
          state.profile.currency_balance = Math.max(0, state.profile.currency_balance - b.amount);
          return send(res, 200, { auction_id: id, current_bid: b.amount, bidder_balance: state.profile.currency_balance });
        }
        // One auction + bid history: GET /api/marketplace/{id} -> { auction, bids }.
        const single = p.match(/^\/api\/marketplace\/([^/]+)$/);
        if (single && method === "GET") {
          const card = CATALOG.find((c) => c.id === single[1].replace(/^auc_/, ""));
          if (!card) return send(res, 404, { error: "not found" });
          const auction = synthAuction(card);
          let bids = (state.bidHistory.get(auction.id) || []).slice();
          if (!bids.length && auction.current_bid != null) {
            bids = [
              { id: "s0", amount: Math.max(1, Math.round(auction.current_bid * 0.6)), bidder: { username: "Nova" }, bidder_id: "o0", placed_at: new Date(Date.now() - 5400000).toISOString() },
              { id: "s1", amount: auction.current_bid, bidder: { username: "Kaze" }, bidder_id: "o1", placed_at: new Date(Date.now() - 1800000).toISOString() },
            ];
          }
          return send(res, 200, { auction, bids: bids.slice().reverse() });
        }

        if (p === "/api/wishlist" && method === "POST") {
          const b = await readBody(req); if (b.card_id) state.wishlist.add(b.card_id);
          return send(res, 200, { ok: true, cardIds: [...state.wishlist] });
        }
        if (p === "/api/unwishlist" && method === "POST") {
          const b = await readBody(req); state.wishlist.delete(b.card_id);
          return send(res, 200, { ok: true, cardIds: [...state.wishlist] });
        }

        if (p === "/api/notifications") return send(res, 200, {
          notifications: [
            { id: "n0", type: "marketplace_wishlist_listed", data: { message: "Une carte de votre liste de souhaits vient d'être mise en vente.", auction_id: "auc_card_1" }, read: false, created_at: new Date(Date.now() - 2 * 60000).toISOString() },
            { id: "n1", type: "battle_invite", data: { title: "Défi reçu", message: "Kaze vous défie en duel." }, read: false, created_at: new Date(Date.now() - 5 * 60000).toISOString() },
            { id: "n2", type: "custom", data: { title: "Échange accepté", message: "Votre échange a été accepté." }, read: false, created_at: new Date(Date.now() - 3 * 3600000).toISOString() },
            { id: "n3", type: "marketplace_auction_sold", data: { title: "Enchère remportée", message: "Vous avez remporté Georges Seurat pour 210." }, read: true, created_at: new Date(Date.now() - 26 * 3600000).toISOString() },
          ],
        });

        return send(res, 404, { error: "not found" });
      });

      server.config.logger.info("  \x1b[32m✓\x1b[0m mock API mounted on /api");
    },
  };
}
