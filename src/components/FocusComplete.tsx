interface FocusCompleteProps {
  onBreathing: () => void;
  onSquat: () => void;
  onFocus: () => void;
}

export function FocusComplete({
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
        <button className="choice-button" type="button" onClick={onFocus}>
          <strong>Start another focus session</strong>
          <span>Return directly to your timer</span>
        </button>
      </div>
    </section>
  );
}

