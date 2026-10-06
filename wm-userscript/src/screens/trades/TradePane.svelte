<script>
  // One trade in full, as the right pane of Échanges (full screen on a phone, with a back button):
  // both sides with big cards showing their value, the verdict between them, the negotiation
  // history, and the actions (accept, counter, decline, cancel), each confirmed by restating what
  // moves. "Discussion" swaps the trade for the conversation with the other player.
  import { sounded } from "../../sound/sfx.js";
  import Avatar from "../../components/Avatar.svelte";
  import TradeSide from "./TradeSide.svelte";
  import TradeVerdict from "./TradeVerdict.svelte";
  import TradeChat from "./TradeChat.svelte";
  import CardModal from "../../components/CardModal.svelte";
  import Icon from "../../components/Icon.svelte";
  import { withHumanCheck } from "../../lib/humanCheck.js";
  import { dealLayout, sideShape, DEAL } from "./dealLayout.js";
  import { data, SIDE, forgetCollection, sideValue, verdict, chainOf, timeline, dealLine, statusLabel } from "../../wm/index.js";
  import { ago, nf } from "../../lib/format.js";
  // mode: "trade" | "chat", kept by the screen so it survives a change of trade
  // ondone: the trade was answered (success); onchanged: reload (the outcome may be unknown)
  let { trade: t, all = [], values, mode = $bindable("trade"), onback = null, ondone, onchanged, oncounter, onopentrade } = $props();

  let ask = $state(null); // "accept" | "decline" | "cancel" | null
  let busy = $state(false);
  let msg = $state("");
  let card = $state(null);
  // the offer on show: the latest by default, or an earlier one picked in the negotiation
  // (an id of another negotiation finds nothing here, so switching trades shows the latest)
  let viewing = $state(null);
  const chain = $derived(chainOf(t, all));
  const steps = $derived(timeline(chain));
  const o = $derived(chain.find((c) => c.id === viewing) ?? t);
  const earlier = $derived(o.id !== t.id);
  const v = $derived(verdict(sideValue(o.give, o.giveCoins, values), sideValue(o.get, o.getCoins, values)));
  const canAnswer = $derived(t.status === "pending" && t.incoming);
  const canCancel = $derived(t.status === "pending" && !t.incoming);
  const ACT = { accept: ["Accepter l'échange", "primary"], decline: ["Refuser l'échange", "danger"], cancel: ["Annuler l'offre", "danger"] };
  // every card of the trade at one size, as large as the pane allows (see dealLayout)
  let box = $state(null);
  // the negotiation fits beside it (see `lay`), else it scrolls below
  let chainH = $state(0);
  let earlierH = $state(0); // the "earlier offer" banner, when shown, takes its share of the height
  const lay = $derived.by(() => {
    if (!box) return null;
    const shape = [sideShape(o.give, o.giveCoins), sideShape(o.get, o.getCoins)];
    const h = box.height - (earlier ? earlierH + DEAL.bodyGap : 0);
    const all = dealLayout(box.width, h, ...shape);
    if (!chainH) return all;
    const both = dealLayout(box.width, h - chainH - DEAL.bodyGap, ...shape);
    // with several offers the timeline is how you move between them: it stays in view whenever the
    // cards still fit; a lone offer's history only does if it costs the cards little
    return both.fits && (chain.length > 1 || both.w >= all.w * DEAL.keepChain) ? both : all;
  });
  const slim = (cols) => !lay?.stacked && (cols ?? 1) * (lay?.w ?? 0) < DEAL.headWrapBelow;
  const dealVars = ["gap", "pad", "chip", "verdictW", "verdictH", "bodyGap"].map((k) => `--deal-${k}:${DEAL[k]}px`).join(";");
  const moves = (items, coins) => `${items.length} carte${items.length > 1 ? "s" : ""}${coins ? ` + ${nf(coins)} WikiBidous` : ""}`;

  async function act(action) {
    busy = true; msg = "";
    try {
      const write = () => withHumanCheck(() => data.tradeAction(t.id, action));
      await (action === "accept" ? sounded(write) : write());
      if (action === "accept") forgetCollection(); // cards changed hands
      ondone?.(t);
    } catch (e) {
      msg = e.message;
      // any answer from the server (a refusal like "no longer pending", or a failure with an
      // unknown outcome) means our copy may be stale: reload to show the real status. Only a
      // cancelled human check (no `status`) is known to have changed nothing.
      if (e.status != null) onchanged?.();
    } finally { busy = false; ask = null; }
  }
  // Escape: whatever sits over the pane (card detail, composer, shortcuts) closes itself first;
  // then an open confirmation is dismissed; then the phone view goes back to the list. Checked on
  // the DOM, which still holds an overlay closed by an earlier listener of this same key press.
  let root = $state(null);
  const OVERLAYS = ".modal-backdrop, .kbd-help-scrim, .notif-scrim";
  function onKey(e) {
    if (e.key !== "Escape" || busy || e.defaultPrevented || card || root?.getRootNode().querySelector(OVERLAYS)) return;
    if (ask) ask = null;
    else onback?.();
  }
</script>

<svelte:window onkeydown={onKey} />

