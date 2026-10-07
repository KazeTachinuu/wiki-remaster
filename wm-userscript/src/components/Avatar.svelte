<script>
  // A player's avatar: their image (a card's picture, framed where they chose: ax, ay in %), else
  // their initial on a colour derived from the name.
  let { user, size = 32 } = $props();
  const hue = $derived([...(user?.username || "?")].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7));
</script>

<span class="avatar" style="--s:{size}px;--h:{hue}">
  {#if user?.avatar}<img src={user.avatar} alt="" loading="lazy" style:object-position="{user.ax ?? 50}% {user.ay ?? 50}%" />{:else}{(user?.username || "?")[0].toUpperCase()}{/if}
</span>
