// Local WikiMasters prototype client.
// Renders cards with the REAL app markup + classes, so /app.css styles them
// exactly like the live app and /polish.css transforms them exactly like the
// shipped Tampermonkey userscript. The shell (nav, pull stage) is test-only.

const RPNG = { C: "commun", PC: "peu_commun", R: "rare", SR: "super_rare", UR: "ultra_rare", L: "legendaire" };
const RNAME = { C: "Commun", PC: "Peu commun", R: "Rare", SR: "Super rare", UR: "Ultra rare", L: "Légendaire" };

const api = (p, opts) => fetch(p, opts).then((r) => r.json());
const $ = (s, r = document) => r.querySelector(s);
const view = $("#view");

// Swappable data layer. Local mock by default; the userscript sets window.WM_DATA
// to an adapter that calls the real wiki-masters.com /api/* endpoints.
const LocalData = {
  profile: () => api("/api/profile"),
  openPack: () => api("/api/packs/open", { method: "POST" }),
  collection: () => api("/api/my-collection"),
  cards: () => api("/api/cards"),
  buyPack: () => api("/api/buy-pack", { method: "POST" }),
  reset: () => api("/api/reset", { method: "POST" }),
  canBuy: true,
  canReset: true,
};
const DATA = (typeof window !== "undefined" && window.WM_DATA) || LocalData;

let profile = null;

// ---- card component (clean, natural height: image + compact info) ----
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
}
function cardHTML(c, { big = false, isNew = false, shiny = false, count = 1 } = {}) {
  const r = c.rarity.toLowerCase();
  const initial = (c.wikipedia_title || "?").trim().charAt(0).toUpperCase();
  const photo = c.image_url
    ? `<img class="wc-photo" src="${esc(c.image_url)}" alt="${esc(c.wikipedia_title)}" loading="lazy" crossorigin="anonymous" onerror="this.closest('.wc').classList.add('is-noimg');this.remove()">`
    : "";
  const flags = [
    shiny ? `<span class="wc-shiny" title="Brillante">✦</span>` : "",
    count > 1 ? `<span class="wc-count">×${count}</span>` : "",
    isNew ? `<span class="wc-new">Nouveau</span>` : "",
  ].join("");
  return `
  <article class="wc${c.image_url ? "" : " is-noimg"}${big ? " wc-big" : ""}" data-r="${r}">
    <div class="wc-face"><span class="wc-mono" aria-hidden="true">${esc(initial)}</span>${photo}</div>
    <div class="wc-scrim"></div>
    <div class="wc-edge"></div>
    <div class="wc-top">
      <span class="wc-rtag" data-r="${r}">${c.rarity}</span>
      <span class="wc-flags">${flags}</span>
    </div>
    <div class="wc-cap">
      <h3 class="wc-name">${esc(c.wikipedia_title)}</h3>
      <div class="wc-cat">${esc(c.category || "")}</div>
      <div class="wc-stats">
        <span>ATK <b>${c.atk.toLocaleString("fr")}</b></span>
        <span>DEF <b>${c.def.toLocaleString("fr")}</b></span>
      </div>
    </div>
  </article>`;
}

// ---- wallet / profile ----
async function refreshProfile() {
  profile = await api("/api/profile");
  $("#packs").textContent = profile.packs_remaining;
  $("#packcap").textContent = profile.pack_cap;
  $("#coins").textContent = profile.currency_balance;
}

// ---- PULLS ----
function renderPulls() {
  $("#crumb").textContent = "Ouvrir des paquets";
  const timer =
    profile.packs_remaining >= profile.pack_cap
      ? "Paquets au maximum"
      : `Prochain paquet dans ${profile.next_regen_seconds}s`;
  view.innerHTML = `
    <div class="pull-ready">
      <h1>Paquet du jour</h1>
      <div class="sub">5 cartes Wikipédia</div>
      <div class="pack" id="pack"><div class="plate"><div class="mono">W</div><div class="cap">Wiki Masters</div></div></div>
      <div class="row">
        <button class="btn primary" id="open" ${profile.packs_remaining <= 0 ? "disabled" : ""}>Ouvrir le paquet</button>
        <button class="btn" id="buy">Acheter un paquet (20)</button>
      </div>
      <div class="timer">${timer}</div>
    </div>`;
  $("#open").onclick = openPack;
  $("#buy").onclick = async () => {
    await api("/api/buy-pack", { method: "POST" });
    await refreshProfile();
    renderPulls();
  };
  $("#pack").onclick = () => !$("#open").disabled && openPack();
}

