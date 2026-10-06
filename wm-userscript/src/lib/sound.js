// Sound design for the remaster: every sound is synthesized live with Web Audio (no files).
// The pack tears open, each card swishes, and its rarity answers with a sting that grows richer
// from Commune to Légendaire. Interface sounds stay small. Approved by ear on a listening page.
//
// Mute follows the game's own setting ("wiki-masters-sound" = "off"), so muting on the native
// site mutes here too, and our speaker toggle writes the same key. The volume is ours
// ("wm-volume", 0 to 1, default 0.7: the level approved on the listening page).

const KEY = "wiki-masters-sound";
const VOLUME_KEY = "wm-volume";
const SCALE = 0.9; // full slider = 0.9 master gain, as on the listening page

let ctx = null, master = null, noiseBuf = null;
const subs = new Set();

export function soundOn() {
  try { return localStorage.getItem(KEY) !== "off"; } catch { return true; }
}
export function setSoundOn(on) {
  try { localStorage.setItem(KEY, on ? "on" : "off"); } catch {}
  for (const f of subs) f(on);
}
export function onSoundChange(f) { subs.add(f); f(soundOn()); return () => subs.delete(f); }

const volSubs = new Set();
export function volume() {
  try { const v = parseFloat(localStorage.getItem(VOLUME_KEY)); return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.7; } catch { return 0.7; }
}
/** Set the volume (0 to 1); applies at once to sounds already playing. */
export function setVolume(v) {
  v = Math.min(1, Math.max(0, v));
  try { localStorage.setItem(VOLUME_KEY, String(v)); } catch {}
  if (master) master.gain.value = v * SCALE;
  for (const f of volSubs) f(v);
}
export function onVolumeChange(f) { volSubs.add(f); f(volume()); return () => volSubs.delete(f); }

function audio() {
  if (ctx) { if (ctx.state !== "running") ctx.resume().catch(() => {}); return ctx; }
  const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = 0.004; comp.release.value = 0.2;
  master = ctx.createGain();
  master.gain.value = volume() * SCALE;
  master.connect(comp).connect(ctx.destination);
  noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return ctx;
}

// an envelope on a gain node: quick attack, exponential decay
function env(g, t, peak, attack, decay) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
}
// a soft bell: sine plus quieter partials that fade faster
function bell(freq, t, peak = 0.16, decay = 0.9) {
  for (const [mult, amp, dk] of [[1, 1, decay], [2, 0.35, decay * 0.45], [3.01, 0.12, decay * 0.25]]) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.value = freq * mult;
    env(g, t, peak * amp, 0.006, dk);
    o.connect(g).connect(master); o.start(t); o.stop(t + dk + 0.05);
  }
}
function tone(type, f0, f1, t, dur, peak, attack = 0.004) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f0, t);
  if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  env(g, t, peak, attack, dur);
  o.connect(g).connect(master); o.start(t); o.stop(t + dur + 0.05);
}
// filtered noise with a moving band: rips, swishes, swells
function noise(t, dur, peak, type, f0, f1, q = 1, attack = 0.008) {
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noiseBuf; f.type = type; f.Q.value = q;
  f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
  env(g, t, peak, attack, dur);
  s.connect(f).connect(g).connect(master); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
}
const sparkle = (t, n, spread, top = 1) => { for (let i = 0; i < n; i++) bell(2093 * top * [1, 1.26, 1.5, 1.68, 2][i % 5], t + i * spread, 0.035, 0.35); };

// a few percent of pitch drift, so a sound heard many times in a row never repeats exactly
const vary = (f) => f * (1 + (Math.random() - 0.5) * 0.05);

const N = { C4: 261.6, E4: 329.6, G4: 392, B4: 493.9, C5: 523.3, D5: 587.3, E5: 659.3, G5: 784, A5: 880, B5: 987.8, C6: 1046.5, E6: 1318.5, G6: 1568 };

