<script>
  // The speaker in the corner of the pack screen: mutes every sound of the remaster (and the
  // game's own, which reads the same setting).
  import Icon from "./Icon.svelte";
  import { onSoundChange, setSoundOn } from "./sound.js";
  let on = $state(true);
  $effect(() => onSoundChange((v) => (on = v)));
  const label = $derived(on ? "Couper le son" : "Activer le son");
</script>

<button class="sound-toggle" class:off={!on} onclick={() => setSoundOn(!on)} aria-label={label} title={label} aria-pressed={!on}>
  <Icon name={on ? "sound" : "mute"} />
</button>
