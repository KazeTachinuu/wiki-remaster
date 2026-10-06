<script>
  // Échanges as a list and a preview: on the left the tabs and one compact row per trade (who,
  // when, what moves, how fair), on the right the selected trade in full (TradePane), with its
  // actions and the conversation, from 1000px wide. Narrower screens show the list alone; a row opens the same pane
  // full screen. The header opens the composer (TradeComposer).
  import { tick } from "svelte";
  import Avatar from "../../components/Avatar.svelte";
  import TradePane from "./TradePane.svelte";
  import TradeComposer from "./TradeComposer.svelte";
  import Icon from "../../components/Icon.svelte";
  import { valueMap } from "../../lib/lazyValues.js";
  import { inView } from "../../lib/inView.js";
  import SearchBox from "../../components/SearchBox.svelte";
  import { reuse } from "../../lib/reuse.js";
  import { data, normSearch, tradeTabs, chainOf, roundsOf, sideValue, verdict, balanceBadge, balanceLabel, statusLabel, dealLine, stepIn, afterLeaving } from "../../wm/index.js";
  import { ago } from "../../lib/format.js";
  let { profile, onwallet } = $props();

  const TABS = [["incoming", "Reçues"], ["outgoing", "Envoyées"], ["history", "Historique"]];
  const EMPTY = {
    incoming: ["Aucune offre reçue en attente.", "Les offres de vos amis apparaîtront ici."],
    outgoing: ["Aucune offre envoyée en attente.", "Proposez un échange à un ami pour commencer."],
    history: ["Aucun échange terminé pour l'instant.", "Les offres acceptées, refusées ou annulées apparaîtront ici."],
  };
  let tab = $state("incoming");
  let trades = $state(null);
  let error = $state(false);
  const cardValues = valueMap();
  $effect(() => () => cardValues.destroy());
  const values = cardValues.values;
  // the selected trade of each tab (null: the first one), and whether a phone shows it full screen
  let picks = $state({ incoming: null, outgoing: null, history: null });
  let reading = $state(false);
  let mode = $state("trade"); // the pane: the trade or the conversation
  // the composer: { counter } (null counter: a new offer). Raw: compared by identity
  let compose = $state.raw(null);
  let rowsEl = $state(null);

  async function load(quiet = false) {
    // unchanged trades keep their objects: a poll redraws only what changed
    try { trades = reuse(trades ?? [], await data.trades({ quiet })); error = false; }
    catch { if (!trades) error = true; }
  }
  load();
  // new offers appear without a reload (no realtime: the game's quota is full)
  $effect(() => { const t = setInterval(() => document.visibilityState === "visible" && load(true), 20000); return () => clearInterval(t); });

  const tabs = $derived(trades ? tradeTabs(trades) : null);
  const inTab = $derived(tabs?.[tab] ?? null);
  const roundCount = $derived(trades ? roundsOf(trades) : new Map()); // offers per negotiation, in one pass

  // Finding a trade in a long list: by friend, by any card in it (title or description), newest or
  // oldest first. Offered once a tab holds more than a handful.
  const FIND_FROM = 6;
  let search = $state("");
  let friend = $state(""); // a friend's id, "" for all
  let order = $state("new");
  const finding = $derived((inTab?.length ?? 0) > FIND_FROM);
  // every friend of this tab, the ones traded with most first, for the friend menu
  const friendsHere = $derived.by(() => {
    const n = new Map();
    for (const t of inTab ?? []) n.set(t.other.id, { f: t.other, n: (n.get(t.other.id)?.n ?? 0) + 1 });
    return [...n.values()].sort((a, b) => b.n - a.n || a.f.username.localeCompare(b.f.username, "fr", { sensitivity: "base" }));
  });
  const searchKey = (t) => normSearch([t.other.username, ...[...t.give, ...t.get].map((it) => `${it.card.title} ${it.card.category}`)].join(" "));
  const shown = $derived.by(() => {
    if (!inTab) return null;
    const q = normSearch(search);
    const hits = inTab.filter((t) => (!friend || t.other.id === friend) && (!q || searchKey(t).includes(q)));
    return order === "old" ? hits.reverse() : hits;
  });
  // a new tab starts unfiltered
  $effect(() => { void tab; search = ""; friend = ""; });

  // drawn as the list scrolls (hundreds of trades for a busy player), and always down to the one
  // selected (arrow keys move past the drawn rows)
  const STEP = 60;
  let more = $state(STEP);
  $effect(() => { void [tab, search, friend, order]; more = STEP; });
  const drawn = $derived(Math.max(more, (shown?.findIndex((t) => t.id === selected?.id) ?? -1) + 1));
  // a trade that left the tab since (answered elsewhere, or a failed action re-read) stays shown
  // with its real status until another is chosen
  const selected = $derived(shown && (trades.find((t) => t.id === picks[tab]) ?? shown[0] ?? null));
  const balance = (t) => verdict(sideValue(t.give, t.giveCoins, values), sideValue(t.get, t.getCoins, values));
  // card prices for what is on screen only: the drawn rows (their balance) and the open
  // negotiation's offers, never every card of every trade (thousands for a busy trader)
  $effect(() => {
    const open = selected && trades ? chainOf(selected, trades) : [];
    cardValues.load([...(shown ?? []).slice(0, drawn), ...open].flatMap((t) => [...t.give, ...t.get]));
  });
  // what each drawn row shows, computed here rather than in the markup
  const rows = $derived((shown ?? []).slice(0, drawn).map((t) => ({ t, b: balance(t), rounds: roundCount.get(t.id) ?? 1 })));
  const tabOf = (t) => (t.status !== "pending" ? "history" : t.incoming ? "incoming" : "outgoing");

  function select(t, open = true) {
    if (!t) return;
    picks[tab] = t.id;
    if (open) reading = true;
  }
  function changed() { load(); onwallet?.(); }
  // answered: the next offer of the tab takes its place (none: back to the list on a phone)
  function done(t) {
    const next = afterLeaving(shown, t.id);
    picks[tab] = next?.id ?? null;
    if (!next) reading = false;
    changed();
  }
  // the composer's send: a counter-offer that went through answers the countered trade; a failed
  // one (refused, or its outcome unknown) leaves the selection alone and only reloads
  const sent = (ok) => (ok && compose?.counter ? done(compose.counter) : changed());
  // a trade opened from the conversation: its tab, its row, its detail
  function openTrade(t) {
    const full = trades?.find((x) => x.id === t.id) ?? t;
    tab = tabOf(full);
    picks[tab] = full.id;
    mode = "trade";
  }
  // up/down move the selection, focus following
  async function onRowsKey(e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const t = stepIn(shown, selected?.id, e.key === "ArrowDown" ? 1 : -1);
    if (!t) return;
    select(t, false);
    await tick();
    rowsEl?.querySelector(`[data-id="${CSS.escape(t.id)}"]`)?.focus();
  }
