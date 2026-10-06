<script>
  // The game's human check, mounted once in App. Opens when a write is refused with
  // "human_verification_required" (see humanCheck.js). In dev a plain button stands in for
  // Turnstile, whose site key only works on wiki-masters.com.
  import { data } from "../wm/index.js";
  import { human, resolveHuman } from "./humanCheck.js";
  import { loadTurnstile, SITE_KEY } from "./turnstile.js";
  import { useOriginalSite } from "./settings.svelte.js";
  import { anchorCentered } from "./anchor.js";

  let open = $state(false);
  $effect(() => human.subscribe((v) => (open = v)));
  let box = $state(null);
  let error = $state("");
  let busy = $state(false);
  let failed = $state(false); // Turnstile could not load: offer the native site
  const FAILED = "La vérification a échoué. Réessayez.";

  async function verify(token) {
    busy = true; error = "";
    try { await data.humanCheck(token); resolveHuman(true); }
    catch (e) { error = e.message || FAILED; }
    finally { busy = false; }
  }

  // Render Turnstile into the box once the dialog is open (real site only). Like the native
  // client it stays hidden unless the visitor has to interact with it.
  $effect(() => {
    if (!open || !box || !data.isReal) return;
    let id = null;
    loadTurnstile().then((ts) => { id = ts.render(box, { sitekey: SITE_KEY, theme: "dark", appearance: "interaction-only", callback: verify, "error-callback": () => (error = FAILED) }); }, () => (failed = true));
    return () => { if (id != null) window.turnstile?.remove(id); };
  });
</script>

<svelte:window onkeydown={(e) => open && e.key === "Escape" && resolveHuman(false)} />

{#if open}
  <div class="modal-backdrop hc-backdrop" role="presentation" onclick={() => resolveHuman(false)}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="modal hc" role="dialog" aria-modal="true" aria-labelledby="wm-hc-title" tabindex="-1" use:anchorCentered onclick={(e) => e.stopPropagation()}>
      <h2 class="hc-title" id="wm-hc-title">Vérification rapide</h2>
      <p class="hc-sub">Le jeu demande de temps en temps de confirmer que vous êtes humain. Votre action reprendra toute seule.</p>
      {#if failed}
        <p class="modal-msg">La vérification ne peut pas s'afficher ici.</p>
        <button class="btn primary" onclick={() => useOriginalSite()}>Ouvrir la version originale pour valider</button>
      {:else if data.isReal}
        <div class="hc-box" bind:this={box}></div>
      {:else}
        <button class="btn primary" disabled={busy} onclick={() => verify("dev-token")}>Je ne suis pas un robot</button>
      {/if}
      {#if busy}<p class="hc-sub"><span class="spin"></span> Vérification...</p>{/if}
      {#if error}<p class="modal-msg">{error}</p>{/if}
      <button class="link-btn hc-cancel" onclick={() => resolveHuman(false)}>Annuler</button>
    </div>
  </div>
{/if}
