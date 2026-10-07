<script>
  // Profil: who I am to other players (avatar cut from one of my cards, name, public or not), my
  // collection at a glance, and my showcase: places in galleries of four, one gallery per 5 000
  // cards (the game's rule). Every write shows at once and is undone if the server refuses it.
  import Icon from "../../components/Icon.svelte";
  import Avatar from "../../components/Avatar.svelte";
  import Card from "../../components/Card.svelte";
  import CopyPicker from "./CopyPicker.svelte";
  import RarityBreakdown from "../../components/RarityBreakdown.svelte";
  import { data, RARITIES_DESC, RNAME, kept, keepNow } from "../../wm/index.js";
  import { SHOWCASE, galleryCount, galleryName } from "../../wm/social.js";
  import { nf } from "../../lib/format.js";
  import { anchorCentered } from "../../lib/anchor.js";
  import { sounded } from "../../sound/sfx.js";

  let { onopen } = $props(); // onopen(path): one of our screens (the collection, the friends)

  // as last shown, at once; the server's answers replace it (wm/index.js: kept)
  let me = $state(kept("me"));
  // how others see me: my profile as a player's profile (PlayerProfile)
  const publicUrl = $derived(me ? `/profile/${encodeURIComponent(me.username)}` : null);
  let stats = $state(kept("stats")); // { total, rarityCounts }
  let shelf = $state(kept("showcase")); // { places, names }
  $effect(() => { if (me) keepNow("me", $state.snapshot(me)); });
  $effect(() => { if (shelf && !shelf.failed) keepNow("showcase", $state.snapshot(shelf)); });
  let error = $state("");
  let note = $state(null);
  async function load() {
    error = "";
    const [m, s, sh] = await Promise.allSettled([data.me(), data.collectionStats(), data.showcase()]);
    if (m.status === "rejected") { if (!me) error = m.reason?.message || "Profil indisponible pour le moment."; return; }
    me = m.value;
    if (s.status === "fulfilled") { stats = s.value; keepNow("stats", s.value); }
    shelf = sh.status === "fulfilled" ? sh.value : shelf ?? { places: Array(SHOWCASE.places).fill(null), names: {}, failed: true };
    // the counts of the stats row, each from its own page's read; one that fails only hides its count
    data.friendships().then((f) => { friends = f.friends.length; keepNow("friends", f); }, () => {});
    data.achievements().then((a) => { keepNow("achievements", a); ach = achOf(a); }, () => {});
  }
  let friends = $state(kept("friends")?.friends.length ?? null);
  let shelfEl = $state();
  const achOf = (a) => a && { got: a.filter((x) => x.state !== "locked").length, total: a.length, claim: a.filter((x) => x.state === "claim").length };
  let ach = $state(achOf(kept("achievements")));
  load();

  const fail = (e) => (note = { ok: false, text: e.message });
  const joined = $derived(me?.joinedAt ? new Date(me.joinedAt).toLocaleDateString("fr", { month: "long", year: "numeric" }) : "");

  // public or friends only: flipped at once, back if refused
  async function setPublic(on) {
    const was = me.isPublic;
    me.isPublic = on; note = null;
    try { await data.updateProfile(me.username, { is_public: on }); }
    catch (e) { me.isPublic = was; fail(e); }
  }

  // the showcase
  const galleries = $derived(shelf ? Array.from({ length: galleryCount(stats?.total ?? 0) }, (_, g) => ({ g, places: shelf.places.slice(g * SHOWCASE.perGallery, (g + 1) * SHOWCASE.perGallery).map((row, i) => ({ pos: g * SHOWCASE.perGallery + i, row })) })) : []);
  const filled = $derived(shelf?.places.filter(Boolean).length ?? 0);
  // the galleries in use and the next one open; the others wait behind "Ouvrir une autre vitrine"
  let opened = $state(0);
  const lastUsed = $derived(galleries.findLastIndex((gal) => gal.places.some((p) => p.row)));
  const visible = $derived(galleries.slice(0, Math.max(lastUsed + 2, opened, 1)));
  const placeOf = (row) => shelf.places.findIndex((r) => r?.id === row.id);
  let picking = $state(null); // the place being filled
  async function put(pos, row) {
    picking = null;
    // a copy shows in one place: the picker leaves out those already exposed (as the game's does)
    const before = [...shelf.places];
    shelf.places[pos] = row; note = null;
    try { await sounded(() => data.showcasePut(pos, row.id)); }
    catch (e) { shelf.places = before; fail(e); }
  }
  async function clear(pos) {
    const was = shelf.places[pos];
    shelf.places[pos] = null; note = null;
    try { await data.showcaseClear(pos); }
    catch (e) { shelf.places[pos] = was; fail(e); }
  }
  // a gallery's name (several galleries only): Enter keeps it, Escape leaves it as it was
  let naming = $state(null); // { g, text }
  async function rename() {
    const { g, text } = naming;
    naming = null;
    const name = text.trim().slice(0, 40);
    const value = name && name !== galleryName(g, {}) ? name : null;
    if ((value ?? null) === (shelf.names[g] ?? null)) return;
    const was = shelf.names[g];
    if (value) shelf.names[g] = value; else delete shelf.names[g];
    try { await data.showcaseName(g, value); }
    catch (e) { if (was) shelf.names[g] = was; else delete shelf.names[g]; fail(e); }
  }
  const focusSelect = (node) => { node.focus(); node.select(); };

  // the avatar: a card with a picture, then framed by dragging it in the circle
  let avatar = $state(null); // { step: "pick" | "frame", row?, url, x, y, busy }
  const startAvatar = () => (avatar = me.avatar ? { step: "frame", url: me.avatar, x: me.ax, y: me.ay } : { step: "pick" });
  let drag = null;
  function dragStart(e) {
    drag = { px: e.clientX, py: e.clientY, x: avatar.x, y: avatar.y, size: e.currentTarget.offsetWidth };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function dragMove(e) {
    if (!drag) return;
    const clamp = (v) => Math.round(Math.min(100, Math.max(0, v)));
    avatar.x = clamp(drag.x - ((e.clientX - drag.px) / drag.size) * 100);
    avatar.y = clamp(drag.y - ((e.clientY - drag.py) / drag.size) * 100);
  }
  function nudge(e) {
    const step = { ArrowLeft: [5, 0], ArrowRight: [-5, 0], ArrowUp: [0, 5], ArrowDown: [0, -5] }[e.key];
    if (!step) return;
    e.preventDefault();
    avatar.x = Math.min(100, Math.max(0, avatar.x + step[0]));
    avatar.y = Math.min(100, Math.max(0, avatar.y + step[1]));
  }
  async function saveAvatar(patch) {
    avatar.busy = true; note = null;
    try {
      const p = await sounded(() => data.updateProfile(me.username, patch));
      if (p) me = { ...me, ...p };
      avatar = null;
    } catch (e) { avatar.busy = false; avatar.error = e.message; }
  }
  const saveFrame = () => saveAvatar({ ...(avatar.row && { avatar_user_card_id: avatar.row.id }), avatar_pos_x: avatar.x, avatar_pos_y: avatar.y });
  const onKey = (e) => e.key === "Escape" && avatar?.step === "frame" && !avatar.busy && (avatar = null);
</script>

<svelte:window onkeydown={onKey} />

<div class="pf-page">
{#if error}
  <div class="empty"><b>Profil indisponible pour le moment.</b><div>{error}</div><button class="btn" onclick={load}>Réessayer</button></div>
{:else if !me}
  <div class="coll-head"><div><h1>Profil</h1><div class="meta"><span class="sync"><span class="spin"></span>Chargement de votre profil</span></div></div></div>
{:else}
  <section class="pf-hero">
    <button class="pf-avatar" onclick={startAvatar} title="Changer la photo de profil" aria-label="Changer la photo de profil">
      <Avatar user={me} size={96} /><span class="pf-avatar-edit"><Icon name="sparkle" /></span>
    </button>
    <div class="pf-id">
      <h1>{me.username}{#if me.isPro}<span class="badge pro">Pro</span>{/if}</h1>
      <div class="meta">{#if joined}Joueur depuis {joined}{/if}{#if joined}{" · "}{/if}<a class="pf-public" href={publicUrl} onclick={(e) => { e.preventDefault(); history.pushState({}, "", publicUrl); }}>Voir mon profil public</a></div>
    </div>
    <div class="pf-vis">
      <div><b>{me.isPublic ? "Visible de tous" : "Amis seulement"}</b><span>{me.isPublic ? "Tout le monde peut voir votre profil" : "Seuls vos amis voient votre profil"}</span></div>
      <button class="snd-switch" role="switch" aria-checked={me.isPublic} aria-label="Profil public" onclick={() => setPublic(!me.isPublic)}><span></span></button>
    </div>
  </section>
  {#if note}<p class="ach-note" class:bad={!note.ok} role="status">{note.text}</p>{/if}

  <nav class="pf-stats" aria-label="Mes pages">
    <button class="pf-stat" onclick={() => onopen("/collection")}><span>Cartes</span><b>{stats?.total != null ? nf(stats.total) : "-"}</b></button>
    <button class="pf-stat" onclick={() => onopen("/friends")}><span>Amis</span><b>{friends ?? "-"}</b></button>
    <button class="pf-stat" onclick={() => onopen("/achievements")}><span>Succès</span><b>{ach ? ach.got : "-"}{#if ach}<small>/{ach.total}</small>{/if}</b>{#if ach?.claim}<em>{ach.claim} à réclamer</em>{/if}</button>
    <button class="pf-stat" onclick={() => shelfEl?.scrollIntoView({ behavior: "smooth", block: "start" })}><span>Vitrine</span><b>{filled}</b></button>
  </nav>

  {#if stats?.total}
    <section class="pf-coll" aria-label="Ma collection">
      <h2 class="ach-sec-h">Par rareté</h2>
      <RarityBreakdown counts={stats.rarityCounts} />
    </section>
  {/if}

  <section class="pf-shelf" aria-label="Vitrine" bind:this={shelfEl}>
    <h2 class="ach-sec-h">Vitrine<span>{filled} carte{filled > 1 ? "s" : ""} exposée{filled > 1 ? "s" : ""}</span></h2>
    {#if shelf?.failed}<p class="fr-hint">La vitrine n'a pas pu être chargée. <button class="link-btn" onclick={load}>Réessayer</button></p>{/if}
    {#each visible as gal (gal.g)}
      <div class="pf-gallery">
        {#if galleries.length > 1}
          {#if naming?.g === gal.g}
            <input class="pf-gname-in" maxlength="40" bind:value={naming.text} use:focusSelect aria-label="Nom de la vitrine"
              onkeydown={(e) => { if (e.key === "Enter") rename(); if (e.key === "Escape") { e.stopPropagation(); naming = null; } }} onblur={rename} />
          {:else}
            <button class="pf-gname" onclick={() => (naming = { g: gal.g, text: galleryName(gal.g, shelf.names) })} title="Renommer">{galleryName(gal.g, shelf.names)}<Icon name="tag" /></button>
          {/if}
        {/if}
        <div class="pf-places">
          {#each gal.places as p (p.pos)}
            {#if p.row}
              <div class="pf-place">
                <button class="card-btn" onclick={() => (picking = p.pos)} title="Remplacer {p.row.card.title}"><Card card={p.row.card} shiny={p.row.is_shiny} /></button>
                <button class="pf-remove" onclick={() => clear(p.pos)} aria-label="Retirer {p.row.card.title} de la vitrine" title="Retirer"><Icon name="close" width={2.2} /></button>
              </div>
            {:else}
              <button class="pf-empty" onclick={() => (picking = p.pos)} aria-label="Exposer une carte ici"><span class="pf-plus" aria-hidden="true"></span><span>Exposer</span></button>
            {/if}
          {/each}
        </div>
      </div>
    {/each}
    <p class="fr-hint">
      {#if visible.length < galleries.length}<button class="link-btn" onclick={() => (opened = visible.length + 1)}>Ouvrir une autre vitrine</button>{" "}({galleries.length - visible.length} encore disponible{galleries.length - visible.length > 1 ? "s" : ""}).{" "}{/if}
      {#if galleries.length < SHOWCASE.maxGalleries}Une vitrine de plus tous les {nf(SHOWCASE.cardsPerGallery)} cartes.{/if}
    </p>
  </section>
{/if}

</div>

{#if picking != null}
  <CopyPicker title="Exposer une carte" sub={galleries.length > 1 ? galleryName(Math.floor(picking / SHOWCASE.perGallery), shelf.names) : ""}
    blocked={(r) => (placeOf(r) >= 0 ? "Déjà exposée" : null)}
    onpick={(row) => put(picking, row)} onclose={() => (picking = null)} />
{/if}

{#if avatar?.step === "pick"}
  <CopyPicker title="Photo de profil" sub="Choisissez une carte avec une image" blocked={(r) => (r.card.image_url ? null : "Sans image")}
    onpick={(row) => (avatar = { step: "frame", row, url: row.card.image_url, x: 50, y: 50 })} onclose={() => (avatar = null)} />
{:else if avatar?.step === "frame"}
  <div class="modal-backdrop" role="presentation" onclick={(e) => e.target === e.currentTarget && !avatar.busy && (avatar = null)}>
    <div class="modal pf-frame" role="dialog" aria-modal="true" aria-labelledby="wm-frame-title" tabindex="-1" use:anchorCentered>
      <button class="modal-close" onclick={() => (avatar = null)} disabled={avatar.busy} aria-label="Fermer"><Icon name="close" width={2} class="x-ico" /></button>
      <h2 id="wm-frame-title">Photo de profil</h2>
      <p class="fr-hint">Faites glisser l'image pour la cadrer.</p>
      <div class="pf-crop" role="slider" tabindex="0" aria-label="Cadrage" aria-valuetext="{avatar.x} %, {avatar.y} %" aria-valuenow={avatar.x}
        onpointerdown={dragStart} onpointermove={dragMove} onpointerup={() => (drag = null)} onpointercancel={() => (drag = null)} onkeydown={nudge}>
        <img src={avatar.url} alt="" draggable="false" style:object-position="{avatar.x}% {avatar.y}%" />
      </div>
      <div class="pf-frame-small" aria-hidden="true"><Avatar user={{ username: me.username, avatar: avatar.url, ax: avatar.x, ay: avatar.y }} size={44} /><Avatar user={{ username: me.username, avatar: avatar.url, ax: avatar.x, ay: avatar.y }} size={28} /></div>
      {#if avatar.error}<p class="ach-note bad" role="status">{avatar.error}</p>{/if}
      <div class="pf-frame-acts">
        <button class="btn" disabled={avatar.busy} onclick={() => (avatar = { step: "pick" })}>Autre carte</button>
        {#if me.avatar && !avatar.row}<button class="btn danger" disabled={avatar.busy} onclick={() => saveAvatar({ clear_avatar: true })}>Retirer la photo</button>{/if}
        <button class="btn primary" disabled={avatar.busy} onclick={saveFrame}>{#if avatar.busy}<span class="spin"></span>{:else}Enregistrer{/if}</button>
      </div>
    </div>
  </div>
{/if}
