#!/bin/sh
# The real-site checks (read-only: API contract, assumptions, UI), unattended. Silent when they
# pass. When one fails: a desktop notification and a GitHub issue (one open issue, a comment on
# each repeat). An expired session only notifies.
#   scripts/check-live.sh               run once
#   scripts/check-live.sh --install     run it every day (systemd user timer)
#   scripts/check-live.sh --uninstall
set -u

# [*] info  [+] did something  [-] warn, kept going  [x] fatal
if [ -t 1 ] && [ -z "${NO_COLOR:-}" ] && [ "${TERM:-}" != dumb ]; then
    B='\033[1;34m' G='\033[1;32m' Y='\033[1;33m' R='\033[31m' N='\033[0m'
else
    B= G= Y= R= N=
fi
hdr()  { printf "${B}[*]${N} %s\n" "$1"; }
ok()   { printf "${G}[+]${N} %s\n" "$1"; }
warn() { printf "${Y}[-]${N} %s\n" "$1" >&2; }
die()  { printf "${R}[x]${N} %s\n" "$1" >&2; exit 1; }

DIR=$(cd "$(dirname "$0")/.." && pwd)
UNITS="$HOME/.config/systemd/user"
TITLE="Live check failing"

case "${1:-}" in
--install)
    mkdir -p "$UNITS"
    cat >"$UNITS/wiki-remaster-check.service" <<EOF
[Unit]
Description=Wiki Remaster live check (read-only)

[Service]
Type=oneshot
ExecStart=$DIR/scripts/check-live.sh
EOF
    cat >"$UNITS/wiki-remaster-check.timer" <<EOF
[Unit]
Description=Wiki Remaster live check, daily

[Timer]
OnCalendar=daily
RandomizedDelaySec=1h
Persistent=true

[Install]
WantedBy=timers.target
EOF
    systemctl --user daemon-reload && systemctl --user enable --now wiki-remaster-check.timer >/dev/null 2>&1 || die "systemctl failed"
    ok "daily check installed ($(systemctl --user list-timers wiki-remaster-check.timer --no-legend | awk '{print $1, $2}'))"
    exit 0 ;;
--uninstall)
    systemctl --user disable --now wiki-remaster-check.timer >/dev/null 2>&1
    rm -f "$UNITS/wiki-remaster-check.service" "$UNITS/wiki-remaster-check.timer"
    systemctl --user daemon-reload
    ok "daily check removed"
    exit 0 ;;
esac

command -v bun >/dev/null || die "bun is required"
cd "$DIR"
LOG=$(mktemp); trap 'rm -f "$LOG"' EXIT
hdr "live check"
[ -n "${WM_CHECK:-}" ] || bunx vite build >"$LOG" 2>&1 || { cat "$LOG" >&2; die "build failed"; }

# WM_CHECK overrides the check (to try the failure path)
(eval "${WM_CHECK:-bun scripts/prod-test.mjs}") >"$LOG" 2>&1
case $? in
0)  ok "$(tail -1 "$LOG")"; exit 0 ;;
2)  warn "session expired"
    notify-send -u normal "Wiki Remaster" "Live check could not log in: run bun run test:prod:login" 2>/dev/null
    exit 2 ;;
esac

FAILS=$(grep '^FAIL' "$LOG")
warn "failed:"; printf '%s\n' "$FAILS" >&2
notify-send -u critical "Wiki Remaster: live check failed" "$(printf '%s\n' "$FAILS" | head -3)" 2>/dev/null

BODY=$(printf '%s\n\n```\n%s\n```\n' "$(date -u '+%Y-%m-%d %H:%M UTC'), \`scripts/check-live.sh\`:" "$FAILS")
ISSUE=$(gh issue list --state open --search "$TITLE in:title" --json number -q '.[0].number' 2>/dev/null)
if [ -n "$ISSUE" ]; then
    gh issue comment "$ISSUE" --body "$BODY" >/dev/null && ok "commented on issue #$ISSUE"
else
    gh issue create --title "$TITLE" --body "$BODY" >/dev/null && ok "opened issue: $TITLE"
fi
exit 1
