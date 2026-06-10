import { useCallback, useEffect, useRef, useState } from "react";
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
  const elapsedBeforeRunRef = useRef(0);
  const runStartedAtRef = useRef(Date.now());
  const isComplete = count >= SQUAT_TARGET;

  useEffect(() => {
    if (status !== "running" || isComplete) return;

    const updateCount = () => {
      const elapsed =
        elapsedBeforeRunRef.current + Date.now() - runStartedAtRef.current;
      setCount(
        Math.min(SQUAT_TARGET, Math.floor(elapsed / SQUAT_INTERVAL_MS)),
      );
    };

    updateCount();
    const interval = window.setInterval(updateCount, 100);
    const handleVisibility = () => updateCount();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isComplete, status]);

  useEffect(() => {
    if (!isComplete) return;
    setStatus("idle");
    const timeout = window.setTimeout(onComplete, SQUAT_DONE_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [isComplete, onComplete]);

  const pause = useCallback(() => {
    elapsedBeforeRunRef.current += Date.now() - runStartedAtRef.current;
    setStatus("paused");
  }, []);
  const resume = useCallback(() => {
    runStartedAtRef.current = Date.now();
    setStatus("running");
  }, []);
  const restart = useCallback(() => {
    elapsedBeforeRunRef.current = 0;
    runStartedAtRef.current = Date.now();
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
