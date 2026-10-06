<script>
  // The art of a card without a picture (lib/cardSky.js): a star in the rarity's colour on a night
  // sky. A shiny card adds its signature, a meteor shower whose shooting stars keep flying.
  let { sky, shiny = false } = $props();
  const STAR = "M0-1C.08-.25.25-.08 1 0 .25.08.08.25 0 1-.08.25-.25.08-1 0-.25-.08-.08-.25 0-1Z";
  const id = $props.id();
</script>

<svg class="wc-sky" viewBox="0 0 100 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  {#if shiny}
  <defs>
    <radialGradient id="g{id}"><stop offset="0" stop-color="#fff" stop-opacity=".55" /><stop offset=".22" class="glow-mid" /><stop offset="1" class="glow-out" /></radialGradient>
    <!-- each trail fades from its tail to its head -->
    {#each sky.shooting as [x0, y0, x1, y1], i}
      <linearGradient id="t{id}-{i}" gradientUnits="userSpaceOnUse" {x1} {y1} x2={x0} y2={y0}><stop offset="0" stop-color="#fff" /><stop offset="1" stop-color="#fff" stop-opacity="0" /></linearGradient>
    {/each}
  </defs>
  {/if}
  {#each sky.stars as [x, y, r, o]}<circle cx={x} cy={y} {r} fill="#fff" fill-opacity={o} />{/each}
  {#each shiny ? sky.shooting : [] as [x0, y0, x1, y1, w, o], i}
    <g class="meteor" opacity={o} style="--dx:{(x1 - x0) * 2.2}px;--dy:{(y1 - y0) * 2.2}px;animation-delay:{-i * 0.55}s">
      <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="url(#t{id}-{i})" stroke-width={w} stroke-linecap="round" />
      <circle cx={x1} cy={y1} r={w * 0.9} fill="#fff" />
    </g>
  {/each}
  {#if shiny}
    <!-- shiny: the star glows, larger and brighter, with a few sparkles -->
    <circle cx="50" cy="52" r="30" fill="url(#g{id})" />
    {#each sky.sparkles as [x, y, k]}<path class="spark" d={STAR} transform="translate({x} {y}) scale({k})" />{/each}
  {/if}
  <g transform="translate(50 52)">
    <path class="ray" d={STAR} transform="scale({shiny ? 15 : 13})" />
    <path class="core" d={STAR} transform="scale({shiny ? 8 : 6.5})" />
  </g>
</svg>