</script>

{#snippet emptyState()}
  <div class="tr-empty">
    <span class="tr-empty-ico"><Icon name="trades" /></span>
    <b>{EMPTY[tab][0]}</b>
    <span>{EMPTY[tab][1]}</span>
    <button class="btn primary" onclick={() => (compose = { counter: null })}>Proposer un échange</button>
  </div>
{/snippet}

<div class="coll-head tr-head">
  <div><h1>Échanges</h1><div class="meta">Vos offres avec vos amis</div></div>
  <button class="btn primary" onclick={() => (compose = { counter: null })}><Icon name="trades" /> Proposer un échange</button>
</div>

{#if error}
  <div class="empty"><b>Échanges indisponibles pour le moment.</b><button class="btn" onclick={() => load()}>Réessayer</button></div>
{:else}
  <div class="tr-split" class:reading={reading && selected}>
    <aside class="tr-col" aria-label="Vos échanges">
      <div class="tabs tr-tabs" role="tablist">
        {#each TABS as [id, label]}
          <button role="tab" aria-selected={tab === id} class:on={tab === id} onclick={() => { tab = id; reading = false; }}>{label}{#if tabs && id !== "history" && tabs[id].length}<span class="tab-n">{tabs[id].length}</span>{/if}</button>
        {/each}
      </div>
      {#if finding}
        <div class="tr-find">
          <SearchBox bind:value={search} placeholder="Ami ou carte..." />
          <div class="tr-find-row">
            <div class="isel tr-who" title="Ami">
              <Icon name="friends" />
              <select bind:value={friend} aria-label="Ami">
                <option value="">Tous les amis</option>
                {#each friendsHere as { f, n } (f.id)}<option value={f.id}>{f.username} ({n})</option>{/each}
              </select>
            </div>
            <div class="isel" title="Ordre">
              <Icon name="sort" />
              <select bind:value={order} aria-label="Ordre"><option value="new">Récents</option><option value="old">Anciens</option></select>
            </div>
          </div>
        </div>
      {/if}
      {#if !shown}
        <div class="tr-rows">{#each Array(4) as _, i (i)}<div class="tr-row sk"></div>{/each}</div>
      {:else if !shown.length && inTab.length}
        <div class="tr-col-empty"><p class="tr-col-none">Aucun échange ne correspond.</p><button class="btn" onclick={() => { search = ""; friend = ""; }}>Tout afficher</button></div>
      {:else if !shown.length}
        <!-- wide: the pane holds the empty state, the list just says so -->
        <div class="tr-col-empty"><p class="tr-col-none">Rien ici pour l'instant.</p>{@render emptyState()}</div>
      {:else}
        <div class="tr-rows" bind:this={rowsEl}>
          {#each rows as { t, b, rounds } (t.id)}
            <button class="tr-row" class:on={selected?.id === t.id} data-id={t.id} aria-current={selected?.id === t.id ? "true" : undefined}
              onclick={() => select(t)} onkeydown={onRowsKey} aria-label="Échange avec {t.other.username}, {dealLine(t.give.length, t.giveCoins, t.get.length, t.getCoins)}, {balanceLabel(b)}">
              <Avatar user={t.other} size={40} />
              <span class="tr-row-main">
                <span class="tr-row-top"><b>{t.other.username}</b><span class="tr-row-when nowrap">{ago(t.updatedAt)}</span></span>
                <span class="tr-row-line">{dealLine(t.give.length, t.giveCoins, t.get.length, t.getCoins)}{#if rounds > 1}<span class="tr-row-rounds">· {rounds} offres</span>{/if}</span>
              </span>
              <!-- settled: the outcome matters more than the balance -->
              {#if tab === "history"}<span class="trade-status" data-s={t.status}>{statusLabel(t.status)}</span>
              {:else if b.kind !== "unknown"}<span class="tr-badge" data-k={b.kind} title={balanceLabel(b)}>{balanceBadge(b)}</span>{/if}
            </button>
          {/each}
          {#if shown.length > drawn}<div class="tr-more" aria-hidden="true" use:inView={{ onEnter: () => (more += STEP), key: drawn }}></div>{/if}
        </div>
      {/if}
    </aside>

    <div class="tr-pane">
      {#if !shown}
        <div class="tr-pane-sk"><div class="sk-line"></div><div class="sk-cards"><div class="wc skeleton"></div><div class="wc skeleton"></div></div></div>
      {:else if selected}
        {#key selected.id}
          <TradePane trade={selected} all={trades} {values} bind:mode onback={() => (reading = false)} ondone={done} onchanged={changed}
            oncounter={(t) => (compose = { counter: t })} onopentrade={openTrade} />
        {/key}
      {:else}
        {@render emptyState()}
      {/if}
    </div>
  </div>
{/if}

{#if compose}
  <TradeComposer counter={compose.counter} balance={profile?.currency ?? null} onclose={() => (compose = null)} onsent={sent} />
{/if}
