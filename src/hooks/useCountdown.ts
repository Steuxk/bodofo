import { useCallback, useEffect, useRef, useState } from "react";
import type { TimerStatus } from "../types/bodofo";

interface UseCountdownOptions {
  initialSeconds: number;
  onComplete: () => void;
}

export function useCountdown({
  initialSeconds,
  onComplete,
}: UseCountdownOptions) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (status !== "running") {
      return;
    }

    const interval = window.setInterval(() => {
      setRemainingSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === "running" && remainingSeconds === 0) {
      setStatus("idle");
      onCompleteRef.current();
    }
  }, [remainingSeconds, status]);

  const start = useCallback(() => {
    if (remainingSeconds === 0) {
      setRemainingSeconds(initialSeconds);
    }
    setStatus("running");
  }, [initialSeconds, remainingSeconds]);

  const pause = useCallback(() => setStatus("paused"), []);
  const resume = useCallback(() => setStatus("running"), []);

  const reset = useCallback(
    (nextSeconds = initialSeconds) => {
      setRemainingSeconds(nextSeconds);
      setStatus("idle");
    },
    [initialSeconds],
  );

  return {
    remainingSeconds,
    status,
    start,
    pause,
    resume,
    reset,
  };
}

