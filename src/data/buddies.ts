import type { BuddyType, Mode } from "../types/bodofo";

export interface BuddyDefinition {
  type: BuddyType;
  label: string;
  visual: {
    kind: "emoji";
    source: string;
    accent: string;
  };
  activity: Record<Mode, string>;
}

export const BUDDIES: BuddyDefinition[] = [
  {
    type: "study",
    label: "Study Buddy",
    visual: { kind: "emoji", source: "🙂", accent: "#f3c75b" },
    activity: {
      focus: "Studying quietly",
      breathing: "Breathing slowly",
      squat: "Moving with you",
    },
  },
  {
    type: "cat",
    label: "Cat Companion",
    visual: { kind: "emoji", source: "🐱", accent: "#ed9a5f" },
    activity: {
      focus: "Keeping you company",
      breathing: "Having a soft stretch",
      squat: "Counting every squat",
    },
  },
  {
    type: "office",
    label: "Office Buddy",
    visual: { kind: "emoji", source: "🧑‍💻", accent: "#79b8c8" },
    activity: {
      focus: "Working beside you",
      breathing: "Taking a screen break",
      squat: "Standing up too",
    },
  },
  {
    type: "gym",
    label: "Gym Buddy",
    visual: { kind: "emoji", source: "🏋️", accent: "#aaa2d7" },
    activity: {
      focus: "Holding steady",
      breathing: "Recovering calmly",
      squat: "Cheering you on",
    },
  },
];

export function getBuddy(type: BuddyType) {
  return BUDDIES.find((buddy) => buddy.type === type) ?? BUDDIES[0];
}

