# Store listing

Packages: `./build.sh`, then `wm-userscript/dist/wiki-remaster-{chrome,firefox}.zip`.

## Listing

- **Name:** Wiki Remaster
- **Summary:** Unofficial redesign of wiki-masters.com: packs, collection, market and trades, on the game's own data.
- **Category:** Fun (Chrome), Games & Entertainment (Firefox)
- **Description:** Unofficial, not affiliated with WikiMasters. Rebuilds packs, collection, catalogue, market and trades; every other page stays the original site. Uses your own session; no server, no tracking. Source: https://github.com/KazeTachinuu/wiki-remaster
- **Icon:** `wm-userscript/extension/icon-128.png`
- **Screenshots:** Chrome needs 1280x800 or 640x400; the ones in `docs/screenshots/` must be resized first.
- **Privacy policy:** https://github.com/KazeTachinuu/wiki-remaster/blob/main/PRIVACY.md

## Chrome privacy tab

- **Single purpose:** a redesigned interface for wiki-masters.com.
- **Permissions:** none. **Host access:** wiki-masters.com, to draw the pages.
- **Remote code:** none.
- **Data:** none collected.

## Firefox reviewer notes

- Not minified; build with `./build.sh` (Bun).
- MAIN-world content script (Firefox 128+): it reads the page's fetch responses and the game's Turnstile widget.
- The one remaining `innerHTML` is Svelte cloning its own static templates.
