import {
  SQUAT_INTERVAL_MS,
  SQUAT_TARGET,
} from "../config";
import { useElapsedTimer } from "./useElapsedTimer";

export function useSquatCountdown() {
  const timer = useElapsedTimer({
    autoStart: true,
    durationMs: SQUAT_TARGET * SQUAT_INTERVAL_MS,
  });
  const count = Math.min(
    SQUAT_TARGET,
    Math.floor(timer.elapsedMs / SQUAT_INTERVAL_MS),
  );
  const restart = () => {
    timer.reset();
    timer.start();
  };

  return {
    count,
    status: timer.status,
    isComplete: timer.isComplete,
    pause: timer.pause,
    resume: timer.resume,
    restart,
  };
}
