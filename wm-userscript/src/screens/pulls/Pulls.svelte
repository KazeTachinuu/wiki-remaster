<script>
  import Reveal from "./Reveal.svelte";
  import { play } from "../../sound/sound.js";
  import { data, session, recordPull, collectionAdd, forgetCollection } from "../../wm/index.js";
  import { useOriginalSite } from "../../lib/settings.svelte.js";
  import { withHumanCheck, needsHuman } from "../../lib/humanCheck.js";
  import { countdown, secondsUntil } from "../../lib/format.js";
  import { packTimer } from "../../lib/packTimer.svelte.js";
  // inline (no request), so also same-origin for the foil-shine mask
  import { PACK_IMG } from "../../lib/art.js";
  import { untrack } from "svelte";
  // onprofile: re-read the profile from the game (packs and coins), lighter than onchanged
  let { profile, onchanged, onprofile } = $props();
  let phase = $state("ready");
  let cards = $state([]);
  let busy = $state(false);
  let opening = $state(false); // playing the tear-open animation
  let error = $state("");
  let needVerify = $state(false); // still refused after the in-app human check: native fallback




  let packs = $derived(profile?.packs_remaining ?? null);
  // Unknown profile (still loading) counts as not-openable until a real count arrives.
  let empty = $derived(!profile || packs == null || packs === 0);
  let stackDepth = $derived(Math.min(3, Math.max(1, packs || 1))); // how many packs to show stacked


  // Open a pack: the normal one, the Pro daily one or a special one, all into the same reveal.
  // The tear-open animation always plays at least 900 ms, so opening feels deliberate even when
  // the API is fast. One at a time: opening them back to back is what the game refuses as too fast.
  async function run(opener) {
    if (busy) return;
    busy = true; opening = true; error = ""; needVerify = false;
    play("rip");
    try {
      const [d] = await Promise.all([withHumanCheck(opener), new Promise((r) => setTimeout(r, 900))]);
      if (!d?.cards?.length) throw new Error("Aucune carte reçue. Réessayez dans un instant.");
      recordPull(d.cards);
      // the new copies join the saved collection (a response without them: reload it later)
      d.copies ? collectionAdd(d.copies) : forgetCollection();
      cards = d.cards;
      phase = "revealing";
      onchanged?.();
    } catch (e) {
      if (needsHuman(e)) needVerify = true; // still refused after a successful check: native fallback
      else error = e.message || "Ouverture du paquet impossible.";
    }
    opening = false;
    busy = false;
    loadExtras();
  }
  const open = () => { if (!empty) run(() => data.openPack()); };

  // The packs beside the normal one: Pro's daily pack and the special packs (when the game
  // offers them), re-read after every opening. V.I.P. accounts can also ask for packs back.
  let daily = $state(null); // { eligible, claimedToday }, Pro accounts only
  let special = $state(null); // { packs, available, vip, nextAt }
  function loadExtras() {
    if (profile?.is_pro) data.proDaily().then((d) => (daily = d), () => (daily = null));
    else daily = null;
    data.specialPacks().then((d) => (special = d), () => (special = null));
  }
  $effect(() => { void profile?.is_pro; untrack(loadExtras); });
  let nowTick = $state(Date.now());
  const specialSecs = $derived(special?.nextAt ? secondsUntil(special.nextAt, nowTick) : null);
  // One tab per kind of pack the account has: the normal packs always, Pro's daily pack and the
  // special packs when the game offers them. A dot marks a tab with a pack ready.
  let kind = $state("normal");
  const kinds = $derived([
    { id: "normal", label: "Paquets", ready: !empty },
    ...(daily ? [{ id: "pro", label: "Pack PRO", ready: daily.eligible }] : []),
    ...(special?.packs.length ? [{ id: "special", label: "Spéciaux", ready: special.available }] : []),
  ]);
  $effect(() => { if (!kinds.some((k) => k.id === kind)) kind = "normal"; });
  const openable = $derived(kind === "pro" ? !!daily?.eligible : kind === "special" ? !!special?.available : !empty);
  let pick = $state(null); // the special pack chosen
  const chosen = $derived(special?.packs.find((sp) => sp.id === pick) ?? special?.packs[0] ?? null);
  // Pro's daily pack comes back at midnight, this device's day (like the game counts it)
  const untilTomorrow = $derived.by(() => { const d = new Date(nowTick); d.setHours(24, 0, 0, 0); return Math.round((d - nowTick) / 1000); });
  $effect(() => { if (kind === "normal") return; const t = setInterval(() => (nowTick = Date.now()), 30e3); return () => clearInterval(t); });
  function openCurrent() {
    if (kind === "pro") { if (daily?.eligible) run(() => data.openProDaily()); }
    else if (kind === "special") { if (special?.available && chosen) run(() => data.openSpecial(chosen.id)); }
    else open();
  }

  async function grace() {
    busy = true; error = "";
    try { await data.grace(); onprofile?.(); } catch (e) { error = e.message || "Demande refusée."; }
    busy = false;
  }

  function done() {
    phase = "ready";
    opening = false;
    onchanged?.();
  }

  // Countdown to the next pack, shared with the top bar's pack chip (none once the packs are full)
  const timer = packTimer(() => (packs != null && profile?.pack_cap != null && packs >= profile.pack_cap ? null : profile?.next_regen_seconds ?? null), () => onprofile?.());
  const secs = $derived(timer.secs);
  function fmt(s) {
    if (s <= 0) return "Prêt";
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    if (h) return `${h} h ${String(m).padStart(2, "0")}`;
    if (m) return `${m} min ${String(sec).padStart(2, "0")}`;
    return `${sec} s`;
  }
