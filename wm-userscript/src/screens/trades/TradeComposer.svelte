<script>
  // Propose a trade to a friend, or counter an offer. First the friend (a small dialog), then a
  // near full-screen workspace: the card grid of one side (a tab per side) on the left, the offer
  // being built on the right (both sides, their coins, the live verdict, the send button), always
  // in view. On a phone the offer is a bar at the bottom that opens into the full panel.
  import { sounded } from "../../sound/sfx.js";
  import { untrack } from "svelte";
  import Avatar from "../../components/Avatar.svelte";
  import CardPicker from "./CardPicker.svelte";
  import CoinsField from "./CoinsField.svelte";
  import Icon from "../../components/Icon.svelte";
  import OfferSide from "./OfferSide.svelte";
  import TradeVerdict from "./TradeVerdict.svelte";
  import { anchorCentered } from "../../lib/anchor.js";
  import { withHumanCheck } from "../../lib/humanCheck.js";
  import { PageStream } from "../../lib/paged.svelte.js";
  import { valueMap } from "../../lib/lazyValues.js";
  import { nf } from "../../lib/format.js";
  import { scrollFade } from "../../lib/scrollFade.js";
  import SearchBox from "../../components/SearchBox.svelte";
  import { data, normSearch, SIDE, pageLane, myCardsPage, sideValue, verdict, balanceLabel, offerSummary } from "../../wm/index.js";
  // balance: my WikiBidous (null while unknown), the coins I add cannot exceed it
  // onsent(ok): the offer went through (true), or the server answered with an error (false: it may exist anyway)
  let { counter = null, balance = null, onclose, onsent } = $props();

  // writable deriveds: a counter-offer fills them in, the player edits them from there
  // a counter-offer answers the other player: their copies stay theirs, mine stay mine
  let friend = $derived(counter?.other ?? null);
  let friends = $state(null);
  let friendsError = $state(""); // a failed load is not "no friends"
  function loadFriends() {
    friends = null; friendsError = "";
    data.friends().then((f) => (friends = f), (e) => (friendsError = e.message || "Impossible de charger vos amis."));
  }
  $effect(() => { if (!friend) untrack(loadFriends); });
  // many friends: by name, and a search once they no longer fit at a glance
  const FRIEND_SEARCH_FROM = 8;
  let who = $state("");
  const pickable = $derived((friends ?? []).filter((f) => !who.trim() || normSearch(f.username).includes(normSearch(who))).sort((a, b) => a.username.localeCompare(b.username, "fr", { sensitivity: "base" })));

  // Each side a page at a time as its grid scrolls, searched, filtered and sorted by the server
  // (the picker's onquery), whatever the size of the collection. The first page answers the
  // player; the next ones (scrolling, the value sort) go through the page lane.
  function side(fetchPage) {
    let query = {};
    const stream = new PageStream((page) => (page ? pageLane.run(() => fetchPage(page, query)) : fetchPage(page, query)));
    return { stream, ask: (q) => { query = q; stream.reset(); } };
  }
  const mine = side((page, q) => myCardsPage({ page, ...q }));
  const theirs = side((page, q) => data.profileCollection(friend.username, { page, ...q }));
  mine.stream.reset();
  $effect(() => { if (friend) untrack(() => theirs.stream.reset()); });

  const asItem = (row) => ({ userCardId: row.id, card: row.card, is_shiny: row.is_shiny });
  let give = $derived(new Map((counter?.give ?? []).map((it) => [it.userCardId, it])));
  let get = $derived(new Map((counter?.get ?? []).map((it) => [it.userCardId, it])));
  let giveCoins = $derived(counter?.giveCoins ?? 0);
  let getCoins = $derived(counter?.getCoins ?? 0);
  let tab = $state("mine");
  let sheet = $state(false); // phone: the offer panel is open over the grid
  let busy = $state(false);
  let msg = $state("");

  // the countered offer locks its own copies until it is answered: they stay pickable here
  const countered = $derived(new Set([...(counter?.give ?? []), ...(counter?.get ?? [])].map((it) => it.userCardId)));
  const lockedBut = (ids) => new Set([...ids].filter((id) => !countered.has(id)));
  const myLocked = $derived(lockedBut(mine.stream.meta?.pending ?? []));
  const theirLocked = $derived(lockedBut(theirs.stream.meta?.pending ?? []));
  const toggle = (map, row) => { const m = new Map(map); m.has(row.id) ? m.delete(row.id) : m.set(row.id, asItem(row)); return m; };
  const without = (map, it) => { const m = new Map(map); m.delete(it.userCardId); return m; };
  const coins = (n) => Math.max(0, Math.floor(+n || 0));
  const cardValues = valueMap();
  $effect(() => () => cardValues.destroy());
  const values = cardValues.values;
  const giveItems = $derived([...give.values()]);
  const getItems = $derived([...get.values()]);
  $effect(() => cardValues.load([...giveItems, ...getItems]));
  const v = $derived(verdict(sideValue(giveItems, coins(giveCoins), values), sideValue(getItems, coins(getCoins), values)));
  // each side needs a card or coins: no one-sided gift or request
  const oneSided = $derived(!(give.size || coins(giveCoins)) || !(get.size || coins(getCoins)));
  const tooPoor = $derived(balance != null && coins(giveCoins) > balance);
  const summary = $derived(offerSummary(give.size, coins(giveCoins), get.size, coins(getCoins)));
  const blocked = $derived(busy || oneSided || tooPoor);
  const sendTitle = $derived(tooPoor ? "Solde insuffisant" : oneSided ? "Ajoutez au moins une carte ou des wb de chaque côté" : undefined);
  const sendLabel = $derived(busy ? "Envoi..." : counter ? "Envoyer la contre-offre" : "Envoyer l'offre");
  const alert = $derived(tooPoor ? `Solde insuffisant : vous avez ${nf(balance)} wb.` : msg);
  const showTab = (t) => { tab = t; sheet = false; };

  async function send() {
    busy = true; msg = "";
    try {
      await sounded(() => withHumanCheck(() => data.proposeTrade({ to: friend.id, give: giveItems, get: getItems, giveCoins: coins(giveCoins), getCoins: coins(getCoins), parentId: counter?.id })));
      onsent?.(true); onclose?.();
    } catch (e) {
      msg = e.message;
      // the server answered: the offer may exist anyway (uncertain) or the parent may be settled
      if (e.status != null) onsent?.(false);
    } finally { busy = false; }
  }
  // never interrupts a write
  const close = () => !busy && onclose?.();
  // Escape folds the phone's offer panel first
  const onKey = (e) => { if (e.key !== "Escape") return; if (sheet) sheet = false; else close(); };
