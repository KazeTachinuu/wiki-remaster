# wiki-masters.com API reference

Verified live on 2026-09-28 against an authenticated account: request shapes read from the
native client's bundles, responses captured from the running site, every write exercised once.
`wm-userscript/scripts/prod-test.mjs` re-checks all of it (`bun run test:prod`).

## Architecture

Next.js on Vercel. `/api/*` are same-origin routes authenticated by the session cookie, backed
by Supabase. The profile (packs, pity, is_pro) is read by the client directly from Supabase
(`/rest/v1/rpc/sync_profile_packs`, `/rest/v1/profiles`) with an `apikey` + bearer token, so the
userscript captures those headers from the app's own calls and replays them.

The backend has transient upstream failures (5xx, sometimes an HTML "525 SSL handshake failed"
page inside `error`). Reads are retried once; HTML error bodies are never shown to the user.

## Entities

**Card** (`/api/cards`, packs, auctions): `id, wikipedia_title, wikipedia_url, summary, image_url,
category, q_score, rarity (C PC R SR UR L), rarity_order, atk (pageviews), def (content_length),
pageviews, content_length, lang, hide_image, nsfw_image, in_global_collection, created_at`.
The catalog is essentially all of fr.wikipedia: 2,774,822 cards.

**User card** (`/api/my-collection`): `id` (the owned copy, used by discard and selling),
`card_id, card{...}, count (always 1: each copy is its own row), starred, is_shiny, obtained_at,
tags[], user_id`.

**Auction**: `id, seller_id, card_id, base_amount, listing_base_amount, base_repriced_at,
current_bid, current_bidder_id, current_bidder{username}, effective_bid, final_price, status
(`active`, `cancelled`, `settled_sold`, `settled_unsold`)
(active, cancelled, ...), end_at, created_at, settled_at, winner_id, winner{username},
snapshot_rarity/atk/def, is_shiny, seller{username}, card{...}, owned`.

## Endpoints used by the userscript

### Collection and catalog
| Call | Notes |
|---|---|
| `GET /api/my-collection?sort&page&stats` | `{ collection[], total, rarityCounts, tagOptions, pendingTradeCardIds }`. 50 per page, 0-based, `limit` ignored. Every copy is its own row (`count` is 1): `total` counts copies, distinct cards are counted from the rows. The rarity order has no tiebreak: rows shift between pages if the collection changes mid-load, so merge pages by id. |
| `GET /api/cards?page&sort&q&rarity&wishlist=1` | `{ cards[], total, searchHasMore, rarityCounts, ownedCardIds, wishlistCardIds, friendOwners }`. 0-based. Sorts: `rarity name atk def`. `rarity` may repeat. `total` is null when `q` is set. `rarityCounts` holds every tier only on an unfiltered page: a rarity filter narrows it to those tiers, a search empties it. |
| `POST /api/user-cards/{userCardId}/discard` | No body. `{ balance }` (+1 WikiBidou). |
| `POST /api/user-cards/bulk-discard` | `{ card_ids: [userCardId] }` -> `{ discarded_count, failed[] }`. |

### Packs
| Call | Notes |
|---|---|
| `POST /api/packs/open` | `{ cards[5], owned_copies[], packs_remaining }`. Errors carry `packs_remaining` and `human_verification_required` (Turnstile, required again 12 h after `pack_human_verified_at`). |
| `GET /api/packs/special` | `{ packs[], available, is_vip, next_available_at }`. Opening is `POST { packId }` (left to the native site). |
| `GET /api/packs/pro-daily` | `{ eligible, claimed_today, claim_date }` (Pro only). |
| `GET /api/wikibidous` | `{ balance }`. |

