import { useEffect, useRef } from "react";
import { playSquatCue } from "../audio/audioFeedback";
import { SQUAT_TARGET } from "../config";
import { useSquatCountdown } from "../hooks/useSquatCountdown";
import { SquatSlime } from "./SquatSlime";

interface SquatBreakProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function SquatBreak({
  onComplete,
  onSkip,
}: SquatBreakProps) {
  const { count, status, isComplete, pause, resume, restart } =
    useSquatCountdown({ onComplete });
  const previousCountRef = useRef(0);

  useEffect(() => {
    if (count <= previousCountRef.current) {
      previousCountRef.current = count;
      return;
    }

    playSquatCue();
    previousCountRef.current = count;
  }, [count]);

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
        {isComplete ? "Done! Nicely moved." : "Ten squats together."}
      </h1>
      <SquatSlime
        bounceKey={count}
        isPaused={status === "paused"}
      />
      <div className="squat-counter" aria-live="polite">
        <strong>Squat {count}</strong>
        <span>of {SQUAT_TARGET}</span>
      </div>
      <p className="squat-instruction">
        {isComplete
          ? "Heading back to focus..."
          : status === "paused"
            ? "Paused. Take your time."
            : count === 0
              ? "Get ready. Follow the slime's gentle bounce."
              : "One soft bounce, one steady squat."}
      </p>
      <div className="timer-actions">
        {!isComplete && status === "running" && (
          <button className="primary-button" type="button" onClick={pause}>
            Pause
          </button>
        )}
        {!isComplete && status === "paused" && (
          <button className="primary-button" type="button" onClick={resume}>
            Resume
          </button>
        )}
        {!isComplete && (
          <button className="text-button" type="button" onClick={restart}>
            Restart
          </button>
        )}
        <button className="text-button" type="button" onClick={onSkip}>
          Skip for now
        </button>
      </div>
    </section>
  );
}
