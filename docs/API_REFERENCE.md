# WikiMasters - What's actually available (data & API inventory)

Captured live from the authenticated app (account KazeTachinuu). Session tokens seen
in headers were **not** stored or reused. This is the real, non-hallucinated surface -
use it as the data-model spec for the rewrite.

## Architecture in one line
Next.js (Vercel) -> **Next.js API routes** (`/api/*`) are the primary data layer ->
Supabase Postgres behind them. A few reads hit Supabase REST directly (`profiles`, `tags`).

---

## The data we can see (core entities)

### Card (the master catalog entity) - from `/api/cards`, `/api/packs/open`
| field | type | notes |
|---|---|---|
| id | uuid | |
| wikipedia_title | string | e.g. "Georges Seurat" |
| wikipedia_url | string | fr.wikipedia.org link |
| summary | string \| null | article extract |
| image_url | string \| null | **Wikimedia thumbnail** (330px) - often null |
| category | string \| null | short descriptor ("peintre français") |
| q_score | decimal | quality score -> **drives rarity** |
| rarity | `C·PC·R·SR·UR·L` | 6 tiers |
| rarity_order | 0-5 | |
| atk | int | **tracks pageviews** |
| def | int | **tracks content_length** |
| pageviews | int | |
| content_length | int | |
| lang | "fr" | |
| hide_image / nsfw_image | bool | moderation |
| in_global_collection | bool | |
| created_at, pageviews_refreshed_at, qscore_refreshed_at, info_refreshed_at | ts | data freshness |

*Art comes from the article's own Wikimedia image - the 24 `/cards/*.jpg` files are marketing only. The pool is essentially all of fr.wikipedia.*

### UserCard (ownership) - from `/api/my-collection`
`id, card_id, user_id, card{...}, count, starred, is_shiny (foil variant), obtained_at, tags[]`

### Profile - from `sync_profile_packs` / `/rest/v1/profiles`
`id, username, is_pro, is_vip, is_admin, is_public, avatar_url, avatar_pos_x/y,`
`packs_remaining (cap 10/day), packs_last_regen_at, wikibidous_balance,`
`pity_counter, cheat_strikes, hide_sensitive, pack_human_verified_at,`
`last_normal_pack_opened_at, leaderboard_excluded, sanction fields, deleted_at`

### Tag - `/rest/v1/tags`  -> user-defined collection labels

---

## Endpoints available (authenticated player)

| Endpoint | Gives us |
|---|---|
| `POST /api/packs/open` | draws 5 cards (server-side), returns `cards[]`, `owned_copies[]`, `packs_remaining` |
| `GET /api/my-collection?sort&page&stats` | your cards, paginated |
| `GET /api/my-collection/stats?sort` | collection stats / rarity counts |
| `GET /api/cards?page&sort` | **full card catalog** |
| `GET /api/marketplace?page&limit&sort&mine` | marketplace listings |
| `GET /api/trades?active=1` | trade offers |
| `GET /api/battles` · `GET /api/parties` | duels / battle parties |
| `GET /api/guilds` | guilds |
| `GET /api/notifications` | notifications |
| `POST /rest/v1/rpc/sync_profile_packs` | your profile + pack regen |
| `GET /rest/v1/profiles?select=...` | profile flags (is_pro/is_admin) |
| `GET /rest/v1/tags` | your tags |
| `GET /auth/v1/.well-known/jwks.json` | auth verification |
| (same pattern, not yet opened) `/api/friends` · `/api/dms` · `/api/achievements` · `/api/profile` | social / progression |

Static assets we can use: `/audio/pack-rip.mp3`, `/audio/card-flip.mp3`, `/audio/legendary-reveal.mp3`, rarity badges `/{commun,peu_commun,rare,super_rare,ultra_rare,legendaire}.png`.

---

## Systems to model in the rewrite
- **Rarity engine:** `q_score` (Wikipedia quality) -> rarity tier; `atk` <- pageviews, `def` <- content_length.
- **Economy:** WikiBidous (soft currency), packs (10/day, timed regen), pity_counter (rare guarantee), is_pro/is_vip tiers.
- **Anti-cheat / integrity:** cheat_strikes, pack_human_verified_at (Turnstile), sanctions, leaderboard_excluded.
- **Collection:** duplicates (count), starred, shiny variants, tags, NSFW hiding.
- **Social/competitive:** trades, marketplace, duels (battles/parties), guilds, friends, DMs, achievements, leaderboard.

## Rarity palette (from app CSS)
`C #b8f2d5 · PC #b1cff2 · R #c6a7f2 · SR #ed6fa3 · UR #fa9931 · L #ffe144`

---

## VERIFIED LIVE 2026-09-27 (re-captured directly from the authenticated site)

Read directly via the browser session on wiki-masters.com. Corrections and confirmations:

- **Catalog size is 2,774,424 cards** (essentially all of fr.wikipedia). `rarityCounts` (global):
  C 1,993,205 · PC 519,831 · R 180,416 · SR 66,967 · UR 12,286 · L 1,719. There is NO bounded set,
  so "collection completion %" is not a meaningful feature. `in_global_collection` is a per-card bool.
- **`/api/wikibidous` EXISTS** and returns `{ balance: number }` (200). It is app-used. (An earlier note
  calling it non-existent was wrong.)
- **`/api/cards?page&sort&q`** returns `{ cards[], total, searchHasMore, rarityCounts, friendOwners,
  ownedCardIds, wishlistCardIds, friendPendingOfferKeys }`. `q=` performs full-text search. There is a
  **wishlist** (`wishlistCardIds`).
- **`/api/my-collection?page&sort&stats`** returns `{ collection[], total, rarityCounts, tagOptions,
  pendingTradeCardIds }`. Paginated at **50 per page; `limit` is ignored**. `sort` accepts at least
  `rarity` and `recent`. Each entry: `{ id, card{...}, card_id, count, starred, is_shiny, obtained_at,
  tags[], user_id }`.
- **`/api/marketplace?page&limit&q&mine&sort`** returns `{ auctions[], page, limit, hasMore }`. `q=` filters
  by card. Each auction: `{ id, seller_id, card_id, base_amount, current_bid, effective_bid, final_price,
  status, end_at, snapshot_rarity/atk/def, is_shiny, seller{...}, card{...}, owned }`. `mine=1` adds
  `{ selling[], bidding[], history[], won[], maxConcurrentAuctions }`. (Confirms the market-value approach:
  fetch by `q`, filter by `card_id`, average `final_price`/`effective_bid`.)
- **`/api/trades?active=1`** returns `{ trades[] }`.
- **`/api/notifications`** returns `{ notifications[] }` with `{ id, type, data{title,message,...}, read,
  created_at }`.
- **`/api/profile` returns 404** - it does not exist as a JSON route.
- **Profile / packs come from Supabase directly**, not same-origin: `POST
  https://<project>.supabase.co/rest/v1/rpc/sync_profile_packs` (needs apikey + bearer). `is_pro`
  is fetched separately: `GET .../rest/v1/profiles?select=id,is_pro&id=eq.<uid>`. The wrapper must intercept
  these (a same-origin call 404s / lacks the Supabase auth headers). `is_vip` is NOT fetched by the app.
- **`/api/packs/open` is POST-only** (GET -> 405).

Integration consequences applied to the code: collection is now fetched across all pages (50/page) using the
real `total`/`rarityCounts`; currency uses `/api/wikibidous`; `is_pro` is captured from the profiles call;
collection-wide market value was removed (it would fire ~1 request per owned card, i.e. ~1000 on a real
account) and market value is shown only on demand in the card detail.
