import { useEffect, useState } from "react";
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
  const hasTask = currentTask.trim().length > 0;
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [taskDraft, setTaskDraft] = useState(currentTask);

  useEffect(() => {
    if (!isEditingTask) {
      setTaskDraft(currentTask);
    }
  }, [currentTask, isEditingTask]);

  const saveTask = () => {
    const nextTask = taskDraft.trim();
    if (!nextTask) return;
    onTaskChange(nextTask);
    setIsEditingTask(false);
  };

  const cancelTaskEdit = () => {
    setTaskDraft(currentTask);
    setIsEditingTask(false);
  };

  const startFocus = () => {
    const nextTask = currentTask.trim();

    if (!nextTask) return;

    if (nextTask !== currentTask) {
      onTaskChange(nextTask);
    }

    onStart();
  };

  return (
    <section className="timer-card" aria-labelledby="mode-title">
      <div className="mode-pill">
        <span className="mode-pill__dot" />
        Focus mode
      </div>
      <p className="session-label">
        Session {nextSession.toString().padStart(2, "0")}
      </p>
      {status === "idle" && (
        <div className="task-field task-field--primary">
          <h1 id="mode-title">What are you focusing on today?</h1>
          <input
            type="text"
            value={currentTask}
            onChange={(event) => onTaskChange(event.target.value)}
            placeholder="Write the thing you want to stay with"
            maxLength={100}
            aria-label="Focus task"
          />
        </div>
      )}
      {status !== "idle" && !isEditingTask && (
        <div className="focus-commitment">
          <p>Current focus</p>
          <div>
            <h1 id="mode-title">{currentTask}</h1>
            <button
              className="task-edit-button"
              type="button"
              onClick={() => {
                setTaskDraft(currentTask);
                setIsEditingTask(true);
              }}
              aria-label="Edit current focus task"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 16.8-.8 3 3-.8L18.1 8.1 16 6 5 16.8Z" />
                <path d="m14.7 7.3 2.1 2.1" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {status !== "idle" && isEditingTask && (
        <div className="task-edit-panel">
          <label className="task-field" htmlFor="focus-task-edit">
            <span id="mode-title">Update current focus</span>
            <input
              id="focus-task-edit"
              type="text"
              value={taskDraft}
              onChange={(event) => setTaskDraft(event.target.value)}
              maxLength={100}
            />
          </label>
          <div className="task-edit-actions">
            <button
              className="primary-button"
              type="button"
              onClick={saveTask}
              disabled={!taskDraft.trim()}
            >
              Save
            </button>
            <button className="text-button" type="button" onClick={cancelTaskEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <time
        className="timer-display"
        dateTime={`PT${remainingSeconds}S`}
        aria-live="off"
      >
        {formatTime(remainingSeconds)}
      </time>
      {status !== "running" && (
        <FocusDurationPicker
          focusDuration={focusDuration}
          name="focus-duration"
          onChange={onDurationChange}
        />
      )}
      <div className="timer-actions">
        {status === "idle" && (
          <button
            className="primary-button"
            type="button"
            onClick={startFocus}
            disabled={!hasTask}
          >
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
