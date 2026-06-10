const readDuration = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const FOCUS_DURATION_OPTIONS = [0.1, 15, 25, 30] as const;
export const DEFAULT_FOCUS_DURATION = 25;
export const TEST_FOCUS_DURATION = readDuration(
  import.meta.env.VITE_FOCUS_DURATION,
  0,
);

export function getFocusDurationSeconds(minutes: number) {
  return TEST_FOCUS_DURATION || minutes * 60;
}

export const SQUAT_TARGET = 10;
export const SQUAT_INTERVAL_MS =
  readDuration(import.meta.env.VITE_SQUAT_INTERVAL_SECONDS, 2) * 1000;
