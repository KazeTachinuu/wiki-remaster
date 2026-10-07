<script>
  // One of my copies, picked from my whole collection (searched, filtered and ordered by the
  // server, a page at a time): for a place of the showcase, or the card my avatar is cut from.
  // `blocked(row)`: why that copy cannot be picked, or null.
  import Icon from "../../components/Icon.svelte";
  import CardPicker from "../trades/CardPicker.svelte";
  import { PageStream } from "../../lib/paged.svelte.js";
  import { valueMap } from "../../lib/lazyValues.js";
  import { anchorCentered } from "../../lib/anchor.js";
  import { pageLane, myCardsPage } from "../../wm/index.js";

  let { title, sub = "", blocked = () => null, onpick, onclose } = $props();

  let query = {};
  const stream = new PageStream((page) => (page ? pageLane.run(() => myCardsPage({ page, ...query })) : myCardsPage({ page, ...query })));
  stream.reset();
  const ask = (q) => { query = q; stream.reset(); };
  const cardValues = valueMap();
  $effect(() => () => cardValues.destroy());
  const locked = $derived(new Set(stream.items.filter((r) => blocked(r)).map((r) => r.id)));
  const onKey = (e) => e.key === "Escape" && onclose?.();
</script>

<svelte:window onkeydown={onKey} />

<div class="modal-backdrop" role="presentation" onclick={(e) => e.target === e.currentTarget && onclose?.()}>
  <div class="modal pf-pick" role="dialog" aria-modal="true" aria-labelledby="wm-pick-title" tabindex="-1" use:anchorCentered>
    <button class="modal-close" onclick={onclose} aria-label="Fermer"><Icon name="close" width={2} class="x-ico" /></button>
    <header class="pf-pick-head"><h2 id="wm-pick-title">{title}</h2>{#if sub}<span>{sub}</span>{/if}</header>
    <CardPicker items={stream.items} picked={new Set()} {locked} onpick={(row) => onpick(row)}
      loading={stream.loading && stream.first} error={stream.error && !stream.started} onretry={() => stream.reset()}
      values={cardValues.values} watch={cardValues.watch} load={cardValues.load} onquery={ask}
      more={stream.hasMore ? () => stream.more() : null} loadingMore={stream.loading && !stream.first} moreError={stream.error && stream.started}
      lockReason={(r) => blocked(r)} lockTitle={(r) => blocked(r)} />
  </div>
</div>