</script>

<svelte:window onkeydown={(e) => {
  // Space opens a pack (only on this screen, never while typing or in a dialog).
  if (e.key !== " " || phase !== "ready" || e.composedPath()[0]?.matches?.("input, select, textarea, button")) return;
  e.preventDefault();
  openCurrent();
}} />

<div class="pulls">
{#if phase === "revealing"}
  <Reveal {cards} ondone={done} />
{:else}
  <div class="pull-ready" class:has-tabs={kinds.length > 1} data-kind={kind}>
    {#if kinds.length > 1}
      <div class="tabs pull-tabs" role="tablist" aria-label="Paquets">
        {#each kinds as k (k.id)}
          <button role="tab" aria-selected={kind === k.id} class:on={kind === k.id} onclick={() => (kind = k.id)}>{k.label}{#if k.ready}<span class="tab-ready" aria-label="disponible"></span>{/if}</button>
        {/each}
      </div>
    {/if}

    {#if kind === "pro"}
      <h1>Pack PRO du jour</h1>
      <div class="sub">Des cartes de rareté élevée, une fois par jour</div>
    {:else if kind === "special"}
      <h1>Packs spéciaux</h1>
      <div class="sub">{chosen?.description || "Super Rare ou mieux"}</div>
    {:else}
      <h1>Ouvrir un paquet</h1>
      <div class="sub">Découvrez 5 nouvelles cartes Wikipédia</div>
    {/if}

    <div class="booster-stage">
      <button class="booster" style:--pack="url({PACK_IMG})" class:opening class:is-empty={!openable} onclick={openCurrent} disabled={busy || !openable} aria-label="Ouvrir le paquet">
        {#if kind === "normal" && !opening && stackDepth > 2}<span class="booster-back b2"></span>{/if}
        {#if kind === "normal" && !opening && stackDepth > 1}<span class="booster-back b1"></span>{/if}
        <span class="booster-main">
          <span class="booster-img"></span>
          <span class="booster-shine"></span>
          {#if kind !== "normal"}<span class="booster-mark">{kind === "pro" ? "PRO" : "SR+"}</span>{/if}
        </span>
      </button>
    </div>

    {#if kind === "pro"}
      {#if daily?.eligible}
        <div class="pull-actions"><button class="btn primary big" onclick={openCurrent} disabled={busy}>{busy ? "Ouverture..." : "Ouvrir le pack PRO"}</button></div>
      {:else}
        <div class="pack-wait">
          <span class="pw-time">{countdown(untilTomorrow)}</span>
          <span class="pw-lbl">avant le prochain pack PRO</span>
          <span class="pw-sub">Ouvert aujourd'hui</span>
        </div>
      {/if}
    {:else if kind === "special"}
      {#if special.packs.length > 1}
        <div class="pill-picks" role="radiogroup" aria-label="Pack spécial">
          {#each special.packs as sp (sp.id)}
            <button role="radio" aria-checked={chosen?.id === sp.id} class:on={chosen?.id === sp.id} onclick={() => (pick = sp.id)} title={sp.description}>{sp.name}</button>
          {/each}
        </div>
      {/if}
      {#if special.available}
        <div class="pull-actions"><button class="btn primary big" onclick={openCurrent} disabled={busy || !chosen}>{busy ? "Ouverture..." : `Ouvrir le pack ${chosen?.name ?? ""}`}</button></div>
        <div class="regen-line">{special.vip ? "Illimité pour les V.I.P." : "Gratuit"}</div>
      {:else}
        <div class="pack-wait">
          {#if specialSecs}<span class="pw-time">{countdown(specialSecs)}</span><span class="pw-lbl">avant le prochain pack spécial</span>
          {:else}<span class="pw-lbl">Aucun pack spécial pour le moment</span>{/if}
        </div>
      {/if}
    {:else if packs === 0 && !busy}
      <!-- Out of packs: the wait is the only useful information, so it takes the focus. -->
      <div class="pack-wait">
        {#if secs != null}
          <span class="pw-time">{fmt(secs)}</span>
          <span class="pw-lbl">{secs ? "avant le prochain paquet" : "le prochain paquet arrive"}</span>
        {:else}
          <span class="pw-lbl">Plus de paquets pour le moment</span>
        {/if}
        {#if profile?.pack_cap}<span class="pw-sub">0 / {profile.pack_cap} paquets</span>{/if}
      </div>
      {#if profile?.is_vip}<div class="pull-actions"><button class="btn" disabled={busy} onclick={grace}>Demander des paquets (V.I.P.)</button></div>{/if}
    {:else}
      <div class="pack-count">
        <span class="pc-num">{packs ?? "-"}</span>
        <span class="pc-lbl">
          paquet{packs > 1 ? "s" : ""} disponible{packs > 1 ? "s" : ""}{profile?.pack_cap ? ` sur ${profile.pack_cap}` : ""}
        </span>
      </div>

      <div class="pull-actions">
        <button class="btn primary big" onclick={() => open()} disabled={busy || empty}>
          {busy ? "Ouverture..." : "Ouvrir le paquet"}
        </button>
      </div>

      {#if secs != null}
        <div class="regen-line">{#if secs}Prochain paquet dans <b>{fmt(secs)}</b>{:else}Prochain paquet <b>prêt</b>{/if}</div>
      {/if}
    {/if}

    {#if needVerify}
      <div class="special-note">
        Vérification humaine requise par le jeu.
        <button class="link-btn" onclick={() => useOriginalSite()}>Ouvrir la version originale pour valider</button>
      </div>
    {/if}
    {#if error}<div class="regen-line err">{error}</div>{/if}

    {#if session.packs > 0}
      <div class="session-recap">Cette session : {session.packs} paquet{session.packs > 1 ? "s" : ""} ouvert{session.packs > 1 ? "s" : ""}, {session.newCards} nouvelle{session.newCards > 1 ? "s" : ""}</div>
    {/if}
  </div>
{/if}
</div>
