import { useEffect, useRef } from "react";
import { playBreathingCue } from "../audio/audioFeedback";
import { formatTime } from "../utils/time";

type BreathingPhase = "inhale" | "hold" | "exhale";

interface BreathingGuideProps {
  remainingSeconds: number;
  totalSeconds: number;
}

const phaseCopy: Record<BreathingPhase, string> = {
  inhale: "Breathe in softly",
  hold: "Stay here",
  exhale: "Let it all go",
};

function getBreathingPhase(
  remainingSeconds: number,
  totalSeconds: number,
): BreathingPhase {
  const elapsedInCycle = (totalSeconds - remainingSeconds) % 14;
  if (elapsedInCycle < 4) return "inhale";
  if (elapsedInCycle < 8) return "hold";
  return "exhale";
}

export function BreathingGuide({
  remainingSeconds,
  totalSeconds,
}: BreathingGuideProps) {
  const phase = getBreathingPhase(remainingSeconds, totalSeconds);
  const previousPhase = useRef<BreathingPhase | null>(null);

  useEffect(() => {
    if (remainingSeconds <= 0 || previousPhase.current === phase) return;
    previousPhase.current = phase;
    playBreathingCue(phase);
  }, [phase, remainingSeconds]);

  return (
    <section
      className="timer-card break-card breathing-card"
      aria-labelledby="mode-title"
    >
      <div className="mode-pill">
        <span className="mode-pill__dot" />
        Breathing break
      </div>
      <p className="session-label">4 in · 4 hold · 6 out</p>
      <h1 id="mode-title">Breathe with your buddy.</h1>
      <div className={`breathing-orb breathing-orb--${phase}`} aria-hidden="true">
        <span />
      </div>
      <p className="breathing-instruction" aria-live="polite">
        <strong>{phase}</strong>
        <span>{phaseCopy[phase]}</span>
      </p>
      <time
        className="break-time"
        dateTime={`PT${remainingSeconds}S`}
        aria-label={`${remainingSeconds} seconds left`}
      >
        {formatTime(remainingSeconds)}
      </time>
      <p className="gentle-copy">Nothing to solve for a moment.</p>
    </section>
  );
}
