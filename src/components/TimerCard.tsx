import type {
  FocusDurationMinutes,
  TimerStatus,
} from "../types/bodofo";
import { formatTime } from "../utils/time";
import { FocusDurationPicker } from "./FocusDurationPicker";

interface TimerCardProps {
  currentTask: string;
  focusDuration: FocusDurationMinutes;
  focusSessionCount: number;
  remainingSeconds: number;
  status: TimerStatus;
  onTaskChange: (task: string) => void;
  onDurationChange: (duration: FocusDurationMinutes) => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export function TimerCard({
  currentTask,
  focusDuration,
  focusSessionCount,
  remainingSeconds,
  status,
  onTaskChange,
  onDurationChange,
  onStart,
  onPause,
  onResume,
  onReset,
}: TimerCardProps) {
  const nextSession = focusSessionCount + 1;

  return (
    <section className="timer-card" aria-labelledby="mode-title">
      <div className="mode-pill">
        <span className="mode-pill__dot" />
        Focus mode
      </div>
      <p className="session-label">
        Session {nextSession.toString().padStart(2, "0")}
      </p>
      <h1 id="mode-title">
        {status === "running"
          ? "You are right where you need to be."
          : "One gentle thing at a time."}
      </h1>
      <time
        className="timer-display"
        dateTime={`PT${remainingSeconds}S`}
        aria-live="off"
      >
        {formatTime(remainingSeconds)}
      </time>
      <label className="task-field">
        <span>I am focusing on</span>
        <input
          type="text"
          value={currentTask}
          onChange={(event) => onTaskChange(event.target.value)}
          placeholder="What needs your attention?"
          maxLength={100}
        />
      </label>
      {status !== "running" && (
        <FocusDurationPicker
          focusDuration={focusDuration}
          name="focus-duration"
          onChange={onDurationChange}
        />
      )}
      <div className="timer-actions">
        {status === "idle" && (
          <button className="primary-button" type="button" onClick={onStart}>
            Start focusing
          </button>
        )}
        {status === "running" && (
          <button className="primary-button" type="button" onClick={onPause}>
            Pause
          </button>
        )}
        {status === "paused" && (
          <button className="primary-button" type="button" onClick={onResume}>
            Resume
          </button>
        )}
        <button className="text-button" type="button" onClick={onReset}>
          Reset
        </button>
      </div>
      
    </section>
  );
}
