import { useEffect, useRef } from "react";
import {
  playSquatCelebrationCue,
  playSquatCue,
} from "../audio/audioFeedback";
import { SQUAT_TARGET } from "../config";
import { useSquatCountdown } from "../hooks/useSquatCountdown";
import type { FocusDurationMinutes } from "../types/bodofo";
import { ConfettiBurst } from "./ConfettiBurst";
import { FocusDurationPicker } from "./FocusDurationPicker";
import { SquatSlime } from "./SquatSlime";

interface SquatBreakProps {
  focusDuration: FocusDurationMinutes;
  onDurationChange: (duration: FocusDurationMinutes) => void;
  onFocus: () => void;
  onSkip: () => void;
}

export function SquatBreak({
  focusDuration,
  onDurationChange,
  onFocus,
  onSkip,
}: SquatBreakProps) {
  const { count, status, isComplete, pause, resume, restart } =
    useSquatCountdown();
  const previousCountRef = useRef(0);
  const hasCelebratedRef = useRef(false);

  useEffect(() => {
    if (count <= previousCountRef.current) {
      previousCountRef.current = count;
      return;
    }

    playSquatCue();
    previousCountRef.current = count;
  }, [count]);

  useEffect(() => {
    if (!isComplete || hasCelebratedRef.current) return;
    hasCelebratedRef.current = true;
    playSquatCelebrationCue();
  }, [isComplete]);

  return (
    <section
      className="timer-card break-card squat-card"
      aria-labelledby="mode-title"
    >
      <div className="mode-pill">
        <span className="mode-pill__dot" />
        Movement break
      </div>
      {/* <p className="session-label">A little reset</p> */}
      <h1 id="mode-title">
        {isComplete ? "Nice work!" : "Ten squats together."}
      </h1>
      {isComplete && <ConfettiBurst />}
      <SquatSlime
        bounceKey={count}
        isPaused={status === "paused"}
      />
      <div className="squat-counter" aria-live="polite">
        <strong>{count}</strong>
        <span className="squat-counter__total">
          of {SQUAT_TARGET} squats
        </span>
      </div>
      <p className="squat-instruction">
        {isComplete
          ? "You completed ten squats."
          : status === "paused"
            ? "Paused. Take your time."
            : count === 0
              ? "Get ready. Follow the slime's gentle bounce."
              : "One soft bounce, one steady squat."}
      </p>
      {isComplete && (
        <FocusDurationPicker
          focusDuration={focusDuration}
          name="squat-complete-focus-duration"
          onChange={onDurationChange}
        />
      )}
      <div className="timer-actions">
        {isComplete && (
          <button className="primary-button" type="button" onClick={onFocus}>
            Start focus session
          </button>
        )}
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
        {!isComplete && (
          <button className="text-button" type="button" onClick={onSkip}>
            Skip for now
          </button>
        )}
      </div>
    </section>
  );
}
