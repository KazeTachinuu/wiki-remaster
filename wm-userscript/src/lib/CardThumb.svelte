<script>
  // A card as a small square for lists (the offer being composed): the photo cropped on its upper
  // part (faces), or the rarity art, framed in the rarity colour, the rarity code readable in a
  // corner. Never a whole card squeezed into a few pixels.
  import { settings } from "./settings.svelte.js";
  import { rarityArt } from "./art.js";
  let { card, shiny = false } = $props();
  let failed = $state(false);
  // a sensitive image stays hidden here too: the rarity art stands in
  const photo = $derived(card.image_url && !failed && !(settings.hideSensitive && card.nsfw_image));
</script>

<span class="cthumb" class:art={!photo} class:shiny data-r={card.rarity} aria-hidden="true">
  {#if photo}<img src={card.image_url} alt="" loading="lazy" crossorigin="anonymous" onerror={() => (failed = true)} />
  {:else}<img src={rarityArt(card, shiny)} alt="" loading="lazy" />{/if}
  <span class="cthumb-r">{card.rarity}</span>
</span>