<section class="tp" aria-labelledby="wm-tp-title" bind:this={root}>
  <header class="tp-head">
    {#if onback}<button class="iconbtn tp-back" disabled={busy} onclick={onback} aria-label="Retour à la liste"><Icon name="prev" width={2} /></button>{/if}
    <Avatar user={t.other} size={44} />
    <div class="tp-title">
      <h2 id="wm-tp-title">Échange avec {t.other.username}</h2>
      <span class="tp-sub"><span class="trade-status" data-s={t.status}>{statusLabel(t.status)}</span><span class="nowrap">{t.incoming ? "Reçu" : "Envoyé"} {ago(t.createdAt)}</span></span>
    </div>
    <div class="modal-tabs tp-mode" role="tablist" aria-label="Affichage">
      <button role="tab" aria-selected={mode === "trade"} class:on={mode === "trade"} onclick={() => (mode = "trade")}><Icon name="trades" />Échange</button>
      <button role="tab" aria-selected={mode === "chat"} class:on={mode === "chat"} onclick={() => (mode = "chat")}><Icon name="dms" />Discussion</button>
    </div>
  </header>

  {#if mode === "chat"}
    <!-- one instance per partner: a switch must not show the previous feed or take its late polls -->
    {#key t.other.id}<TradeChat friend={t.other} {onopentrade} />{/key}
  {:else}
    <div class="tp-body" bind:contentRect={box} style="{dealVars};--card-w:{lay?.w ?? DEAL.min}px">
      {#if earlier}
        <p class="tp-earlier" bind:offsetHeight={earlierH}><span><b>{steps.find((s) => s.offer?.id === o.id)?.text} {steps.find((s) => s.offer?.id === o.id)?.by}</b>, {ago(o.createdAt)}: une offre précédente.</span><button class="btn" onclick={() => (viewing = null)}>Voir la dernière offre</button></p>
      {/if}
      <div class="tp-sides" class:stacked={lay?.stacked} class:scrolls={lay && !lay.fits} class:measuring={!lay}>
        <TradeSide label={SIDE.give} items={o.give} coins={o.giveCoins} cols={lay?.give} narrow={slim(lay?.give)} {values} onopen={(it) => (card = it)} />
        <TradeVerdict {v} />
        <TradeSide label={SIDE.get} items={o.get} coins={o.getCoins} cols={lay?.get} narrow={slim(lay?.get)} {values} onopen={(it) => (card = it)} />
      </div>
      {#if steps.length > 2 || t.status !== "pending"}
        <section class="tp-chain" bind:offsetHeight={chainH}>
          <h3>Négociation</h3>
          <ol>
            {#each steps as s, i (i)}
              <li data-k={s.kind} class:now={i === steps.length - 1}>
                {#if s.offer}
                  <!-- an offer step shows its deal, and its cards above once picked -->
                  <button class="tp-step" class:on={s.offer.id === o.id} aria-pressed={s.offer.id === o.id} onclick={() => (viewing = s.offer.id)}>
                    <span class="tp-chain-what"><b>{s.text}</b> {s.by}<span class="tp-step-deal">{dealLine(s.offer.give.length, s.offer.giveCoins, s.offer.get.length, s.offer.getCoins)}</span></span>
                    <span class="nowrap tp-chain-when">{ago(s.at)}</span>
                  </button>
                {:else}
                  <span class="tp-chain-what"><b>{s.text}</b> {s.by}</span>
                  {#if s.at}<span class="nowrap tp-chain-when">{ago(s.at)}</span>{/if}
                {/if}
              </li>
            {/each}
          </ol>
        </section>
      {/if}
    </div>
    {#if !earlier && (ask || canAnswer || canCancel || msg)}
      <footer class="tp-foot">
        {#if ask}
          <div class="tp-confirm" role="alertdialog" aria-label="Confirmation">
            <p class="confirm-text">
              <!-- only accepting moves anything: refusing or cancelling must not read as a cost -->
              {#if ask === "accept"}Accepter l'échange ? Vous donnez <b>{moves(t.give, t.giveCoins)}</b> et recevez <b>{moves(t.get, t.getCoins)}</b>.
              {:else if ask === "decline"}Refuser l'offre de {t.other.username} ? Aucune carte ni WikiBidou ne sera échangé.
              {:else}Annuler votre offre à {t.other.username} ? Aucune carte ni WikiBidou ne sera échangé.{/if}
            </p>
            <div class="tp-actions">
              <button class="btn" disabled={busy} onclick={() => (ask = null)}>Retour</button>
              <button class="btn {ACT[ask][1]}" disabled={busy} onclick={() => act(ask)}>{busy ? "Envoi..." : ACT[ask][0]}</button>
            </div>
          </div>
        {:else}
          {#if msg}<div class="modal-msg tp-msg" role="alert">{msg}</div>{/if}
          {#if canAnswer}
            <div class="tp-actions">
              <button class="btn danger" onclick={() => (ask = "decline")}>Refuser</button>
              {#if oncounter}<button class="btn" onclick={() => oncounter(t)}>Contre-offre</button>{/if}
              <button class="btn primary" onclick={() => (ask = "accept")}>Accepter</button>
            </div>
          {:else if canCancel}
            <div class="tp-actions"><button class="btn danger" onclick={() => (ask = "cancel")}>Annuler l'offre</button></div>
          {/if}
        {/if}
      </footer>
    {/if}
  {/if}
</section>

{#if card}<CardModal item={{ card: card.card, is_shiny: card.is_shiny }} readonly onclose={() => (card = null)} />{/if}
