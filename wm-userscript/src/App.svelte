<script>
  import { data, health } from "./wm/index.js";
  import { isOurs } from "./wm/routes.js";
  import Icon from "./components/Icon.svelte";
  import Pulls from "./screens/pulls/Pulls.svelte";
  import Collection from "./screens/collection/Collection.svelte";
  import Catalog from "./screens/catalog/Catalog.svelte";
  import Marketplace from "./screens/market/Marketplace.svelte";
  import Trades from "./screens/trades/Trades.svelte";
  import LoadBar from "./components/LoadBar.svelte";
  import SoundControl from "./components/SoundControl.svelte";
  import SoundSettings from "./components/SoundSettings.svelte";
  import { settings, toggleHideStats, useOriginalSite, toggleSideRail } from "./lib/settings.svelte.js";
  import HumanCheck from "./components/HumanCheck.svelte";
  import { ago, clock } from "./lib/format.js";
  import { packTimer } from "./lib/packTimer.svelte.js";
  import { tabTicks } from "./sound/sfx.js";
  import { scrollFade } from "./lib/scrollFade.js";

  // Rebuilt screens. Order matters for matching: "/global-collection" contains "collection".
  const VIEWS = [
    { id: "pulls", path: "/pulls", label: "Ouvrir des paquets", short: "Paquets", icon: "pulls" },
    { id: "collection", path: "/collection", label: "Ma collection", short: "Collection", icon: "collection" },
    { id: "catalog", path: "/global-collection", label: "Toutes les cartes", short: "Cartes", icon: "catalog" },
    { id: "market", path: "/marketplace", label: "Marché", icon: "market" },
    { id: "trades", path: "/trades", label: "Échanges", icon: "trades" },
  ];
  // Everything else is the native site (full navigation).
  const NATIVE = [
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
    (["catalog", "market", "collection", "trades"].map((id) => VIEWS.find((v) => v.id === id)).find((v) => location.pathname.startsWith(v.path)) || VIEWS[0]).id;
  let view = $state(viewFromPath());
  // /marketplace/<id>: the market opens straight onto that auction
  const auctionFromPath = () => location.pathname.match(/^\/marketplace\/([^/]+)/)?.[1] ?? null;
  let openAuction = $state(auctionFromPath());
  const current = $derived(VIEWS.find((v) => v.id === view));

  // a narrow screen lays the nav out as one scrolling row: keep the current view in sight
  let navEl = $state();
  $effect(() => {
    view;
    const b = navEl?.querySelector("button.on");
    if (!b || navEl.scrollWidth <= navEl.clientWidth) return;
    const n = navEl.getBoundingClientRect(), r = b.getBoundingClientRect();
    navEl.scrollTo({ left: navEl.scrollLeft + r.left - n.left - (n.width - r.width) / 2 });
  });

  function go(v) {
    view = v.id;
    if (location.pathname !== v.path) history.pushState({}, "", v.path);
  }
  $effect(() => {
    const onRoute = () => { view = viewFromPath(); openAuction = auctionFromPath(); };
    window.addEventListener("wm:route", onRoute);
    return () => window.removeEventListener("wm:route", onRoute);
  });

  // Profile: re-read whenever the app's own Supabase sync is captured.
  let profile = $state(null);
  // Loads of one kind running at once share one request (a pack open patches the profile and
  // reports a change back to back). The app's own sync re-reads packs, not coins.
  const profileLoads = new Map();
  // The pack chip counts down to the next free pack on every screen, its ring filling as it nears.
  const packsFull = $derived(profile?.packs_remaining != null && profile.packs_remaining >= (profile.pack_cap ?? 10));
  const packTime = packTimer(() => (packsFull ? null : profile?.next_regen_seconds ?? null), () => loadProfile({ sync: true }));
  const packFill = $derived(packTime.secs != null && profile?.regen_seconds ? 1 - packTime.secs / profile.regen_seconds : 1);
  // Pro's daily pack (one per calendar day): re-read with each profile, and again past midnight
  let proDaily = $state(null); // { eligible, claimedToday }
  $effect(() => {
    if (!profile?.is_pro) { proDaily = null; return; }
    let live = true;
    const read = () => data.proDaily().then((d) => live && (proDaily = d), () => live && (proDaily = null));
    read();
    const midnight = new Date(); midnight.setHours(24, 0, 5, 0);
    const t = setTimeout(read, midnight - Date.now());
    return () => { live = false; clearTimeout(t); };
  });
  const packTitle = $derived(`Paquets : ${profile?.packs_remaining ?? "?"} sur ${profile?.pack_cap ?? 10}` +
    (packTime.secs == null ? "" : packTime.secs ? `. Prochain dans ${clock(packTime.secs)}` : ". Prochain paquet prêt") +
    (proDaily?.eligible ? ". Pack PRO du jour disponible" : proDaily?.claimedToday ? ". Pack PRO : le prochain à minuit" : ""));
  function loadProfile(opts = {}) {
    const key = JSON.stringify(opts);
    if (!profileLoads.has(key)) profileLoads.set(key, data.profile(opts).then((p) => (profile = p), () => {}).finally(() => profileLoads.delete(key)));
    return profileLoads.get(key);
  }
  loadProfile();
  $effect(() => {
    const onSync = () => loadProfile({ balance: false });
    window.addEventListener("wm:profile", onSync);
    return () => window.removeEventListener("wm:profile", onSync);
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
  // the game's backend fails now and then: one calm indicator instead of scattered errors
  let unstable = $state(health.state === "unstable");
  $effect(() => health.subscribe((s) => (unstable = s === "unstable")));

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

  // Each toast hides after 8 s; hovering pauses that, leaving gives it 3 s more. Dismissing
  // only hides it: the notification stays unread in the bell.
  const toastTimers = new Map();
  const dismiss = (n) => { clearTimeout(toastTimers.get(n.id)); toastTimers.delete(n.id); toasts = toasts.filter((t) => t.id !== n.id); };
  const hideLater = (n, ms) => { clearTimeout(toastTimers.get(n.id)); toastTimers.set(n.id, setTimeout(() => dismiss(n), ms)); };
  function toast(n) {
    toasts = [...toasts, n].slice(-3);
    hideLater(n, 8000);
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
  function openNotif(n, e) {
    if (!n.read) markRead([n.id]);
    // our own screens (an auction, the trades) open in place; other pages (duels, friends) stay native links
    if (isOurs(n.href)) { e?.preventDefault(); history.pushState({}, "", n.href); }
    notifOpen = false;
    toasts = toasts.filter((t) => t.id !== n.id);
  }

  // A notification without a link is still a control: focusable, and Enter or Space opens it.
  const asButton = (n) => (n.href ? {} : { role: "button", tabindex: 0,
    onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openNotif(n, e); } } });

  // Keyboard shortcuts. Keys typed into a field stay in the field (Esc leaves it).
  let appEl;
  // every tab bar of the app (dialogs included) ticks when it switches
  $effect(() => tabTicks(appEl.getRootNode()));
  let help = $state(false);
  let menuOpen = $state(false);
  const SHORTCUTS = [["/", "Rechercher"], ["1 à 5", "Changer d'écran"], ["Espace", "Ouvrir un paquet"], ["Flèches", "Parcourir les cartes révélées"], ["Échap", "Fermer"], ["[", "Replier ou déplier le menu"], ["?", "Afficher cette aide"]];
  function onKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const el = e.composedPath()[0];
    if (el?.matches?.("input, select, textarea")) {
      if (e.key === "Escape") el.blur();
      return;
    }
    // a closing overlay consumes the key: the screen under it must not act on it too
    if (e.key === "Escape") { if (help || notifOpen || menuOpen) e.preventDefault(); help = false; notifOpen = false; menuOpen = false; return; }
    if (appEl?.querySelector(".modal-backdrop")) return; // a dialog owns the keyboard
    if (e.key === "?") help = !help;
    if (e.key === "[") toggleSideRail();
    else if (e.key === "/") { e.preventDefault(); appEl?.querySelector("input.search")?.focus(); }
    else if (/^[1-5]$/.test(e.key)) go(VIEWS[e.key - 1]);
  }
</script>

<svelte:window onkeydown={onKey} />

<div class="app" class:rail={settings.sideRail} bind:this={appEl}>
  <LoadBar />
  <aside class="side">
    <div class="brand"><span class="mk"></span><b>Wiki Remaster</b>
      <button type="button" class="side-toggle" onclick={toggleSideRail} aria-expanded={!settings.sideRail}
        aria-label={settings.sideRail ? "Déplier le menu" : "Replier le menu"} title={(settings.sideRail ? "Déplier le menu" : "Replier le menu") + " ( [ )"}><Icon name="sidebar" width={1.7} /></button>
    </div>
    <nav class="nav" bind:this={navEl} use:scrollFade={{ axis: "x" }}>
      {#each VIEWS as v}
        <button type="button" class:on={view === v.id} aria-current={view === v.id ? "page" : undefined} title={settings.sideRail ? v.label : undefined} onclick={() => go(v)}><Icon name={v.icon} width={1.7} /><span class="nav-long">{v.label}</span><span class="nav-short">{v.short ?? v.label}</span></button>
      {/each}
      <div class="nav-sep">Le reste du site</div>
      <div class="nav-grid">
        {#each NATIVE as [path, label, icon]}
          <a href={data.isReal ? path : "https://www.wiki-masters.com" + path} title={label} aria-label={label}><Icon name={icon} width={1.7} /><span class="nav-lbl">{label}</span></a>
        {/each}
      </div>
    </nav>
    <div class="side-foot">
      {#if data.canReset}<button class="ghost" onclick={reset}>Réinitialiser</button>{/if}
      <button class="foot-link" onclick={() => (help = true)} title="Raccourcis clavier"><span class="kbd">?</span><span class="foot-txt">Raccourcis clavier</span></button>
      <div class="hintline">{data.isReal ? "Connecté à WikiMasters" : "Serveur de test local"}</div>
    </div>
  </aside>

  <main class="main">
    <header class="topbar">
      <div class="crumb"><span class="nav-long">{current.label}</span><span class="nav-short">{current.short ?? current.label}</span></div>
      <div class="wallet">
        {#if unstable}
          <span class="health" role="status" title="Le serveur du jeu répond mal : nouvelle tentative automatique, vos données restent affichées.">
            <span class="health-dot"></span><span class="health-txt">Serveur du jeu instable</span>
          </span>
        {/if}
        <!-- ATK/DEF everywhere at once, one tap from every screen (phones too) -->
        <button class="bell stats-toggle" class:off={settings.hideStats} aria-pressed={!settings.hideStats} onclick={toggleHideStats}
          aria-label={settings.hideStats ? "Afficher l'ATK et la DEF" : "Masquer l'ATK et la DEF"} title={settings.hideStats ? "Afficher l'ATK et la DEF" : "Masquer l'ATK et la DEF"}><span>ATK</span></button>
        <SoundControl />
        <!-- phones and tablets: sound, ATK/DEF and the original site's pages, in one sheet -->
        <button class="bell menu-btn" aria-label="Menu" aria-expanded={menuOpen} onclick={() => (menuOpen = true)}><Icon name="menu" width={1.8} /></button>
        <div class="notif">
          <button class="bell" class:has={unread.length > 0} aria-label="Notifications"
            onclick={() => { notifOpen = !notifOpen; if (notifOpen) loadNotifs(); }}>
            <Icon name="bell" width={1.7} />
            {#if unread.length}<span class="bell-badge">{unread.length}</span>{/if}
          </button>
          {#if notifOpen}
            <div class="notif-scrim" role="presentation" onclick={() => (notifOpen = false)}></div>
            <div class="notif-panel" role="dialog" aria-label="Notifications">
              <div class="notif-head">
                Notifications{#if unread.length}<span class="notif-count">{unread.length}</span>
                  <button class="link-btn" onclick={() => markRead()}>Tout marquer comme lu</button>{/if}
              </div>
              {#each notifs as n (n.id)}
                <svelte:element this={n.href ? "a" : "div"} href={n.href} {...asButton(n)} class="notif-item" class:unread={!n.read} onclick={(e) => openNotif(n, e)}>
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
        <button type="button" class="chip pk-chip" class:regen={packTime.secs != null} title={packTitle} aria-label="{packTitle}. Ouvrir des paquets" onclick={() => go(VIEWS[0])}>
          <span class="pk-ring" style:--p={packFill}><Icon name="pulls" class="cico pk" /></span>
          <b>{profile?.packs_remaining ?? "-"}</b><span class="chip-cap">/{profile?.pack_cap ?? 10}</span>
          {#if packTime.secs != null}<span class="pk-next" class:ready={!packTime.secs}>{packTime.secs ? clock(packTime.secs) : "prêt"}</span>{/if}
          {#if proDaily?.eligible}<span class="pk-pro">+1 PRO</span>{/if}
        </button>
        <span class="chip" title="WikiBidous">
          <Icon name="coin" class="cico coin" /><b>{profile?.currency ?? "-"}</b>
        </span>
      </div>
    </header>
    <section class="view">
      {#if view === "pulls"}
        <Pulls {profile} {onchanged} onprofile={() => loadProfile({ sync: true })} />
      {:else if view === "collection"}
        {#key collKey}<Collection onwallet={() => loadProfile()} />{/key}
      {:else if view === "catalog"}
        <Catalog />
      {:else if view === "trades"}
        <Trades {profile} onwallet={() => loadProfile()} />
      {:else}
        <Marketplace {profile} onwallet={() => loadProfile()} openId={openAuction} />
      {/if}
    </section>
  </main>

  {#if menuOpen}
    <div class="sheet-scrim" role="presentation" onclick={() => (menuOpen = false)}></div>
    <div class="sheet" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="sheet-grab"></div>
      <section class="sheet-sec"><SoundSettings /></section>
      <section class="sheet-sec sheet-row">
        <div><b>ATK et DEF</b><span>Sur toutes les cartes</span></div>
        <button class="snd-switch" role="switch" aria-checked={!settings.hideStats} aria-label="Afficher l'ATK et la DEF" onclick={toggleHideStats}><span></span></button>
      </section>
      <section class="sheet-sec">
        <b class="sheet-title">Le reste du site</b>
        <div class="sheet-grid">
          {#each NATIVE as [path, label, icon]}
            <a href={data.isReal ? path : "https://www.wiki-masters.com" + path}><Icon name={icon} width={1.7} /><span>{label}</span></a>
          {/each}
        </div>
      </section>
      <button class="btn sheet-reset" onclick={() => useOriginalSite()}>Revenir au site original</button>
      {#if data.canReset}<button class="btn sheet-reset" onclick={() => { menuOpen = false; reset(); }}>Réinitialiser (test)</button>{/if}
    </div>
  {/if}

  {#if toasts.length}
    <div class="toasts" role="status" aria-live="polite">
      {#each toasts as n (n.id)}
        <div class="toast-wrap" role="presentation" onmouseenter={() => clearTimeout(toastTimers.get(n.id))} onmouseleave={() => hideLater(n, 3000)}>
          <svelte:element this={n.href ? "a" : "div"} href={n.href} {...asButton(n)} class="toast" onclick={(e) => openNotif(n, e)}>
            <Icon name="bell" width={1.8} />
            <div><b>{n.title}</b>{#if n.message}<span>{n.message}</span>{/if}</div>
          </svelte:element>
          <button class="toast-x" onclick={() => dismiss(n)} aria-label="Fermer la notification" title="Fermer"><Icon name="close" width={2} /></button>
        </div>
      {/each}
    </div>
  {/if}

  {#if help}
    <div class="kbd-help-scrim" role="presentation" onclick={() => (help = false)}>
      <div class="kbd-help" role="dialog" aria-label="Raccourcis clavier">
        <h3>Raccourcis clavier</h3>
        {#each SHORTCUTS as [k, what]}<div class="kbd-row"><span class="kbd">{k}</span>{what}</div>{/each}
      </div>
    </div>
  {/if}
  <!-- Last, so the check paints above any open dialog (a trade write fires from one). -->
  <HumanCheck />
</div>