### Marketplace
| Call | Notes |
|---|---|
| `GET /api/marketplace?page&limit&sort&q&rarity` | `{ auctions[], page, limit, hasMore }`. **1-based**: `page=0` aliases page 1. `limit` above 50 is a 403. Sorts: `recent` (default), `price_asc`, `price_desc`, `ending_soon`. |
| `GET /api/marketplace?page=1&limit=1&mine=1` | Adds `{ selling[], bidding[], won[], history[], maxConcurrentAuctions }` (5 regular). |
| `GET /api/marketplace/mine` | `{ sellingCount, maxConcurrentAuctions }`. |
| `GET /api/marketplace/{id}` | `{ auction, bids: [{ id, amount, placed_at, bidder{username}, bidder_id }] }`, newest first. |
| `POST /api/marketplace` | `{ card_id: userCardId, base_amount, duration_minutes }` -> `201 { auction_id }`. `card_id` is the **user card id**; a catalog id is a 409 "Vous ne possédez pas cette carte". |
| `POST /api/marketplace/{id}/bid` | `{ amount }` -> `{ auction_id, current_bid, bidder_balance }`. The first bid may equal the base; later bids must beat the current one. Too low: `409 { code: "bid_too_low", min }`. The amount is held from the balance immediately. |
| `POST /api/marketplace/{id}/reprice` | `{ new_base_amount }`, strictly below the current base, and only after half the duration: otherwise 409 "La baisse de prix n'est possible qu'après la moitié du temps écoulée". |
| `DELETE /api/marketplace/{id}` | Cancel my listing: `{ status: "cancelled" }`, the card returns. |
| `POST /api/marketplace/{id}/settle` | Finalize an ended auction. |
| `GET /api/marketplace/cards/{cardId}/sales?scope=summary` | `{ wikipedia_title, summary: { <rarity>: { average } }, isPro }`, open to all. Keyed by rarity: a card's rarity can change, old sales keep theirs, so read the current one. Some cards return 404 "Carte introuvable". |
| `GET /api/marketplace/cards/{cardId}/sales` | `{ sales: [{ final_price, settled_at }] }`, Pro only (else `403 pro_required`). |

### Notifications
| Call | Notes |
|---|---|
| `GET /api/notifications` | `{ notifications: [{ id, type, data{title, message, auction_id, ...}, read, created_at }] }`, up to 50. Every row carries its own `data.title` and `data.message`. Types seen: `marketplace_outbid`, `marketplace_auction_won`, `marketplace_auction_sold`, `marketplace_auction_unsold` (data: `auction_id`, `card_id`, `card_title`, `final_price` / `new_bid`), `trade_offer`, `trade_countered`, `trade_accepted` (data: `trade_id` and the other party), `battle_invite`, `friend_request`, `guild_invite`. |
| `PATCH /api/notifications` | `{ ids: [...] }` marks those read, `{}` marks all. `{ success: true }`. |

### Trades
Shapes captured live (reads); the writes are read from the native client (`/trades` bundles), not exercised yet.

