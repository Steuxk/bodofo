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
