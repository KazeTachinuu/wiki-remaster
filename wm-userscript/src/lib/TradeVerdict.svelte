<script>
  // Is the deal fair, from my side: a title and the gap (or how many cards have no value yet).
  import Icon from "./Icon.svelte";
  import { verdictTitle } from "../wm/index.js";
  import { nf } from "./format.js";
  let { v } = $props();
</script>

<div class="tm-verdict" data-k={v.kind}>
  <Icon name="trades" />
  <b>{verdictTitle(v)}</b>
  {#if v.kind === "unknown"}<span>{v.unknown} carte{v.unknown > 1 ? "s" : ""} sans valeur</span>
  {:else if v.kind !== "balanced"}<span>{v.diff > 0 ? "+" : ""}{nf(v.diff)} pts</span>{/if}
</div>