| Call | Notes |
|---|---|
| `GET /api/trades` | `{ trades[] }`: every trade, history included, with full cards. A trade: `{ id, status, items[], initiator{id,username,avatar_url}, recipient{...}, initiator_id, recipient_id, initiator_wikibidous, recipient_wikibidous, parent_trade_id, created_at, updated_at }`. An item: `{ id, card{...}, card_id, user_card_id, offered_by, is_shiny, snapshot_rarity, snapshot_atk, snapshot_def }`. Statuses seen: `pending`, `countered`, `declined`, `accepted`. |
| `GET /api/trades?active=1` | Pending trades only; items carry ids but no `card`. |
| `PATCH /api/trades/{id}` | `{ action: "accept" \| "decline" \| "cancel" }`, with header `x-wiki-calendar-tz: <IANA zone>`. Errors: `{ error, code }`; `code: "human_verification_required"` asks for the human check. |
| `POST /api/trades` | `{ recipient_id, items: [{ user_card_id, card_id, offered_by }], initiator_wikibidous, recipient_wikibidous, parent_trade_id? }`, same header. A counter-offer is a new trade with `parent_trade_id`; the parent becomes `countered`. |
| `POST /api/human-check` | `{ token }` from Cloudflare Turnstile (site key `0x4AAAAAAEW_2IAWonrk_N5i`, `api.js?render=explicit`, `appearance: "interaction-only"`). 2xx = verified, then retry the action. |
| `GET /api/chat/{friendId}` | `{ messages[], trades[] }`: the conversation with one friend and your trades with them. Messages are `chat_messages` rows (`id, sender_id, recipient_id, content, created_at`, read flag). The native client also listens on Supabase realtime (`chat_messages`, `trades`). |
| `POST /api/chat/{friendId}` | `{ content }`. |
| `GET /api/friends` | `{ friendships: [{ id, status, requester{id,username,avatar_url}, addressee{...} }], counts }`. The friend is whichever side is not me; trade with `accepted` ones. |
| `GET /api/profile/{username}/collection?page&q&rarity&sort` | Same rows as `/api/my-collection` (`id` = their user card id, `card`, `count`, `is_shiny`, `owned_by_viewer`), 50 per page, plus `profileId` and `pendingTradeCardIds` (the same on every page). Filtered by the server: `q` searches titles and descriptions (then `total` is the match count, else null), `rarity` may repeat (`rarity=PC&rarity=C`; a comma list returns nothing), `sort=name` is A to Z (any other value too); no `sort` is rarity order, L first. |

## Other endpoints in the native client (not used yet)

Found in the client bundles; shapes not captured unless noted.

- Battles: `POST /api/battles`, `PATCH /api/battles/{id}`, `POST /api/parties`
- Guilds: `GET /api/guilds/home` (`{ guild, wishlist[], my_wishlist, leaderboard, my_contribution, recent_donations, ... }`), `PUT|DELETE /api/guilds/wishlist` (`{ card_id }`: one request per member), `POST /api/guilds/wishlist/donate`, `join`, `leave`, `invite`, `kick`, `chat`, `members`, `leaderboard`, `transfer-leadership`
- Friends and chat: `GET /api/friends`, `/api/friends/search?q`, `/api/friends/{id}`, `/api/friends/accept-all`, `/api/chat`, `/api/chat/{id}`
- Achievements: `POST /api/achievements/check`, `POST /api/achievements/claim`
- Profile: `PATCH /api/profile/{id}`, `GET /api/profile/{id}/collection?...` (another player's collection)
- Cards: `GET /api/cards/{id}/web?scope&pin` (the related-cards web), `GET /api/cards/{id}/image-report`
- Showcase: `PUT|DELETE /api/showcase`, `PUT /api/showcase/gallery`
- Packs: `POST /api/packs/verify-human`, `POST /api/packs/grace`, `POST /api/packs/pro-daily`
- Account and billing: `/api/account`, `/api/checkout`, `/api/billing/portal`, `/api/iap/verify`, `/api/reports`, `/api/appeals`, `/api/broadcast`, `/api/push/web-subscription`

There is **no** card-level wishlist write: `wishlistCardIds` and `wishlist=1` are read-only.
`/api/profile` (no id) is a 404.

## Assets

Rarity art `/{commun,peu_commun,rare,super_rare,ultra_rare,legendaire}.png`, shiny Legendary
`/shiny/onyx-art.webp`, sounds `/audio/{pack-rip,card-flip,legendary-reveal}.mp3`.
Rarity palette: `C #b8f2d5 · PC #b1cff2 · R #c6a7f2 · SR #ed6fa3 · UR #fa9931 · L #ffe144`.

## Contract

`docs/api-shapes.json` is the recorded shape of every endpoint the app reads: each field path
with the types seen there, recorded from the live site by `bun run test:prod --only=contract`.
Each run diffs the live shapes against it and fails when a field disappears or changes type;
`--update-shapes` accepts the live shapes after a review. Neither the routes nor Supabase publish
a schema to read instead (no OpenAPI route; Supabase answers 401 for its own).
