export type Mode = "focus" | "breathing" | "squat";

export type TimerStatus = "idle" | "running" | "paused";

export type FocusDurationMinutes = 15 | 25 | 30;

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
