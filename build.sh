#!/bin/sh
# Builds every target: the Tampermonkey userscript, the Chrome and Firefox extensions.
#   ./build.sh
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
step() { I=$((I + 1)); ok "[$I/$TOTAL] $1"; }

# run quietly; on failure, show what the tool said
LOG=$(mktemp); trap 'rm -f "$LOG"' EXIT
quiet() { "$@" >"$LOG" 2>&1 || { cat "$LOG" >&2; die "failed: $*"; }; }
size()  { du -h "$1" | cut -f1; }

command -v bun >/dev/null || die "bun is required: https://bun.sh"
cd "$(dirname "$0")/wm-userscript"
VERSION=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' package.json)
hdr "Wiki Remaster $VERSION"

quiet bun install
step "dependencies"

quiet bunx vite build
step "tampermonkey  ${D}dist/wikimasters-app.user.js ($(size dist/wikimasters-app.user.js))${N}"

quiet bun scripts/extension.mjs
step "chrome        ${D}dist/wiki-remaster-chrome.zip ($(size dist/wiki-remaster-chrome.zip))${N}"
step "firefox       ${D}dist/wiki-remaster-firefox.zip ($(size dist/wiki-remaster-firefox.zip))${N}"