const SOUNDS = {
  rip(t) {
    // the foil tearing: a quick run of papery crackles climbing as the tear runs across
    for (let i = 0; i < 4; i++) noise(t + i * 0.035, 0.05, 0.08, "bandpass", 1200 + i * 500, 2600 + i * 600, 1.5);
    // then the pack opens: a breath of air and a soft tone that both rise (a fall reads as a drop)
    noise(t + 0.1, 0.35, 0.05, "bandpass", 700, 3200, 0.7);
    tone("sine", N.C5, N.G5, t + 0.12, 0.25, 0.05, 0.03);
  },
  // the card turning over: a soft swish of air (eased in, no click), not a knock
  flip(t) { noise(t, 0.14, 0.12, "bandpass", 1300, 2800, 0.9, 0.025); },
  C(t) { bell(N.E5, t, 0.11, 0.55); },
  PC(t) { bell(N.G5, t, 0.11, 0.5); bell(N.C6, t + 0.07, 0.1, 0.6); },
  R(t) { [N.C5, N.E5, N.G5].forEach((f, i) => bell(f, t + i * 0.07, 0.12, 0.8)); },
  SR(t) { [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => bell(f, t + i * 0.065, 0.12, 0.9)); sparkle(t + 0.28, 4, 0.05); },
  UR(t) {
    [N.G4, N.B4, N.D5, N.G5, N.B5].forEach((f, i) => bell(f, t + i * 0.06, 0.13, 1.1));
    noise(t, 0.9, 0.05, "bandpass", 600, 3000, 0.8);
    sparkle(t + 0.32, 6, 0.045);
  },
  L(t) {
    // a chord that opens like light: a warm pad with a rising filter, an arpeggio, a boom, sparkles
    const f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = "lowpass"; f.Q.value = 2;
    f.frequency.setValueAtTime(350, t); f.frequency.exponentialRampToValueAtTime(3200, t + 0.9);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
    f.connect(g).connect(master);
    for (const fr of [N.C4, N.E4, N.G4, N.C5]) for (const det of [-6, 6]) {
      const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = fr; o.detune.value = det;
      o.connect(f); o.start(t); o.stop(t + 2.3);
    }
    tone("sine", 110, 82, t, 0.6, 0.18); // a warm low swell under the chord, short of a boom
    [N.C5, N.E5, N.G5, N.C6, N.E6, N.G6].forEach((fr, i) => bell(fr, t + 0.12 + i * 0.075, 0.13, 1.3));
    sparkle(t + 0.6, 10, 0.07, 1.25);
  },
  // Interface sounds are heard all the time, so they stay felt more than heard: mid-low pitch,
  // a rounded attack (no click), under 100 ms, a few dB under the pack and rarity sounds, never a world apart.
  select(t) { const f = vary(N.E5); tone("sine", f, f * 1.33, t, 0.08, 0.09, 0.008); },
  deselect(t) { const f = vary(N.A5); tone("sine", f, f * 0.75, t, 0.08, 0.07, 0.008); },
  success(t) { bell(N.C6, t, 0.14, 0.6); bell(N.G6, t + 0.09, 0.12, 0.8); },
  error(t) { tone("triangle", 220, 196, t, 0.14, 0.16); tone("triangle", 196, 174.6, t + 0.13, 0.2, 0.14); },
  // a soft wooden tap for tabs: a low body and a breath of texture on top
  tick(t) { const f = vary(440); tone("sine", f, f * 0.85, t, 0.05, 0.06, 0.006); noise(t, 0.025, 0.02, "bandpass", 1600, 1100, 1.2); },
};

/** Play a sound now (or after `delay` seconds). Silent when muted or without Web Audio. */
const lastAt = {};
export function play(name, delay = 0) {
  if (!soundOn() || !SOUNDS[name]) return;
  if (!audio()) return;
  const t = ctx.currentTime + 0.01 + delay;
  // the same sound twice within 60 ms (a double click, a quick run of tabs) plays once, never stacked
  if (t - (lastAt[name] ?? -1) < 0.06) return;
  lastAt[name] = t;
  try { SOUNDS[name](t); } catch {}
}

/** A revealed card: the swish, then its rarity's sting. */
export function reveal(rarity) {
  play("flip");
  play(rarity, 0.12);
}
