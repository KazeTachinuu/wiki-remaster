# Publishing the extensions

Build first: `bun run build` gives `dist/wiki-remaster-chrome.zip` and `dist/wiki-remaster-firefox.zip`.
The version comes from `wm-userscript/package.json`; a store refuses a version it already has.

## Firefox Add-ons (free, about 1 to 3 days of review)

1. Log in at https://addons.mozilla.org/developers/ with a Firefox account.
2. Create API keys: https://addons.mozilla.org/developers/addon/api/key/ (an issuer and a secret).
3. From the repo root:
   ```
   AMO_JWT_ISSUER=user:12345:678 AMO_JWT_SECRET=your-secret bun run publish:firefox
   ```
   It builds, then submits `dist/firefox` as a listed add-on with the listing from
   `docs/store/amo-metadata.json` (summary, description, category, licence, reviewer notes).
4. In the add-on's page on the developer hub: add the screenshots from `docs/store/` and the
   privacy policy link (below). Later versions: the same command.

## Chrome Web Store ($5 once, about 1 to 7 days of review)

1. Register at https://chrome.google.com/webstore/devconsole (Google account, one-time $5 fee).
2. **New item**, upload `dist/wiki-remaster-chrome.zip`.
3. **Store listing**
   - Description: the Firefox one, in `docs/store/amo-metadata.json`
   - Category: Fun. Language: French
   - Icon: `wm-userscript/extension/icon-128.png`
   - Screenshots (1280x800): `docs/store/{collection,card,market,trade,packs}-1280x800.png`
   - Small promo tile (440x280): `docs/store/promo-440x280.png`
   - Homepage: https://github.com/KazeTachinuu/wiki-remaster
4. **Privacy practices**
   - Single purpose: a redesigned interface for wiki-masters.com
   - Permissions: none. Host access: wiki-masters.com, to draw the pages
   - Remote code: no
   - Data usage: collects no user data (tick the three certifications)
   - Privacy policy: https://github.com/KazeTachinuu/wiki-remaster/blob/main/PRIVACY.md
5. **Submit for review.** Later versions: upload the new zip on the same item.

## Notes for reviewers (both stores)

- Not minified; build with `bun run build` (Bun).
- MAIN-world content script on wiki-masters.com only (Chrome 111+, Firefox 128+): it reads the
  page's own fetch responses and the game's Turnstile widget.
- The one remaining `innerHTML` is Svelte cloning its own static templates.
