export type BreathingAudioPhase = "inhale" | "hold" | "exhale";

type WebkitWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

let audioContext: AudioContext | null = null;
let hasUserInteracted = false;
const lastPlayedAt = new Map<string, number>();

function getAudioContext() {
  if (audioContext) return audioContext;

  const AudioContextConstructor =
    window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;

  if (!AudioContextConstructor) return null;
  audioContext = new AudioContextConstructor();
  return audioContext;
}

function canPlay(key: string) {
  const now = performance.now();
  const lastPlayed = lastPlayedAt.get(key) ?? 0;
  if (now - lastPlayed < 250) return false;
  lastPlayedAt.set(key, now);
  return true;
}

function playTone(
  context: AudioContext,
  startFrequency: number,
  endFrequency: number,
  duration: number,
  delay = 0,
) {
  const startAt = context.currentTime + delay;
  const endAt = startAt + duration;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(startFrequency, startAt);
  oscillator.frequency.exponentialRampToValueAtTime(endFrequency, endAt);

  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(0.045, startAt + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, endAt);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(endAt + 0.02);
}

function playSlimeBloop(context: AudioContext) {
  const startAt = context.currentTime;
  const endAt = startAt + 0.3;
  const filter = context.createBiquadFilter();
  const main = context.createOscillator();
  const mainGain = context.createGain();
  const bubble = context.createOscillator();
  const bubbleGain = context.createGain();

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1200, startAt);
  filter.Q.setValueAtTime(1.8, startAt);

  main.type = "sine";
  main.frequency.setValueAtTime(190, startAt);
  main.frequency.exponentialRampToValueAtTime(320, startAt + 0.08);
  main.frequency.exponentialRampToValueAtTime(230, endAt);
  main.detune.setValueAtTime(-8, startAt);
  main.detune.linearRampToValueAtTime(12, startAt + 0.12);
  main.detune.linearRampToValueAtTime(0, endAt);

  mainGain.gain.setValueAtTime(0.0001, startAt);
  mainGain.gain.exponentialRampToValueAtTime(0.04, startAt + 0.025);
  mainGain.gain.exponentialRampToValueAtTime(0.022, startAt + 0.12);
  mainGain.gain.exponentialRampToValueAtTime(0.0001, endAt);

  bubble.type = "triangle";
  bubble.frequency.setValueAtTime(410, startAt + 0.045);
  bubble.frequency.exponentialRampToValueAtTime(560, startAt + 0.1);
  bubble.frequency.exponentialRampToValueAtTime(380, startAt + 0.21);

  bubbleGain.gain.setValueAtTime(0.0001, startAt);
  bubbleGain.gain.setValueAtTime(0.0001, startAt + 0.04);
  bubbleGain.gain.exponentialRampToValueAtTime(0.011, startAt + 0.075);
  bubbleGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.22);

  main.connect(mainGain);
  bubble.connect(bubbleGain);
  mainGain.connect(filter);
  bubbleGain.connect(filter);
  filter.connect(context.destination);

  main.start(startAt);
  bubble.start(startAt);
  main.stop(endAt + 0.02);
  bubble.stop(endAt + 0.02);
}

async function withAudio(
  key: string,
  play: (context: AudioContext) => void,
) {
  if (!hasUserInteracted || !canPlay(key)) return;

  try {
    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") {
      await context.resume();
    }
    play(context);
  } catch {
    // Audio feedback is optional; the focus flow must remain uninterrupted.
  }
}

export function unlockAudio() {
  hasUserInteracted = true;

  try {
    const context = getAudioContext();
    if (context?.state === "suspended") {
      void context.resume();
    }
  } catch {
    // Browsers without Web Audio continue silently.
  }
}

export function playBreathingCue(phase: BreathingAudioPhase) {
  void withAudio(`breathing-${phase}`, (context) => {
    if (phase === "inhale") {
      playTone(context, 330, 440, 0.42);
      playTone(context, 440, 554, 0.38, 0.22);
      return;
    }

    if (phase === "hold") {
      playTone(context, 494, 494, 0.32);
      return;
    }

    playTone(context, 440, 294, 0.72);
  });
}

export function playCompletionCue() {
  void withAudio("completion", (context) => {
    playTone(context, 392, 494, 0.38);
    playTone(context, 494, 659, 0.48, 0.24);
  });
}

export function playSquatCue() {
  void withAudio("squat", (context) => {
    playSlimeBloop(context);
  });
}

export function playSquatCelebrationCue() {
  void withAudio("squat-celebration", (context) => {
    playTone(context, 523, 659, 0.26);
    playTone(context, 659, 784, 0.3, 0.17);
    playTone(context, 784, 1047, 0.42, 0.36);
  });
}
