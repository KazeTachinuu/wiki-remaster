#!/bin/sh
# Builds every target into dist/ (at the repo root): the Tampermonkey userscript, the Chrome and
# Firefox extensions.
#   bun run build   (or ./build.sh)
set -eu

# [*] info  [+] did something  [-] warn, kept going  [x] fatal
if [ -t 1 ] && [ -z "${NO_COLOR:-}" ] && [ "${TERM:-}" != dumb ]; then
    B='\033[1;34m' G='\033[1;32m' Y='\033[1;33m' R='\033[31m' D='\033[2m' N='\033[0m'
else
    B= G= Y= R= D= N=
fi
hdr()  { printf "${B}[*]${N} %s\n" "$1"; }
ok()   { printf "${G}[+]${N} %s\n" "$1"; }
die()  { printf "${R}[x]${N} %s\n" "$1" >&2; exit 1; }

TOTAL=4 I=0
# step "label" ["detail"]: the detail (a path, a size) is printed dim
step() { I=$((I + 1)); printf "${G}[+]${N} [%d/%d] %-13s ${D}%s${N}\n" "$I" "$TOTAL" "$1" "${2:-}"; }

# run quietly; on failure, show what the tool said
LOG=$(mktemp); trap 'rm -f "$LOG"' EXIT
quiet() { "$@" >"$LOG" 2>&1 || { cat "$LOG" >&2; die "failed: $*"; }; }
size()  { du -h "$1" | cut -f1; }

command -v bun >/dev/null || die "bun is required: https://bun.sh"
cd "$(dirname "$0")"
VERSION=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' wm-userscript/package.json)
hdr "Wiki Remaster $VERSION"

quiet bun install --cwd wm-userscript
step "dependencies"

(cd wm-userscript && quiet bunx vite build) || exit 1
# the old address too, for one release: installs from before still check it for updates, and the
# copy they fetch points them to dist/ from then on
mkdir -p wm-userscript/dist && cp dist/wikimasters-app.user.js wm-userscript/dist/wikimasters-app.user.js
step "tampermonkey" "dist/wikimasters-app.user.js ($(size dist/wikimasters-app.user.js))"

quiet bun wm-userscript/scripts/extension.mjs
step "chrome" "dist/wiki-remaster-chrome.zip ($(size dist/wiki-remaster-chrome.zip))"
step "firefox" "dist/wiki-remaster-firefox.zip ($(size dist/wiki-remaster-firefox.zip))"
