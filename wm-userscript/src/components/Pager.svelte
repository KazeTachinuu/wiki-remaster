<script>
  import Icon from "./Icon.svelte";
  let { page, hasNext, loading = false, ongo } = $props();
  let dir = $state(0); // which button was clicked, so only that one spins
  const go = (d) => { dir = d; ongo(page + d); };
</script>

<div class="pager">
  <button class="btn pager-btn" disabled={page === 0 || loading} onclick={() => go(-1)}>
    {#if loading && dir < 0}<span class="spin"></span>{:else}<Icon name="prev" width={1.9} />{/if}Précédent
  </button>
  <span class="pager-info">Page {page + 1}</span>
  <button class="btn pager-btn" disabled={!hasNext || loading} onclick={() => go(1)}>
    Suivant{#if loading && dir > 0}<span class="spin"></span>{:else}<Icon name="next" width={1.9} />{/if}
  </button>
</div>
