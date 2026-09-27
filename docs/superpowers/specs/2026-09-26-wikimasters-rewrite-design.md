# WikiMasters Rewrite, Design Spec

**Date:** 2026-09-26
**Status:** Draft for review
**Working name:** WikiMasters (final brand to be decided; this is a new, independently owned product)

This is a ground-up rewrite of a Wikipedia-article collectible card game, on our own backend. It is inspired by the concept and the genre (for example Wikigacha), not a copy of any existing codebase or backend. The data model below is grounded in observed real behaviour of the current wiki-masters.com app (see `API_REFERENCE.md`), used as domain research, then redesigned for our own database.

## 1. Intent and goals

**What it is:** a browser game where cards are real Wikipedia articles. You open packs, build a collection, and trade with friends. Rarity and stats derive from the article's real Wikipedia metrics.

**Why we're building it:** the existing implementation of this concept feels bad to use. It feels slow, looks generic, and is unpolished. The concept is fun; the execution is the problem. Our single differentiator is feel: modern, elegant, fast, genuinely pleasant.

**Audience:** start with a small circle of friends. Architected so it can open up to a wider public launch without a rewrite.

**Success criteria:**
1. Opening a pack feels satisfying and fast. UI responds instantly; the reveal is the highlight.
2. The UI reads as modern and intentional. Nobody would call it templated or slop.
3. A friend can sign up, open packs, build a collection, and trade, end to end, without friction.

**Non-goals for v1:** real-money purchases, native mobile apps, non-French Wikipedia, guilds, duels, auctions or marketplace, achievements, DMs. All are later phases (see section 4).

## 2. Design principles (the north star, non-negotiable)

These exist because the whole reason for the rewrite is feel. Every UI decision is checked against them.

1. **Restraint over decoration.** No gradient washes, no glow halos, no foil sheen by default, no drop shadow on everything. Flat, considered surfaces. Depth comes from spacing, hierarchy, and one hairline border, not effects.
2. **One accent, used sparingly.** Colour earns attention. Rarity is the only place colour pops; chrome stays quiet.
3. **Typography and spacing do the work.** A clear type scale, generous whitespace, real alignment.
4. **Motion answers actions, never decorates.** The pack-open reveal is the one orchestrated moment. No fade-up on scroll, no hover wiggle everywhere. Reduced motion is respected.
5. **Fast is a feature.** Optimistic UI, instant navigation, skeletons over spinners. The app must never feel like it is thinking.
6. **The card is the hero.** The article image, title, and rarity are the star of every screen; everything else recedes.
7. **Plain, elegant text.** No em dashes, no decorative glyphs, no filler copy. UI words help people navigate, nothing more.

## 3. Core gameplay systems (grounded in observed data)

### 3.1 Cards
Every card is one Wikipedia article, with computed game stats:
- **Rarity**, 6 tiers: C, PC, R, SR, UR, L. Derived from the article's monthly pageviews (traffic). Observed bands, to be calibrated against our own catalog distribution rather than hard-coded from these samples:

  | Tier | Approx pageviews per month |
  |---|---|
  | C (Commun) | very low, single or low double digits |
  | PC (Peu commun) | around 100 |
  | R (Rare) | around 250 to 1,000 |
  | SR (Super rare) | around 1,000 to 5,000 |
  | UR (Ultra rare) | around 5,000 to 15,000 |
  | L (Legendaire) | the highest-traffic articles |

  We set cutoffs by percentile of the catalog's pageview distribution, so tiers stay balanced as the catalog grows.
- **ATK:** a compressed (log-scaled) function of pageviews.
- **DEF:** a compressed function of article content length.
- **q_score:** the Wikipedia article quality score. Stored, used for tie-breaks, display, and possibly shiny odds. It is not the rarity driver.
- **Image:** the article's own Wikimedia thumbnail. Frequently absent, so a first-class "no image" card treatment is required, not a broken image.

### 3.2 Packs and economy
- **Packs:** N cards per pack (observed: 5). A daily allowance with timed regeneration (observed cap 10 per day).
- **Pity system:** a counter that guarantees a higher-rarity pull after a dry streak.
- **Soft currency** (name to decide): earned from duplicates and play, spent on extra packs.
- **Draw is server-authoritative** for anti-cheat. The client never decides odds or outcomes.

