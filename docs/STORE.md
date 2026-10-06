# Store listing kit

Everything the Chrome Web Store and Firefox Add-ons forms ask for. Packages: `./build.sh`, then `wm-userscript/dist/wiki-remaster-{chrome,firefox}.zip`.

## Listing

- **Name:** Wiki Remaster
- **Summary (132 chars max):** Unofficial redesign of wiki-masters.com: faster packs, collection, market and trades, on the game's own data.
- **Category:** Fun (Chrome) · Games & Entertainment (Firefox)
- **Description:**
  - Unofficial, not affiliated with WikiMasters.
  - Rebuilds packs, collection, catalogue, market and trades; every other page stays the original site, one click away.
  - Runs on the game's own data and your own session. No account, no server, no tracking.
  - Open source (MIT): https://github.com/KazeTachinuu/wiki-remaster
- **Screenshots:** `docs/screenshots/` (1280x800 for Chrome)
- **Icon:** `wm-userscript/extension/icon-128.png`
- **Privacy policy URL:** https://github.com/KazeTachinuu/wiki-remaster/blob/main/PRIVACY.md

## Chrome: privacy practices tab

- **Single purpose:** a redesigned interface for wiki-masters.com.
- **Permissions:** none. **Host access:** `wiki-masters.com` only, to draw the redesigned pages on that site.
- **Remote code:** no. Everything ships in the package.
- **Data usage:** collects no user data; certify the three disclosures (no selling, no unrelated use, no creditworthiness).

## Firefox: reviewer notes

- Source is not minified: the package is the build output as is, readable. Build: `./build.sh` (Bun).
- Runs as a MAIN-world content script (Firefox 128+): it reads the page's own fetch responses and the game's Turnstile widget, like the userscript under Tampermonkey.
- `data_collection_permissions: none`: it sends nothing anywhere but the game's own services (see PRIVACY.md).
- One `innerHTML` remains: Svelte's runtime cloning its own compile-time templates (static strings, no user input).
