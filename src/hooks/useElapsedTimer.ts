import { useCallback, useEffect, useRef, useState } from "react";
import type { TimerStatus } from "../types/bodofo";

interface UseElapsedTimerOptions {
  autoStart?: boolean;
  durationMs: number;
  onComplete?: () => void;
}

export function useElapsedTimer({
  autoStart = false,
  durationMs,
  onComplete,
}: UseElapsedTimerOptions) {
  const initialElapsedMs = 0;
  const [elapsedMs, setElapsedMs] = useState(initialElapsedMs);
  const [status, setStatus] = useState<TimerStatus>(
    autoStart ? "running" : "idle",
  );
  const durationMsRef = useRef(durationMs);
  const onCompleteRef = useRef(onComplete);
  const statusRef = useRef<TimerStatus>(autoStart ? "running" : "idle");
  const startedAtMsRef = useRef<number | null>(
    autoStart ? Date.now() : null,
  );
  const pausedElapsedMsRef = useRef(initialElapsedMs);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finish = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    startedAtMsRef.current = null;
    pausedElapsedMsRef.current = durationMsRef.current;
    statusRef.current = "idle";
    setStatus("idle");
    onCompleteRef.current?.();
  }, []);

  const update = useCallback(() => {
    if (statusRef.current !== "running" || startedAtMsRef.current === null) {
      return;
    }

    const nextElapsedMs = Math.min(
      durationMsRef.current,
      pausedElapsedMsRef.current + Date.now() - startedAtMsRef.current,
    );
    setElapsedMs(nextElapsedMs);

    if (nextElapsedMs >= durationMsRef.current) {
      finish();
    }
  }, [finish]);

  useEffect(() => {
    if (status !== "running") return;

    update();
    const interval = window.setInterval(update, 100);
    const refresh = () => update();
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, [status, update]);

  const start = useCallback(() => {
    if (pausedElapsedMsRef.current >= durationMsRef.current) {
      pausedElapsedMsRef.current = 0;
      setElapsedMs(0);
    }
    hasCompletedRef.current = false;
    startedAtMsRef.current = Date.now();
    statusRef.current = "running";
    setStatus("running");
  }, []);

  const pause = useCallback(() => {
    if (statusRef.current !== "running" || startedAtMsRef.current === null) {
      return;
    }

    pausedElapsedMsRef.current = Math.min(
      durationMsRef.current,
      pausedElapsedMsRef.current + Date.now() - startedAtMsRef.current,
    );
    startedAtMsRef.current = null;
    statusRef.current = "paused";
    setElapsedMs(pausedElapsedMsRef.current);
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    if (statusRef.current !== "paused") return;
    startedAtMsRef.current = Date.now();
    statusRef.current = "running";
    setStatus("running");
  }, []);

  const reset = useCallback(
    (nextDurationMs = durationMs) => {
      durationMsRef.current = nextDurationMs;
      pausedElapsedMsRef.current = 0;
      startedAtMsRef.current = null;
      hasCompletedRef.current = false;
      statusRef.current = "idle";
      setElapsedMs(0);
      setStatus("idle");
    },
    [durationMs],
  );

  const remainingMs = Math.max(0, durationMsRef.current - elapsedMs);

  return {
    elapsedMs,
    remainingMs,
    status,
    isRunning: status === "running",
    isComplete: elapsedMs >= durationMsRef.current,
    start,
    pause,
    resume,
    reset,
  };
}
