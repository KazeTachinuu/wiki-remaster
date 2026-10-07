<script>
  // A player's profile (/profile/<name>), mine too as others see it: who they are, when they were last seen, what we can
  // do together (trade and write to a friend, ask anyone else to be friends), their collection by
  // rarity, and their showcase as they arranged it (only the galleries they filled). A profile kept
  // to friends shows who they are and how to become friends, nothing more.
  import Icon from "../../components/Icon.svelte";
  import Avatar from "../../components/Avatar.svelte";
  import Card from "../../components/Card.svelte";
  import ChatModal from "../../components/ChatModal.svelte";
  import RarityBreakdown from "../../components/RarityBreakdown.svelte";
  import TradeComposer from "../trades/TradeComposer.svelte";
  import { data } from "../../wm/index.js";
  import { seenLabel, relationOf, filledGalleries } from "../../wm/social.js";
  import { nf } from "../../lib/format.js";
  import { sounded } from "../../sound/sfx.js";

  let { username, profile, onwallet } = $props();

  let who = $state(null); // nPlayer
  let missing = $state(false);
  let error = $state("");
  let shelf = $state(null); // { places, names }, or "hidden"
  let coll = $state(null); // { total, rarityCounts, items }, or "hidden"
  let split = $state(null); // my friendships, for where we stand when not friends
  let busy = $state(false);
  let note = $state(null);

  const hidden = (e) => e?.status === 403;
  async function load() {
    error = ""; missing = false;
    try { who = await data.player(username); }
    catch (e) { if (e.status === 404) missing = true; else error = e.message || "Profil indisponible pour le moment."; return; }
    data.playerShowcase(username).then((s) => (shelf = s), (e) => (shelf = hidden(e) ? "hidden" : { places: [], names: {} }));
    data.playerCollection(username).then((c) => (coll = c), (e) => (coll = hidden(e) ? "hidden" : null));
    if (!who.isFriend && !who.isOwn) data.friendships().then((s) => (split = s), () => {});
  }
  load();

  // kept to friends: the server refuses their showcase and cards to me
  const closed = $derived(who && !who.isFriend && !who.isOwn && (!who.isPublic || shelf === "hidden" || coll === "hidden"));
  const relation = $derived(who && split ? relationOf(who.id, split) : null);
  const request = $derived(relation === "sent" ? split.outgoing.find((r) => r.user.id === who.id) : relation === "received" ? split.incoming.find((r) => r.user.id === who.id) : null);
  const galleries = $derived(shelf && shelf !== "hidden" ? filledGalleries(shelf) : []);
  const shown = $derived(galleries.reduce((n, g) => n + g.rows.length, 0));
  const joined = $derived(who?.joinedAt ? new Date(who.joinedAt).toLocaleDateString("fr", { month: "long", year: "numeric" }) : "");
  const seen = $derived(seenLabel(who?.lastSeenAt));
  const recent = $derived(seen === "En ligne récemment");

  async function act(run, text) {
    if (busy) return;
    busy = true; note = null;
    try { await sounded(run); note = text ? { ok: true, text } : null; split = await data.friendships(); }
    catch (e) { note = { ok: false, text: e.message }; }
    busy = false;
  }
  const askFriend = () => act(() => data.requestFriend(who.id), `Demande envoyée à ${who.username}.`);
  const cancel = () => act(() => data.dropFriendship(request.fid));
  const accept = () => act(() => data.answerFriend(request.fid, true), `${who.username} fait maintenant partie de vos amis.`).then(load);

  let trading = $state(false);
  let talking = $state(false);
  const goTrades = (id) => history.pushState({}, "", id ? `/trades?offre=${encodeURIComponent(id)}` : "/trades");
</script>

