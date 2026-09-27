# WikiMasters wrapper - feature analysis and real-integration plan

Grounded strictly in `API_REFERENCE.md` (captured live from the authenticated app) and the
current userscript code. Every feature is tagged with an honest integration status:

- **VERIFIED** - the endpoint and the fields it needs are in the captured reference. Buildable now.
- **SHAPE UNKNOWN** - the endpoint is confirmed to exist, but its exact request/response shape is not
  captured. Needs one DevTools capture to wire precisely.
- **INFERRED** - the reference lists it as "not yet opened" (exists by pattern, not confirmed).
- **NOT DOCUMENTED** - a site page/route exists but no API for it was captured.
- **NOT POSSIBLE** - the data is not exposed by the API; building it would mean inventing numbers.

No feature here invents data. Anything unconfirmed fails safe (shows nothing or an error), never a fabricated value.

---

## 1. How the wrapper talks to the real site (integration reality)

Today the userscript runs at `document-start` on wiki-masters.com, overlays redesigned **/pulls** and
**/collection**, and steps aside (real app) on every other route.

**What is solid and needs nothing from you:**
- All `/api/*` calls are same-origin Next.js API routes authenticated by the browser cookie session.
  `fetch(..., { credentials: "include" })` already carries the real session. Reads work for real today:
  `/api/packs/open`, `/api/my-collection`, `/api/cards`.
- Profile (packs, currency, pity, pro/vip) is read by intercepting the app's own
  `POST /rest/v1/rpc/sync_profile_packs` and reading `wikibidous_balance`, `packs_remaining`, etc.

**The one real integration nuance (important):**
- `/api/*` = cookie-authenticated Next routes -> we can call them ourselves.
- `/rest/v1/*` (Supabase, e.g. `sync_profile_packs`, `profiles`, `tags`) needs `apikey` + `Authorization: Bearer <jwt>`
  headers, which a plain fetch does NOT send. That is why we intercept the app's call instead of making our own.
  - **Fragility:** if the user lands on the overlay and the app never fires `sync_profile_packs`, the wallet
    shows "-" until it does (we already added an event listener + a fallback timer).
  - **Robust fix (recommended):** capture the `apikey` + bearer headers from the first intercepted `/rest/v1/*`
    request, then we can call any `/rest/v1/*` endpoint ourselves on demand (profile refresh, tags read/write)
    with the app's own credentials. This removes the "wait for the app" dependency. Low risk, needs one capture
    to confirm the exact headers.

**The blocker for anything that writes:** all write endpoints are best-guess (see below). They fail safe today
(error + rollback), but to actually mutate the real account we need to confirm each shape.

---

## 2. Endpoint inventory (from the captured reference)

| Endpoint | Status | Notes |
|---|---|---|
| `POST /api/packs/open` | VERIFIED | cards[], owned_copies[], packs_remaining |
| `GET /api/my-collection?sort&page&stats` | VERIFIED | UserCard: count, starred, is_shiny, obtained_at, tags[] |
| `GET /api/my-collection/stats?sort` | VERIFIED | collection stats / rarity counts |
| `GET /api/cards?page&sort` | VERIFIED | full catalog (the Dex source) |
| `GET /api/marketplace?page&limit&sort&mine` | SHAPE UNKNOWN | listings; response fields not captured |
| `GET /api/trades?active=1` | SHAPE UNKNOWN | trade offers |
| `GET /api/battles`, `GET /api/parties` | SHAPE UNKNOWN | duels |
| `GET /api/guilds` | SHAPE UNKNOWN | guilds |
| `GET /api/notifications` | SHAPE UNKNOWN | notifications |
| `POST /rest/v1/rpc/sync_profile_packs` | VERIFIED (intercepted) | profile + pack regen |
| `GET /rest/v1/profiles?select=...` | SHAPE UNKNOWN | profile flags (needs Supabase headers) |
| `GET /rest/v1/tags` | SHAPE UNKNOWN | user tags (needs Supabase headers) |
| `/api/friends`, `/api/dms`, `/api/achievements`, `/api/profile` | INFERRED | reference: "not yet opened" |
| leaderboard API | NOT DOCUMENTED | `/leaderboard` page exists; no API captured |
| discard / create-auction / tag / untag writes | SHAPE UNKNOWN | not in reference; current paths are guesses |

Known real entities (fields captured): Card (id, wikipedia_title/url, summary, image_url, category, q_score,
rarity, rarity_order, atk=pageviews, def=content_length, pageviews, content_length, hide_image/nsfw),
UserCard (count, starred, is_shiny, obtained_at, tags[]), Profile (is_pro, is_vip, is_admin, packs_remaining,
packs_last_regen_at, wikibidous_balance, pity_counter, cheat_strikes, sanctions...).

---

## 3. Feature analysis by system

### A. Collection & catalog (mostly VERIFIED - the best ROI)
Already built: search, sort (rarity/value/atk/def/name), rarity composition bar, favourites (read-only),
tags UI (write unverified), market value chip, discard/auction UI (writes unverified), rich detail modal.

High-value additions that are **fully verified** (reads only, no invented data):
- **Dex / "Toutes les cartes"** - `GET /api/cards` (full catalog) minus `GET /api/my-collection` (owned) ->
  a complete index showing owned vs missing, greyed silhouettes for missing, completion % overall and per
  rarity. This is the single biggest missing feature and needs no writes and no captures. **Tier 1.**
