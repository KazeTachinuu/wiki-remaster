<script>
  // The WikiBidous one side of a trade adds: a button that opens a number field, closed again
  // (back to 0) by its cross. Opens by itself when there already are coins (counter-offer pre-fill).
  import { tick } from "svelte";
  import Icon from "./Icon.svelte";
  let { value = $bindable(0), max = undefined, label = "Ajouter des WB" } = $props();
  // svelte-ignore state_referenced_locally
  let open = $state(value > 0);
  let input = $state();
  // opens empty (not "0") so typing a number does not read "050"
  // in a scrolling list (the offer's sides), the new field scrolls into sight, clear of the faded edge
  async function show() { if (!value) value = null; open = true; await tick(); input?.focus({ preventScroll: true }); input?.scrollIntoView({ block: "nearest" }); }
  function hide() { value = 0; open = false; }
</script>

{#if open}
  <span class="coins-field af-input-row">
    <Icon name="coin" class="coins-ico" />
    <input bind:this={input} class="af-input" type="number" min="0" {max} bind:value aria-label={label} />
    <span class="af-unit">wb</span>
    <button class="coins-x" onclick={hide} aria-label="Retirer les WikiBidous"><Icon name="close" width={2} /></button>
  </span>
{:else}
  <button class="iconbtn coins-add" onclick={show}><Icon name="coin" />{label}</button>
{/if}
