<script>
  // Amis, as a messaging app: my friends on the left (one search for them and for every other
  // player, the requests I received on top), the friend I pick on the right: our offers in progress
  // with their cards, the last message, their showcase, and a trade or a message one click away.
  // On a phone the list comes first and a friend opens over it. No realtime (the game's quota is
  // full): read again when the tab comes back into view and after each action; `onrequests(n)`
  // tells the app how many requests wait.
  import Icon from "../../components/Icon.svelte";
  import Avatar from "../../components/Avatar.svelte";
  import Card from "../../components/Card.svelte";
  import SearchBox from "../../components/SearchBox.svelte";
  import TradeComposer from "../trades/TradeComposer.svelte";
  import ChatModal from "../../components/ChatModal.svelte";
  import { data, normSearch, tradeTabs, dealLine } from "../../wm/index.js";
  import { relationOf, filledGalleries } from "../../wm/social.js";
  import { inView } from "../../lib/inView.js";
  import { ago } from "../../lib/format.js";
  import { sounded } from "../../sound/sfx.js";

  let { profile, onwallet, onrequests } = $props();

  let split = $state(null); // { friends, incoming, outgoing }
  let error = $state("");
  let note = $state(null); // { ok, text }
  let busy = $state(new Set()); // friendship or player ids with a write under way
  const load = () => data.friendships().then((s) => { split = s; error = ""; onrequests?.(s.incoming.length); }, (e) => { if (!split) error = e.message || "Amis indisponibles pour le moment."; });
  // pending trades per friend (one light read, no cards)
  let waiting = $state(null);
  const loadWaiting = () => data.waitingTrades().then((w) => (waiting = w), () => {});
  load();
  loadWaiting();
  $effect(() => {
    const onVisible = () => { if (document.visibilityState === "visible") { load(); loadWaiting(); } };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  });

  // a write on one row: that row waits, then the lists are read again (the row shows the outcome)
  async function act(id, run) {
    if (busy.has(id)) return;
    busy = new Set(busy).add(id); note = null;
    try { await sounded(run); await load(); }
    catch (e) { note = { ok: false, text: e.message }; }
    const b = new Set(busy); b.delete(id); busy = b;
  }
  const accept = (r) => act(r.fid, () => data.answerFriend(r.fid, true));
  const decline = (r) => act(r.fid, () => data.answerFriend(r.fid, false));
  const cancel = (r) => act(r.fid, () => data.dropFriendship(r.fid));
  const add = (u) => act(u.id, () => data.requestFriend(u.id));
  const acceptAll = () => act("all", () => data.acceptAllFriends());

  // the list: my friends by name, those waiting for my answer first; narrowed by the search
  let search = $state("");
  const q = $derived(search.trim());
  const tradeWeight = (r) => { const w = waiting?.get(r.user.id); return w ? w.toAnswer * 1000 + w.sent : 0; };
  const mine = $derived((split?.friends ?? []).filter((r) => !q || normSearch(r.user.username).includes(normSearch(q))).sort((a, b) => tradeWeight(b) - tradeWeight(a)));
  const STEP = 60;
  let drawn = $state(STEP);
  $effect(() => { q; drawn = STEP; });

  // other players, from two letters (one request once typing pauses)
  let found = $state(null);
  let looking = $state(false);
  $effect(() => {
    if (q.length < 2) { found = null; looking = false; return; }
    looking = true;
    let live = true;
    const t = setTimeout(() => data.searchPlayers(q).then((u) => live && (found = u), () => live && (found = [])).finally(() => live && (looking = false)), 350);
    return () => { live = false; clearTimeout(t); };
  });
  const others = $derived((found ?? []).filter((u) => relationOf(u.id, split ?? { friends: [], incoming: [], outgoing: [] }) !== "friend")
    .map((u) => ({ user: u, sent: split?.outgoing.find((r) => r.user.id === u.id), received: split?.incoming.find((r) => r.user.id === u.id) })));

  // the friend shown on the right: picked, else (wide screens) the first of the list
  const wide = matchMedia("(min-width: 1000px)"); // the breakpoint of the two panes (social.css)
  let picked = $state(null); // friend user id
  let reading = $state(false); // phone: the friend is open over the list
  const sel = $derived(split?.friends.find((r) => r.user.id === picked) ?? (wide.matches ? mine[0] : null) ?? null);
  const open = (r) => { picked = r.user.id; reading = true; };

  // the friend's details: our trades and messages, their showcase (two reads, on opening)
  let detail = $state(null); // { id, chat, shelf (the cards of their showcase), error }
  $effect(() => {
    const f = sel?.user;
    if (!f || detail?.id === f.id) return;
    detail = { id: f.id, chat: null, shelf: null, error: false };
    const mineNow = () => detail?.id === f.id;
    data.chat(f.id).then((c) => mineNow() && (detail.chat = c), () => mineNow() && (detail.error = true));
    data.playerShowcase(f.username).then((sh) => mineNow() && (detail.shelf = filledGalleries(sh).flatMap((g) => g.rows)), () => mineNow() && (detail.shelf = []));
  });
  const offers = $derived(detail?.chat ? (({ incoming, outgoing }) => [...incoming, ...outgoing])(tradeTabs(detail.chat.trades)) : null);
  const lastMessage = $derived(detail?.chat?.messages.at(-1) ?? null);
  const done = $derived(detail?.chat ? detail.chat.trades.filter((t) => t.status === "accepted").length : 0);

  // inviting: the game's sign-up link, shared or copied
  let copied = $state(false);
  async function invite() {
    const url = `${data.isReal ? location.origin : "https://www.wiki-masters.com"}/signup`;
    if (navigator.share) { try { await navigator.share({ title: "WikiMasters", text: "Viens jouer à WikiMasters avec moi !", url }); } catch {} return; }
    try { await navigator.clipboard.writeText(url); copied = true; setTimeout(() => (copied = false), 2000); }
    catch { note = { ok: true, text: `Lien d'invitation : ${url}` }; }
  }

  let trading = $state(null); // the friend a trade is being written to
  let talking = $state(null); // the friend whose conversation is open
  let searchEl = $state();
  // Échanges, opened on one offer when given (it selects and lights it)
  const goTrades = (id) => history.pushState({}, "", id ? `/trades?offre=${encodeURIComponent(id)}` : "/trades");
  // a player's profile (our screen at /profile/<name>)
  const profileUrl = (u) => `/profile/${encodeURIComponent(u.username)}`;
  const openProfile = (e, u) => { e.preventDefault(); history.pushState({}, "", profileUrl(u)); };
  const since = (t) => (t ? new Date(t).toLocaleDateString("fr", { month: "long", year: "numeric" }) : "");
  const plural = (n, one, many = one + "s") => `${n} ${n > 1 ? many : one}`;
  const waitLabel = (w) => (w.toAnswer ? plural(w.toAnswer, "offre à répondre", "offres à répondre") : plural(w.sent, "offre envoyée", "offres envoyées"));
