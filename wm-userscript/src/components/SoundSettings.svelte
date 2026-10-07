<script>
  // The sound settings: the mute switch (the game's own setting too) and the volume. Moving the
  // volume unmutes; releasing it plays a short sample so the new level can be heard. Shown by the
  // speaker's popover (desktop) and the menu sheet (phone).
  import Icon from "./Icon.svelte";
  import { onSoundChange, onVolumeChange, setSoundOn, setVolume, play, onChimeChange, setChimeFrom, CHIME_ORDER } from "../sound/sound.js";
  import { RNAME } from "../wm/index.js";

  let on = $state(true);
  let vol = $state(0.7);
  $effect(() => onSoundChange((v) => (on = v)));
  $effect(() => onVolumeChange((v) => (vol = v)));
  const pct = $derived(Math.round(vol * 100));

  // the rarity chimes, from which rarity up: a stop per rarity, lit from the chosen one; letting
  // go plays that rarity's chime
  let from = $state("C");
  $effect(() => onChimeChange((r) => (from = r)));
  const at = $derived(CHIME_ORDER.indexOf(from));
  function pickChime(e) {
    setChimeFrom(CHIME_ORDER[e.currentTarget.value]);
    if (!on) setSoundOn(true);
  }

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
  <input type="range" min="0" max="100" step="5" value={pct} style:--pct="{pct}%" oninput={slide} onchange={() => play("success")} aria-label="Volume" aria-valuetext="{pct} %" />
  <Icon name="sound" />
  <output>{pct} %</output>
</label>
<div class="chime" class:off={!on}>
  <div class="chime-head"><span>Carillon de rareté</span><b>{at ? `${RNAME[from]} et plus` : "Toutes les raretés"}</b></div>
  <div class="chime-track" style:--at={at}>
    <span class="chime-lit" aria-hidden="true"></span>
    {#each CHIME_ORDER as r, i (r)}<span class="chime-stop" class:lit={i >= at} data-r={r} style:--i={i} aria-hidden="true"></span>{/each}
    <input type="range" min="0" max={CHIME_ORDER.length - 1} step="1" value={at} oninput={pickChime} onchange={() => play(from)} aria-label="Carillon à partir de" aria-valuetext={RNAME[from]} />
  </div>
  <div class="chime-codes" aria-hidden="true">{#each CHIME_ORDER as r, i (r)}<span class:lit={i >= at} data-r={r}>{r}</span>{/each}</div>
</div>
<p class="snd-note">{on ? "Ouverture des paquets, révélations, sélection et confirmations." : "Tous les sons du remaster sont coupés, comme sur le site original."}</p>
