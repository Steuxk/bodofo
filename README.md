# BoDoFo

A cozy, frontend-only body-doubling focus companion built with React,
TypeScript, and Vite.

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
VITE_FOCUS_DURATION=5 VITE_BREATHING_DURATION=5 npm run dev
```

Durations are measured in seconds. Without overrides, focus lasts 25 minutes
and breathing lasts 2 minutes.

## Extension points

- Buddy visuals and mode-specific activity live in `src/data/buddies.ts`.
  The component reads a visual descriptor rather than hard-coding a specific
  buddy, leaving room for sprite or GIF renderers.
- Thought records include an optional `position` value so drag behavior can be
  added without changing persisted note data.
- Focus, breathing, and squat views are separate components coordinated by the
  small mode state machine in `src/App.tsx`.
