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
- Ouvrir des paquets: foil booster, open animation, reveal.
- Ma collection: search, sort, rarity and favourite filters, market value, bulk discard.
- Toutes les cartes: full catalog, server-side search and paging, rarity and wishlist filters.
- Marche: live auctions browse, filters, and real-time bidding (bid history, countdown, activity feed).
- Card detail: summary, stats, market chart.
- Nav, wallet, notifications.

Everything else falls back to the native site.

## Run
```
cd wm-userscript
npm install
npm run dev      # http://localhost:5173, mock API built in, hot reload
npm run build    # dist/wikimasters-app.user.js
npm run test     # unit tests (vitest)
npm run check    # style check (no em dashes or glyph icons)
```

## Layout
```
src/
  wm/            domain layer, one interface, two adapters by hostname
    api.js       thin HTTP client and live-session capture
    schema.js    labels, normalizers, and API drift detection
    session.js   pulls tally
    index.js     adapter selection, market value cache, public exports
    adapters/    real.js (wiki-masters.com), mock.js (dev)
  lib/*.svelte   view layer
  App.svelte main.js app.css
plugins/         vite-mock-api.js (dev API), no second process
mock/catalog.js  dev card fixture
```

`src/wm/index.js` picks the real API on wiki-masters.com and the mock locally, by hostname.
The mock lives in a Vite dev plugin, so `npm run dev` serves the app and the API together.

Runs against your real account. Bidding and discarding use verified endpoints. Selling posts a best-effort create request that fails safe: if the server rejects it you get an error and a one-click native fallback, never a faked listing. Buy and cancel are not wired and stay on the native site.

## Reference
The verified API surface and per-feature integration status, captured live from the app, drive what gets built and what stays a fallback: [docs/API_REFERENCE.md](docs/API_REFERENCE.md), [docs/FEATURE_ROADMAP.md](docs/FEATURE_ROADMAP.md).
