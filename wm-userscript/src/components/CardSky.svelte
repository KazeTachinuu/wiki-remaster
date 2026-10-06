<script>
  // The art of a card without a picture (see lib/cardSky.js): a star, a sun when shiny, a
  // supernova for Legendaries, on the card's own starry sky. Coloured by the card's rarity.
  let { sky, kind } = $props();
  const jet = (a, len, w) => {
    const t = (a * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t), r0 = 8;
    return `M${(r0 * c - w * s).toFixed(2)} ${(r0 * s + w * c).toFixed(2)}L${(len * c).toFixed(2)} ${(len * s).toFixed(2)}L${(r0 * c + w * s).toFixed(2)} ${(r0 * s - w * c).toFixed(2)}Z`;
  };
  const STAR = "M0-1C.08-.25.25-.08 1 0 .25.08.08.25 0 1-.08.25-.25.08-1 0-.25-.08-.08-.25 0-1Z";
</script>

<svg class="wc-sky {kind}" viewBox="0 0 100 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  {#each sky.stars.slice(6) as [x, y, r, o]}<circle cx={x} cy={y} {r} fill="#fff" fill-opacity={o} />{/each}
  <g transform="translate(50 52) rotate({sky.tilt})">
    {#if kind === "nova"}
      <circle r="44" class="shell" /><circle r="36" class="shell thin" />
      {#each sky.jets as [a, len, w]}<path class="jet" d={jet(a, len, w)} />{/each}
      <circle r="22" class="glow" /><circle r="11" class="glow2" />
      <path class="ray" d={STAR} transform="scale(19)" /><path class="ray" d={STAR} transform="rotate(45) scale(10)" />
      <path class="core" d={STAR} transform="scale(8)" />
    {:else if kind === "sun"}
      {#each Array(24) as _, k}<line class="corona" x1="0" y1="-36" x2="0" y2={k % 2 ? -41 : -46} transform="rotate({k * 15})" />{/each}
      <circle r="34" class="h1" /><circle r="26" class="h2" /><circle r="19" class="h3" /><circle r="12.5" class="h4" />
      <path class="ray" d={STAR} transform="scale(12)" /><path class="core" d={STAR} transform="scale(6)" />
    {:else}
      <circle r="17" class="h3" />
      <path class="ray" d={STAR} transform="scale(13)" /><path class="core" d={STAR} transform="scale(6.5)" />
    {/if}
  </g>
</svg>
<!-- moving parts on their own layers (only opacity and transform change); they run only while the
     card is hovered, or in the big card of the detail view, so a grid at rest costs nothing -->
<span class="wc-pulse {kind}" aria-hidden="true"></span>
<!-- a wishing star: crosses the sky once each time the card is looked at -->
<span class="wc-comet" aria-hidden="true" style="top:{8 + ((sky.tilt + 15) / 30) * 22}%"></span>
{#each sky.stars.slice(0, 6) as [x, y], i}
  <span class="wc-tw" aria-hidden="true" style="left:{x}%;top:{(y / 140) * 100}%;animation-duration:{sky.twinkle[i][0]}s;animation-delay:{sky.twinkle[i][1]}s"></span>
{/each}
