import { useCallback, useEffect, useRef } from "react";
import { playBreathingCue } from "../audio/audioFeedback";
import { useBreathingExercise } from "../hooks/useBreathingExercise";

interface BreathingGuideProps {
  onComplete: () => void;
}

const phaseCopy = {
  inhale: "Breathe in softly",
  hold: "Stay here",
  exhale: "Let it all go",
} as const;

export function BreathingGuide({ onComplete }: BreathingGuideProps) {
  const stableOnComplete = useCallback(onComplete, [onComplete]);
  const {
    phase,
    phaseSecondsRemaining,
    currentSet,
    remainingSets,
    totalSets,
  } = useBreathingExercise({ onComplete: stableOnComplete });
  const previousPhase = useRef<string | null>(null);

  useEffect(() => {
    if (previousPhase.current === phase) return;
    previousPhase.current = phase;
    playBreathingCue(phase);
  }, [phase]);

  return (
    <section
      className="timer-card break-card breathing-card"
      aria-labelledby="mode-title"
    >
      <div className="mode-pill">
        <span className="mode-pill__dot" />
        Breathing exercise
      </div>
      <p className="session-label">
        Set {currentSet} of {totalSets}
      </p>
      <h1 id="mode-title">Breathe with your buddy.</h1>
      <div className={`breathing-orb breathing-orb--${phase}`} aria-hidden="true">
        <span />
      </div>
      <p className="breathing-instruction" aria-live="polite">
        <strong>{phase}</strong>
        <b>{phaseSecondsRemaining}</b>
        <span>{phaseCopy[phase]}</span>
      </p>
      <div className="breathing-progress" aria-label="Breathing set progress">
        {Array.from({ length: totalSets }, (_, index) => (
          <span
            className={index < currentSet ? "is-complete" : ""}
            key={index}
          />
        ))}
      </div>
      <p className="gentle-copy">
        {remainingSets === 0
          ? "Final set"
          : `${remainingSets} ${remainingSets === 1 ? "set" : "sets"} remaining`}
      </p>
    </section>
  );
}
