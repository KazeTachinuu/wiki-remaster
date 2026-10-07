<script>
  // Succès: every achievement of the game as one list, each with one badge (its icon in a ring of
  // its tier's colour: full once unlocked, filling with my progress while locked, gold and shining
  // while its reward waits). On top: how far I am, my medals by tier, the next goals, and every
  // reward claimed in one go. On each visit the game is asked to award what was earned since (as
  // its own page does), then the list is read again: what just unlocked is marked. Families, tiers
  // and order come from the data (see wm/social.js): an achievement the game adds needs no change.
  import Icon from "../../components/Icon.svelte";
  import { data, RNAME } from "../../wm/index.js";
  import { FAMILIES, TIERS, tierOf, progressOf, nextUp } from "../../wm/social.js";
  import { nf } from "../../lib/format.js";
  import { sounded } from "../../sound/sfx.js";

  let { onwallet, onrewards } = $props(); // onrewards(n): how many rewards wait, for the app's count

  let list = $state(null); // achievementsOf
  let stats = $state(null); // my collection's counts, for the progress of the locked ones
  let error = $state("");
  let fresh = $state(new Set()); // unlocked by this visit's check
  let show = $state("all"); // all | claim | done | locked
  let busy = $state(null); // the id being claimed, or "all"
  let note = $state(null); // { ok, text }
  let claimed = $state(new Map()); // achievement id -> the reward just received: the row celebrates

  async function load() {
    error = "";
    data.collectionStats().then((s) => (stats = s), () => {});
    try { list = await data.achievements(); }
    catch (e) { if (!list) error = e.message || "Succès indisponibles pour le moment."; return; }
    // what was earned since the last visit: the game awards it, then we read again
    const before = new Set(list.filter((a) => a.state !== "locked").map((a) => a.id));
    try {
      await data.syncAchievements();
      list = await data.achievements();
      fresh = new Set(list.filter((a) => a.state !== "locked" && !before.has(a.id)).map((a) => a.id));
    } catch {}
  }
  load();

  const unlocked = $derived(list?.filter((a) => a.state !== "locked") ?? []);
  const waiting = $derived(list?.filter((a) => a.state === "claim") ?? []);
  const waitingSum = $derived(waiting.reduce((s, a) => s + a.reward, 0));
  $effect(() => { if (list) onrewards?.(waiting.length); });
  const earned = $derived(unlocked.filter((a) => a.claimedAt).reduce((s, a) => s + a.reward, 0));
  const pct = $derived(list?.length ? Math.round((unlocked.length / list.length) * 100) : 0);
  const medals = $derived(TIERS.map((t) => ({ ...t, got: unlocked.filter((a) => tierOf(a.reward).id === t.id).length, total: list?.filter((a) => tierOf(a.reward).id === t.id).length ?? 0 })).filter((t) => t.total));
  const progress = (a) => (a.state === "locked" ? progressOf(a.description, stats, RNAME) : null);
  const goals = $derived(list && stats ? nextUp(list, progress) : []);
  // how full a badge's ring is: unlocked, full; locked, my progress when it can be counted
  const fill = (a, p = progress(a)) => (a.state !== "locked" ? 1 : p ? p.have / p.goal : 0);

  const SHOWS = [["all", "Tous"], ["claim", "À réclamer"], ["done", "Débloqués"], ["locked", "À débloquer"]];
  const count = (id) => (id === "all" ? list?.length : id === "done" ? unlocked.length : list?.filter((a) => a.state === id).length) ?? 0;
  const keep = (a) => show === "all" || (show === "done" ? a.state !== "locked" : a.state === show);
  // one section per family the game's achievements fall in ("Autres" only when something is in it)
  const sections = $derived(list ? FAMILIES.map((f) => {
    const all = list.filter((a) => a.family === f.id);
    return { ...f, got: all.filter((a) => a.state !== "locked").length, total: all.length, items: all.filter(keep) };
  }).filter((s) => s.items.length) : []);
  const date = (t) => new Date(t).toLocaleDateString("fr", { day: "numeric", month: "short", year: new Date(t).getFullYear() === new Date().getFullYear() ? undefined : "numeric" });

  async function claimOne(a) {
    const r = await data.claimAchievement(a.id);
    a.claimedAt = r.claimed_at ?? new Date().toISOString();
    a.state = "done";
    const got = r.already_claimed ? 0 : r.amount ?? a.reward;
    if (got) { claimed = new Map(claimed).set(a.id, got); setTimeout(() => { const m = new Map(claimed); m.delete(a.id); claimed = m; }, 1800); }
    return got;
  }
  async function claim(a) {
    if (busy) return;
    busy = a.id; note = null;
    try {
      const got = await sounded(() => claimOne(a));
      note = { ok: true, text: got ? `+${nf(got)} WikiBidous pour « ${a.title} ».` : "Récompense déjà réclamée." };
      onwallet?.();
    } catch (e) { note = { ok: false, text: e.message }; }
    busy = null;
  }
  async function claimAll() {
    if (busy || !waiting.length) return;
    busy = "all"; note = null;
    let got = 0, n = 0;
    try {
      await sounded(async () => { for (const a of [...waiting]) { got += await claimOne(a); n++; } });
      note = { ok: true, text: `+${nf(got)} WikiBidous reçus pour ${n} succès.` };
    } catch (e) { note = { ok: false, text: n ? `${n} récompenses reçues (+${nf(got)}), puis : ${e.message}` : e.message }; }
    if (n) onwallet?.();
    busy = null;
  }
