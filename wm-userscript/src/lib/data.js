// Data layer. One interface, two adapters chosen by hostname:
//  - real: wiki-masters.com, calls the real /api/* (same origin, real session)
//  - mock: anywhere else (localhost dev), calls the mock server's /api/*
// Both normalize to the same shapes the components consume.

const isReal = /(^|\.)wiki-masters\.com$/.test(location.hostname);

// Rarity display names, shared so the modal and the collection filters never drift.
// Exact labels used by the game (RARITY_CONFIG), matched for authenticity.
export const RNAME = { C: "Commun", PC: "Peu Commun", R: "Rare", SR: "Super Rare", UR: "Ultra Rare", L: "Légendaire" };

// Notification type -> title, matching the real client's labels (used when a notification
// has no data.title). Verified against the client bundle.
const NTYPE = {
  marketplace_wishlist_listed: "Liste de souhaits",
  marketplace_auction_sold: "Carte vendue",
  marketplace_auction_unsold: "Enchère non vendue",
  marketplace_outbid: "Enchère dépassée",
  auction_midpoint_nudge: "Enchère sans mise",
  battle_invite: "Nouveau défi",
  friend_request: "Demande d'ami",
  guild_invite: "Invitation de guilde",
  custom: "Message",
};
// Where a notification points when clicked (verified: marketplace_* -> the auction).
function notifHref(n) {
  const d = n.data || {};
  if (/^marketplace_/.test(n.type) && (d.auction_id || n.auction_id)) return `/marketplace/${d.auction_id || n.auction_id}`;
  if (n.type === "battle_invite" && (d.battle_id)) return `/battle`;
  if (n.type === "friend_request") return `/friends`;
  if (n.type === "guild_invite") return `/guild`;
  return null;
}

// Accent-insensitive search key (matches how the game itself normalizes search text).
export function normSearch(s) {
  return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}

function nCard(c) {
  return {
    id: c.id,
    title: c.wikipedia_title || c.title || "",
    category: c.category || "",
    // Verified: the real card component renders art only when
    // `image_url && !hide_image && !sensitive`. Honour hide_image by treating the
    // card as art-less, so it gets the clean no-image treatment instead of a broken load.
    image_url: c.hide_image ? null : (c.image_url || null),
    rarity: c.rarity,
    atk: c.atk ?? 0,
    def: c.def ?? 0,
    q_score: c.q_score != null ? Number(c.q_score) : null,
    pageviews: c.pageviews ?? null,
    summary: c.summary || null,
    wikipedia_url: c.wikipedia_url || null,
    // Real field on /api/cards. The game blurs from a server-provided blurredCardIds set
    // gated by a hideSensitive setting; we don't get that set, so we use nsfw_image as our
    // own blur trigger (a documented substitution, honoured only when the user opts in).
    nsfw_image: !!c.nsfw_image,
  };
}

// Normalize a marketplace auction. Shape VERIFIED live (2026-09-27):
//   { id, card{...}, base_amount, current_bid, effective_bid, final_price, end_at, status,
//     is_shiny, seller{username}, owned, snapshot_rarity/atk/def }
function nAuction(a) {
  const card = a.card
    ? nCard(a.card)
    : nCard({ id: a.card_id, rarity: a.snapshot_rarity, atk: a.snapshot_atk, def: a.snapshot_def });
  return {
    id: a.id,
    card,
    is_shiny: !!a.is_shiny,
    base: a.base_amount ?? null,
    bid: a.current_bid ?? null,
    price: a.effective_bid ?? a.current_bid ?? a.base_amount ?? null,
    finalPrice: a.final_price ?? null,
    status: a.status || "active",
    endAt: a.end_at || null,
    createdAt: a.created_at || null,
    seller: a.seller?.username || null,
    currentBidderId: a.current_bidder_id ?? null,
    owned: !!a.owned,
  };
}
// A bid row from GET /api/marketplace/{id} -> { bids:[{ amount, placed_at, bidder{username} }] }.
function nBid(b) {
  return { id: b.id, amount: b.amount, bidder: b.bidder?.username || null, bidderId: b.bidder_id || null, at: b.placed_at || null };
}

const json = (p, opts) =>
  fetch(p, { credentials: "include", ...opts }).then((r) => {
    if (!r.ok) throw new Error(p + " -> " + r.status);
    return r.json();
  });
