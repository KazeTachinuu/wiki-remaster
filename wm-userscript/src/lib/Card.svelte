<script>
  import Icon from "./Icon.svelte";
  import { settings } from "./settings.svelte.js";
  import { nf } from "./format.js";
  let { card, count = 1, isNew = false, shiny = false, starred = false, value = undefined,
        owned = true, wishlisted = false, big = false, caption = true } = $props();
  let hasValue = $derived(typeof value === "number");
  // Blur images flagged nsfw_image when the viewer keeps sensitive content hidden (our
  // substitution for the game's server-side blurredCardIds; matches the real "grid blurs").
  let blurred = $derived(settings.hideSensitive && card.nsfw_image);

  // Rarity background art, exactly as the real site (RARITY_CONFIG bgImage), served
  // from wiki-masters.com so it also resolves in local dev. A shiny Legendary uses the
  // dark "onyx" art instead of the gold one, that is the "black legendary" look.
  const ASSET_BASE = "https://www.wiki-masters.com";
  const RBG = { C: "/commun.png", PC: "/peu_commun.png", R: "/rare.png", SR: "/super_rare.png", UR: "/ultra_rare.png", L: "/legendaire.png" };
  const isOnyx = $derived(shiny && card.rarity === "L");
  const rarityArt = $derived(ASSET_BASE + (isOnyx ? "/shiny/onyx-art.webp" : (RBG[card.rarity] || "/commun.png")));

  // Fall back from a broken photo to the rarity art (never a blank card).
  let imgFailed = $state(false);
  let artFailed = $state(false);
  let showPhoto = $derived(!!card.image_url && !imgFailed);
</script>

<article class="wc" class:wc-big={big} class:bare={!caption} class:is-noimg={!showPhoto} class:is-shiny={shiny} class:is-unowned={!owned} class:is-nsfw={blurred} data-r={card.rarity}>
  <div class="wc-face">
    {#if isOnyx}
      <!-- Shiny Legendary: onyx art + dark shade/tint/wash form the black base; the photo
           (if any) sits ON TOP so it stays visible, then the gold veins gild over it, the
           real site's z-order (photo above the dark layers, veins above the photo). -->
      <img class="wc-bg onyx" src={rarityArt} alt="" aria-hidden="true" loading="lazy" />
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
      <img class="wc-photo" src={card.image_url} alt={card.title} loading="lazy" crossorigin="anonymous" onerror={() => (imgFailed = true)} />
    {:else if !artFailed}
      <img class="wc-bg" src={rarityArt} alt="" aria-hidden="true" loading="lazy" onerror={() => (artFailed = true)} />
    {/if}
    {#if shiny}<span class="wc-holo" class:onyx={isOnyx} aria-hidden="true"></span>{/if}
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
    {#if !settings.hideStats || hasValue}
      <div class="wc-meta">
        {#if !settings.hideStats}
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
