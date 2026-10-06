<script>
  // The art of a card without a picture (lib/cardSky.js): a star in the rarity's colour on a night
  // sky with a meteor shower. A still picture: no animation, nothing to compute.
  let { sky } = $props();
  const STAR = "M0-1C.08-.25.25-.08 1 0 .25.08.08.25 0 1-.08.25-.25.08-1 0-.25-.08-.08-.25 0-1Z";
  const id = $props.id();
</script>

<svg class="wc-sky" viewBox="0 0 100 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <!-- each trail fades from its tail to its head -->
    {#each sky.shooting as [x0, y0, x1, y1], i}
      <linearGradient id="t{id}-{i}" gradientUnits="userSpaceOnUse" {x1} {y1} x2={x0} y2={y0}><stop offset="0" stop-color="#fff" /><stop offset="1" stop-color="#fff" stop-opacity="0" /></linearGradient>
    {/each}
  </defs>
  {#each sky.stars as [x, y, r, o]}<circle cx={x} cy={y} {r} fill="#fff" fill-opacity={o} />{/each}
  {#each sky.shooting as [x0, y0, x1, y1, w, o], i}
    <g opacity={o}>
      <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="url(#t{id}-{i})" stroke-width={w} stroke-linecap="round" />
      <circle cx={x1} cy={y1} r={w * 0.9} fill="#fff" />
    </g>
  {/each}
  <g transform="translate(50 52)">
    <path class="ray" d={STAR} transform="scale(13)" />
    <path class="core" d={STAR} transform="scale(6.5)" />
  </g>
</svg>
