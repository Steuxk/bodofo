import { useCallback, useEffect, useState } from "react";
import {
  SQUAT_DONE_DELAY_MS,
  SQUAT_INTERVAL_MS,
  SQUAT_TARGET,
} from "../config";
import type { TimerStatus } from "../types/bodofo";

interface UseSquatCountdownOptions {
  onComplete: () => void;
}

export function useSquatCountdown({
  onComplete,
}: UseSquatCountdownOptions) {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<TimerStatus>("running");
  const isComplete = count >= SQUAT_TARGET;

  useEffect(() => {
    if (status !== "running" || isComplete) return;

    const timeout = window.setTimeout(() => {
      setCount((current) => Math.min(SQUAT_TARGET, current + 1));
    }, SQUAT_INTERVAL_MS);

    return () => window.clearTimeout(timeout);
  }, [count, isComplete, status]);

  useEffect(() => {
    if (!isComplete) return;
    setStatus("idle");
    const timeout = window.setTimeout(onComplete, SQUAT_DONE_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [isComplete, onComplete]);

  const pause = useCallback(() => setStatus("paused"), []);
  const resume = useCallback(() => setStatus("running"), []);
  const restart = useCallback(() => {
    setCount(0);
    setStatus("running");
  }, []);

  return {
    count,
    status,
    isComplete,
    pause,
    resume,
    restart,
  };
}