async function openPack() {
  const pack = $("#pack");
  if (pack) pack.classList.add("gone");
  const data = await api("/api/packs/open", { method: "POST" });
  if (data.error) { renderPulls(); return; }
  await refreshProfile();
  setTimeout(() => renderReveal(data.cards), 260);
}

function renderReveal(cards) {
  let i = 0;
  const draw = () => {
    const c = cards[i];
    const last = i === cards.length - 1;
    view.innerHTML = `
      <div class="reveal">
        <div class="count">Carte <b>${i + 1}</b> / ${cards.length}</div>
        <div class="stage" id="stage">${cardHTML(c, { big: true, isNew: c.is_new, shiny: c.is_shiny })}</div>
        <div class="dots">${cards.map((_, k) => `<span class="d ${k === i ? "on" : k < i ? "seen" : ""}"></span>`).join("")}</div>
        <div class="navrow">
          <button class="arrow" id="prev" ${i === 0 ? "disabled" : ""} aria-label="Précédent">‹</button>
          <button class="btn primary" id="next">${last ? "Terminé" : "Suivant"}</button>
          <button class="arrow" id="fwd" ${last ? "disabled" : ""} aria-label="Suivant">›</button>
        </div>
      </div>`;
    const stage = $("#stage").firstElementChild;
    if (stage) stage.classList.add("flip-in");
    $("#prev").onclick = () => { if (i > 0) { i--; draw(); } };
    $("#fwd").onclick = () => { if (!last) { i++; draw(); } };
    $("#next").onclick = () => { if (last) { renderPulls(); } else { i++; draw(); } };
  };
  draw();
}

// ---- COLLECTION ----
let collFilter = "ALL";
async function renderCollection() {
  $("#crumb").textContent = "Ma collection";
  const data = await api("/api/my-collection");
  const s = data.stats;
  const order = ["ALL", "L", "UR", "SR", "R", "PC", "C"];
  const filterBtns = order
    .map((r) => {
      const label = r === "ALL" ? "Tous" : r;
      const sw = r === "ALL" ? "" : `<span class="sw" style="background:var(--color-rarity-${r.toLowerCase()})"></span>`;
      return `<button data-r="${r}" class="${collFilter === r ? "on" : ""}">${sw}${label}${r === "ALL" ? ` (${s.unique})` : ` (${s.counts[r] || 0})`}</button>`;
    })
    .join("");
  const items = data.collection.filter((it) => collFilter === "ALL" || it.card.rarity === collFilter);
  const grid =
    items.length === 0
      ? `<div class="empty"><b>Rien ici pour l'instant</b><div>Ouvrez un paquet pour commencer votre collection.</div></div>`
      : `<div class="grid">${items
          .map((it) => cardHTML(it.card, { shiny: it.is_shiny, count: it.count }))
          .join("")}</div>`;
  view.innerHTML = `
    <div class="coll-head">
      <div>
        <h1>Ma collection</h1>
        <div class="meta">${s.unique} cartes uniques sur ${s.catalog} · ${s.total} au total</div>
      </div>
      <div class="filters">${filterBtns}</div>
    </div>
    ${grid}`;
  view.querySelectorAll(".filters button").forEach((b) => {
    b.onclick = () => { collFilter = b.dataset.r; renderCollection(); };
  });
}

// ---- nav ----
function go(v) {
  document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("on", a.dataset.view === v));
  if (v === "pulls") renderPulls();
  else renderCollection();
}
document.querySelectorAll(".nav a").forEach((a) => (a.onclick = () => go(a.dataset.view)));
$("#reset").onclick = async () => { await api("/api/reset", { method: "POST" }); await refreshProfile(); go("pulls"); };

// ---- boot ----
(async () => { await refreshProfile(); go("pulls"); })();
