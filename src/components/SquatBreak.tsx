import { SQUAT_TARGET } from "../config";

interface SquatBreakProps {
  squatCount: number;
  onIncrement: () => void;
  onDone: () => void;
  onSkip: () => void;
}

export function SquatBreak({
  squatCount,
  onIncrement,
  onDone,
  onSkip,
}: SquatBreakProps) {
  const isComplete = squatCount >= SQUAT_TARGET;

  return (
    <section
      className="timer-card break-card squat-card"
      aria-labelledby="mode-title"
    >
      <div className="mode-pill">
        <span className="mode-pill__dot" />
        Movement break
      </div>
      <p className="session-label">A little reset</p>
      <h1 id="mode-title">
        {isComplete ? "Nicely done." : "Move a little, then come back."}
      </h1>
      <div className="squat-counter" aria-live="polite">
        <strong>{squatCount}</strong>
        <span>/ {SQUAT_TARGET} squats</span>
      </div>
      <div className="squat-progress" aria-hidden="true">
        <span
          style={{
            width: `${Math.min(100, (squatCount / SQUAT_TARGET) * 100)}%`,
          }}
        />
      </div>
      {!isComplete && (
        <button className="primary-button squat-button" onClick={onIncrement}>
          I did one
        </button>
      )}
      <div className="timer-actions">
        <button
          className={isComplete ? "primary-button" : "text-button"}
          type="button"
          onClick={onDone}
          disabled={!isComplete}
        >
          Done
        </button>
        <button className="text-button" type="button" onClick={onSkip}>
          Skip for now
        </button>
      </div>
    </section>
  );
}