const postJson = (p, body) =>
  json(p, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

/* ---------------- capture the app's own profile call (real site) ------------- */
let capturedProfile = null;
let localEpoch = 0; // bumped on each local pack-open so a stale in-flight sync cannot clobber it
let origFetch = null; // the real fetch, kept so we can call Supabase ourselves
let syncReq = null; // { url, init } of the app's sync_profile_packs call, if we saw it
// Captured from the app's Supabase calls so we can fetch the profile on any route
// (the app only calls sync_profile_packs on /pulls, so /collection would otherwise show "-").
let sbBase = null; // e.g. https://xxxx.supabase.co
let sbHeaders = null; // { apikey, authorization, ... }
let sbUserId = null;

function headerVal(init, name) {
  const h = init && init.headers;
  if (!h) return null;
  if (typeof h.get === "function") return h.get(name);
  if (Array.isArray(h)) { const f = h.find(([k]) => String(k).toLowerCase() === name); return f ? f[1] : null; }
  for (const k in h) if (String(k).toLowerCase() === name) return h[k];
  return null;
}

// Fetch the live profile ourselves via Supabase, using credentials captured from the app.
// Works on every route, so packs/currency never stay stuck on "-".
export async function refreshProfile() {
  if (!origFetch) return null;
  try {
    let res;
    if (sbBase && sbHeaders && sbUserId) {
      res = await origFetch.call(window, `${sbBase}/rest/v1/rpc/sync_profile_packs`, {
        method: "POST",
        headers: { ...sbHeaders, "content-type": "application/json" },
        body: JSON.stringify({ user_id: sbUserId }),
      });
    } else if (syncReq) {
      res = await origFetch.call(window, syncReq.url, syncReq.init);
    } else {
      return null;
    }
    const j = await res.json();
    if (j && typeof j === "object") {
      capturedProfile = { ...(capturedProfile || {}), ...j };
      window.dispatchEvent(new Event("wm:profile"));
      return j;
    }
  } catch {}
  return null;
}

export function initCapture() {
  if (!isReal || typeof window === "undefined") return;
  const orig = window.fetch;
  origFetch = orig;
  window.fetch = function (...args) {
    const ret = orig.apply(window, args);
    try {
      const url = typeof args[0] === "string" ? args[0] : args[0] && args[0].url;
      // Capture Supabase base + auth headers + our user id from any /rest/v1 call, so we
      // can fetch the profile ourselves on routes where the app never syncs.
      if (url && url.includes(".supabase.co/rest/v1/") && args[1]) {
        try {
          if (!sbBase) sbBase = new URL(url).origin;
          const apikey = headerVal(args[1], "apikey");
          const auth = headerVal(args[1], "authorization");
          if (apikey && auth) sbHeaders = { apikey, authorization: auth };
          const m = url.match(/(?:^|[?&])(?:id|user_id)=eq\.([0-9a-f-]{36})/i);
          if (m) sbUserId = m[1];
        } catch {}
      }
      if (url && url.includes("/rpc/sync_profile_packs")) {
        // Remember the request so we can replay it on demand.
        if (typeof args[0] === "string" && args[1]) syncReq = { url: args[0], init: args[1] };
        const issuedEpoch = localEpoch;
        ret
          .then((res) =>
            res
              .clone()
              .json()
              .then((j) => {
                // Ignore a sync that was already in flight when we opened a pack:
                // its data predates our local decrement and would roll it back.
                if (localEpoch !== issuedEpoch) return;
                capturedProfile = { ...(capturedProfile || {}), ...j };
                // Tell the app to re-read the profile the instant its own sync lands.
                window.dispatchEvent(new Event("wm:profile"));
              })
              .catch(() => {})
          )
          .catch(() => {});
      }
      // The app fetches is_pro from Supabase directly; capture it for the profile header.
      if (url && url.includes("/rest/v1/profiles")) {
        ret
          .then((res) =>
            res
              .clone()
              .json()
              .then((j) => {
                const row = Array.isArray(j) ? j[0] : j;
                if (row && typeof row.is_pro !== "undefined") {
                  capturedProfile = { ...(capturedProfile || {}), is_pro: row.is_pro };
                  window.dispatchEvent(new Event("wm:profile"));
                }
              })
              .catch(() => {})
          )
          .catch(() => {});
      }
    } catch {}
    return ret;
  };
}

/* ---------------- mock adapter (localhost dev) ---------------- */
const MockData = {
  isReal: false,
  canReset: true,
  async profile() {
    const p = await json("/api/profile");
    return {
      username: p.username,
      packs_remaining: p.packs_remaining,
      pack_cap: p.pack_cap,
      currency: p.currency_balance,
      next_regen_seconds: p.next_regen_seconds,
      is_pro: !!p.is_pro,
    };
  },
  async openPack() {
    const d = await json("/api/packs/open", { method: "POST" });
    if (d.error) throw new Error(d.error);
    return {
      cards: d.cards.map((c) => ({ ...nCard(c), is_new: c.is_new, is_shiny: c.is_shiny })),
      packs_remaining: d.packs_remaining,
      currency: d.currency_balance,
    };
  },
  async collection(opts = {}) {
    const d = await json("/api/my-collection");
    const items = d.collection.map((it) => {
      const card = nCard(it.card);
      return {
        id: it.id,
        card,
        count: it.count,
        is_shiny: it.is_shiny,
        starred: it.starred,
        obtained_at: it.obtained_at || null,
        _s: normSearch(card.title + " " + (card.category || "")),
      };
    });
    const stats = { ...d.stats, loading: false };
    opts.onPartial?.({ items: items.slice(), stats });
    return { items, stats };
  },
  async cards() {
    const d = await json("/api/cards");
    return { cards: d.cards.map(nCard) };
  },
  // Catalog (dev): the mock returns the whole small fixture; we filter/own/wishlist locally.
  // NOTE: this client-side filter is fine ONLY because the mock catalog is tiny. The real
  // catalog is ~2.77M rows and MUST stay server-paged (see RealData.catalog).
  async catalog(opts = {}) {
    const rarity = opts.rarity ? `&rarity=${opts.rarity}` : "";
    const wishlist = opts.wishlist ? "&wishlist=1" : "";
    const d = await json(`/api/cards?page=${opts.page ?? 0}&sort=${opts.sort || "rarity"}&q=${encodeURIComponent(opts.q || "")}${rarity}${wishlist}`);
    const owned = new Set(d.ownedCardIds || []);
    const wish = new Set(d.wishlistCardIds || []);
    const cards = (d.cards || []).map((c) => ({ ...nCard(c), owned: owned.has(c.id), wishlisted: wish.has(c.id) }));
    return { cards, total: d.total ?? null, hasMore: !!d.searchHasMore, rarityCounts: d.rarityCounts || null };
  },
  async marketplace(opts = {}) {
    const rarity = opts.rarity ? `&rarity=${opts.rarity}` : "";
    const d = await json(`/api/marketplace?page=${opts.page ?? 0}&q=${encodeURIComponent(opts.q || "")}${rarity}`);
    return { auctions: (d.auctions || []).map(nAuction), page: d.page ?? 0, hasMore: !!d.hasMore };
  },
  async marketplaceMine() { try { return await json("/api/marketplace/mine"); } catch { return { sellingCount: 0, maxConcurrentAuctions: 5 }; } },
  async placeBid(auctionId, amount) {
    const r = await fetch(`/api/marketplace/${auctionId}/bid`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ amount }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(d.error || "Enchère refusée."); e.code = d.code; e.min = d.min; throw e; }
    return d;
  },
  async auction(id) {
    const d = await json(`/api/marketplace/${id}`);
    return { ...nAuction(d.auction || {}), bids: (d.bids || []).map(nBid) };
  },
  userId: "me",
  wishlistAdd: (cardId) => postJson("/api/wishlist", { card_id: cardId }),
  wishlistRemove: (cardId) => postJson("/api/unwishlist", { card_id: cardId }),
  async notifications() {
    try {
      const d = await json("/api/notifications");
      return (d.notifications || []).map((n) => ({
        id: n.id,
        title: n.data?.title || NTYPE[n.type] || "Notification",
        message: n.data?.message || "",
        read: !!n.read,
        at: n.created_at || null,
        href: notifHref(n),
      }));
    } catch { return []; }
  },
  reset: () => json("/api/reset", { method: "POST" }),
  canAct: true,
  discard: (ucId) => postJson("/api/discard", { user_card_id: ucId }),
  async marketStats(card) {
    // Deterministic synthesis for local dev, seeded by card id so a card's value is stable.
    const base = { C: 8, PC: 20, R: 45, SR: 110, UR: 260, L: 600 }[card.rarity] || 20;
    let s = [...String(card.id)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
    const next = () => { s = (s * 1103515245 + 12345) >>> 0; return s / 4294967296; };
    const count = 3 + Math.floor(next() * 6);
    const sold = Array.from({ length: count }, () => Math.round(base * (0.7 + next() * 0.8)));
    const mean = (a) => Math.round(a.reduce((x, y) => x + y, 0) / a.length);
    const now = Date.now();
    const soldSeries = sold.map((price, i) => ({ price, t: now - (count - i) * 86400000 }));
    return {
      soldCount: sold.length,
      soldAvg: mean(sold),
      soldMin: Math.min(...sold),
      soldMax: Math.max(...sold),
      soldSeries,
      activeCount: 1 + Math.floor(next() * 3),
      lowestAsk: Math.round(base * 0.9),
    };
  },
  async specialAvailable() { return false; },
};

/* ---------------- real adapter (wiki-masters.com) ---------------- */
function countsFrom(items) {
  const counts = { C: 0, PC: 0, R: 0, SR: 0, UR: 0, L: 0 };
  for (const it of items) if (counts[it.card.rarity] != null) counts[it.card.rarity] += 1;
  return counts;
}

let ownedIds = new Set(); // to derive is_new on pack open
let ownedLoaded = false; // true once the collection has been read at least once

const RealData = {
  isReal: true,
  canReset: false,
  async profile() {
    // Everything here comes from the app's own sync_profile_packs call, captured at
    // runtime. wikibidous_balance and packs_remaining are documented fields of that
    // payload; there is no separate currency endpoint.
    let balance = null;
    try { balance = (await json("/api/wikibidous")).balance; } catch {}
    const cap = capturedProfile || {};
    const packs = cap.packs_remaining ?? null;
    // One pack regenerates every 10 minutes (cap 10). Compute the countdown from the
    // last regen timestamp the profile provides.
    let nextRegen = null;
    if (packs != null && packs < 10 && cap.packs_last_regen_at) {
      const last = Date.parse(cap.packs_last_regen_at);
      if (!isNaN(last)) nextRegen = Math.max(0, Math.round((last + 600000 - Date.now()) / 1000));
    }
    return {
      username: cap.username || null,
      packs_remaining: packs,
      pack_cap: 10,
      currency: balance ?? cap.wikibidous_balance ?? null,
      next_regen_seconds: nextRegen,
      is_pro: !!cap.is_pro,
    };
  },
  async openPack() {
    // Know what was already owned before deciding which cards are new.
    if (!ownedLoaded) {
      try { await this.collection(); } catch {}
    }
    // Read the raw response so we can catch the human-verification challenge the server
    // returns (the "are you still here?" Turnstile step) instead of a generic failure.
    const r = await fetch("/api/packs/open", { method: "POST", credentials: "include" });
    let d = {};
    try { d = await r.json(); } catch {}
    if (!r.ok || d.error) {
      if (d.packs_remaining != null) {
        capturedProfile = { ...(capturedProfile || {}), packs_remaining: d.packs_remaining };
        localEpoch++;
        window.dispatchEvent(new Event("wm:profile"));
      }
      if (d.human_verification_required) {
        const e = new Error("Vérification humaine requise");
        e.code = "human_verification";
        throw e;
      }
      throw new Error(d.error || "Ouverture du paquet impossible.");
    }
    const cards = (d.cards || []).map((c) => {
      const isNew = ownedLoaded ? !ownedIds.has(c.id) : false;
      ownedIds.add(c.id);
      return { ...nCard(c), is_new: isNew, is_shiny: !!c.is_shiny };
    });
    // Keep the captured pack count in sync so the wallet and Pulls counter decrement.
    // Opening a pack is free, so currency is unchanged; report the last known balance.
    if (d.packs_remaining != null) {
      capturedProfile = { ...(capturedProfile || {}), packs_remaining: d.packs_remaining };
      localEpoch++; // any sync already in flight is now stale for this field
    }
    let currency = null;
    try { currency = (await json("/api/wikibidous")).balance; } catch {}
    return { cards, packs_remaining: d.packs_remaining, currency: currency ?? capturedProfile?.wikibidous_balance ?? null };
  },
  async collection(opts = {}) {
    // 50 per page, `limit` ignored. Show page 0 immediately via onPartial, then fill the
    // remaining pages in parallel and report progress, so a slow API never blocks the grid.
    const map = (arr) => arr.map((it) => {
      const card = nCard(it.card);
      return {
        id: it.id, card, count: it.count ?? 1,
        is_shiny: !!it.is_shiny, starred: !!it.starred, obtained_at: it.obtained_at || null,
        _s: normSearch(card.title + " " + (card.category || "")),
      };
    });
    const first = await json("/api/my-collection?sort=rarity&page=0&stats=1");
    const total = first.total ?? null;
    const realCounts = first.rarityCounts || null;
    let items = map(first.collection || []);
    const statsOf = (loading) => ({
      unique: total ?? items.length,
      total: items.reduce((n, it) => n + it.count, 0),
      catalog: null,
      counts: realCounts || countsFrom(items),
      loading,
    });
    if (total && total > items.length) {
      opts.onPartial?.({ items: items.slice(), stats: statsOf(true) });
      const pages = Math.ceil(total / 50);
      await Promise.all(
        Array.from({ length: pages - 1 }, (_, i) =>
          json(`/api/my-collection?sort=rarity&page=${i + 1}&stats=0`)
            .then((d) => { items = items.concat(map(d.collection || [])); opts.onPartial?.({ items: items.slice(), stats: statsOf(true) }); })
            .catch(() => {})
        )
      );
    }
    ownedIds = new Set(items.map((it) => it.card.id));
    ownedLoaded = true;
    return {
      items,
      stats: {
        unique: total ?? items.length,
        total: items.reduce((n, it) => n + it.count, 0),
        catalog: null,
        counts: realCounts || countsFrom(items),
        loading: false,
      },
    };
  },
  async cards() {
    const d = await json("/api/cards?page=0&sort=rarity");
    return { cards: (d.cards || d.items || []).map(nCard) };
  },
  // Catalog: the full master set. VERIFIED live shape (RSC-fetched):
  //   /api/cards?page&sort&q -> { cards[], total, searchHasMore, rarityCounts,
  //     ownedCardIds[], wishlistCardIds[], friendOwners{}, friendPendingOfferKeys[] }
  // total is null when q is present; searchHasMore drives pagination. 50 cards/page.
  // MUST stay server-paged/searched: the catalog is ~2.77M rows, never load-all.
  // Only sort=rarity is confirmed live; other sort values are gated until probed.
  async catalog(opts = {}) {
    const page = opts.page ?? 0;
    const sort = opts.sort || "rarity"; // verified sorts: rarity | name | atk | def
    const q = opts.q ? `&q=${encodeURIComponent(opts.q)}` : "";
    const rarity = opts.rarity ? `&rarity=${opts.rarity}` : ""; // verified param
    const wishlist = opts.wishlist ? "&wishlist=1" : ""; // verified param
    const d = await json(`/api/cards?page=${page}&sort=${sort}${q}${rarity}${wishlist}`);
    const owned = new Set(d.ownedCardIds || []);
    const wish = new Set(d.wishlistCardIds || []);
    const friends = d.friendOwners || {};
    const cards = (d.cards || []).map((c) => ({
      ...nCard(c),
      owned: owned.has(c.id),
      wishlisted: wish.has(c.id),
      friendCount: Array.isArray(friends[c.id]) ? friends[c.id].length : 0,
    }));
    return { cards, total: d.total ?? null, hasMore: !!d.searchHasMore, rarityCounts: d.rarityCounts || null };
  },
  // Marketplace browse. VERIFIED live shape (2026-09-27):
  //   /api/marketplace?page&q -> { auctions[], page, limit, hasMore }, open to all.
  async marketplace(opts = {}) {
    const page = opts.page ?? 0;
    const q = opts.q ? `&q=${encodeURIComponent(opts.q)}` : "";
    const rarity = opts.rarity ? `&rarity=${opts.rarity}` : ""; // verified filter
    const d = await json(`/api/marketplace?page=${page}${q}${rarity}`);
    return { auctions: (d.auctions || []).map(nAuction), page: d.page ?? page, hasMore: !!d.hasMore };
  },
  // VERIFIED: returns ONLY { sellingCount, maxConcurrentAuctions } (5 free / 10 PRO).
  async marketplaceMine() {
    try { return await json("/api/marketplace/mine"); }
    catch { return { sellingCount: 0, maxConcurrentAuctions: 5 }; }
  },
  // Place a bid. VERIFIED live (2026-09-27):
  //   POST /api/marketplace/{auctionId}/bid  { amount }
  //   200 -> { auction_id, current_bid, bidder_balance }
  //   409 -> { error, code:"bid_too_low", min }
  async placeBid(auctionId, amount) {
    const r = await fetch(`/api/marketplace/${auctionId}/bid`, {
      method: "POST", credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(d.error || "Enchère refusée."); e.code = d.code; e.min = d.min; throw e; }
    return d; // { auction_id, current_bid, bidder_balance }
  },
  // One auction with live state + bid history. VERIFIED: GET /api/marketplace/{id}
  //   -> { auction:{...}, bids:[{ amount, placed_at, bidder{username} }] }
  async auction(id) {
    const d = await json(`/api/marketplace/${id}`);
    return { ...nAuction(d.auction || {}), bids: (d.bids || []).map(nBid) };
  },
  // Our own user id (captured from the app's Supabase calls), to tell if we are top bidder.
  get userId() { return sbUserId; },
  // Wishlist writes are UNVERIFIED (no endpoint in the client bundle; only the read field
  // wishlistCardIds is live). Best-guess REST, fail safe: a rejection throws so the caller
  // rolls the toggle back and shows an error rather than lying about success.
  wishlistAdd: (cardId) => postJson(`/api/cards/${cardId}/wishlist`, {}),
  wishlistRemove: (cardId) => json(`/api/cards/${cardId}/wishlist`, { method: "DELETE" }),
  async notifications() {
    try {
      const d = await json("/api/notifications");
      return (d.notifications || []).map((n) => ({
        id: n.id,
        title: n.data?.title || NTYPE[n.type] || "Notification",
        message: n.data?.message || "",
        read: !!n.read,
        at: n.created_at || null,
        href: notifHref(n),
      }));
    } catch { return []; }
  },
  // Verified writes only: discard and bid. Listing/buy/cancel/wishlist are not verified,
  // so they route to the native site (see the components) instead of guessing an endpoint.
  canAct: true,
  discard: (ucId) => postJson(`/api/user-cards/${ucId}/discard`, {}),
  // Verified market source (from the client): GET /api/marketplace/cards/{cardId}/sales
  // -> { sales: [{ final_price, settled_at, rarity }] }. It is a PRO-only endpoint: a
  // non-PRO account gets 403 { code:"pro_required" }, which we treat as "no data" (null)
  // so no value is shown rather than a fabricated one. Sold history only, no live asks.
  async marketStats(card) {
    let d;
    try {
      const r = await fetch(`/api/marketplace/cards/${card.id}/sales`, { credentials: "include" });
      d = await r.json();
      if (!r.ok) return null; // pro_required or any error -> unavailable, fail safe
    } catch { return null; }
    const sales = Array.isArray(d.sales) ? d.sales : null;
    if (!sales) return null;
    const priced = sales.filter((s) => s.final_price != null);
    const prices = priced.map((s) => s.final_price);
    const soldSeries = priced
      .map((s) => ({ price: s.final_price, t: Date.parse(s.settled_at || "") || 0 }))
      .sort((a, b) => a.t - b.t);
    const mean = (a) => (a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : null);
    return {
      soldCount: prices.length,
      soldAvg: mean(prices),
      soldMin: prices.length ? Math.min(...prices) : null,
      soldMax: prices.length ? Math.max(...prices) : null,
      soldSeries,
      activeCount: 0, // this endpoint is settled sales only
      lowestAsk: null,
    };
  },
  async specialAvailable() {
    // Native special/Pro pack: surface it so it is never hidden by our overlay.
    try {
      const d = await json("/api/packs/special");
      return !!(d && (d.available || (d.packs || []).length));
    } catch { return false; }
  },
};

export const data = isReal ? RealData : MockData;

// Session cache of a single representative market value per card, so the collection
// can show and sort by value without refetching. Values persist for the page's life.
const marketCache = new Map(); // card id -> number | null
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

// Client-side tally of what was pulled this session (we own this; nothing invented).
// Plain object: the Pulls ready screen re-renders after each pull and reads it fresh.
export const session = { packs: 0, cards: 0, newCards: 0 };
export function recordPull(cards) {
  session.packs += 1;
  session.cards += cards.length;
  session.newCards += cards.filter((c) => c.is_new).length;
}