</script>

<svelte:window onkeydown={onKey} />

<div class="modal-backdrop" role="presentation" onclick={(e) => e.target === e.currentTarget && close()}>
  <div class="modal composer" class:pick-friend={!friend} role="dialog" aria-modal="true" aria-labelledby="wm-compose-title" tabindex="-1" use:anchorCentered>
    <button class="modal-close" disabled={busy} onclick={close} aria-label="Fermer"><Icon name="close" width={2} class="x-ico" /></button>
    <header class="tm-head">
      {#if friend}<Avatar user={friend} size={36} />{/if}
      <h2 id="wm-compose-title">{!friend ? "Proposer un échange" : counter ? `Contre-offre à ${friend.username}` : `Échanger avec ${friend.username}`}</h2>
    </header>
    {#if !friend}
      <p class="composer-sub">Avec qui voulez-vous échanger ?</p>
      {#if (friends?.length ?? 0) > FRIEND_SEARCH_FROM}<SearchBox bind:value={who} placeholder="Chercher un ami..." />{/if}
      <div class="friend-list">
        {#each pickable as f (f.id)}<button class="friend" onclick={() => (friend = f)}><Avatar user={f} size={52} /><b>{f.username}</b></button>{/each}
        {#if friendsError}<div class="empty"><b>{friendsError}</b><button class="btn" onclick={loadFriends}>Réessayer</button></div>
        {:else if friends && !friends.length}<div class="empty"><b>Aucun ami pour l'instant.</b></div>
        {:else if friends && !pickable.length}<div class="empty"><b>Aucun ami ne s'appelle ainsi.</b></div>
        {:else if !friends}<div class="loading-more"><span class="spin"></span></div>{/if}
      </div>
    {:else}
      <!-- both pickers stay mounted: switching keeps each one's search, filter and scroll -->
      <div class="composer-pick">
        {#snippet tabs()}
          <div class="modal-tabs composer-tabs" role="tablist">
            <button role="tab" aria-selected={tab === "mine"} class:on={tab === "mine"} onclick={() => showTab("mine")}>Mes cartes{#if give.size}<span class="tab-n">{give.size}</span>{/if}</button>
            <button role="tab" aria-selected={tab === "theirs"} class:on={tab === "theirs"} onclick={() => showTab("theirs")}>Cartes de {friend.username}{#if get.size}<span class="tab-n">{get.size}</span>{/if}</button>
          </div>
        {/snippet}
        {#snippet picker({ stream, ask }, picked, locked, onpick)}
          <CardPicker lead={tabs} items={stream.items} {picked} {locked} {onpick} loading={stream.loading && stream.first} error={stream.error && !stream.started} onretry={() => stream.reset()}
            {values} watch={cardValues.watch} load={cardValues.load} onquery={ask}
            more={stream.hasMore ? () => stream.more() : null} loadingMore={stream.loading && !stream.first} moreError={stream.error && stream.started} />
        {/snippet}
        <div class="composer-tab" role="tabpanel" hidden={tab !== "mine"}>
          {@render picker(mine, give, myLocked, (row) => (give = toggle(give, row)))}
        </div>
        <div class="composer-tab" role="tabpanel" hidden={tab !== "theirs"}>
          {@render picker(theirs, get, theirLocked, (row) => (get = toggle(get, row)))}
        </div>
      </div>
      <aside class="offer" class:open={sheet} aria-label="Votre offre">
        <div class="offer-bar">
          <button class="offer-peek" onclick={() => (sheet = !sheet)} aria-expanded={sheet}>
            <span class="offer-peek-txt"><b>{summary ?? "Votre offre"}</b>{#if alert}<span class="modal-msg">{alert}</span>{:else}<span data-k={summary ? v.kind : null}>{summary ? balanceLabel(v) : "Choisissez des cartes de chaque côté"}</span>{/if}</span>
            <Icon name="next" class="offer-chev" />
          </button>
          <button class="btn primary" disabled={blocked} title={sendTitle} onclick={send}>{busy ? "Envoi..." : "Envoyer"}</button>
        </div>
        <div class="offer-panel">
          <h3 class="offer-title">Votre offre</h3>
          <div class="offer-sides" use:scrollFade={{ axis: "y" }}>
            <OfferSide label={SIDE.give} items={giveItems} bind:coins={giveCoins} max={balance ?? undefined} coinsLabel="Ajouter des WB" {values}
              hint="Choisissez dans Mes cartes" onhint={() => showTab("mine")} onremove={(it) => (give = without(give, it))} />
            <OfferSide label={SIDE.get} items={getItems} bind:coins={getCoins} coinsLabel="Demander des WB" {values}
              hint="Choisissez dans les cartes de {friend.username}" onhint={() => showTab("theirs")} onremove={(it) => (get = without(get, it))} />
          </div>
          <div class="offer-sum">
            {#if summary}<TradeVerdict {v} />{:else}<p class="offer-sum-empty">L'équilibre de l'échange s'affiche ici dès que vous choisissez des cartes.</p>{/if}
            {#if alert}<div class="modal-msg">{alert}</div>{/if}
          </div>
          <div class="offer-actions">
            <button class="btn" disabled={busy} onclick={close}>Annuler</button>
            <button class="btn primary" disabled={blocked} title={sendTitle} onclick={send}>{sendLabel}</button>
          </div>
        </div>
      </aside>
    {/if}
  </div>
</div>
