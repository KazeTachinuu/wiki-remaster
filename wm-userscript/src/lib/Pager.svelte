<script>
  import Icon from "./Icon.svelte";
  let { page, hasNext, loading = false, ongo } = $props();
</script>

<div class="pager">
  <button class="btn pager-btn" disabled={page === 0 || loading} onclick={() => ongo(page - 1)}>
    <Icon name="prev" width={1.9} />Précédent
  </button>
  <span class="pager-info">Page {page + 1}</span>
  <button class="btn pager-btn" disabled={!hasNext || loading} onclick={() => ongo(page + 1)}>
    Suivant<Icon name="next" width={1.9} />
  </button>
</div>
