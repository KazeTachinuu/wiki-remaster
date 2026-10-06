<script module>
  // 24x24 line icons, stroked with currentColor.
  const PATHS = {
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.4-3.4"/>',
    prev: '<path d="M15 18l-6-6 6-6"/>',
    next: '<path d="M9 6l6 6-6 6"/>',
    sort: '<path d="M7 5v14M7 19l-3-3M7 5l3 3M17 19V5M17 5l3 3M17 19l-3-3"/>',
    eye: '<path d="M2.5 11.5S6 4.5 12 4.5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"/><circle cx="12" cy="11.5" r="3"/>',
    eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 10.7a3 3 0 0 0 3.9 3.9"/><path d="M9.8 4.7A10.4 10.4 0 0 1 12 4.5c6 0 9.5 7 9.5 7a17.6 17.6 0 0 1-2.9 3.8M6 6.2A17.3 17.3 0 0 0 2.5 11.5s3.5 7 9.5 7c1 0 1.9-.1 2.8-.4"/>',
    heart: '<path d="M12 20.5S3.5 14.7 3.5 9.2A4.2 4.2 0 0 1 12 6.5a4.2 4.2 0 0 1 8.5 2.7c0 5.5-8.5 11.3-8.5 11.3z"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>',
    sparkle: '<path d="M12 2l1.9 6.4L20 10l-6.1 1.6L12 18l-1.9-6.4L4 10l6.1-1.6z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    select: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8 12l2.8 2.8L16.5 9"/>',
    bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.5 21a2 2 0 0 1-3 0"/>',
    coin: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/>',
    pulls: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/>',
    collection: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>',
    catalog: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    market: '<path d="M4.5 9 6 5h12l1.5 4M5.5 9v10h13V9M9.5 19v-6h5v6"/>',
    trades: '<path d="M4 9h13l-3-3M20 15H7l3 3"/>',
    battle: '<path d="M4.5 19.5l1-3 9-9 2 2-9 9zM19.5 19.5l-1-3-9-9-2 2 9 9z"/>',
    guild: '<path d="M12 3l7 2.5v5.5c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V5.5z"/>',
    friends: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M20.5 20a5.5 5.5 0 0 0-3.5-5.1"/>',
    dms: '<path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4A7.5 7.5 0 1 1 20 11.5z"/>',
    leaderboard: '<path d="M4 20h16M6 20v-6M12 20V5M18 20v-9"/>',
    achievements: '<path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4.5v1.5A3 3 0 0 0 7.5 10.5M17 6h2.5v1.5a3 3 0 0 1-3 3M12 14v3M8.5 20h7l-.6-3H9.1z"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    sound: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
    soundLow: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6"/>',
    mute: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6"/>',
  };
</script>

<script>
  let { name, filled = false, width = 1.8, class: cls = "" } = $props();
</script>

<svg class={cls} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" stroke-width={width}
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{@html PATHS[name]}</svg>
