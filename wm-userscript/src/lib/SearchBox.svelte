<script>
  import Icon from "./Icon.svelte";
  let { value = $bindable(""), placeholder } = $props();
</script>

<div class="search-wrap">
  <Icon name="search" class="search-ico" />
  <input class="search" type="search" {placeholder} bind:value />
  {#if value}
    <button class="search-clear" onclick={() => (value = "")} aria-label="Effacer la recherche"><Icon name="close" width={2} class="x-ico" /></button>
  {/if}
</div>
