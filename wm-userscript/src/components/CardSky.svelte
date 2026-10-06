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
  </defs>
  {/if}
  <path d={sky.field.dim} stroke="#fff" stroke-opacity=".38" stroke-width=".7" stroke-linecap="round" />
  <path d={sky.field.bright} stroke="#fff" stroke-opacity=".7" stroke-width=".85" stroke-linecap="round" />
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
{#if shiny}
  <!-- the shooting stars: each its own small layer that only slides (the graphics card moves it,
       nothing is redrawn), so a screen full of shiny cards scrolls smoothly -->
  {#each sky.shooting as [x0, y0, x1, y1, w, o], i}
    <span class="wc-meteor" aria-hidden="true" style="left:{x0}%;top:{(y0 / 140) * 100}%;width:{Math.hypot(x1 - x0, y1 - y0)}%;--a:{Math.atan2(y1 - y0, x1 - x0)}rad;--w:{w * 2.4}px;opacity:{o};animation-delay:{-i * 0.55}s"></span>
  {/each}
{/if}
