// Display formatting shared by every view (French locale).

/** 12345 -> "12 345"; null -> "-". */
export const nf = (n) => (n == null ? "-" : Number(n).toLocaleString("fr"));

/** 2776179 -> "2,8 M", 12118 -> "12 k": a large count at a glance. */
export const compact = (n) => new Intl.NumberFormat("fr", { notation: "compact", maximumFractionDigits: 1 }).format(n);

/** Time since an ISO date: "à l'instant", "il y a 5 min", "il y a 3 h", "il y a 2 j". */
export function ago(iso, now = Date.now()) {
  const t = Date.parse(iso || "");
  if (isNaN(t)) return "";
  const m = Math.round(Math.max(0, now - t) / 60000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m} min`;
  const h = Math.round(m / 60);
  return h < 24 ? `il y a ${h} h` : `il y a ${Math.round(h / 24)} j`;
}

/** Seconds remaining as "2 j 4 h", "3 h 05", "4 min 09 s" (seconds only when asked). */
export function countdown(s, { seconds = false } = {}) {
  if (s <= 0) return "Terminée";
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const pad = (x) => String(x).padStart(2, "0");
  if (d) return `${d} j ${h} h`;
  if (h) return `${h} h ${pad(m)}`;
  if (m) return seconds ? `${m} min ${pad(sec)} s` : `${m} min`;
  return seconds ? `${sec} s` : "< 1 min";
}

/** Seconds from now until an ISO date (0 once passed, null if unparseable). */
export function secondsUntil(iso, now = Date.now()) {
  const t = Date.parse(iso || "");
  return isNaN(t) ? null : Math.max(0, Math.round((t - now) / 1000));
}
