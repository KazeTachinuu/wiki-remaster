<script>
  // Every live listing of one card, side by side: price, gap to the cheapest of its finish, time
  // left, seller. Shared by the auction (the one open is "Celle-ci") and the card detail.
  // listings: normalized auctions of the card (null while searching); current: the auction on
  // show, if any; soldAvg: its market price (the median of its sales on a Pro account, else the game's average), for the summary; onpick(row): a listing chosen.
  import Icon from "./Icon.svelte";
  import { compareListings } from "../wm/compare.js";
  import { nf, countdown, secondsUntil } from "../lib/format.js";
  let { listings, current = null, soldAvg = null, now, onpick } = $props();

  const all = $derived(listings && (current ? [current, ...listings.filter((o) => o.id !== current.id)] : listings));
  const cmp = $derived(all && compareListings(all, now));
  // the one open does not count as "another" listing to compare with
  const others = $derived(cmp ? cmp.rows.length - (current ? 1 : 0) : 0);
</script>

<section class="auc-panel cmp" aria-label="Ventes en cours de cette carte">
  <div class="cmp-head">
    <h3>Ventes en cours</h3>
    {#if cmp && cmp.stats.count > 1}
      <span class="cmp-sum">{cmp.stats.count} en vente · dès <b>{nf(cmp.stats.min)}</b> · moyenne <b>{nf(cmp.stats.avg)}</b>{#if soldAvg != null}{" "}· prix du marché <b>{nf(soldAvg)}</b>{/if}</span>
    {/if}
  </div>
  {#if !cmp}
    <ol class="cmp-list" aria-label="Recherche des ventes en cours">{#each Array(3) as _}<li><div class="cmp-row sk"></div></li>{/each}</ol>
  {:else if !others}
    <div class="auc-empty">{current ? "C'est la seule vente de cette carte en ce moment." : "Aucune vente de cette carte en ce moment."}{#if soldAvg != null}{" "}Prix du marché : {nf(soldAvg)}.{/if}</div>
  {:else}
    <ol class="cmp-list">
      {#each cmp.rows as r (r.id)}
        {@const left = secondsUntil(r.endAt, now) ?? 0}
        {@const here = r.id === current?.id}
        <li>
          <button class="cmp-row" class:here disabled={here} onclick={() => onpick?.(r)} aria-label="{nf(r.price)} WikiBidous, se termine dans {countdown(left)}">
            <span class="cmp-price"><span class="auc-coin"></span>{nf(r.price)}{#if r.is_shiny}<span class="cmp-shiny" title="Brillante"><Icon name="sparkle" width={2} /></span>{/if}</span>
            <span class="cmp-gap" class:best={r.cheapest && !r.is_shiny}>{r.cheapest ? (r.is_shiny ? "Brillante" : "Le moins cher") : `+${nf(r.gap)}`}</span>
            <span class="cmp-time" class:soon={left < 3600}>{countdown(left)}{#if r.soonest}<span class="cmp-tag">Finit en premier</span>{/if}</span>
            <span class="cmp-who">{here ? "Celle-ci" : r.mine ? "Votre vente" : r.seller || ""}</span>
          </button>
        </li>
      {/each}
    </ol>
  {/if}
</section>