### 3.3 Collection
- Ownership tracks duplicates (count), starred favourites, shiny or foil variants, user tags, and obtained_at.
- NSFW or sensitive image hiding is a per-user preference.

### 3.4 Trading (v1 social feature)
- Direct friend-to-friend card trades with explicit accept and confirm. Escrow style: both sides lock, the server executes atomically. No open marketplace in v1.

## 4. Product scope and phases

**Phase 1, v1, the launch:**
- Auth (email and password, friends scale).
- Wikipedia ingestion pipeline and card catalog.
- Pack opening (the hero experience).
- Collection: browse, sort, filter, tag, star, duplicates, shiny.
- Friend list and friend-to-friend trading.
- Profile with public collection view.

**Phase 2:** Marketplace (the economy layer). Deliberately deferred. It is the heaviest and most abuse-prone feature and only matters at scale.

**Phase 3:** Duels and battles, guilds, achievements, leaderboard, DMs.

Rationale: the brief is clean, elegant, do not bloat it, play with friends. A tight, excellent v1 beats a broad, mediocre clone. Trading fits friends; a full marketplace does not yet. This ordering is a proposal, adjust in review.

## 5. Architecture

**Recommended stack.** Proven for this exact domain; the current app validates it, since the problem was execution, not stack.
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind. Fast loads with server components, SPA-grade responsiveness.
- **Backend:** Supabase. Postgres for data, Auth for sessions and JWT, Storage for any cached assets, Edge Functions for the server-authoritative pack draw, Realtime later for live trades.
- **Hosting:** Vercel for the frontend, Supabase for the managed backend.
- **Data layer:** thin Next.js route handlers or server actions for game logic (draw, trade execution), plus the Supabase client for RLS-guarded reads. Postgres RLS enforces per-user access.

Alternatives considered: SvelteKit for a lighter runtime; a custom Node or Fastify API with Postgres for full control. Both are viable but slower to ship and lose Supabase's auth, RLS, and realtime batteries. Recommendation: Next.js and Supabase. This is a decision to confirm.

### 5.1 Component boundaries
- `ingestion/`: Wikipedia to cards pipeline, a scheduled worker (see section 7). Isolated and testable.
- `game/draw`: pack draw logic (odds, pity, dedupe). Server only, unit tested against fixtures.
- `game/trade`: atomic trade execution. Server only.
- `db/`: schema, RLS policies, typed queries.
- `web/`: Next.js app, routes, design system, components.
- `web/design-system`: tokens and primitives (Card, RarityMark, Button, Nav). The single source of visual truth.

## 6. Data model (Postgres)

```
cards
  id uuid pk
  wikipedia_title text, wikipedia_url text, lang text default 'fr'
  summary text null, category text null
  image_url text null                         -- Wikimedia thumb
  pageviews int, content_length int, q_score numeric
  rarity text check (rarity in ('C','PC','R','SR','UR','L')), rarity_order smallint
  atk int, def int
  hide_image bool, nsfw_image bool
  created_at, pageviews_refreshed_at, qscore_refreshed_at, info_refreshed_at

profiles                                       -- 1:1 with auth.users
  id uuid pk references auth.users
  username citext unique, is_public bool
  avatar_url, avatar_pos_x, avatar_pos_y
  packs_remaining int, packs_last_regen_at
  currency_balance int
  pity_counter int
  is_pro bool, is_vip bool, is_admin bool
  hide_sensitive bool
  cheat_strikes int, human_verified_at, sanction fields
  created_at, deleted_at

user_cards                                     -- ownership
  id uuid pk
  user_id -> profiles, card_id -> cards
  is_shiny bool, starred bool
  obtained_at
  (store copies individually, or (user, card, shiny) plus count; decide in review)

tags               id, user_id, name, color
user_card_tags     user_card_id, tag_id        -- many to many

friendships        user_id, friend_id, status ('pending','accepted','blocked'), created_at

trades
  id, from_user, to_user, status ('proposed','accepted','cancelled','completed'), created_at
trade_items        trade_id, user_card_id, side ('offer','request')
```

