<script>
  // One side of a trade in the trade pane: its estimated total, then the cards showing their value
  // (not ATK/DEF: what matters in a trade), and the WikiBidous as a chip under them, or as a tile
  // of a card's size when they are all the side gives (sideShape). `cols`: how many cards share a
  // line (the pane's layout), `narrow` a side too slim for long words. Cards open their detail through `onopen`.
  import Card from "../../components/Card.svelte";
  import Icon from "../../components/Icon.svelte";
  import { sideValue } from "../../wm/index.js";
  import { nf } from "../../lib/format.js";
  let { label, items, coins = 0, values, cols = 1, narrow = false, empty = "Rien", onopen } = $props();
  const value = $derived(sideValue(items, coins, values));
  // nothing priced at all: say so once, quietly; partly priced: "≈ total", the gap in the tooltip
  const none = $derived(value.unknown > 0 && value.unknown === items.length && !coins);
  const missing = $derived(value.unknown ? `${value.unknown} carte${value.unknown > 1 ? "s" : ""} sans valeur estimée` : null);
</script>

<section class="tside">
  <header class="tside-head"><span>{label}</span>{#if none}<span class="tside-total is-none" title={missing}>Non estimé</span>{:else}<span class="tside-total" title={missing}>{value.unknown ? "≈ " : ""}{nf(value.total)} pts</span>{/if}</header>
  {#if !items.length && !coins}
    <div class="tside-none">{empty}</div>
  {:else}
    <div class="tside-cards" style:--cols={cols}>
      {#each items as it (it.itemId ?? it.userCardId)}
        <button class="card-btn" onclick={() => onopen?.(it)} aria-label={it.card.title}><Card card={it.card} shiny={it.is_shiny} stats={false} value={values.get(it.card.id)} /></button>
      {/each}
      {#if coins && !items.length}<div class="tside-coins"><Icon name="coin" /><b>{nf(coins)}</b><span>WikiBidous</span></div>{/if}
    </div>
    {#if coins && items.length}<div class="tside-chip"><Icon name="coin" /><span>+ <b>{nf(coins)}</b> {narrow ? "wb" : "WikiBidous"}</span></div>{/if}
  {/if}
</section>
