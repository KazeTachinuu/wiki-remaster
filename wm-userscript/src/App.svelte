<script>
  import { data } from "./wm/index.js";
  import Icon from "./lib/Icon.svelte";
  import Pulls from "./lib/Pulls.svelte";
  import Collection from "./lib/Collection.svelte";
  import Catalog from "./lib/Catalog.svelte";
  import Marketplace from "./lib/Marketplace.svelte";
  import { ago } from "./lib/format.js";
  import { useOriginalSite } from "./lib/settings.svelte.js";

  // Rebuilt screens. Order matters for matching: "/global-collection" contains "collection".
  const VIEWS = [
    { id: "pulls", path: "/pulls", label: "Ouvrir des paquets", icon: "pulls" },
    { id: "collection", path: "/collection", label: "Ma collection", icon: "collection" },
    { id: "catalog", path: "/global-collection", label: "Toutes les cartes", icon: "catalog" },
    { id: "market", path: "/marketplace", label: "Marché", icon: "market" },
  ];
  // Everything else is the native site (full navigation).
  const NATIVE = [
    ["/trades", "Échanges", "trades"],
    ["/battle", "Duels", "battle"],
    ["/guild", "Guilde", "guild"],
    ["/friends", "Amis", "friends"],
    ["/dms", "Messages", "dms"],
    ["/leaderboard", "Classement", "leaderboard"],
    ["/achievements", "Succès", "achievements"],
    ["/profile", "Profil", "profile"],
    ["/settings", "Paramètres", "settings"],
  ];

  const viewFromPath = () =>
    (["catalog", "market", "collection"].map((id) => VIEWS.find((v) => v.id === id)).find((v) => location.pathname.startsWith(v.path)) || VIEWS[0]).id;
  let view = $state(viewFromPath());
  const current = $derived(VIEWS.find((v) => v.id === view));

  function go(v) {
    view = v.id;
    if (location.pathname !== v.path) history.pushState({}, "", v.path);
  }
  $effect(() => {
    const onRoute = () => (view = viewFromPath());
    window.addEventListener("wm:route", onRoute);
    return () => window.removeEventListener("wm:route", onRoute);
  });

  // Profile: re-read whenever the app's own Supabase sync is captured.
  let profile = $state(null);
  const loadProfile = () => data.profile().then((p) => (profile = p), () => {});
  loadProfile();
  $effect(() => {
    window.addEventListener("wm:profile", loadProfile);
    return () => window.removeEventListener("wm:profile", loadProfile);
  });

  let collKey = $state(0);
  function onchanged() {
    loadProfile();
    collKey++;
  }
  async function reset() {
    await data.reset();
    onchanged();
    go(VIEWS[0]);
  }

  // Notifications (the game's own: outbid, sold, unsold, midpoint nudge...). Polled while the
  // tab is visible; anything new pops a toast, and the unread count shows in the tab title.
  let notifs = $state([]);
  let notifOpen = $state(false);
  let toasts = $state([]);
  const unread = $derived(notifs.filter((n) => !n.read));
  let seen = null; // ids already known, so only new arrivals toast (none on first load)

  async function loadNotifs() {
    const list = await data.notifications().catch(() => null);
    if (!list) return;
    if (seen) for (const n of list) if (!n.read && !seen.has(n.id)) toast(n);
    seen = new Set(list.map((n) => n.id));
    notifs = list;
  }
  loadNotifs();
  $effect(() => {
    const t = setInterval(() => document.visibilityState === "visible" && loadNotifs(), 30000);
    return () => clearInterval(t);
  });

  function toast(n) {
    toasts = [...toasts, n].slice(-3);
    setTimeout(() => (toasts = toasts.filter((t) => t !== n)), 8000);
  }

  const baseTitle = document.title;
  $effect(() => {
    document.title = unread.length ? `(${unread.length}) ${baseTitle}` : baseTitle;
    return () => (document.title = baseTitle);
  });

  function markRead(ids) {
    for (const n of notifs) if (!ids || ids.includes(n.id)) n.read = true;
    data.markRead(ids).catch(() => {});
  }
  function openNotif(n) {
    if (!n.read) markRead([n.id]);
    notifOpen = false;
    toasts = toasts.filter((t) => t.id !== n.id);
  }

  // Keyboard shortcuts. Keys typed into a field stay in the field (Esc leaves it).
  let appEl;
  let help = $state(false);
  const SHORTCUTS = [["/", "Rechercher"], ["1 à 4", "Changer d'écran"], ["Espace", "Ouvrir un paquet"], ["Flèches", "Parcourir les cartes révélées"], ["Échap", "Fermer"], ["?", "Afficher cette aide"]];
  function onKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const el = e.composedPath()[0];
    if (el?.matches?.("input, select, textarea")) {
      if (e.key === "Escape") el.blur();
      return;
    }
    if (e.key === "Escape") { help = false; notifOpen = false; return; }
    if (appEl?.querySelector(".modal-backdrop")) return; // a dialog owns the keyboard
    if (e.key === "?") help = !help;
    else if (e.key === "/") { e.preventDefault(); appEl?.querySelector("input.search")?.focus(); }
    else if (/^[1-4]$/.test(e.key)) go(VIEWS[e.key - 1]);
  }
