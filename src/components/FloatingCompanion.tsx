import { getBuddy } from "../data/buddies";
import type { BuddySettings, Mode } from "../types/bodofo";

interface FloatingCompanionProps {
  mode: Mode;
  settings: BuddySettings;
  onCustomize: () => void;
}

export function FloatingCompanion({
  mode,
  settings,
  onCustomize,
}: FloatingCompanionProps) {
  const buddy = getBuddy(settings.type);

  return (
    <aside className={`floating-companion floating-companion--${mode}`}>
      <button
        className="companion-button"
        type="button"
        onClick={onCustomize}
        aria-label={`Customize ${settings.name}`}
      >
        <span
          className="companion-visual"
          data-visual-kind={buddy.visual.kind}
          style={{ "--buddy-accent": buddy.visual.accent } as React.CSSProperties}
          aria-hidden="true"
        >
          <span className="companion-visual__face">{buddy.visual.source}</span>
          <span className="companion-visual__desk" />
        </span>
        <span className="companion-copy">
          <strong>{settings.name}</strong>
          <small>{buddy.activity[mode]}</small>
        </span>
        <span className="companion-edit" aria-hidden="true">
          Edit
        </span>
      </button>
    </aside>
  );
}

