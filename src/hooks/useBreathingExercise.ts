import { useMemo } from "react";
import {
  BREATHING_PHASES,
  BREATHING_SET_SECONDS,
  BREATHING_TICK_MS,
  BREATHING_TOTAL_SECONDS,
  BREATHING_TOTAL_SETS,
} from "../breathingConfig";
import type { BreathingAudioPhase } from "../audio/audioFeedback";
import { useElapsedTimer } from "./useElapsedTimer";

interface UseBreathingExerciseOptions {
  onComplete: () => void;
}

export function useBreathingExercise({
  onComplete,
}: UseBreathingExerciseOptions) {
  const timer = useElapsedTimer({
    autoStart: true,
    durationMs: BREATHING_TOTAL_SECONDS * BREATHING_TICK_MS,
    onComplete,
  });

  return useMemo(() => {
    const elapsedExerciseMs = Math.min(
      BREATHING_TOTAL_SECONDS * 1000 - 1,
      timer.elapsedMs * (1000 / BREATHING_TICK_MS),
    );
    const setDurationMs = BREATHING_SET_SECONDS * 1000;
    const setIndex = Math.floor(elapsedExerciseMs / setDurationMs);
    const elapsedInSetMs = elapsedExerciseMs % setDurationMs;
    let phaseStartMs = 0;
    let phase: BreathingAudioPhase = "inhale";
    let phaseDuration: number = BREATHING_PHASES[0].duration;

    for (const phaseDefinition of BREATHING_PHASES) {
      const phaseEndMs =
        phaseStartMs + phaseDefinition.duration * 1000;
      if (elapsedInSetMs < phaseEndMs) {
        phase = phaseDefinition.name;
        phaseDuration = phaseDefinition.duration;
        break;
      }
      phaseStartMs = phaseEndMs;
    }

    const elapsedInPhaseMs = elapsedInSetMs - phaseStartMs;
    const currentSet = Math.min(setIndex + 1, BREATHING_TOTAL_SETS);

    return {
      phase,
      phaseSecondsRemaining: Math.ceil(
        (phaseDuration * 1000 - elapsedInPhaseMs) / 1000,
      ),
      currentSet,
      remainingSets: BREATHING_TOTAL_SETS - currentSet,
      totalSets: BREATHING_TOTAL_SETS,
    };
  }, [timer.elapsedMs]);
}
