export type Mode = "focus" | "breathing" | "squat";

export type AppStage =
  | "focus"
  | "focusComplete"
  | "breathingPrep"
  | "breathing"
  | "breathingComplete"
  | "squat";

export type TimerStatus = "idle" | "running" | "paused";

export type FocusDurationMinutes = 0.1 | 15 | 25 | 45 ;

export type BuddyType = "study" | "cat" | "office" | "gym";

export interface BuddySettings {
  name: string;
  type: BuddyType;
}

export interface Point {
  x: number;
  y: number;
}

export interface Thought {
  id: string;
  text: string;
  createdAt: number;
  position?: Point;
}
