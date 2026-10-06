<script>
  // One side of a trade in the trade pane: its estimated total, then the cards showing their value
  // (not ATK/DEF: what matters in a trade), and the WikiBidous as a chip under them, or as a tile
  // of a card's size when they are all the side gives (sideShape). `cols`: how many cards share a
  // line (the pane's layout), `narrow` a side too slim for long words. Cards open their detail through `onopen`.
  import Card from "../../components/Card.svelte";
  import Icon from "../../components/Icon.svelte";
  import CardThumb from "./CardThumb.svelte";
  import { sideValue, RARITIES_DESC } from "../../wm/index.js";
  import { inView } from "../../lib/inView.js";
  import { nf } from "../../lib/format.js";
  // `compact`: a big trade (dozens or hundreds of cards). The side then sums itself up (how many
  // cards, of which rarities) and shows mini cards in a panel that scrolls on its own, drawn as it
  // scrolls, so 300 cards open as fast as 3.
  let { label, items, coins = 0, values, cols = 1, narrow = false, empty = "Rien", compact = false, onopen } = $props();
  const byRarity = $derived(RARITIES_DESC.map((r) => [r, items.filter((it) => it.card.rarity === r).length]).filter(([, n]) => n));
  const STEP = 120;
  // a phone shows two rows of them until asked for all (the page scrolls there, not the panel)
  const PREVIEW = 8;
  const phone = typeof matchMedia === "function" && matchMedia("(max-width:900px)").matches;
  let open = $state(!phone);
  let limit = $state(STEP);
  const shown = $derived(open ? items.slice(0, limit) : items.slice(0, PREVIEW));
  const value = $derived(sideValue(items, coins, values));
  // nothing priced at all: say so once, quietly; partly priced: "≈ total", the gap in the tooltip
  const none = $derived(value.unknown > 0 && value.unknown === items.length && !coins);
  const missing = $derived(value.unknown ? `${value.unknown} carte${value.unknown > 1 ? "s" : ""} sans valeur estimée` : null);
</script>

<section class="tside">
  <header class="tside-head"><span>{label}</span>{#if none}<span class="tside-total is-none" title={missing}>Non estimé</span>{:else}<span class="tside-total" title={missing}>{value.unknown ? "≈ " : ""}{nf(value.total)} pts</span>{/if}</header>
  {#if !items.length && !coins}
    <div class="tside-none">{empty}</div>
  {:else if compact}
    <div class="tside-sum">
      <b>{items.length} carte{items.length > 1 ? "s" : ""}</b>{#if coins} + {nf(coins)} WikiBidous{/if}
      <span class="tside-rar">{#each byRarity as [r, n] (r)}<span data-r={r}>{r} {n}</span>{/each}</span>
    </div>
    {#if items.length}
      <div class="tside-minis">
        {#each shown as it (it.itemId ?? it.userCardId)}
          {@const val = values.get(it.card.id)}
          <button class="tmini" onclick={() => onopen?.(it)} title={it.card.title}>
            <CardThumb card={it.card} shiny={it.is_shiny} />
            <span class="tmini-t">{it.card.title}</span>
            <span class="tmini-v">{val != null ? `${nf(val)} pts` : ""}</span>
          </button>
        {/each}
        {#if open && items.length > limit}<span class="tmini-more" use:inView={{ onEnter: () => (limit += STEP), key: limit }}></span>{/if}
      </div>
      {#if !open && items.length > PREVIEW}<button class="btn tmini-all" onclick={() => (open = true)}>Voir les {items.length} cartes</button>{/if}
    {/if}
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
