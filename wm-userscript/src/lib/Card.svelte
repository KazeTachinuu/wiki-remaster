<script>
  import Icon from "./Icon.svelte";
  import { settings } from "./settings.svelte.js";
  import { nf } from "./format.js";
  import { isOnyx, rarityArt } from "./cardArt.js";
  let { card, count = 1, isNew = false, shiny = false, starred = false, value = undefined,
        owned = true, wishlisted = false, big = false, caption = true, stats = true } = $props();
  // stats: false hides ATK/DEF where the value is what matters (trade picking)
  const showStats = $derived(stats && !settings.hideStats);
  let hasValue = $derived(typeof value === "number");
  // Blur images flagged nsfw_image when the viewer keeps sensitive content hidden (our
  // substitution for the game's server-side blurredCardIds; matches the real "grid blurs").
  let blurred = $derived(settings.hideSensitive && card.nsfw_image);

  const onyx = $derived(isOnyx(card, shiny));
  const art = $derived(rarityArt(card, shiny));

  // Fall back from a broken photo to the rarity art (never a blank card).
  let imgFailed = $state(false);
  let artFailed = $state(false);
  let showPhoto = $derived(!!card.image_url && !imgFailed);

  // Fade images in once loaded. Checks `complete` first: a cached image can finish before the
  // listener is attached, and must not stay invisible.
  let ready = $state(false);
  function fadeIn(img) {
    const done = () => (ready = true);
    if (img.complete && img.naturalWidth) done();
    img.addEventListener("load", done);
    img.addEventListener("error", done);
    return { destroy: () => { img.removeEventListener("load", done); img.removeEventListener("error", done); } };
  }
</script>

<article class="wc" class:is-ready={ready || artFailed} class:wc-big={big} class:bare={!caption} class:is-noimg={!showPhoto} class:is-shiny={shiny} class:is-unowned={!owned} class:is-nsfw={blurred} data-r={card.rarity}>
  <div class="wc-face">
    {#if onyx}
      <!-- Shiny Legendary: onyx art + dark shade/tint/wash form the black base; the photo
           (if any) sits ON TOP so it stays visible, then the gold veins gild over it, the
           real site's z-order (photo above the dark layers, veins above the photo). -->
      <img class="wc-bg onyx" src={art} alt="" aria-hidden="true" loading="lazy" use:fadeIn />
      <span class="ox ox-shade" aria-hidden="true"></span>
      <span class="ox ox-tint" aria-hidden="true"></span>
      <span class="ox ox-wash" aria-hidden="true"></span>
      {#if showPhoto}
        <img class="wc-photo onyx-photo" src={card.image_url} alt={card.title} loading="lazy" crossorigin="anonymous" onerror={() => (imgFailed = true)} />
      {/if}
      <span class="ox ox-lines" aria-hidden="true"></span>
      <!-- a gold highlight that drifts along the veins, so they shimmer (the real site's at-rest shine) -->
      <span class="ox ox-shine" aria-hidden="true"></span>
    {:else if showPhoto}
      <img class="wc-blur" src={card.image_url} alt="" aria-hidden="true" loading="lazy" crossorigin="anonymous" />
      <img class="wc-photo" src={card.image_url} alt={card.title} loading="lazy" crossorigin="anonymous" onerror={() => (imgFailed = true)} use:fadeIn />
    {:else if !artFailed}
      <img class="wc-bg" src={art} alt="" aria-hidden="true" loading="lazy" onerror={() => (artFailed = true)} use:fadeIn />
    {/if}
    {#if shiny}<span class="wc-holo" class:onyx={onyx} aria-hidden="true"></span>{/if}
    {#if blurred}<span class="wc-nsfw" aria-hidden="true">Contenu sensible</span>{/if}
  </div>
  <div class="wc-scrim"></div>
  <div class="wc-top">
    <span class="wc-rtag" data-r={card.rarity}>{card.rarity}</span>
    <span class="wc-flags">
      {#if wishlisted}<span class="wc-wish" title="Liste de souhaits" aria-label="Liste de souhaits"><Icon name="heart" filled width={0} /></span>{/if}
      {#if starred}<span class="wc-star" title="Favori" aria-label="Favori"><Icon name="star" filled width={0} /></span>{/if}
      {#if shiny}<span class="wc-shiny" title="Brillante" aria-label="Brillante"><Icon name="sparkle" filled width={0} /></span>{/if}
      {#if count > 1}<span class="wc-count">x{count}</span>{/if}
      {#if isNew}<span class="wc-new">Nouvelle</span>{/if}
    </span>
  </div>
  <div class="wc-cap">
    <h3 class="wc-name">{card.title}</h3>
    <div class="wc-cat">{card.category}</div>
    {#if showStats || hasValue}
      <div class="wc-meta">
        {#if showStats}
          <span class="wc-stats">
            <span>ATK <b>{nf(card.atk)}</b></span>
            <span>DEF <b>{nf(card.def)}</b></span>
          </span>
        {/if}
        {#if hasValue}<span class="wc-val" title="Valeur estimée d'après le marché">{nf(value)}</span>{/if}
      </div>
    {/if}
  </div>
</article>