</script>

<svelte:window onkeydown={onKey} />

<div class="app" bind:this={appEl}>
  <aside class="side">
    <div class="brand"><span class="mk"></span><b>WikiMasters</b></div>
    <nav class="nav">
      {#each VIEWS as v}
        <button type="button" class:on={view === v.id} onclick={() => go(v)}><Icon name={v.icon} width={1.7} />{v.label}</button>
      {/each}
      <div class="nav-sep">Le reste du site</div>
      <div class="nav-grid">
        {#each NATIVE as [path, label, icon]}
          <a href={data.isReal ? path : "https://www.wiki-masters.com" + path} title={label}><Icon name={icon} width={1.7} />{label}</a>
        {/each}
      </div>
    </nav>
    <div class="side-foot">
      {#if data.canReset}<button class="ghost" onclick={reset}>Réinitialiser</button>{/if}
      {#if data.isReal}
        <button class="foot-link" title="Revenir au site d'origine (aucune fonctionnalité perdue)" onclick={() => useOriginalSite()}><Icon name="prev" width={2} />Version originale du site</button>
      {/if}
      <button class="foot-link" onclick={() => (help = true)}><span class="kbd">?</span>Raccourcis clavier</button>
      <div class="hintline">{data.isReal ? "Connecté à WikiMasters" : "Serveur de test local"}</div>
    </div>
  </aside>

  <main class="main">
    <header class="topbar">
      <div class="crumb">{current.label}</div>
      <div class="wallet">
        <div class="notif">
          <button class="bell" class:has={unread.length > 0} aria-label="Notifications"
            onclick={() => { notifOpen = !notifOpen; if (notifOpen) loadNotifs(); }}>
            <Icon name="bell" width={1.7} />
            {#if unread.length}<span class="bell-badge">{unread.length}</span>{/if}
          </button>
          {#if notifOpen}
            <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
            <div class="notif-scrim" onclick={() => (notifOpen = false)}></div>
            <div class="notif-panel" role="dialog" aria-label="Notifications">
              <div class="notif-head">
                Notifications{#if unread.length}<span class="notif-count">{unread.length}</span>
                  <button class="link-btn" onclick={() => markRead()}>Tout marquer comme lu</button>{/if}
              </div>
              {#each notifs as n (n.id)}
                <svelte:element this={n.href ? "a" : "div"} href={n.href} class="notif-item" class:unread={!n.read} onclick={() => openNotif(n)}>
                  {#if !n.read}<span class="notif-dot"></span>{/if}
                  <div class="notif-body">
                    <div class="notif-title">{n.title}</div>
                    {#if n.message}<div class="notif-msg">{n.message}</div>{/if}
                    <div class="notif-time">{ago(n.at)}</div>
                  </div>
                </svelte:element>
              {:else}
                <div class="notif-empty">Aucune notification</div>
              {/each}
            </div>
          {/if}
        </div>
        {#if profile?.is_pro}<span class="badge pro">Pro</span>{/if}
        <span class="chip" title="Paquets">
          <Icon name="pulls" class="cico pk" /><b>{profile?.packs_remaining ?? "-"}</b>/{profile?.pack_cap ?? 10}
        </span>
        <span class="chip" title="WikiBidous">
          <Icon name="coin" class="cico coin" /><b>{profile?.currency ?? "-"}</b>
        </span>
      </div>
    </header>
    <section class="view">
      {#if view === "pulls"}
        <Pulls {profile} {onchanged} />
      {:else if view === "collection"}
        {#key collKey}<Collection onwallet={loadProfile} />{/key}
      {:else if view === "catalog"}
        <Catalog />
      {:else}
        <Marketplace {profile} onwallet={loadProfile} />
      {/if}
    </section>
  </main>

  {#if toasts.length}
    <div class="toasts" role="status" aria-live="polite">
      {#each toasts as n (n.id)}
        <svelte:element this={n.href ? "a" : "div"} href={n.href} class="toast" onclick={() => openNotif(n)}>
          <Icon name="bell" width={1.8} />
          <div><b>{n.title}</b>{#if n.message}<span>{n.message}</span>{/if}</div>
        </svelte:element>
      {/each}
    </div>
  {/if}

  {#if help}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="kbd-help-scrim" onclick={() => (help = false)}>
      <div class="kbd-help" role="dialog" aria-label="Raccourcis clavier">
        <h3>Raccourcis clavier</h3>
        {#each SHORTCUTS as [k, what]}<div class="kbd-row"><span class="kbd">{k}</span>{what}</div>{/each}
      </div>
    </div>
  {/if}
</div>
