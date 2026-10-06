<script>
  // A player's avatar: their image, else their initial on a colour derived from the name.
  let { user, size = 32 } = $props();
  const hue = $derived([...(user?.username || "?")].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7));
</script>

<span class="avatar" style="--s:{size}px;--h:{hue}">
  {#if user?.avatar}<img src={user.avatar} alt="" loading="lazy" />{:else}{(user?.username || "?")[0].toUpperCase()}{/if}
</span>
