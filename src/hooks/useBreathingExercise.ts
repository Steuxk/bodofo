import { useEffect, useMemo, useRef, useState } from "react";
import {
  BREATHING_PHASES,
  BREATHING_SET_SECONDS,
  BREATHING_TICK_MS,
  BREATHING_TOTAL_SECONDS,
  BREATHING_TOTAL_SETS,
} from "../breathingConfig";
import type { BreathingAudioPhase } from "../audio/audioFeedback";

interface UseBreathingExerciseOptions {
  onComplete: () => void;
}

export function useBreathingExercise({
  onComplete,
}: UseBreathingExerciseOptions) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setElapsedSeconds((current) =>
        Math.min(BREATHING_TOTAL_SECONDS, current + 1),
      );
    }, BREATHING_TICK_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      elapsedSeconds < BREATHING_TOTAL_SECONDS ||
      completedRef.current
    ) {
      return;
    }

    completedRef.current = true;
    onComplete();
  }, [elapsedSeconds, onComplete]);

  return useMemo(() => {
    const safeElapsed = Math.min(
      elapsedSeconds,
      BREATHING_TOTAL_SECONDS - 1,
    );
    const setIndex = Math.floor(safeElapsed / BREATHING_SET_SECONDS);
    const elapsedInSet = safeElapsed % BREATHING_SET_SECONDS;
    let phaseStart = 0;
    let phase: BreathingAudioPhase = "inhale";
    let phaseDuration: number = BREATHING_PHASES[0].duration;

    for (const phaseDefinition of BREATHING_PHASES) {
      const phaseEnd = phaseStart + phaseDefinition.duration;
      if (elapsedInSet < phaseEnd) {
        phase = phaseDefinition.name;
        phaseDuration = phaseDefinition.duration;
        break;
      }
      phaseStart = phaseEnd;
    }

    const elapsedInPhase = elapsedInSet - phaseStart;
    const currentSet = Math.min(setIndex + 1, BREATHING_TOTAL_SETS);

    return {
      phase,
      phaseSecondsRemaining: phaseDuration - elapsedInPhase,
      currentSet,
      remainingSets: BREATHING_TOTAL_SETS - currentSet,
      totalSets: BREATHING_TOTAL_SETS,
    };
  }, [elapsedSeconds]);
}
