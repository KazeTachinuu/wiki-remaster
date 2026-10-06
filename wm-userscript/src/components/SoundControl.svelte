<script>
  // The speaker in the top bar (desktop): shows the state at a glance and opens the sound
  // settings in a small popover. Phones reach the same settings through the menu sheet.
  import Icon from "./Icon.svelte";
  import SoundSettings from "./SoundSettings.svelte";
  import { onSoundChange, onVolumeChange } from "../sound/sound.js";

  let on = $state(true);
  let vol = $state(0.7);
  let open = $state(false);
  $effect(() => onSoundChange((v) => (on = v)));
  $effect(() => onVolumeChange((v) => (vol = v)));

  const pct = $derived(Math.round(vol * 100));
  const icon = $derived(!on || vol === 0 ? "mute" : vol < 0.4 ? "soundLow" : "sound");
  const label = $derived(!on || vol === 0 ? "Son coupé" : `Son : ${pct} %`);
</script>

<svelte:window onkeydown={(e) => { if (open && e.key === "Escape") open = false; }} />

<div class="snd">
  <button class="bell" class:has={on && vol > 0} aria-label={label} title={label} aria-expanded={open} onclick={() => (open = !open)}>
    <Icon name={icon} width={1.7} />
  </button>
  {#if open}
    <div class="notif-scrim" role="presentation" onclick={() => (open = false)}></div>
    <div class="snd-panel" role="dialog" aria-label="Son"><SoundSettings /></div>
  {/if}
</div>
