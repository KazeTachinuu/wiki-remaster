# wiki-remaster

A redesign of [wiki-masters.com](https://www.wiki-masters.com) that runs in your browser, on the game's own data and your own session. Packs, collection, catalogue, market and trades are rebuilt; every other page stays the original site, one click away.

![The same cards, on the original site and in the remaster](docs/screenshots/cards-before-after.png)

## Install

[![Install wiki-remaster](https://img.shields.io/badge/Install-wiki--remaster-3CCB8E?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/wm-userscript/dist/wikimasters-app.user.js)

- **Computer** (Chrome, Firefox, Edge): install [Tampermonkey](https://www.tampermonkey.net/), click the button above, then **Install**.
- **Android**: Firefox with the Tampermonkey add-on, then the same button.
- **iPhone**: Safari with the [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) app, enabled in Settings, Safari, Extensions. A home-screen shortcut opens without extensions, so use Safari itself.

Updates install themselves. The original site is one click away: the **Site original** button on a computer, the menu on a phone.

## What changes

- **Packs.** The pack tears open, cards are revealed one by one or all at once, each rarity with its own sound. With none left, a countdown to the next one. Pro accounts get their daily pack in its own tab.
- **Collection.** Search, sort (rarity, estimated value, ATK, DEF, name), filter by rarity, favourites or shiny cards, discard several at once. Opens instantly from the last visit.
- **Catalogue.** All 2.8 million cards, searched and filtered by the game's server, with your wishlist.
- **Card detail.** Estimated value, sales by rarity (price over time and the latest sales for Pro accounts), the card's live listings, sell or discard.
- **Market.** Bid live, follow your sales, bids and wins. A card listed several times shows every listing side by side: price, gap to the cheapest, time left.
- **Trades.** What you give and get as real cards with their value and a verdict, an offer and its counter-offers as one timeline, a composer searching your friend's whole collection, and the chat.
- **Everywhere.** A loading bar that says what it waits for, automatic retries when the game's server fails, the human check in place, notifications in plain words, one switch for ATK and DEF.

![Ma collection](docs/screenshots/collection.png)

<p>
  <img src="docs/screenshots/card.png" width="49%" alt="A card's detail">
  <img src="docs/screenshots/market.png" width="49%" alt="The market">
</p>

On a phone it is laid out like an app: the screens in a tab bar at the bottom, the rest in a menu.

<p>
  <img src="docs/screenshots/phone-packs.png" width="32%" alt="Packs on a phone">
  <img src="docs/screenshots/phone-collection.png" width="32%" alt="Collection on a phone">
  <img src="docs/screenshots/phone-market.png" width="32%" alt="The market on a phone">
</p>

## Development

```
cd wm-userscript
bun install
bun run dev                 # http://localhost:5173, with a mock of the game's API
bun run build               # dist/wikimasters-app.user.js
bun test src                # unit tests
bun run check               # style check
bun run test:prod:login     # once: log in to the game in a dedicated browser profile
bun run test:prod           # the local build on the real site, read-only
bun scripts/readme-shots.mjs  # this README's screenshots, from your account, read-only
```

The mock (`plugins/vite-mock-api.js`) mirrors the live routes and shapes, so dev runs the real adapter. `POST /api/__fault` makes it fail on purpose (`{ "status": 525, "count": 2 }`, `{ "delay": 7000 }`, `{ "human": true }`), and `POST /api/__profile` switches Pro and V.I.P. on or off.

`test:prod` checks every assumption the app makes about the game's API and diffs each endpoint's shape against `docs/api-shapes.json`: a field that disappears or changes type fails the run (`--update-shapes` accepts it after a review). `--only=market,trades` picks features; `--write=discard,sell,bid,notif` opts into small real-account writes.

```
src/wm/      domain layer: HTTP client, normalizers, trades, market, lanes, cache, adapters
src/lib/     Svelte screens and shared pieces
plugins/     the dev API
scripts/     real-site checks, README screenshots, style check
docs/        API reference, recorded API shapes, screenshots
```

Every endpoint, request and response shape: [docs/API_REFERENCE.md](docs/API_REFERENCE.md).
