interface BreathingCompleteProps {
  onFocus: () => void;
}

export function BreathingComplete({
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
      <p className="choice-card__intro">Ready to focus again?</p>
      <button className="primary-button" type="button" onClick={onFocus}>
        Start focus session
      </button>
    </section>
  );
}