</script>

<div class="fr-page">
{#if error}
  <div class="empty"><b>Amis indisponibles pour le moment.</b><div>{error}</div><button class="btn" onclick={load}>Réessayer</button></div>
{:else}
  <div class="coll-head">
    <div>
      <h1>Amis</h1>
      <div class="meta">
        {#if !split}<span class="sync"><span class="spin"></span>Chargement de vos amis</span>
        {:else}{plural(split.friends.length, "ami")}{#if split.incoming.length}{" · "}<b class="fr-meta-req">{plural(split.incoming.length, "demande reçue", "demandes reçues")}</b>{/if}{/if}
      </div>
    </div>
    <div class="fr-head-acts">
      <button class="btn fr-head-btn" onclick={invite} title="Partager le lien d'inscription au jeu">{#if copied}<Icon name="check" />Lien copié{:else}<Icon name="dms" />Inviter{/if}</button>
      <button class="btn primary fr-head-btn" onclick={() => { reading = false; searchEl?.querySelector("input")?.focus(); }}><Icon name="friends" />Ajouter un ami</button>
    </div>
  </div>
  {#if note}<p class="ach-note" class:bad={!note.ok} role="status">{note.text}</p>{/if}

  <div class="fr-split" class:reading={reading && sel}>
    <aside class="fr-side" aria-label="Vos amis">
      <div class="fr-side-search" bind:this={searchEl}><SearchBox bind:value={search} loading={looking} placeholder="Ami ou joueur..." /></div>
      <div class="fr-side-scroll">
        {#if split?.incoming.length && !q}
          <div class="fr-reqs">
            <div class="fr-side-h">Demandes reçues<span class="fr-count">{split.incoming.length}</span>
              {#if split.incoming.length > 1}<button class="link-btn" disabled={busy.has("all")} onclick={acceptAll}>Tout accepter</button>{/if}</div>
            {#each split.incoming as r (r.fid)}
              <div class="fr-req">
                <Avatar user={r.user} size={32} /><span class="fr-req-name"><b>{r.user.username}</b><small>veut devenir votre ami</small></span>
                <button class="fr-act yes" disabled={busy.has(r.fid)} onclick={() => accept(r)} aria-label="Accepter {r.user.username}" title="Accepter"><Icon name="check" width={2.4} /></button>
                <button class="fr-act" disabled={busy.has(r.fid)} onclick={() => decline(r)} aria-label="Refuser {r.user.username}" title="Refuser"><Icon name="close" width={2.2} /></button>
              </div>
            {/each}
          </div>
        {/if}

        {#if split}
          {#if q}<div class="fr-side-h">Vos amis<span class="fr-count">{mine.length}</span></div>{/if}
          <ul class="fr-items">
            {#each mine.slice(0, drawn) as r (r.fid)}
              {@const w = waiting?.get(r.user.id)}
              <li><button class="fr-item" class:on={sel?.fid === r.fid} aria-current={sel?.fid === r.fid ? "true" : undefined} onclick={() => open(r)}>
                <Avatar user={r.user} size={36} />
                <span class="fr-item-txt"><b>{r.user.username}</b>{#if w}<span class="fr-waiting" class:answer={w.toAnswer}>{waitLabel(w)}</span>{/if}</span>
              </button></li>
            {:else}
              <li class="fr-hint fr-pad">{q ? `Aucun ami ne s'appelle « ${q} ».` : "Pas encore d'amis : cherchez un joueur par son nom ci-dessus."}</li>
            {/each}
          </ul>
          {#if mine.length > drawn}<div class="fr-more" use:inView={{ key: drawn, onEnter: () => (drawn += STEP) }}></div>{/if}

          {#if q}
            <div class="fr-side-h">Autres joueurs{#if others.length}<span class="fr-count">{others.length}</span>{/if}</div>
            {#if q.length < 2}<p class="fr-hint fr-pad">Encore une lettre pour chercher parmi tous les joueurs.</p>
            {:else if !found}<p class="fr-hint fr-pad"><span class="spin"></span> Recherche...</p>
            {:else if !others.length}<p class="fr-hint fr-pad">Aucun autre joueur ne s'appelle « {q} ».</p>
            {:else}
              {#each others as o (o.user.id)}
                <div class="fr-req">
                  <Avatar user={o.user} size={32} /><span class="fr-req-name"><b>{o.user.username}</b>{#if o.sent}<small>Demande envoyée</small>{:else if o.received}<small>Vous a envoyé une demande</small>{/if}</span>
                  {#if o.received}<button class="btn primary fr-btn" disabled={busy.has(o.received.fid)} onclick={() => accept(o.received)}>Accepter</button>
                  {:else if o.sent}<button class="btn fr-btn" disabled={busy.has(o.sent.fid)} onclick={() => cancel(o.sent)}>Annuler</button>
                  {:else}<button class="btn primary fr-btn" disabled={busy.has(o.user.id)} onclick={() => add(o.user)}>{#if busy.has(o.user.id)}<span class="spin"></span>{:else}Ajouter{/if}</button>{/if}
                </div>
              {/each}
            {/if}
          {:else if split.outgoing.length}
            <details class="fr-sent">
              <summary class="fr-side-h">Demandes envoyées<span class="fr-count">{split.outgoing.length}</span></summary>
              {#each split.outgoing as r (r.fid)}
                <div class="fr-req">
                  <Avatar user={r.user} size={32} /><span class="fr-req-name"><b>{r.user.username}</b><small>en attente</small></span>
                  <button class="btn fr-btn" disabled={busy.has(r.fid)} onclick={() => cancel(r)}>Annuler</button>
                </div>
              {/each}
            </details>
          {/if}
        {:else}
          <p class="fr-hint fr-pad"><span class="spin"></span> Chargement...</p>
        {/if}
      </div>
    </aside>

    <section class="fr-detail" aria-label={sel ? sel.user.username : "Ami"}>
      {#if sel}
        {@const f = sel.user}
        <button class="fr-back" onclick={() => (reading = false)}><Icon name="prev" width={2.2} />Amis</button>
        <!-- their avatar and name open their profile, as in the game -->
        <a class="fr-id" href={profileUrl(f)} onclick={(e) => openProfile(e, f)} title="Voir le profil de {f.username}">
          <Avatar user={f} size={76} />
          <div class="fr-id-txt">
            <h2>{f.username}</h2>
            <p>{#if sel.since}Ami depuis {since(sel.since)}{/if}{#if done}{" · "}{plural(done, "échange", "échanges")} ensemble{/if}</p>
          </div>
        </a>
        <div class="fr-id-acts">
          <button class="btn primary" onclick={() => (trading = f)}><Icon name="trades" />Proposer un échange</button>
          <button class="btn" onclick={() => (talking = f)}><Icon name="dms" />Écrire</button>
          <a class="btn" href={profileUrl(f)} onclick={(e) => openProfile(e, f)}><Icon name="profile" />Profil</a>
        </div>

        <div class="fr-box">
          <h3>Offres en cours{#if offers?.length}<span class="fr-count">{offers.length}</span>{/if}</h3>
          {#if detail?.error}<p class="fr-hint">Impossible de charger vos échanges avec {f.username}.</p>
          {:else if !offers}<p class="fr-hint"><span class="spin"></span> Chargement...</p>
          {:else if !offers.length}<p class="fr-hint">Aucune offre en cours avec {f.username}.</p>
          {:else}
            {#each offers as t (t.id)}
              <button class="fr-offer" onclick={() => goTrades(t.id)} title="Ouvrir cette offre dans Échanges">
                <span class="fr-mini" aria-hidden="true">{#each [...t.give, ...t.get].slice(0, 4) as it (it.itemId)}<i data-r={it.card.rarity}></i>{/each}</span>
                <span class="fr-offer-txt"><b>{dealLine(t.give.length, t.giveCoins, t.get.length, t.getCoins)}</b><small>{t.incoming ? "Reçue" : "Envoyée"} {ago(t.createdAt)}</small></span>
                <span class="fr-waiting" class:answer={t.incoming}>{t.incoming ? "À répondre" : "En attente"}</span>
              </button>
            {/each}
          {/if}
        </div>

        {#if lastMessage}
          <button class="fr-box fr-msg" onclick={() => (talking = f)}>
            <h3>Dernier message</h3>
            <p><b>{lastMessage.mine ? "Vous" : f.username} :</b> {lastMessage.content}</p>
            <small>{ago(lastMessage.at)} · Ouvrir la discussion</small>
          </button>
        {/if}

        <div class="fr-box">
          <h3>Sa vitrine{#if detail?.shelf?.length}<span class="fr-count">{detail.shelf.length}</span>{/if}
            <a class="link-btn fr-box-link" href={profileUrl(f)} onclick={(e) => openProfile(e, f)}>Voir son profil</a></h3>
          {#if !detail?.shelf}<p class="fr-hint"><span class="spin"></span> Chargement...</p>
          {:else if !detail.shelf.length}<p class="fr-hint">{f.username} n'a encore rien exposé.{" "}<button class="link-btn" onclick={() => (trading = f)}>Voir ses cartes pour un échange</button></p>
          {:else}<div class="fr-cards">{#each detail.shelf as c (c.id)}<div class="pf-place"><Card card={c.card} shiny={c.is_shiny} stats={false} /></div>{/each}</div>{/if}
        </div>
      {:else if split}
        <div class="empty fr-pick"><Icon name="friends" /><b>Choisissez un ami</b><div>Ses offres, ses plus belles cartes, et un échange en un clic.</div></div>
      {/if}
    </section>
  </div>
{/if}

</div>

{#if trading}
  <TradeComposer to={trading} balance={profile?.currency ?? null} onclose={() => (trading = null)}
    onsent={(ok) => { if (ok) { note = { ok: true, text: `Offre envoyée à ${trading.username}.` }; onwallet?.(); loadWaiting(); detail = null; } }} />
{/if}

{#if talking}<ChatModal friend={talking} onclose={() => (talking = null)} onopentrade={(t) => { talking = null; goTrades(t?.id); }} />{/if}