RLS: users read and write only their own profiles, user_cards, tags, and trades they are party to. `cards` is world-readable. Writes to stats and ownership go through server functions only.

## 7. Wikipedia ingestion pipeline (the real backbone)

A scheduled worker that builds and refreshes the catalog:
1. Select articles from fr.wikipedia, from top-pageviews lists plus random sampling for the long tail, so commons exist.
2. Fetch per article: summary and thumbnail (REST summary API), content length, monthly pageviews (Pageviews API), quality score.
3. Compute rarity (pageview percentile), atk (log pageviews), def (log content length), rarity_order.
4. Upsert into `cards`, record refresh timestamps.
5. Refresh cadence: pageviews and q_score periodically, since they drift; images rarely.

Runs as a Supabase scheduled function or external cron. Rate limited and cached. Respects Wikimedia API etiquette (User-Agent, request limits).

## 8. API surface (our routes)

```
POST /api/packs/open         server draw: returns cards, new copies, packs_remaining
GET  /api/collection         paginated user_cards (sort, filter, tag)
GET  /api/collection/stats   rarity counts, completion percentage
GET  /api/cards              paginated master catalog (browse all cards)
GET  /api/profile/:username  public profile plus showcased cards
POST /api/trades             propose; POST /api/trades/:id/accept or cancel
GET  /api/friends            list; POST /api/friends to request or accept
```

All game-state mutations are server-authoritative. Reads use RLS.

## 9. Pack-opening UX (the hero, done right)

Grounded in the real flow, redesigned for feel:
- **Ready:** one clear focal pack, a primary Open action, packs remaining and the regen timer. A centered stage that uses the full viewport on desktop and mobile, not a left-packed column.
- **Reveal:** cards revealed one at a time, swipeable, with a counter (Carte n of 5), prev and next controls, and dots. Rarity is shown by a precise flat colour mark (edge plus label), not a glow. A single restrained flip and scale on reveal, with a slightly stronger beat for the rarest card of the pack.
- **Sound:** optional, tasteful open, flip, and rare cues. Off by default or user toggled.
- **After:** cards are auto-added. A compact summary shows what is new versus duplicate. No fake "add to collection" step, since ownership is server-side on open.

Card component states to design: has image, no image (first class), shiny, duplicate, and each rarity.

## 10. Design system

- **Tokens:** semantic CSS variables. `--bg, --surface, --surface-2, --fg, --fg-muted, --line, --accent`, plus the rarity set `--r-c, --r-pc, --r-r, --r-sr, --r-ur, --r-l`. Light and dark both first class.
- **Rarity palette** (starting point, may be refined): C `#b8f2d5`, PC `#b1cff2`, R `#c6a7f2`, SR `#ed6fa3`, UR `#fa9931`, L `#ffe144`.
- **Type:** a display and UI pairing with a real scale. Prose (summaries) stays under 80 characters per line.
- **Primitives:** Card, RarityMark, Button, Nav (sidebar on desktop, bottom bar on mobile), StatFigure, EmptyState. Built once, reused everywhere, for visual cohesion.
- **Motion policy:** transitions only on user action, one reveal sequence, a reduced-motion path.

## 11. Security and integrity

- Server-authoritative draw and trades. Never trust the client for odds or ownership.
- Postgres RLS on every user-owned table. `cards` is read-only to clients. Stat and ownership writes go through SECURITY INVOKER server functions with explicit auth.uid() checks.
- Bot gate on signup and pack opening (a Turnstile-style challenge plus a server human-verification stamp).
- Anti-abuse: rate limits on draws and trades; cheat-strike and sanction fields carried in the profile.
- No secrets in the client. Publishable key only on the client, service role server-side only.

## 12. Open decisions to confirm (before planning)

1. Stack: Next.js and Supabase (recommended). Confirm, or prefer another?
2. v1 scope: core loop, collection, friend trading; marketplace, duels, guilds later. Agree?
3. Ownership model: one row per copy, or (user, card, shiny) plus count? This affects trading.
4. Brand, name, and language: keep WikiMasters and French, or new name, or add English?
5. Rarity cutoffs: percentile based (recommended). Agree we calibrate against our catalog?