- **Collection insights** - completion %, total ATK/DEF, count by rarity (have the bar), duplicates count,
  top cards by estimated value, newest obtained. All from data we already fetch. **Tier 1.**
- **Full-catalog search** - search the whole Dex, not just owned, with an "owned/missing" filter. **Tier 1.**
- **Shiny / foil showcase** - filter or a shelf of your `is_shiny` cards. Verified field. **Tier 1.**

### B. Pull experience (VERIFIED)
Already built: one-by-one reveal with rarity name + rarity aura, "Tout révéler" grid (staggered, auras,
per-card detail on click), regen countdown (mock only; real needs the interval - see below).
Additions:
- **Pull session history** - log every pack opened this session client-side (we own it) and show a recap:
  what dropped, best pull, new vs dupes. No API needed. **Tier 1.**
- **Pity counter display** - `pity_counter` is a real profile field; show it honestly ("compteur: N"). We must
  NOT predict the guarantee threshold (the pity rule is not documented -> inventing it is off-limits). **Tier 1
  (raw value only).**
- **Pack regen countdown on the real site** - we have `packs_last_regen_at`, but the regen interval is not
  documented. Either confirm a `next_regen`/interval field in `sync_profile_packs` (one capture) or leave it
  off on real. **Tier 2 (needs capture).**

### C. Profile / identity (VERIFIED fields)
- **Profile header** - username, is_pro / is_vip badge, packs, wikibidous, pity counter. All captured fields.
  A neat account strip. **Tier 1.**

### D. Marketplace (endpoint VERIFIED, shape unknown)
- **Browse / redesigned market** - a clean listings view with search and rarity filter. Needs the GET
  response shape (one capture). Our market-value estimate already uses this endpoint and fails safe. **Tier 2.**
- **Buy a listing** - no buy endpoint documented at all. **Needs capture; possibly NOT exposed.**
- **Sell / create auction** - current `POST /api/marketplace` is a guess. **Tier 2 (needs capture).**

### E. Trades (endpoint VERIFIED, shape unknown)
- **Trade browser + propose/accept** - peer-to-peer trading. Read view needs the `/api/trades` shape; actions
  need their endpoints. **Tier 2 (browse) / Tier 3 (actions).**

### F. Social & progression (mostly SHAPE UNKNOWN / INFERRED)
- **Leaderboard** - good read-only redesign, but no API captured (NOT DOCUMENTED). **Tier 2, needs capture.**
- **Achievements** - INFERRED endpoint. Read-only showcase. **Tier 3.**
- **Notifications** - surface an unread count/panel. SHAPE UNKNOWN. **Tier 3.**
- **Guilds / Friends / DMs** - SHAPE UNKNOWN / INFERRED, and DMs/social are heavier and privacy-sensitive.
  Lower ROI for a personal wrapper; best left as fallback to the real app. **Tier 3 or skip.**

### G. Duels / battles (SHAPE UNKNOWN)
- The competitive mode (`/api/battles`, `/api/parties`). Complex, stateful, real-time-ish. Highest effort,
  needs the most captures. For a wrapper, recommend leaving it as fallback initially. **Tier 3 / skip.**

---

## 4. Recommended roadmap

**Tier 1 - build now, fully verified, no writes, no captures (highest ROI):**
1. Dex / full catalog with owned-vs-missing + completion tracking (overlay `/global-collection`).
2. Collection insights dashboard (completion, totals, top value, duplicates).
3. Profile header (pro/vip, packs, wikibidous, pity counter - raw).
4. Pull session history recap.
5. Full-catalog search + shiny showcase.

**Tier 2 - one capture each unlocks these (high value):**
6. Confirm and finalize the writes we already built UI for: discard (+1), tags, create-auction.
7. Marketplace browse (confirm GET shape) + verified market value.
8. Real pack-regen countdown (confirm interval/next-regen field).
9. Leaderboard (confirm it has an API).
10. Trades browse.

**Tier 3 - larger, lower ROI for a wrapper (leave as fallback until wanted):**
Duels, guilds, friends, DMs, achievements, notifications.

---

## 5. The single capture that unlocks Tier 2

One DevTools session (Network tab, "Preserve log"), performing each action once, then "Save all as HAR":
1. Open a pack (confirms packs/open envelope + owned_copies + any next-regen field).
2. Open `/marketplace` and let it load (confirms marketplace GET shape).
3. Discard one card you do not want (confirms discard path + reward shape).
4. Create an auction, then cancel it (confirms create + cancel).
5. Add and remove a tag on a card (confirms tag write paths).
6. Open `/trades` and `/leaderboard` (confirms those shapes / whether leaderboard has an API).

That single HAR confirms almost every Tier 2 item at once. Everything until then stays fail-safe.

---

## 6. Integration hardening (make it neat and reliable on the real site)

- **Prefer proactive reads over passive interception** for `/api/*` (cookie-authed): call them ourselves so
  the overlay never depends on the real app rendering first.
- **Capture Supabase headers once** (`apikey` + bearer) from the first intercepted `/rest/v1/*` request, to
  call profile/tags directly instead of waiting for the app. Confirm headers in the same HAR.
- **Every new view ships with loading / empty / error states** and falls back to the real app for anything
  unconfirmed. No screen ever shows a guessed number as fact.
- **Expand overlay routes** only as each redesigned view is confirmed (e.g. add `/global-collection` when the
  Dex ships).
- **Keep the mock in lockstep** with each confirmed real shape so local testing never drifts from reality.
