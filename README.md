# wiki-remaster

A userscript that reskins wiki-masters.com with a custom UI, running on the site's real API and your logged-in session. Redesigned screens overlay the site; other routes fall back to the original.

![wiki-remaster](docs/screenshot.png)

## Install

> Requires [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge).

[![Install wiki-remaster](https://img.shields.io/badge/Install-wiki--remaster-3CCB8E?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/wm-userscript/dist/wikimasters-app.user.js)

Click the button, Tampermonkey opens an install page, click **Install**. Then open [wiki-masters.com](https://www.wiki-masters.com).

Auto-updates are built in. Switch back to the original site anytime with "Version originale du site" in the sidebar.

Svelte 5 and Vite. Build output: `wm-userscript/dist/wikimasters-app.user.js`.

## Rebuilt screens
- Ouvrir des paquets: foil booster, open animation, reveal, "Tout ouvrir" with a combined haul.
- Ma collection: search, sort (incl. market value), rarity/favourite/shiny filters, bulk discard.
- Toutes les cartes: the full 2.7M-card catalog, server-side search, sorts and filters.
- Marché: browse with sorts and filters, live bidding, and your listings, bids, wins and history
  (cancel, lower the price, finalize).
- Card detail: summary, stats, market value and chart, sell and discard.
- Nav, wallet, live notifications (toasts and tab badge), keyboard shortcuts (press `?`).

Filters and sorts are remembered per screen; the collection and market values are cached
locally so returning is instant. Everything else falls back to the native site.

## Run
```
cd wm-userscript
bun install
bun run dev        # http://localhost:5173, mock API built in, hot reload
bun run build      # dist/wikimasters-app.user.js
bun test src       # unit tests
bun run check      # style check (no em dashes or glyph icons)
bun run test:prod  # local build against the real site, in your logged-in Brave
```

`test:prod` attaches to your running Brave over CDP (`Bun.WebView`): open `brave://inspect/#remote-debugging`, flip the toggle, then run it. Read-only by default; `--only=estimate,market` picks features, `--write=wishlist,discard` opts into real-account writes (see `scripts/prod-test.mjs`).

## Layout
```
src/
  wm/              domain layer
    api.js         HTTP client (retries reads, clean errors) and live-session capture
    schema.js      labels, normalizers, API drift detection
    cache.js       versioned localStorage cache
    index.js       adapter selection, cached market values and collection
    adapters/      real.js (wiki-masters.com), mock.js (dev: real adapter minus Supabase)
  lib/             Svelte views and small shared pieces (Icon, SearchBox, Pager, format.js)
  App.svelte main.js app.css
plugins/           vite-mock-api.js: dev API mirroring the real routes and shapes
scripts/           prod-test.mjs (real-site checks), check-style.mjs
mock/catalog.js    dev card fixture
```

`src/wm/index.js` picks the real API on wiki-masters.com and the mock locally, by hostname.
The mock serves the same routes and shapes as the live site, so dev runs the real adapter.

## Reference
Every endpoint, request and response shape, verified live: [docs/API_REFERENCE.md](docs/API_REFERENCE.md).
