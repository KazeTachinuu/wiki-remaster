<script>
  // The conversation with one trade partner, inside the trade pane: messages and our trades with
  // them on one timeline, refreshed every 5 s while shown (no realtime: the game's quota is full).
  import Icon from "./Icon.svelte";
  import { data, statusLabel } from "../wm/index.js";
  import { ago } from "./format.js";
  let { friend, onopentrade } = $props();

  let conv = $state(null); // { messages, trades }
  let text = $state("");
  let busy = $state(false);
  let msg = $state("");
  let list = $state(null);
  let loadErr = $state(""); // shown only while nothing has loaded yet; a later good poll clears it
  const load = () => data.chat(friend.id).then((c) => { conv = c; loadErr = ""; }, (e) => { loadErr = e.message; });
  load();
  $effect(() => { const t = setInterval(() => document.visibilityState === "visible" && load(), 5000); return () => clearInterval(t); });
  // messages and trades interleaved by time, newest at the bottom
  const feed = $derived(conv ? [...conv.messages.map((m) => ({ kind: "msg", at: m.at, m })), ...conv.trades.map((t) => ({ kind: "trade", at: t.createdAt, t }))].sort((a, b) => String(a.at).localeCompare(String(b.at))) : null);
  // follow new entries only while the reader is at the bottom (or just sent), so a poll never yanks them back down
  let stick = true;
  const onScroll = () => (stick = list.scrollHeight - list.scrollTop - list.clientHeight < 40);
  $effect(() => { feed; if (list && stick) list.scrollTop = list.scrollHeight; });

  async function send() {
    const content = text.trim();
    if (!content || busy) return;
    busy = true; msg = "";
    try { await data.sendChat(friend.id, content); text = ""; stick = true; await load(); }
    catch (e) { msg = e.message; }
    finally { busy = false; }
  }
</script>

<div class="chat" aria-label="Conversation avec {friend.username}">
  <div class="chat-feed" bind:this={list} onscroll={onScroll} aria-live="polite">
    {#if !feed && loadErr}<div class="empty"><b>{loadErr}</b><button class="btn" onclick={load}>Réessayer</button></div>
    {:else if !feed}<div class="loading-more"><span class="spin"></span></div>
    {:else if !feed.length}<div class="empty"><b>Aucun message.</b><span>Écrivez à {friend.username} pour négocier.</span></div>
    {:else}
      {#each feed as f (f.kind + (f.m?.id ?? f.t.id))}
        {#if f.kind === "msg"}
          <div class="bubble" class:mine={f.m.mine}><span>{f.m.content}</span><time class="nowrap">{ago(f.m.at)}</time></div>
        {:else}
          <button class="chat-trade" onclick={() => onopentrade?.(f.t)}><Icon name="trades" /> Échange · {statusLabel(f.t.status)} · {f.t.give.length} contre {f.t.get.length}</button>
        {/if}
      {/each}
    {/if}
  </div>
  <form class="chat-form" onsubmit={(e) => { e.preventDefault(); send(); }}>
    <input class="search chat-input" bind:value={text} placeholder="Écrire à {friend.username}..." maxlength="500" />
    <button class="btn primary" disabled={busy || !text.trim()}>Envoyer</button>
  </form>
  {#if msg}<div class="modal-msg chat-msg">{msg}</div>{/if}
</div>
