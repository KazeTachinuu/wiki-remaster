<script>
  // The sound settings: the mute switch (the game's own setting too) and the volume. Moving the
  // volume unmutes; releasing it plays a short sample so the new level can be heard. Shown by the
  // speaker's popover (desktop) and the menu sheet (phone).
  import Icon from "./Icon.svelte";
  import { onSoundChange, onVolumeChange, setSoundOn, setVolume, play } from "./sound.js";

  let on = $state(true);
  let vol = $state(0.7);
  $effect(() => onSoundChange((v) => (on = v)));
  $effect(() => onVolumeChange((v) => (vol = v)));
  const pct = $derived(Math.round(vol * 100));

  function slide(e) {
    setVolume(e.currentTarget.value / 100);
    if (!on) setSoundOn(true);
  }
</script>

<div class="snd-head">
  <b>Son</b>
  <button class="snd-switch" role="switch" aria-checked={on} aria-label="Activer le son" onclick={() => { setSoundOn(!on); if (!on) play("tick"); }}><span></span></button>
</div>
<label class="snd-vol" class:off={!on}>
  <Icon name="soundLow" />
  <input type="range" min="0" max="100" step="5" value={pct} oninput={slide} onchange={() => play("success")} aria-label="Volume" aria-valuetext="{pct} %" />
  <Icon name="sound" />
  <output>{pct} %</output>
</label>
<p class="snd-note">{on ? "Ouverture des paquets, révélations, sélection et confirmations." : "Tous les sons du remaster sont coupés, comme sur le site original."}</p>
