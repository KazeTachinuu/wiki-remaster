<script>
  import { data, refreshProfile } from "./lib/data.js";
  import Pulls from "./lib/Pulls.svelte";
  import Collection from "./lib/Collection.svelte";
  import Catalog from "./lib/Catalog.svelte";
  import Marketplace from "./lib/Marketplace.svelte";

  // Order matters: "/global-collection" contains "collection", so test it first.
  const viewFromPath = () => {
    const p = location.pathname;
    if (p.includes("global-collection")) return "catalog";
    if (p.includes("marketplace")) return "market";
    if (p.includes("collection")) return "collection";
    return "pulls";
  };
  let view = $state(viewFromPath());
  let profile = $state(null);
  let collKey = $state(0);

  async function loadProfile() {
    try { profile = await data.profile(); } catch { profile = null; }
  }
  loadProfile();

  // In-app notifications (native feature: /api/notifications).
  let notifs = $state([]);
  let notifOpen = $state(false);
  let unread = $derived(notifs.filter((n) => !n.read).length);
  async function loadNotifs() { try { notifs = await data.notifications(); } catch { notifs = []; } }
  loadNotifs();
  const relTime = (s) => {
    const d = Date.parse(s || "");
    if (isNaN(d)) return "";
    const m = Math.round(Math.max(0, Date.now() - d) / 60000);
    if (m < 1) return "à l'instant";
    if (m < 60) return `il y a ${m} min`;
    const h = Math.round(m / 60);
    if (h < 24) return `il y a ${h} h`;
    return `il y a ${Math.round(h / 24)} j`;
  };

  // Keep view in sync with SPA navigation, and clean up on unmount so nothing
  // leaks across the overlay's mount/unmount cycles.
  $effect(() => {
    const onRoute = () => (view = viewFromPath());
    window.addEventListener("wm:route", onRoute);
    return () => window.removeEventListener("wm:route", onRoute);
  });

  // On the real site the pack/currency data comes from the app's own sync call.
  // Re-read the profile the instant that call is observed, instead of guessing a delay.
  $effect(() => {
    if (!data.isReal) return;
    window.addEventListener("wm:profile", loadProfile);
    // Fallback: if packs are still unknown shortly after load, replay the profile sync
    // ourselves so the wallet never stays stuck on "-".
    const t = setTimeout(async () => {
      if (!profile || profile.packs_remaining == null) await refreshProfile();
      loadProfile();
    }, 1500);
    return () => {
      window.removeEventListener("wm:profile", loadProfile);
      clearTimeout(t);
    };
  });

  const VIEW_PATH = { pulls: "/pulls", collection: "/collection", catalog: "/global-collection", market: "/marketplace" };
  function goCore(v) {
    view = v;
    const p = VIEW_PATH[v] || "/pulls";
    if (location.pathname !== p) history.pushState({}, "", p);
  }
  async function onchanged() {
    if (data.isReal) await refreshProfile(); // pull fresh packs/regen from the server
    loadProfile();
    collKey += 1;
  }
  async function reset() {
    if (!data.canReset) return;
    await data.reset();
    onchanged();
    goCore("pulls");
  }

  // Line-icon set (24x24, stroke=currentColor). One per route, rendered via {@html}.
  const ICONS = {
    pulls: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/>',
    collection: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>',
    trades: '<path d="M4 9h13l-3-3M20 15H7l3 3"/>',
    marketplace: '<path d="M4.5 9 6 5h12l1.5 4M5.5 9v10h13V9M9.5 19v-6h5v6"/>',
    battle: '<path d="M4.5 19.5l1-3 9-9 2 2-9 9zM19.5 19.5l-1-3-9-9-2 2 9 9z"/>',
    catalog: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    guild: '<path d="M12 3l7 2.5v5.5c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V5.5z"/>',
    friends: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M20.5 20a5.5 5.5 0 0 0-3.5-5.1"/>',
    dms: '<path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4A7.5 7.5 0 1 1 20 11.5z"/>',
    leaderboard: '<path d="M4 20h16M6 20v-6M12 20V5M18 20v-9"/>',
    achievements: '<path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4.5v1.5A3 3 0 0 0 7.5 10.5M17 6h2.5v1.5a3 3 0 0 1-3 3M12 14v3M8.5 20h7l-.6-3H9.1z"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6"/>',
  };

  // Other WikiMasters routes fall back to the real app (full navigation).
  const others = [
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
</script>

<div class="app">
  <aside class="side">
    <div class="brand"><span class="mk"></span><b>WikiMasters</b></div>
    <nav class="nav">
      <button type="button" class:on={view === "pulls"} onclick={() => goCore("pulls")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">{@html ICONS.pulls}</svg>
        Ouvrir des paquets
      </button>
      <button type="button" class:on={view === "collection"} onclick={() => goCore("collection")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">{@html ICONS.collection}</svg>
        Ma collection
      </button>
      <button type="button" class:on={view === "catalog"} onclick={() => goCore("catalog")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">{@html ICONS.catalog}</svg>
        Toutes les cartes
      </button>
      <button type="button" class:on={view === "market"} onclick={() => goCore("market")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">{@html ICONS.marketplace}</svg>
        Marché
      </button>
      {#if data.isReal}
        <div class="nav-sep">Le reste du site</div>
        {#each others as [href, label, icon]}
          <a class="nav-ext" {href}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">{@html ICONS[icon]}</svg>
            {label}
          </a>
        {/each}
      {/if}
    </nav>
    <div class="side-foot">
      {#if data.canReset}<button class="ghost" onclick={reset}>Réinitialiser</button>{/if}
      {#if data.isReal}
        <button class="ghost" title="Revenir au site d'origine (aucune fonctionnalité perdue)"
          onclick={() => { try { localStorage.setItem("wm-off", "1"); } catch {} location.reload(); }}>
          Version originale du site
        </button>
      {/if}
      <div class="hintline">{data.isReal ? "Connecté à WikiMasters" : "Serveur de test local"}</div>
    </div>
  </aside>

  <main class="main">
    <header class="topbar">
      <div class="crumb">{({ pulls: "Ouvrir des paquets", collection: "Ma collection", catalog: "Toutes les cartes", market: "Marché" })[view]}</div>
      <div class="wallet">
        <div class="notif">
          <button class="bell" class:has={unread > 0} onclick={() => { notifOpen = !notifOpen; if (notifOpen) loadNotifs(); }} aria-label="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.5 21a2 2 0 0 1-3 0"/></svg>
            {#if unread}<span class="bell-badge">{unread}</span>{/if}
          </button>
          {#if notifOpen}
            <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
            <div class="notif-scrim" onclick={() => (notifOpen = false)}></div>
            <div class="notif-panel" role="dialog" aria-label="Notifications">
              <div class="notif-head">Notifications{#if unread}<span class="notif-count">{unread}</span>{/if}</div>
              {#if notifs.length === 0}
                <div class="notif-empty">Aucune notification</div>
              {:else}
                {#each notifs as n (n.id)}
                  <svelte:element this={n.href ? "a" : "div"} href={n.href} class="notif-item" class:unread={!n.read} class:link={!!n.href} onclick={() => (notifOpen = false)}>
                    {#if !n.read}<span class="notif-dot"></span>{/if}
                    <div class="notif-body">
                      <div class="notif-title">{n.title}</div>
                      {#if n.message}<div class="notif-msg">{n.message}</div>{/if}
                      <div class="notif-time">{relTime(n.at)}</div>
                    </div>
                  </svelte:element>
                {/each}
              {/if}
            </div>
          {/if}
        </div>
        {#if profile?.is_pro}<span class="badge pro">Pro</span>{/if}
        <span class="chip" title="Paquets">
          <svg class="cico pk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>
          <b>{profile?.packs_remaining ?? "-"}</b>/{profile?.pack_cap ?? 10}
        </span>
        <span class="chip" title="WikiBidous">
          <svg class="cico coin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/></svg>
          <b>{profile?.currency ?? "-"}</b>
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
</div>
