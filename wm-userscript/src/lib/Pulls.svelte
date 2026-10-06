<script>
  import Reveal from "./Reveal.svelte";
  import SoundToggle from "./SoundToggle.svelte";
  import { play } from "./sound.js";
  import { data, session, recordPull, forgetCollection } from "../wm/index.js";
  import { useOriginalSite } from "./settings.svelte.js";
  import { withHumanCheck, needsHuman } from "./humanCheck.js";
  let { profile, onchanged } = $props();
  let phase = $state("ready");
  let cards = $state([]);
  let busy = $state(false);
  let opening = $state(false); // playing the tear-open animation
  let error = $state("");
  let needVerify = $state(false); // still refused after the in-app human check: native fallback
  let special = $state(false); // a native special/Pro pack is available

  // Served at /card_pack.png in both worlds: the real site hosts it there, and dev serves
  // a local copy from /public, so it is always same-origin (the foil-shine mask needs that).
  const PACK_IMG = "/card_pack.png";

  data.specialAvailable().then((v) => (special = v));

  let packs = $derived(profile?.packs_remaining ?? null);
  // Unknown profile (still loading) counts as not-openable until a real count arrives.
  let empty = $derived(!profile || packs == null || packs === 0);
  let stackDepth = $derived(Math.min(3, Math.max(1, packs || 1))); // how many packs to show stacked

  let batch = $state(0); // packs opened in the current "open all" run

  // Open one pack. The tear-open animation always plays at least 900 ms, so opening feels
  // deliberate even when the API is fast.
  async function openOne() {
    const [d] = await Promise.all([withHumanCheck(() => data.openPack()), new Promise((r) => setTimeout(r, 900))]);
    if (!d?.cards?.length) throw new Error("Aucune carte reçue. Réessayez dans un instant.");
    recordPull(d.cards);
    return d;
  }

  // One pack, or every pack in a row (paced like a person, stopping at the first refusal:
  // the game rate-limits and asks for human verification on bursts).
  async function open(all = false) {
    if (busy || empty) return;
    busy = true; opening = true; error = ""; needVerify = false; batch = 0;
    play("rip");
    const haul = [];
    try {
      let left = packs;
      do {
        const d = await openOne();
        haul.push(...d.cards);
        batch++;
        left = d.packs_remaining;
        onchanged?.();
      } while (all && left > 0);
    } catch (e) {
      if (needsHuman(e)) needVerify = true; // still refused after a successful check: native fallback
      else error = e.message || "Ouverture du paquet impossible.";
    }
    if (haul.length) {
      forgetCollection();
      cards = haul;
      phase = "revealing";
    }
    opening = false;
    busy = false;
  }

  function done() {
    phase = "ready";
    opening = false;
    onchanged?.();
  }

  // Countdown to the next pack. Shown whenever the adapter provides a value and the pack
  // stock is not full (the mock provides it; the real site degrades to no countdown).
  let secs = $state(null);
  $effect(() => {
    const n = profile?.next_regen_seconds;
    if (n == null || (packs != null && profile?.pack_cap != null && packs >= profile.pack_cap)) { secs = null; return; }
    secs = n;
    const t = setInterval(() => {
      secs -= 1;
      if (secs <= 0) { clearInterval(t); secs = null; onchanged?.(); }
    }, 1000);
    return () => clearInterval(t);
  });
  function fmt(s) {
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
  open();
}} />

<div class="pulls">
<SoundToggle />
{#if phase === "revealing"}
  <Reveal {cards} packs={batch} ondone={done} />
{:else}
  <div class="pull-ready">
    {#if special}
      <div class="special-note">
        Un paquet spécial est disponible sur le site.
        <button class="link-btn" onclick={() => useOriginalSite()}>Ouvrir la version originale</button>
      </div>
    {/if}
    <h1>Ouvrir un paquet</h1>
    <div class="sub">Découvrez 5 nouvelles cartes Wikipédia</div>

    <div class="booster-stage">
      <button class="booster" class:opening class:is-empty={empty} onclick={() => open()} disabled={busy || empty} aria-label="Ouvrir le paquet">
        {#if !opening && stackDepth > 2}<span class="booster-back b2" style="background-image:url({PACK_IMG})"></span>{/if}
        {#if !opening && stackDepth > 1}<span class="booster-back b1" style="background-image:url({PACK_IMG})"></span>{/if}
        <span class="booster-main">
          <img src={PACK_IMG} alt="Paquet WikiMasters" draggable="false" />
          <span class="booster-shine"></span>
        </span>
      </button>
    </div>

    {#if packs === 0 && !busy}
      <!-- Out of packs: the wait is the only useful information, so it takes the focus. -->
      <div class="pack-wait">
        {#if secs != null}
          <span class="pw-time">{fmt(secs)}</span>
          <span class="pw-lbl">avant le prochain paquet</span>
        {:else}
          <span class="pw-lbl">Plus de paquets pour le moment</span>
        {/if}
        {#if profile?.pack_cap}<span class="pw-sub">0 / {profile.pack_cap} paquets</span>{/if}
      </div>
    {:else}
      <div class="pack-count">
        <span class="pc-num">{packs ?? "-"}</span>
        <span class="pc-lbl">
          paquet{packs > 1 ? "s" : ""} disponible{packs > 1 ? "s" : ""}{profile?.pack_cap ? ` sur ${profile.pack_cap}` : ""}
        </span>
      </div>

      <div class="pull-actions">
        <button class="btn primary big" onclick={() => open()} disabled={busy || empty}>
          {busy ? (batch ? `Ouverture... ${batch + 1} / ${packs + batch}` : "Ouverture...") : "Ouvrir le paquet"}
        </button>
        {#if packs > 1 && !busy}
          <button class="btn big" onclick={() => open(true)}>Tout ouvrir ({packs})</button>
        {/if}
      </div>

      {#if secs != null}
        <div class="regen-line">Prochain paquet dans <b>{fmt(secs)}</b></div>
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
