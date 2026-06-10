export type Mode = "focus" | "breathing" | "squat";

export type TimerStatus = "idle" | "running" | "paused";

export type BuddyType = "study" | "cat" | "office" | "gym";

export interface BuddySettings {
  name: string;
  type: BuddyType;
}

export interface Thought {
  id: string;
  text: string;
  createdAt: number;
}

