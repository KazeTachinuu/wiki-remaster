<script>
  import Card from "../../components/Card.svelte";
  import CardModal from "../../components/CardModal.svelte";
  import Icon from "../../components/Icon.svelte";
  import { RNAME } from "../../wm/index.js";
  import { reveal } from "../../sound/sound.js";
  import { rarest } from "../../sound/sfx.js";
  let { cards, ondone } = $props();
  let i = $state(0);
  let showAll = $state(false);
  let selected = $state(null);
  // Every card that comes into view answers with its rarity; the grid answers once, with the
  // rarest of the pack.
  $effect(() => reveal(showAll ? rarest(cards) : cards[i].rarity));
  let last = $derived(i === cards.length - 1);
  let newCount = $derived(cards.filter((c) => c.is_new).length);

  function openCard(c) {
    // A freshly pulled card, shown read-only: info and market value, no actions mid-pull.
    selected = { id: null, card: c, count: 0, is_shiny: c.is_shiny, starred: false, obtained_at: null, tags: [] };
  }

  function onKey(e) {
    if (selected) return; // the detail modal handles its own keys
    if (showAll) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ondone?.(); }
      return;
    }
    if (e.key === "ArrowLeft" && i > 0) i -= 1;
    else if (e.key === "ArrowRight" && !last) i += 1;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (last) ondone?.();
      else i += 1;
    }
  }

  // Horizontal swipe: left advances (or finishes on the last card), right rewinds.
  let sx = null;
  function onDown(e) { sx = e.clientX; }
  function onUp(e) {
    if (sx === null) return;
    const dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) { if (last) ondone?.(); else i += 1; }
    else if (i > 0) i -= 1;
  }
</script>

<svelte:window onkeydown={onKey} />

{#if showAll}
  <div class="reveal reveal-all">
    <div class="reveal-all-head">
      <h2>Votre paquet</h2>
      <div class="sub">{cards.length} cartes{newCount ? `, ${newCount} nouvelle${newCount > 1 ? "s" : ""}` : ""}</div>
    </div>
    <div class="reveal-grid" style:--cols={Math.min(cards.length, 5)} style:--rows={Math.ceil(cards.length / Math.min(cards.length, 5))}>
      {#each cards as c, k (k)}
        <div class="rg-card" style="animation-delay:{Math.min(k, 20) * 50}ms">
          <div class="rg-aura" data-r={c.rarity}></div>
          <button class="card-btn" onclick={() => openCard(c)} aria-label={c.title}>
            <Card card={c} isNew={c.is_new} shiny={c.is_shiny} />
          </button>
        </div>
      {/each}
    </div>
    <button class="btn primary" onclick={() => ondone?.()}>Terminé</button>
  </div>
{:else}
  <div class="reveal">
    <div class="count">Carte <b>{i + 1}</b> / {cards.length}</div>
    <div class="stage" data-r={cards[i].rarity} role="group" aria-label="Carte, glissez ou utilisez les flèches" onpointerdown={onDown} onpointerup={onUp} onpointercancel={() => (sx = null)} style="touch-action:pan-y">
      {#key i}
        <div class="stage-aura" data-r={cards[i].rarity}></div>
        <div class="flip-in">
          <button class="card-btn" onclick={() => openCard(cards[i])} aria-label="Détails de {cards[i].title}">
            <Card card={cards[i]} big isNew={cards[i].is_new} shiny={cards[i].is_shiny} />
          </button>
        </div>
      {/key}
    </div>
    {#key i}
      <div class="reveal-rarity" data-r={cards[i].rarity}>{RNAME[cards[i].rarity] || cards[i].rarity}</div>
    {/key}
    <div class="dots">
      {#each cards as _, k}
        <span class="d" class:on={k === i} class:seen={k < i}></span>
      {/each}
    </div>
    <div class="navrow">
      <button class="arrow" onclick={() => i > 0 && (i -= 1)} disabled={i === 0} aria-label="Précédent">
        <Icon name="prev" width={2} />
      </button>
      <button class="btn primary" onclick={() => (last ? ondone?.() : (i += 1))}>{last ? "Terminé" : "Suivant"}</button>
      <button class="arrow" onclick={() => !last && (i += 1)} disabled={last} aria-label="Suivant">
        <Icon name="next" width={2} />
      </button>
    </div>
    <button class="reveal-skip" onclick={() => (showAll = true)}>Tout révéler</button>
  </div>
{/if}

{#if selected}
  <CardModal item={selected} readonly onclose={() => (selected = null)} />
{/if}