<div class="pf-page">
  {#if missing}
    <div class="empty"><Icon name="profile" /><b>Aucun joueur ne s'appelle « {username} ».</b><button class="btn" onclick={() => history.back()}>Retour</button></div>
  {:else if error}
    <div class="empty"><b>Profil indisponible pour le moment.</b><div>{error}</div><button class="btn" onclick={load}>Réessayer</button></div>
  {:else if !who}
    <div class="coll-head"><div><h1>{username}</h1><div class="meta"><span class="sync"><span class="spin"></span>Chargement du profil</span></div></div></div>
  {:else}
    <section class="pf-hero">
      <span class="pf-avatar-static"><Avatar user={who} size={96} /></span>
      <div class="pf-id">
        <h1>{who.username}</h1>
        <div class="meta">
          {#if seen}<span class="pf-seen" class:on={recent}><i></i>{seen}</span>{/if}{#if seen && joined}{" · "}{/if}{#if joined}Joueur depuis {joined}{/if}
        </div>
      </div>
      <div class="pf-acts">
        {#if who.isFriend}
          <button class="btn primary" onclick={() => (trading = true)}><Icon name="trades" />Proposer un échange</button>
          <button class="btn" onclick={() => (talking = true)}><Icon name="dms" />Écrire</button>
        {:else if relation === "received"}
          <button class="btn primary" disabled={busy} onclick={accept}><Icon name="check" />Accepter sa demande</button>
        {:else if relation === "sent"}
          <span class="pf-sent"><Icon name="check" />Demande envoyée</span>
          <button class="btn" disabled={busy} onclick={cancel}>Annuler</button>
        {:else if split}
          <button class="btn primary" disabled={busy} onclick={askFriend}><Icon name="friends" />Ajouter en ami</button>
        {/if}
      </div>
    </section>
    {#if note}<p class="ach-note" class:bad={!note.ok} role="status">{note.text}</p>{/if}
    {#if who.isOwn}<p class="pf-own">Votre profil, tel que les autres joueurs le voient.<button class="link-btn" onclick={() => history.pushState({}, "", "/profile")}>Modifier mon profil</button></p>{/if}

    {#if closed}
      <section class="pf-private">
        <span class="pf-lock"><Icon name="lock" /></span>
        <b>Profil privé</b>
        <p>{who.username} ne montre sa vitrine et ses cartes qu'à ses amis.{#if !relation}{" "}Envoyez une demande d'ami pour les voir.{:else if relation === "sent"}{" "}Elles s'afficheront dès que votre demande sera acceptée.{/if}</p>
      </section>
    {:else}
      <nav class="pf-stats pf-stats-3" aria-label="En bref">
        <div class="pf-stat"><span>Cartes</span><b>{coll && coll !== "hidden" && coll.total != null ? nf(coll.total) : "-"}</b></div>
        <div class="pf-stat"><span>Légendaires</span><b>{coll && coll !== "hidden" ? nf(coll.rarityCounts.L ?? 0) : "-"}</b></div>
        <div class="pf-stat"><span>Exposées</span><b>{shelf ? shown : "-"}</b></div>
      </nav>

      <section class="pf-shelf" aria-label="Vitrine">
        <h2 class="ach-sec-h">Vitrine{#if shown}<span>{shown} carte{shown > 1 ? "s" : ""}</span>{/if}</h2>
        {#if !shelf}<p class="fr-hint"><span class="spin"></span> Chargement...</p>
        {:else if !galleries.length}<p class="pf-none">{who.username} n'a encore rien exposé.{#if who.isFriend}{" "}<button class="link-btn" onclick={() => (trading = true)}>Voir ses cartes pour un échange</button>{/if}</p>
        {:else}
          {#each galleries as gal (gal.g)}
            <div class="pf-gallery">
              {#if galleries.length > 1 || shelf.names[gal.g]}<h3 class="pf-gtitle">{gal.name}</h3>{/if}
              <div class="pf-places">{#each gal.rows as row (row.id)}<div class="pf-place"><Card card={row.card} shiny={row.is_shiny} /></div>{/each}</div>
            </div>
          {/each}
        {/if}
      </section>

      {#if coll && coll !== "hidden" && coll.total}
        <section class="pf-coll" aria-label="Sa collection">
          <h2 class="ach-sec-h">Par rareté<span>{nf(coll.total)} cartes</span></h2>
          <RarityBreakdown counts={coll.rarityCounts} />
        </section>
      {/if}

    {/if}
  {/if}
</div>

{#if trading && who}
  <TradeComposer to={who} balance={profile?.currency ?? null} onclose={() => (trading = false)}
    onsent={(ok) => { if (ok) { note = { ok: true, text: `Offre envoyée à ${who.username}.` }; onwallet?.(); } }} />
{/if}
{#if talking && who}<ChatModal friend={who} onclose={() => (talking = false)} onopentrade={(t) => { talking = false; goTrades(t?.id); }} />{/if}
