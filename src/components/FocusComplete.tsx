import type { FocusDurationMinutes } from "../types/bodofo";
import { FocusDurationPicker } from "./FocusDurationPicker";

interface FocusCompleteProps {
  focusDuration: FocusDurationMinutes;
  onDurationChange: (duration: FocusDurationMinutes) => void;
  onBreathing: () => void;
  onSquat: () => void;
  onFocus: () => void;
}

export function FocusComplete({
  focusDuration,
  onDurationChange,
  onBreathing,
  onSquat,
  onFocus,
}: FocusCompleteProps) {
  return (
    <section
      className="timer-card choice-card"
      aria-labelledby="mode-title"
    >
      <div className="mode-pill">
        <span className="mode-pill__dot" />
        Focus complete
      </div>
      <p className="session-label">A good stopping point</p>
      <h1 id="mode-title">What would you like to do next?</h1>
      <p className="choice-card__intro">
        Choose the kind of reset that feels useful right now.
      </p>
      <div className="choice-list">
        <button className="choice-button" type="button" onClick={onBreathing}>
          <strong>Start breathing exercise</strong>
          <span>Four calm 4-7-8 breathing sets</span>
        </button>
        <button className="choice-button" type="button" onClick={onSquat}>
          <strong>Start squat exercise</strong>
          <span>Ten gently paced squats</span>
        </button>
      </div>
      <div className="next-focus">
        <p>Or choose the length of your next focus session.</p>
        <FocusDurationPicker
          focusDuration={focusDuration}
          name="focus-complete-focus-duration"
          onChange={onDurationChange}
        />
        <button className="primary-button" type="button" onClick={onFocus}>
          Start another focus session
        </button>
      </div>
    </section>
  );
}
