let ctx;

export function unlockAudio() {
  const audio = getAudio();
  if (audio.state === "suspended") audio.resume();
  return audio;
}

export function getAudio() {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function ready() {
  const audio = getAudio();
  return audio.state === "suspended" ? null : audio;
}

function noiseBuffer(audio, duration, shape) {
  const length = Math.floor(audio.sampleRate * duration);
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * shape(i / audio.sampleRate, i);
  }
  return buffer;
}

function playBuffer(audio, buffer, { type = "bandpass", frequency = 1400, q = 0.7, volume = 0.18 } = {}) {
  const source = audio.createBufferSource();
  source.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = frequency;
  filter.Q.value = q;
  const gain = audio.createGain();
  gain.gain.value = volume;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  source.start();
}

function tone(audio, { frequency, duration, volume = 0.08, type = "sine", attack = 0.01, detune = 0, delay = 0 }) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const start = audio.currentTime + delay;
  osc.type = type;
  osc.frequency.value = frequency;
  osc.detune.value = detune;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

// Paper turning: a short crinkle through a bandpass.
export function playPaper() {
  const audio = ready();
  if (!audio) return;
  const buffer = noiseBuffer(audio, 0.22, (t, i) => {
    const env = Math.exp(-i / (audio.sampleRate * 0.045));
    const crinkle = Math.sin(i * 0.035) * 0.35 + Math.sin(i * 0.11) * 0.15;
    return env * (0.55 + crinkle);
  });
  playBuffer(audio, buffer, { frequency: 1400, q: 0.7, volume: 0.18 });
}

// Film leader tick: a tiny woody click.
export function playTick() {
  const audio = ready();
  if (!audio) return;
  const buffer = noiseBuffer(audio, 0.05, (t, i) => Math.exp(-i / (audio.sampleRate * 0.006)));
  playBuffer(audio, buffer, { type: "lowpass", frequency: 900, q: 1.2, volume: 0.22 });
  tone(audio, { frequency: 720, duration: 0.06, volume: 0.05, type: "triangle" });
}

// Finishing her name: three soft bell tones, a rising third.
export function playChime() {
  const audio = ready();
  if (!audio) return;
  [[523.25, 0], [659.25, 0.14], [783.99, 0.3]].forEach(([frequency, delay]) => {
    tone(audio, { frequency, duration: 1.4, volume: 0.05, delay, attack: 0.02 });
    tone(audio, { frequency: frequency * 2, duration: 0.9, volume: 0.012, delay, attack: 0.02 });
  });
}

// A candle going out: a breathy puff.
export function playPuff() {
  const audio = ready();
  if (!audio) return;
  const buffer = noiseBuffer(audio, 0.18, (t, i) => {
    const rise = Math.min(1, i / (audio.sampleRate * 0.012));
    return rise * Math.exp(-i / (audio.sampleRate * 0.05));
  });
  playBuffer(audio, buffer, { type: "lowpass", frequency: 2200, q: 0.4, volume: 0.14 });
}

// Sticker placed: a quick soft pop.
export function playPop() {
  const audio = ready();
  if (!audio) return;
  tone(audio, { frequency: 420, duration: 0.11, volume: 0.07, type: "sine" });
  tone(audio, { frequency: 620, duration: 0.08, volume: 0.035, type: "sine", delay: 0.02 });
}

// A cut to a slate: a low cinematic boom, felt more than heard.
export function playThud() {
  const audio = ready();
  if (!audio) return;
  const start = audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(72, start);
  osc.frequency.exponentialRampToValueAtTime(34, start + 1.1);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.32, start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.6);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(start);
  osc.stop(start + 1.7);
  const buffer = noiseBuffer(audio, 0.5, (t, i) => Math.exp(-i / (audio.sampleRate * 0.08)));
  playBuffer(audio, buffer, { type: "lowpass", frequency: 180, q: 0.6, volume: 0.22 });
}

// Projector running: filtered noise with a 24-frame flutter, looped.
let projector = null;
export function startProjector() {
  const audio = ready();
  if (!audio || projector) return;
  const buffer = noiseBuffer(audio, 2, (t) => 0.5 + Math.sin(t * Math.PI * 2 * 24) * 0.22 + Math.sin(t * Math.PI * 2 * 7) * 0.08);
  const source = audio.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const filter = audio.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 520;
  filter.Q.value = 0.5;
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0, audio.currentTime);
  gain.gain.linearRampToValueAtTime(0.045, audio.currentTime + 0.6);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  source.start();
  projector = { source, gain };
}

export function stopProjector() {
  const audio = ready();
  if (!audio || !projector) return;
  const { source, gain } = projector;
  projector = null;
  gain.gain.cancelScheduledValues(audio.currentTime);
  gain.gain.setValueAtTime(gain.gain.value, audio.currentTime);
  gain.gain.linearRampToValueAtTime(0, audio.currentTime + 0.8);
  source.stop(audio.currentTime + 0.9);
}

// Redeem stamp: a dull thud with a little paper.
export function playStamp() {
  const audio = ready();
  if (!audio) return;
  const buffer = noiseBuffer(audio, 0.12, (t, i) => Math.exp(-i / (audio.sampleRate * 0.02)));
  playBuffer(audio, buffer, { type: "lowpass", frequency: 420, q: 0.8, volume: 0.32 });
  tone(audio, { frequency: 110, duration: 0.16, volume: 0.12, type: "sine", attack: 0.004 });
}
