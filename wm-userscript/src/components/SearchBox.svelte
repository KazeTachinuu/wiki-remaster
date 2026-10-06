<script>
  import Icon from "./Icon.svelte";
  let { value = $bindable(""), placeholder, loading = false } = $props();
</script>

<div class="search-wrap">
  {#if loading}<span class="spin search-ico" role="status" aria-label="Recherche en cours"></span>{:else}<Icon name="search" class="search-ico" />{/if}
  <input class="search" type="search" {placeholder} bind:value />
  {#if value}
    <button class="search-clear" onclick={() => (value = "")} aria-label="Effacer la recherche"><Icon name="close" width={2} class="x-ico" /></button>
  {/if}
</div>
