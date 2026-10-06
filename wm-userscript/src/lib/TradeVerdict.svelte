<script>
  // Is the deal fair, from my side: a title and the gap. With a card unpriced there is no verdict
  // to give, so only the swap icon stays (each side already says what it could not estimate).
  import Icon from "./Icon.svelte";
  import { verdictTitle } from "../wm/index.js";
  import { nf } from "./format.js";
  let { v } = $props();
</script>

<div class="tm-verdict" data-k={v.kind}>
  <Icon name="trades" />
  {#if v.kind !== "unknown"}<b>{verdictTitle(v)}</b>{/if}
  {#if v.kind === "advantage" || v.kind === "disadvantage"}<span>{v.diff > 0 ? "+" : ""}{nf(v.diff)} pts</span>{/if}
</div>
