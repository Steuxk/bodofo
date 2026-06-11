# BoDoFo Agent Handoff

## Project Summary

BoDoFo is a frontend-only ADHD-friendly body-doubling focus companion. It is a
single-page React app with focus, breathing, and squat modes, a floating buddy,
and a persistent thought dock.

Keep the product lightweight and calming. Do not add accounts, a backend,
cloud sync, AI chat, calendars, or project-management features.

The current art direction is a quiet deep-sea focus sanctuary: dark ocean
gradients, frosted glass surfaces, bioluminescent aqua accents, and restrained
motion. Avoid warm beach, village, candy, or playground styling.

Squat mode is the intentional exception. Its `Sunrise Reef` styling is scoped
under `.app--squat` and uses warm coral, peach, and amber light to signal
movement. Keep focus and breathing in the deep-sea palette.

## Stack

- React 18
- TypeScript
- Vite
- CSS in `src/styles/globals.css`
- Quicksand with Noto Sans and system sans-serif fallbacks
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
VITE_SQUAT_INTERVAL_SECONDS=0.25 \
VITE_BREATHING_TICK_MS=100 \
npm run dev
```

The focus override is measured in seconds. The default breathing tick is one
second and the default squat interval is 2 seconds.

## Architecture

- `src/App.tsx`
  - Coordinates focus, completion choice, breathing preparation, breathing,
    breathing completion, and squat stages.
  - Owns persisted task, focus count, focus duration, thoughts, and buddy.
  - Connects timer completion and audio feedback.
- `src/hooks/useCountdown.ts`
  - Focus countdown adapter over the shared elapsed timer.
- `src/hooks/useElapsedTimer.ts`
  - Timestamp-based start, pause, resume, reset, remaining-time, and one-shot
    completion behavior.
- `src/hooks/useSquatCountdown.ts`
  - Derives ten-squat progression from shared elapsed wall-clock time.
- `src/hooks/useLocalStorage.ts`
  - Generic persisted-state hook.
- `src/components/TimerCard.tsx`
  - Focus task, duration selector, timer, and controls.
- `src/components/FocusDurationPicker.tsx`
  - Shared focus-length choices used before initial and repeat sessions.
- `src/components/FocusComplete.tsx`
  - Lets the user choose breathing, squats, or a duration for another focus
    after completion.
- `src/components/BreathingPreparation.tsx`
  - Explains the breathing pattern and requires an explicit start.
- `src/components/BreathingGuide.tsx`
  - Four sets of 4-second inhale, 7-second hold, and 8-second exhale.
  - Fires one audio cue when each phase changes.
- `src/components/BreathingComplete.tsx`
  - Deliberate completion state with focus-length choices before starting
    again.
- `src/hooks/useBreathingExercise.ts`
  - Derives breathing phase countdown, current set, and remaining sets.
- `src/components/SquatBreak.tsx`
  - Automatic movement-break UI with slime guidance and a completion state
    that surfaces focus-length choices.
- `src/components/SquatSlime.tsx`
  - Reusable translucent SVG movement companion with squat-only warm glass
    colors that animates once per squat.
- `src/components/ConfettiBurst.tsx`
  - Lightweight, deterministic CSS confetti for squat completion.
- `src/components/ThoughtDump.tsx`
  - Persistent thoughts, copy feedback, and PDF export.
- `src/components/FloatingCompanion.tsx`
  - Mode-aware floating buddy.
- `src/components/CompanionModal.tsx`
  - Persisted buddy name/type selection.
- `src/components/AboutModal.tsx`
  - Informational project story, feature overview, and creator disclaimer.
  - Must remain independent from timer, mode, and persistence behavior.
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
- Each squat uses a short soft boop.
- Squat completion uses a distinct three-note celebration cue.
- Focus and breathing completion use a separate gentle chime.
- Audio failures must remain silent and must never interrupt the timer flow.
- Do not trigger cues on every countdown tick. Phase cues fire only when the
  phase value changes.
- When a background tab jumps forward, play at most the newly observed phase
  or squat cue; never replay missed intermediate cues.

## Extension Constraints

- Buddy definitions and mode copy live in `src/data/buddies.ts`.
- Thought objects already have an optional `position` field for future
  draggable sticky notes.
- Keep shared colors, gradients, surfaces, and glow values in the root CSS
  tokens instead of scattering new palettes through components.
- Keep all rendered UI text at 14px or larger.
- Timer callbacks may refresh React state, but progress must always be derived
  from timestamps rather than incrementing once per callback.
- Keep buddy visuals catalog-driven so animated sprites or GIF renderers can be
  introduced without changing persisted buddy settings.
- Keep manual edits scoped and make small milestone commits.
- Preserve user changes in a dirty worktree.

## Recent Milestones

- `eef3aed` adds the four-set 4-7-8 breathing flow.
- `9d57594` adds user-controlled post-focus break choices.
- `8bb063f` adds the 0.1-minute development focus option.
- `d2222d8` adds interaction-gated breathing phase and completion audio cues.
- `48bca6d` removes uppercase styling.
- `f4a3419` adds a restricted-browser clipboard fallback.
- `c80e24b` adds thought copy and PDF export.
- `43daed1` adds the calmer visual system and SVG buddies.
- `15a7686` automates squat breaks.
- `8f463e3` adds stable squat timing, slime guidance, and per-squat boops.
- `ab39c11` adds the manual squat celebration state and confetti.
- `93bf0ad` introduces the deep-sea typography, palette, and glass surfaces.
- `638ee6e` adds the translucent slime material and fluid motion.
- `d8b05f9` adds persisted focus length selection.

## Verification Notes

Before handing work back:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Test the complete shortened flow in a browser.
4. Check focus pause/resume/reset and persisted duration.
5. Check inhale, hold, and exhale phase boundaries.
6. Check squat pause/resume/restart/skip, per-count animation, and manual
   completion return.
7. Check the 390px responsive layout for horizontal overflow.
8. Check computed text sizes for the 14px minimum.
9. Check focus, breathing, and squat catch-up after an inactive/throttled tab.
10. Check the browser console for warnings and errors.

The in-app browser may throttle hidden tabs and does not fully support
clipboard/download observation. Use visible-state feedback plus build checks,
and note any browser-tool limitation honestly.
