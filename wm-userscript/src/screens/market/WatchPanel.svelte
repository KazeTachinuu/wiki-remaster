<script>
  // My market alerts: what each one watches, how many sales answer it now, and a new one (prefilled
  // from the market's search). Checked every few minutes while the game is open (lib/watches).
  import Icon from "../../components/Icon.svelte";
  import SearchBox from "../../components/SearchBox.svelte";
  import { anchorCentered } from "../../lib/anchor.js";
  import { watches, addWatch, removeWatch } from "../../lib/watches.svelte.js";
  import { watchLabel } from "../../wm/watch.js";
  import { RARITIES_DESC, RNAME } from "../../wm/index.js";
  import { sounded } from "../../sound/sfx.js";

  // prefill: { q, rarity } from the search; onsearch(w): show a watch's sales in the market
  let { prefill = null, onclose, onsearch } = $props();

  let q = $state(prefill?.q ?? "");
  let rarity = $state(prefill?.rarity ?? "");
  let max = $state(null);
  let under = $state(false);
  let busy = $state(false);
  let msg = $state("");
  const taken = $derived(watches.list.some((w) => w.q.toLowerCase() === q.trim().toLowerCase() && w.rarity === rarity && (w.max ?? null) === (max > 0 ? Math.round(max) : null) && w.under === under));

  async function add(e) {
    e.preventDefault();
    if (busy || !q.trim() || taken) return;
    busy = true; msg = "";
    try {
      const w = await sounded(() => addWatch({ q, rarity, max, under }));
      const n = watches.counts[w.id];
      msg = n ? `Alerte créée. ${n} vente${n > 1 ? "s" : ""} déjà en cours : les nouvelles vous seront signalées.` : "Alerte créée. Vous serez prévenu dès qu'une vente apparaît.";
      q = ""; max = null; under = false;
    } catch (err) { msg = err.message; }
    busy = false;
  }
  const onKey = (e) => e.key === "Escape" && onclose?.();
  const focus = (node) => { if (!prefill?.q) node.querySelector("input")?.focus(); };
</script>

<svelte:window onkeydown={onKey} />

<div class="modal-backdrop" role="presentation" onclick={(e) => e.target === e.currentTarget && onclose?.()}>
  <div class="modal watch" role="dialog" aria-modal="true" aria-labelledby="wm-watch-title" tabindex="-1" use:anchorCentered>
    <button class="modal-close" onclick={onclose} aria-label="Fermer"><Icon name="close" width={2} class="x-ico" /></button>
    <header>
      <h2 id="wm-watch-title">Alertes du marché</h2>
      <p>Soyez prévenu quand une carte qui vous intéresse est mise en vente. Vérifié toutes les 5 minutes tant que le jeu est ouvert.</p>
    </header>

    <form class="watch-form" onsubmit={add}>
      <div class="watch-q" use:focus><SearchBox bind:value={q} placeholder="Mots de la carte, ex. singapour" /></div>
      <div class="watch-opts">
        <div class="isel"><select bind:value={rarity} aria-label="Rareté"><option value="">Toutes raretés</option>{#each RARITIES_DESC as r (r)}<option value={r}>{RNAME[r]}</option>{/each}</select></div>
        <label class="deal-max"><span class="auc-coin"></span><input type="number" min="1" inputmode="numeric" placeholder="Prix max" bind:value={max} aria-label="Prix maximum" /></label>
        <label class="watch-under"><input type="checkbox" bind:checked={under} /><span>Sous le prix du marché</span></label>
      </div>
      <button class="btn primary" type="submit" disabled={busy || !q.trim() || taken}>{#if busy}<span class="spin"></span>{:else}<Icon name="bell" />{/if}{taken ? "Déjà surveillé" : "Créer l'alerte"}</button>
    </form>
    {#if msg}<p class="ach-note" role="status">{msg}</p>{/if}

    {#if watches.list.length}
      <ul class="watch-list">
        {#each watches.list as w (w.id)}
          <li>
            <button class="watch-what" onclick={() => onsearch?.(w)} title="Voir ces ventes">
              <b>{watchLabel(w)}</b>
              <small>{watches.counts[w.id] == null ? "Vérification au prochain passage" : watches.counts[w.id] ? `${watches.counts[w.id]} en vente maintenant` : "Aucune vente pour l'instant"}</small>
            </button>
            <button class="fr-act" onclick={() => removeWatch(w.id)} aria-label="Supprimer l'alerte {watchLabel(w)}" title="Supprimer"><Icon name="close" width={2.2} /></button>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="fr-hint">Aucune alerte pour l'instant.</p>
    {/if}
  </div>
</div>
