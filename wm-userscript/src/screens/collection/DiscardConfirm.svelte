<script>
  // "Défausser N cartes ?": what goes, by rarity, a warning for the rare ones (as the game's own
  // page), a few titles, and what comes back. `copies`: the selected copies (see wm/discard.js).
  import Icon from "../../components/Icon.svelte";
  import { anchorCentered } from "../../lib/anchor.js";
  import { RARITIES_DESC } from "../../wm/index.js";
  import { byRarity } from "../../wm/discard.js";

  let { copies, onconfirm, onclose } = $props();
  const RARE = ["L", "UR", "SR"];
  const SHOWN = 8;
  const fr = (k) => k.toLocaleString("fr");
  const n = $derived(copies.length);
  const counts = $derived(byRarity(copies, RARITIES_DESC));
  const rare = $derived(copies.filter((c) => RARE.includes(c.rarity)).length);
  const titles = $derived(copies.slice(0, SHOWN).map((c) => c.title).join(", ") + (n > SHOWN ? `, +${fr(n - SHOWN)} autre${n - SHOWN > 1 ? "s" : ""}` : ""));
  const onKey = (e) => e.key === "Escape" && onclose?.();
  let cancel = $state();
  $effect(() => cancel?.focus());
</script>

<svelte:window onkeydown={onKey} />

<div class="modal-backdrop" role="presentation" onclick={(e) => e.target === e.currentTarget && onclose?.()}>
  <div class="modal dc" role="dialog" aria-modal="true" aria-labelledby="wm-dc-title" tabindex="-1" use:anchorCentered>
    <button class="modal-close" onclick={onclose} aria-label="Fermer"><Icon name="close" width={2} class="x-ico" /></button>
    <h2 id="wm-dc-title">Défausser {fr(n)} carte{n > 1 ? "s" : ""} ?</h2>
    <div class="dc-pills">{#each counts as [r, k] (r)}<span class="dc-pill" data-r={r}>{fr(k)} x {r}</span>{/each}</div>
    {#if rare}<p class="dc-warn">Attention : {rare} carte{rare > 1 ? "s" : ""} rare{rare > 1 ? "s" : ""} (L / UR / SR) dans la sélection.</p>{/if}
    <p class="dc-titles">{titles}</p>
    <div class="dc-gain"><span>Vous recevez</span><b>+{fr(n)} WikiBidou{n > 1 ? "s" : ""}</b></div>
    <div class="dc-acts">
      <button class="btn" bind:this={cancel} onclick={onclose}>Annuler</button>
      <button class="btn danger" onclick={onconfirm}>Défausser</button>
    </div>
  </div>
</div>
