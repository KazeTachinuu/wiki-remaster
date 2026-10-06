<script>
  // An auction's price, for a bidder: is it a good deal (a sentence and the market gauge), is it
  // heating up (bids per half-hour over the sale), against whom (one lane per bidder on the same
  // timeline). No price curve: an auction's price only goes up. `focus` (bindable) is the bidder
  // hovered, so the bid list beside it can light their bids.
  import Avatar from "./Avatar.svelte";
  import { dealOf, gaugeOf, paceOf, biddersOf } from "../wm/auction.js";
  import { nf } from "../lib/format.js";

  // a: the auction; phase: live | closing | sold | unsold | cancelled; seller: the sale is mine
  let { a, bids, phase, market = null, me = null, seller = false, now = Date.now(), focus = $bindable(null) } = $props();

  const start = $derived(Date.parse(a.createdAt) || Date.parse(bids.at(-1)?.at) || now);
  const end = $derived(Date.parse(a.endAt) || now);
  const price = $derived(a.bid ?? a.base);
  const deal = $derived(dealOf(price, market));
  const myBest = $derived(me ? Math.max(0, ...bids.filter((b) => b.bidderId === me).map((b) => b.amount)) || null : null);
  const gauge = $derived(gaugeOf(price, market, myBest && myBest !== price ? myBest : null));
  const pace = $derived(paceOf(bids, start, end, now));
  const lastHour = $derived(bids.filter((b) => now - Date.parse(b.at) < 3600e3).length);
  const racers = $derived(biddersOf(bids, start, end, me, 4));
  const leaderId = $derived(a.currentBidderId ?? null);
  const live = $derived(phase === "live");

  // the sentence: the deal first, then where I stand
  const where = $derived.by(() => {
    if (phase === "sold") return `Vendue ${nf(price)} pts.`;
    if (phase === "unsold" || phase === "cancelled") return phase === "unsold" ? "Personne n'a enchéri." : "Vente annulée.";
    if (seller) return bids.length ? `${bids.length} enchère${bids.length > 1 ? "s" : ""} sur votre carte.` : "Pas encore d'enchère sur votre carte.";
    if (leaderId && leaderId === me) return "Vous menez.";
    if (myBest) return `Vous étiez à ${nf(myBest)} : il faut ${nf(price + 1)} pour reprendre la tête.`;
    return bids.length ? "" : "Personne n'a encore enchéri.";
  });
  const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const when = (t) => new Date(t).toLocaleString("fr", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
</script>

<section class="auc-panel ap" aria-label="Le prix">
  <div class="ap-head">
    <h3>Le prix</h3>
    {#if deal}<span class="ap-chip" data-z={deal.zone}>{deal.gap}</span>{/if}
  </div>
  {#if deal || where}<p class="ap-verdict">{#if deal}<b>{capital(deal.word)}.</b>{/if} {where}</p>{/if}

  {#if gauge}
    <div class="ap-gauge" role="img" aria-label="{nf(price)} points, {deal.gap} ({nf(market)})">
      <div class="ap-zones">
        <!-- a zone names itself when it is wide enough; the market's own tick names the narrow one -->
        {#each gauge.zones as z (z.id)}<span data-z={z.id} style:left="{z.from}%" style:width="{z.to - z.from}%">{#if z.to - z.from >= 20}<em>{z.label}</em>{/if}</span>{/each}
      </div>
      <span class="ap-mark market" style:left="{gauge.market}%"><b>marché {nf(market)}</b></span>
      {#if gauge.mine != null}<span class="ap-mark mine" style:left="{gauge.mine}%" title="Votre meilleure enchère : {nf(myBest)}"></span>{/if}
      <span class="ap-mark price" class:flip={gauge.price > 85} style:left="{gauge.price}%"><b>{nf(price)}</b></span>
    </div>
  {/if}

  {#if bids.length}
    <div class="ap-sub">
      <span class="mk-h">Rythme</span>
      <span class="ap-facts"><b>{bids.length}</b> enchère{bids.length > 1 ? "s" : ""}{#if live}<span class="ap-dot">·</span><span class:hot={lastHour >= 5}>{lastHour} dans l'heure</span>{/if}</span>
    </div>
    <div class="ap-pace" aria-hidden="true">
      {#each pace.counts as c, i (i)}<span class:hot={c / pace.top > 0.6} style:height="{c ? Math.max(10, (c / pace.top) * 100) : 0}%"></span>{/each}
      {#if live}<i class="ap-now" style:left="{pace.now}%"></i>{/if}
    </div>
    <!-- live: the opening and now (the end is in the countdown above); over: the opening and the end -->
    <div class="ap-axis"><span>{when(start)}</span>{#if live}<span class="ap-axis-now" style:left="{pace.now}%">maintenant</span>{:else}<span>terminée {when(end)}</span>{/if}</div>

    <div class="ap-sub">
      <span class="mk-h">Enchérisseurs</span>
      <span class="ap-facts"><b>{racers.total}</b></span>
    </div>
    <div class="ap-lanes">
      {#each racers.shown as e (e.id)}
        <div class="ap-lane" class:lead={e.id === leaderId} class:mine={e.mine} role="listitem" tabindex="0"
          aria-label="{e.mine ? 'Vous' : e.name} : {e.count} enchère{e.count > 1 ? 's' : ''}, meilleure {nf(e.best)}"
          onpointerenter={() => (focus = e.id)} onpointerleave={() => focus === e.id && (focus = null)} onfocus={() => (focus = e.id)} onblur={() => (focus = null)}>
          <Avatar user={{ username: e.name }} size={20} />
          <span class="ap-name">{e.mine ? "Vous" : e.name}</span>
          <span class="ap-track">{#each e.at as x, i (i)}<i style:left="{x}%"></i>{/each}{#if live}<i class="ap-track-now" style:left="{pace.now}%"></i>{/if}</span>
          <b class="ap-best">{nf(e.best)}</b>
        </div>
      {/each}
      {#if racers.others}<p class="ap-more">+ {racers.others} autre{racers.others > 1 ? "s" : ""} enchérisseur{racers.others > 1 ? "s" : ""}</p>{/if}
    </div>
  {/if}
</section>
