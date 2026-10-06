<script>
  // The rarity filter as a row of chips: "Toutes", then each rarity with its colour dot. `value` is
  // the chosen rarity ("" for all); a second click on a chip goes back to all. With `counts`, a
  // rarity you have none of is left out and each chip shows its count (`total` on "Toutes").
  // `scroll` (the picker; scrollRow): when too narrow, the row takes a line of its own, then
  // shortens to codes. Extra chips go after a divider through `children` (the collection's
  // favourites and shinies).
  import { RARITIES_DESC, RNAME } from "../wm/index.js";
  import { nf } from "../lib/format.js";
  import { scrollRow } from "../lib/scrollRow.js";
  let { value = "", onchange, counts = null, total = null, scroll = false, class: cls = "", children } = $props();
  const row = (node, on) => (on ? scrollRow(node) : undefined);
</script>

<div class="rarity-legend {cls}" use:row={scroll}>
  <button class="rl" class:on={!value} onclick={() => onchange("")}>
    <span class="rl-name">Toutes</span>{#if total != null}<span class="rl-n">{nf(total)}</span>{/if}
  </button>
  {#each RARITIES_DESC as r}
    {#if !counts || counts[r]}
      <button class="rl" class:on={value === r} onclick={() => onchange(value === r ? "" : r)} title={RNAME[r]}>
        <span class="rl-dot" style="background:var(--r-{r.toLowerCase()})"></span>
        <span class="rl-name rl-full">{RNAME[r]}</span><span class="rl-code" aria-hidden="true">{r}</span>{#if counts}<span class="rl-n">{nf(counts[r])}</span>{/if}
      </button>
    {/if}
  {/each}
  {#if children}<span class="rl-sep" aria-hidden="true"></span>{@render children()}{/if}
</div>
