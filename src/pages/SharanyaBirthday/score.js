import { music } from "../../data/sharanya21";

// The soundtrack: one song per scene (see `music` in the data file), crossfaded
// on the cut. Songs that fail to load fall back to the piano score.

const FALLBACK = "/sharanya21/audio/score.mp3";
const ORDER = ["titles", "trace", "shots", "candles", "book", "tickets", "credits"];
const DUCKED = 0.07;

const tracks = new Map(); // src -> { src, audio, gain, broken }
const listeners = new Set();
const DEFAULT_CUE = { src: FALLBACK, volume: 0.4, swell: 0.62, start: 0, loop: true };
let context;
let current = null;
let currentCue = DEFAULT_CUE;
let stage = "titles";
let started = false;
let muted = false;
let swelled = false;
let ducks = 0;

function cueFor(name) {
  return { ...DEFAULT_CUE, ...(music[name] || music.titles) };
}

function ensureContext() {
  if (!context) context = new AudioContext();
  if (context.state === "suspended") context.resume();
}

function level() {
  if (muted) return 0;
  if (ducks > 0) return DUCKED;
  return swelled ? currentCue.swell : currentCue.volume;
}

function ramp(track, volume, seconds) {
  if (!track || !context) return;
  const now = context.currentTime;
  track.gain.gain.cancelScheduledValues(now);
  track.gain.gain.setValueAtTime(track.gain.gain.value, now);
  track.gain.gain.linearRampToValueAtTime(volume, now + seconds);
}

function track(src) {
  let entry = tracks.get(src);
  if (entry) return entry;
  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = "auto";
  const source = context.createMediaElementSource(audio);
  const gain = context.createGain();
  gain.gain.value = 0;
  source.connect(gain);
  gain.connect(context.destination);
  entry = { src, audio, gain, broken: false };
  audio.addEventListener("error", () => {
    entry.broken = true;
    // the song isn't there yet; keep the room from going silent
    if (current === entry && src !== FALLBACK) play(FALLBACK, DEFAULT_CUE);
  });
  tracks.set(src, entry);
  return entry;
}

function seek(track, seconds) {
  if (!seconds) return;
  const apply = () => {
    try {
      track.audio.currentTime = seconds;
    } catch {
      /* not seekable yet */
    }
  };
  if (track.audio.readyState >= 1) apply();
  else track.audio.addEventListener("loadedmetadata", apply, { once: true });
}

function play(src, cue) {
  ensureContext();
  const next = track(src);
  if (next.broken && src !== FALLBACK) {
    play(FALLBACK, DEFAULT_CUE);
    return;
  }
  currentCue = cue;
  if (current === next) {
    if (next.audio.paused) next.audio.play().catch(() => {});
    ramp(next, level(), 1.2);
    return;
  }
  const previous = current;
  current = next;
  if (previous) {
    ramp(previous, 0, 1.6);
    window.setTimeout(() => {
      if (current !== previous) previous.audio.pause();
    }, 1700);
  }
  next.audio.loop = cue.loop !== false;
  // a one-shot song hands over to `after` (or the piano) when it finishes
  next.audio.onended = () => {
    if (current !== next || next.audio.loop) return;
    const after = cue.after || FALLBACK;
    play(after, { ...DEFAULT_CUE, src: after });
  };
  seek(next, cue.start);
  next.audio.play().catch(() => {});
  ramp(next, level(), previous ? 2.2 : 1.8);
}

function prefetch(name) {
  const cue = music[name];
  if (!cue || tracks.has(cue.src)) return;
  track(cue.src);
}

// Tell the score which scene we're in. Safe to call before the first tap;
// nothing plays until startScore() has been unlocked by a gesture.
export function cueScore(name) {
  if (name !== stage) swelled = false;
  stage = name;
  if (!started) return;
  play(cueFor(name).src, cueFor(name));
  prefetch(ORDER[ORDER.indexOf(name) + 1]);
}

// Call from a user gesture: unlocks audio and starts the current scene's song.
export function startScore() {
  started = true;
  cueScore(stage);
}

export function swellScore() {
  swelled = true;
  ramp(current, level(), 1.6);
}

export function settleScore() {
  swelled = false;
  ramp(current, level(), 2.4);
}

export function setScoreDuck(on) {
  ducks += on ? 1 : -1;
  if (ducks < 0) ducks = 0;
  ramp(current, level(), 0.45);
}

export function toggleMute() {
  muted = !muted;
  ramp(current, level(), 0.35);
  listeners.forEach((fn) => fn(muted));
  return muted;
}

export function onMuteChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
