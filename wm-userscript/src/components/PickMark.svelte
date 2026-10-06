<script>
  // The selection mark laid over a card being picked (collection bulk select, trade picker).
  import Icon from "./Icon.svelte";
  let { on = false } = $props();
</script>

<span class="pick-overlay" class:on><span class="pick-check">{#if on}<Icon name="check" width={2.6} />{/if}</span></span>
