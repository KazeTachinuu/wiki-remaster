<script>
  // A collection by rarity: one bar in the rarities' colours, then each count. `counts`: rarity -> n.
  import { RARITIES_DESC, RNAME } from "../wm/index.js";
  import { nf } from "../lib/format.js";
  let { counts } = $props();
</script>

<div class="pf-bar" aria-hidden="true">
  {#each RARITIES_DESC as r (r)}{#if counts[r]}<span data-r={r} style:flex-grow={counts[r]}></span>{/if}{/each}
</div>
<div class="pf-counts">
  {#each RARITIES_DESC as r (r)}<span class="pf-count" data-r={r}><i></i>{RNAME[r]}<b>{nf(counts[r] ?? 0)}</b></span>{/each}
</div>
