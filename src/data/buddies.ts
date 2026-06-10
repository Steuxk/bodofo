import type { BuddyType, Mode } from "../types/bodofo";

export interface BuddyDefinition {
  type: BuddyType;
  label: string;
  accent: string;
  activity: Record<Mode, string>;
}

export const BUDDIES: BuddyDefinition[] = [
  {
    type: "study",
    label: "Study Buddy",
    accent: "#8ce6ff",
    activity: {
      focus: "Studying quietly",
      breathing: "Breathing slowly",
      squat: "Moving with you",
    },
  },
  {
    type: "cat",
    label: "Cat Buddy",
    accent: "#4db6d6",
    activity: {
      focus: "Keeping you company",
      breathing: "Having a soft stretch",
      squat: "Counting every squat",
    },
  },
  {
    type: "office",
    label: "Calm Buddy",
    accent: "#72cfe3",
    activity: {
      focus: "Working beside you",
      breathing: "Taking a screen break",
      squat: "Standing up too",
    },
  },
  {
    type: "gym",
    label: "Gym Buddy",
    accent: "#668ab0",
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
