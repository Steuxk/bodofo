const readDuration = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const SESSION_DURATIONS = {
  focus: readDuration(import.meta.env.VITE_FOCUS_DURATION, 25 * 60),
  breathing: readDuration(import.meta.env.VITE_BREATHING_DURATION, 2 * 60),
  squat: 0,
} as const;

export const SQUAT_TARGET = 10;

