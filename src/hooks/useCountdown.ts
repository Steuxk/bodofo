import { useElapsedTimer } from "./useElapsedTimer";

interface UseCountdownOptions {
  initialSeconds: number;
  onComplete: () => void;
}

export function useCountdown({
  initialSeconds,
  onComplete,
}: UseCountdownOptions) {
  const timer = useElapsedTimer({
    durationMs: initialSeconds * 1000,
    onComplete,
  });

  return {
    remainingSeconds: Math.ceil(timer.remainingMs / 1000),
    status: timer.status,
    start: timer.start,
    pause: timer.pause,
    resume: timer.resume,
    reset: (nextSeconds = initialSeconds) => timer.reset(nextSeconds * 1000),
  };
}
