import type { FocusDurationMinutes } from "../types/bodofo";
import { FocusDurationPicker } from "./FocusDurationPicker";

interface BreathingCompleteProps {
  focusDuration: FocusDurationMinutes;
  onDurationChange: (duration: FocusDurationMinutes) => void;
  onFocus: () => void;
}

export function BreathingComplete({
  focusDuration,
  onDurationChange,
  onFocus,
}: BreathingCompleteProps) {
  return (
    <section
      className="timer-card choice-card breathing-complete"
      aria-labelledby="mode-title"
    >
      <div className="mode-pill">
        <span className="mode-pill__dot" />
        Breathing complete
      </div>
      <p className="session-label">Four sets complete</p>
      <h1 id="mode-title">Nice work.</h1>
      <p className="choice-card__intro">
        Choose a comfortable length for your next session.
      </p>
      <FocusDurationPicker
        focusDuration={focusDuration}
        name="breathing-complete-focus-duration"
        onChange={onDurationChange}
      />
      <button className="primary-button" type="button" onClick={onFocus}>
        Start focus session
      </button>
    </section>
  );
}
