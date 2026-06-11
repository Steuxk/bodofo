# BoDoFo

A cozy, frontend-only body-doubling focus companion built with React,
TypeScript, and Vite.

Focus sessions can run for 15, 25, or 30 minutes. When focus ends, the user
chooses a four-set 4-7-8 breathing exercise, a ten-squat break, or another
focus session. The thought dock can copy its contents as text or export them
as a PDF.

Focus length choices are shown again before repeat sessions, including after
breathing and squat breaks.

The visual system uses Quicksand, deep navy glass surfaces, restrained
bioluminescent accents, and a translucent jelly-like squat companion.
Squat mode temporarily shifts into the warm Sunrise Reef palette with coral
glass, amber light, and a peach-gold version of the slime.

The header information icon opens a creator-focused overview of the project,
its motivation, and each feature.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```

## Test short sessions

Copy `.env.example` to `.env.local`, or start Vite with temporary values:

```bash
VITE_FOCUS_DURATION=5 \
VITE_SQUAT_INTERVAL_SECONDS=0.25 \
VITE_BREATHING_TICK_MS=100 npm run dev
```

The focus override is measured in seconds. Without overrides, the selected
focus length is used, breathing seconds advance every second, and squats
advance every 2 seconds.

Focus, breathing, and squat progress derive from elapsed wall-clock time, so
inactive or throttled browser tabs catch up immediately when observed again.

## Extension points

- Buddy visuals and mode-specific activity live in `src/data/buddies.ts`.
  The component reads a visual descriptor rather than hard-coding a specific
  buddy, leaving room for sprite or GIF renderers.
- Thought records include an optional `position` value so drag behavior can be
  added without changing persisted note data.
- Focus, breathing, and squat views are separate components coordinated by the
  small mode state machine in `src/App.tsx`.
- Squat timing is wall-clock based, while the slime, synthesized cues, and
  completion confetti remain separate presentation components.
- Shared elapsed-time behavior lives in `src/hooks/useElapsedTimer.ts`.
- Theme tokens and atmospheric background layers live in
  `src/styles/globals.css`; keep future palettes centralized there.
