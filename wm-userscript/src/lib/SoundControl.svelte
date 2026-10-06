<script>
  // The sound control in the top bar, on every screen: the speaker shows the state at a glance,
  // and opens a small panel with the volume and the mute switch (the same switch as the pack
  // screen's speaker and the game's own setting). Moving the volume unmutes; releasing it plays
  // a short sample so the new level can be heard.
  import Icon from "./Icon.svelte";
  import { onSoundChange, onVolumeChange, setSoundOn, setVolume, play } from "./sound.js";

  let on = $state(true);
  let vol = $state(0.7);
  let open = $state(false);
  $effect(() => onSoundChange((v) => (on = v)));
  $effect(() => onVolumeChange((v) => (vol = v)));

  const pct = $derived(Math.round(vol * 100));
  const icon = $derived(!on || vol === 0 ? "mute" : vol < 0.4 ? "soundLow" : "sound");
  const label = $derived(!on || vol === 0 ? "Son coupé" : `Son : ${pct} %`);

  function slide(e) {
    setVolume(e.currentTarget.value / 100);
    if (!on) setSoundOn(true);
  }
</script>

<svelte:window onkeydown={(e) => { if (open && e.key === "Escape") open = false; }} />

<div class="snd">
  <button class="bell" class:has={on && vol > 0} aria-label={label} title={label} aria-expanded={open} onclick={() => (open = !open)}>
    <Icon name={icon} width={1.7} />
  </button>
  {#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="notif-scrim" onclick={() => (open = false)}></div>
    <div class="snd-panel" role="dialog" aria-label="Son">
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
    </div>
  {/if}
</div>
