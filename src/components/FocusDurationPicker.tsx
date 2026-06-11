import { FOCUS_DURATION_OPTIONS } from "../config";
import type { FocusDurationMinutes } from "../types/bodofo";

interface FocusDurationPickerProps {
  focusDuration: FocusDurationMinutes;
  name: string;
  onChange: (duration: FocusDurationMinutes) => void;
}

export function FocusDurationPicker({
  focusDuration,
  name,
  onChange,
}: FocusDurationPickerProps) {
  return (
    <fieldset className="duration-picker">
      <legend>Focus length</legend>
      <div>
        {FOCUS_DURATION_OPTIONS.map((duration) => (
          <label
            className={
              focusDuration === duration
                ? "duration-option duration-option--selected"
                : "duration-option"
            }
            key={duration}
          >
            <input
              type="radio"
              name={name}
              value={duration}
              checked={focusDuration === duration}
              onChange={() => onChange(duration)}
            />
            <span>{duration}</span>
            <small>min</small>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