</script>

{#snippet badge(a, size)}
  <span class="ach-badge" data-tier={tierOf(a.reward).id} data-state={a.state} style:--s="{size}px" style:--p={fill(a)} title="Rang {tierOf(a.reward).label}">
    <span aria-hidden="true">{a.icon}</span>
  </span>
{/snippet}

{#if error}
  <div class="empty"><b>Succès indisponibles pour le moment.</b><div>{error}</div><button class="btn" onclick={load}>Réessayer</button></div>
{:else}
<div class="ach-page">
  <div class="coll-head">
    <div>
      <h1>Succès</h1>
      <div class="meta">
        {#if !list}<span class="sync"><span class="spin"></span>Chargement de vos succès</span>
        {:else}{unlocked.length} sur {list.length} débloqués{#if earned}{" · "}{nf(earned)} WikiBidous gagnés{/if}{/if}
      </div>
    </div>
  </div>

  {#if list}
    <section class="ach-hero" aria-label="Progression">
      <div class="ach-ring" style:--p={pct / 100} role="img" aria-label="{pct} % débloqués"><b>{pct}<small>%</small></b></div>
      <div class="ach-medals" aria-label="Médailles par rang">
        {#each medals as t (t.id)}
          <span class="ach-medal" data-tier={t.id} title="{t.label} : {t.got} sur {t.total}"><i aria-hidden="true"></i><b>{t.got}<small>/{t.total}</small></b><span>{t.label}</span></span>
        {/each}
      </div>
      {#if waiting.length}
        <button class="btn primary ach-all" onclick={claimAll} disabled={!!busy}>
          {#if busy === "all"}<span class="spin"></span>Réclamation...{:else}Tout réclamer<b>+{nf(waitingSum)}</b>{/if}
        </button>
      {/if}
    </section>
    {#if note}<p class="ach-note" class:bad={!note.ok} role="status">{note.text}</p>{/if}

    {#if goals.length && show !== "claim" && show !== "done"}
      <section class="ach-goals" aria-label="Prochains objectifs">
        <h2 class="ach-sec-h">Prochains objectifs</h2>
        <div class="ach-goal-row">
          {#each goals as { a, p } (a.id)}
            <div class="ach-goal">
              {@render badge(a, 52)}
              <div class="ach-goal-txt"><b>{a.title}</b><span>{nf(p.have)} / {nf(p.goal)}</span><span class="ach-reward">+{nf(a.reward)}</span></div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <div class="tabs ach-tabs" role="tablist">
      {#each SHOWS as [id, label] (id)}
        <button role="tab" aria-selected={show === id} class:on={show === id} onclick={() => (show = id)}>{label}<span class="tab-n" class:hot={id === "claim" && count(id)}>{count(id)}</span></button>
      {/each}
    </div>

    {#each sections as s (s.id)}
      <section class="ach-sec" aria-label={s.label}>
        <h2 class="ach-sec-h">{s.label}<span>{s.got} sur {s.total}</span></h2>
        <ul class="ach-list">
          {#each s.items as a (a.id)}
            {@const p = progress(a)}
            <li class="ach" data-state={a.state} class:fresh={fresh.has(a.id)} class:claimed={claimed.has(a.id)}>
              {#if claimed.has(a.id)}<span class="ach-gain" aria-hidden="true">+{nf(claimed.get(a.id))}</span>{/if}
              {@render badge(a, 56)}
              <div class="ach-body">
                <h3>{a.title}{#if fresh.has(a.id)}<span class="ach-new">Nouveau</span>{/if}</h3>
                <p>{a.description}</p>
              </div>
              <div class="ach-side">
                {#if a.state === "claim"}
                  <button class="btn primary ach-claim" onclick={() => claim(a)} disabled={!!busy} aria-label="Réclamer {nf(a.reward)} WikiBidous pour {a.title}">
                    {#if busy === a.id}<span class="spin"></span>{:else}Réclamer <b>+{nf(a.reward)}</b>{/if}
                  </button>
                {:else if a.state === "done"}
                  <span class="ach-when"><Icon name="check" width={2.4} />{a.unlockedAt ? date(a.unlockedAt) : "Débloqué"}</span>
                  {#if a.reward}<span class="ach-reward got">+{nf(a.reward)}</span>{/if}
                {:else}
                  {#if p}<span class="ach-count">{nf(p.have)} / {nf(p.goal)}</span>{/if}
                  {#if a.reward}<span class="ach-reward">+{nf(a.reward)}</span>{/if}
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      </section>
    {:else}
      <div class="empty ach-empty"><b>{show === "claim" ? "Aucune récompense en attente." : "Aucun succès ici."}</b>{#if show === "claim"}<div>Les récompenses apparaîtront ici dès qu'un succès sera débloqué.</div>{/if}</div>
    {/each}
  {/if}
</div>
{/if}
