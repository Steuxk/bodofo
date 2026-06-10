interface BreathingPreparationProps {
  onStart: () => void;
  onSkip: () => void;
}

export function BreathingPreparation({
  onStart,
  onSkip,
}: BreathingPreparationProps) {
  return (
    <section
      className="timer-card break-card breathing-card breathing-prep"
      aria-labelledby="mode-title"
    >
      <div className="mode-pill">
        <span className="mode-pill__dot" />
        Breathing exercise
      </div>
      <p className="session-label">Four steady sets</p>
      <h1 id="mode-title">Settle in before you begin.</h1>
      <div className="breathing-pattern" aria-label="Breathing pattern">
        <span>
          <strong>4</strong>
          seconds inhale
        </span>
        <span>
          <strong>7</strong>
          seconds hold
        </span>
        <span>
          <strong>8</strong>
          seconds exhale
        </span>
      </div>
      <p className="choice-card__intro">
        Sit comfortably. The sound cues can guide you without watching.
      </p>
      <div className="timer-actions">
        <button className="primary-button" type="button" onClick={onStart}>
          Start breathing
        </button>
        <button className="text-button" type="button" onClick={onSkip}>
          Skip breathing
        </button>
      </div>
    </section>
  );
}

