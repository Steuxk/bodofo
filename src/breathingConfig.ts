const readPositiveNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const BREATHING_PHASES = [
  { name: "inhale", duration: 4 },
  { name: "hold", duration: 7 },
  { name: "exhale", duration: 8 },
] as const;

export const BREATHING_TOTAL_SETS = 4;
export const BREATHING_SET_SECONDS = BREATHING_PHASES.reduce(
  (total, phase) => total + phase.duration,
  0,
);
export const BREATHING_TOTAL_SECONDS =
  BREATHING_SET_SECONDS * BREATHING_TOTAL_SETS;

export const BREATHING_TICK_MS = readPositiveNumber(
  import.meta.env.VITE_BREATHING_TICK_MS,
  1000,
);

