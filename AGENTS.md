# BoDoFo Agent Handoff

## Project Summary

BoDoFo is a frontend-only ADHD-friendly body-doubling focus companion. It is a
single-page React app with focus, breathing, and squat modes, a floating buddy,
and a persistent thought dock.

Keep the product lightweight and calming. Do not add accounts, a backend,
cloud sync, AI chat, calendars, or project-management features.

## Stack

- React 18
- TypeScript
- Vite
- CSS in `src/styles/globals.css`
- Browser `localStorage`
- Web Audio API
- jsPDF, loaded dynamically for thought-dump exports

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

Short-cycle testing:

```bash
VITE_FOCUS_DURATION=3 \
VITE_BREATHING_DURATION=14 \
VITE_SQUAT_INTERVAL_SECONDS=0.25 \
npm run dev
```

Environment durations are seconds. The default breathing duration is two
minutes and the default squat interval is 1.5 seconds.

## Architecture

- `src/App.tsx`
  - Coordinates the `focus`, `breathing`, and `squat` mode state machine.
  - Owns persisted task, focus count, focus duration, thoughts, and buddy.
  - Connects timer completion and audio feedback.
- `src/hooks/useCountdown.ts`
  - Generic focus/breathing countdown with idle, running, and paused states.
- `src/hooks/useSquatCountdown.ts`
  - Automatic ten-squat progression with pause, resume, restart, and completion.
- `src/hooks/useLocalStorage.ts`
  - Generic persisted-state hook.
- `src/components/TimerCard.tsx`
  - Focus task, duration selector, timer, and controls.
- `src/components/BreathingGuide.tsx`
  - Current 4-second inhale, 4-second hold, 6-second exhale presentation.
  - Fires one audio cue when each phase changes.
- `src/components/SquatBreak.tsx`
  - Automatic movement-break UI.
- `src/components/ThoughtDump.tsx`
  - Persistent thoughts, copy feedback, and PDF export.
- `src/components/FloatingCompanion.tsx`
  - Mode-aware floating buddy.
- `src/components/CompanionModal.tsx`
  - Persisted buddy name/type selection.
- `src/components/buddies/BuddySvg.tsx`
  - Inline SVG buddy renderer. Add future visual variants here or behind the
    same component interface.
- `src/audio/audioFeedback.ts`
  - Interaction-gated Web Audio cues.
- `src/utils/thoughtExport.ts`
  - Shared plain-text formatting, clipboard fallback, and lazy PDF generation.
- `src/config.ts`
  - Test overrides and duration/squat constants.

## Persistence Keys

- `bodofo:current-task`
- `bodofo:focus-session-count`
- `bodofo:focus-duration`
- `bodofo:thoughts`
- `bodofo:buddy-settings`

Preserve these keys to avoid losing existing user data.

## Audio Behavior

Audio is synthesized locally with Web Audio; there are no sound assets.

- Audio unlocks after the first pointer or keyboard interaction.
- Inhale uses a soft rising cue.
- Hold uses a short steady cue.
- Exhale uses a soft falling cue.
- Focus, breathing, and squat completion use a separate gentle chime.
- Audio failures must remain silent and must never interrupt the timer flow.
- Do not trigger cues on every countdown tick. Phase cues fire only when the
  phase value changes.

## Extension Constraints

- Buddy definitions and mode copy live in `src/data/buddies.ts`.
- Thought objects already have an optional `position` field for future
  draggable sticky notes.
- Keep buddy visuals catalog-driven so animated sprites or GIF renderers can be
  introduced without changing persisted buddy settings.
- Keep manual edits scoped and make small milestone commits.
- Preserve user changes in a dirty worktree.

## Current Worktree Warning

At handoff time, `src/config.ts` has an uncommitted user change:

```ts
export const FOCUS_DURATION_OPTIONS = [0.1, 15, 25, 30] as const;
```

Do not discard it. `FocusDurationMinutes` currently permits only
`15 | 25 | 30`, so verify the intended development-only `0.1` option and fix
the typing deliberately before committing related work.

## Recent Milestones

- `d2222d8` adds interaction-gated breathing phase and completion audio cues.
- `48bca6d` removes uppercase styling.
- `f4a3419` adds a restricted-browser clipboard fallback.
- `c80e24b` adds thought copy and PDF export.
- `43daed1` adds the calmer visual system and SVG buddies.
- `15a7686` automates squat breaks.
- `d8b05f9` adds persisted focus length selection.

## Verification Notes

Before handing work back:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Test the complete shortened flow in a browser.
4. Check focus pause/resume/reset and persisted duration.
5. Check inhale, hold, and exhale phase boundaries.
6. Check squat pause/resume/restart/skip.
7. Check the 390px responsive layout for horizontal overflow.
8. Check the browser console for warnings and errors.

The in-app browser may throttle hidden tabs and does not fully support
clipboard/download observation. Use visible-state feedback plus build checks,
and note any browser-tool limitation honestly.
