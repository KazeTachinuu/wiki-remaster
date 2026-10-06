<script>
  // One side of a trade in the trade pane: its estimated total, then the cards showing their value
  // (not ATK/DEF: what matters in a trade), and the WikiBidous as a chip under them, or as a tile
  // of a card's size when they are all the side gives (sideShape). `cols`: how many cards share a
  // line (the pane's layout), `narrow` a side too slim for long words. Cards open their detail through `onopen`.
  import Card from "./Card.svelte";
  import Icon from "./Icon.svelte";
  import { sideValue } from "../wm/index.js";
  import { nf } from "./format.js";
  let { label, items, coins = 0, values, cols = 1, narrow = false, empty = "Rien", onopen } = $props();
  const value = $derived(sideValue(items, coins, values));
</script>

<section class="tside">
  <header class="tside-head"><span>{label}</span><span class="tside-total">{value.unknown ? "≈ " : ""}{nf(value.total)} pts{#if value.unknown}<em> · {value.unknown} sans valeur</em>{/if}</span></header>
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
