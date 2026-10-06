<script>
  // One side of the offer being composed: the picked cards as compact rows (thumbnail, name, value,
  // remove), that side's WikiBidous and its estimated total. Empty, it is a one-line hint that opens
  // the matching tab of the picker.
  import CardThumb from "./CardThumb.svelte";
  import CoinsField from "./CoinsField.svelte";
  import Icon from "./Icon.svelte";
  import { sideValue } from "../wm/index.js";
  import { nf } from "./format.js";
  // coinsLabel/max: the CoinsField of this side (max = my balance on my side)
  let { label, items, coins = $bindable(0), max = undefined, coinsLabel, values, hint, onhint, onremove } = $props();
  const value = $derived(sideValue(items, Math.max(0, Math.floor(+coins || 0)), values));
</script>

<section class="oside">
  <header class="oside-head">
    <span>{label}{#if items.length}<span class="tab-n">{items.length}</span>{/if}</span>
    {#if items.length || value.total}<span class="oside-total">{value.unknown ? "≈ " : ""}{nf(value.total)} pts</span>{/if}
  </header>
  {#if items.length}
    <ul class="oside-list">
      {#each items as it (it.userCardId)}
        {@const v = values.get(it.card.id)}
        <li class="oside-row">
          <CardThumb card={it.card} shiny={it.is_shiny} />
          <!-- the value under the name, not beside it: the name keeps the row's width -->
          <span class="oside-txt" title={it.card.category ? `${it.card.title}, ${it.card.category}` : it.card.title}><b>{it.card.title}</b>
            <span class="oside-sub"><span class="oside-val" class:none={v == null}>{v == null ? "?" : nf(v)}</span>{#if it.card.category}<span class="oside-cat">{it.card.category}</span>{/if}</span></span>
          <button class="oside-x" onclick={() => onremove(it)} aria-label="Retirer {it.card.title}" title="Retirer"><Icon name="close" width={2} /></button>
        </li>
      {/each}
    </ul>
  {:else}
    <button class="oside-hint" onclick={onhint}>{hint}</button>
  {/if}
  <CoinsField bind:value={coins} {max} label={coinsLabel} />
</section>
