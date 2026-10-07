<script>
  // A conversation with a friend, in a window (from Amis or a profile). `onopentrade(trade)`: a
  // trade shown in the conversation was opened.
  import Icon from "./Icon.svelte";
  import Avatar from "./Avatar.svelte";
  import TradeChat from "../screens/trades/TradeChat.svelte";
  import { anchorCentered } from "../lib/anchor.js";

  let { friend, onclose, onopentrade } = $props();
  const onKey = (e) => e.key === "Escape" && onclose?.();
</script>

<svelte:window onkeydown={onKey} />

<div class="modal-backdrop" role="presentation" onclick={(e) => e.target === e.currentTarget && onclose?.()}>
  <div class="modal fr-chat" role="dialog" aria-modal="true" aria-labelledby="wm-chat-title" tabindex="-1" use:anchorCentered>
    <button class="modal-close" onclick={onclose} aria-label="Fermer"><Icon name="close" width={2} class="x-ico" /></button>
    <header class="tm-head"><Avatar user={friend} size={36} /><h2 id="wm-chat-title">{friend.username}</h2></header>
    {#key friend.id}<TradeChat {friend} {onopentrade} />{/key}
  </div>
</div>
