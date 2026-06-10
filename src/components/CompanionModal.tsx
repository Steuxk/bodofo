import { useEffect, useRef, useState } from "react";
import { BUDDIES } from "../data/buddies";
import type { BuddySettings, BuddyType } from "../types/bodofo";

interface CompanionModalProps {
  isOpen: boolean;
  settings: BuddySettings;
  onClose: () => void;
  onSave: (settings: BuddySettings) => void;
}

export function CompanionModal({
  isOpen,
  settings,
  onClose,
  onSave,
}: CompanionModalProps) {
  const [name, setName] = useState(settings.name);
  const [type, setType] = useState<BuddyType>(settings.type);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setName(settings.name);
    setType(settings.type);
    window.setTimeout(() => nameInputRef.current?.focus(), 0);
  }, [isOpen, settings]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="companion-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="buddy-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close buddy picker"
        >
          ×
        </button>
        <span className="eyebrow">A little company</span>
        <h2 id="buddy-modal-title">Choose your buddy</h2>
        <p>Pick someone who feels easy to work beside.</p>

        <label className="modal-field" htmlFor="buddy-name">
          <span>Buddy name</span>
          <input
            id="buddy-name"
            ref={nameInputRef}
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={24}
            placeholder="Buddy"
          />
        </label>

        <fieldset className="buddy-options">
          <legend>Buddy type</legend>
          {BUDDIES.map((buddy) => (
            <label
              className={`buddy-option ${
                type === buddy.type ? "buddy-option--selected" : ""
              }`}
              key={buddy.type}
            >
              <input
                type="radio"
                name="buddy-type"
                value={buddy.type}
                checked={type === buddy.type}
                onChange={() => setType(buddy.type)}
              />
              <span
                className="buddy-option__visual"
                style={{ background: buddy.visual.accent }}
                aria-hidden="true"
              >
                {buddy.visual.source}
              </span>
              <strong>{buddy.label}</strong>
            </label>
          ))}
        </fieldset>

        <button
          className="primary-button modal-save"
          type="button"
          onClick={() =>
            onSave({
              name: name.trim() || "Buddy",
              type,
            })
          }
        >
          Bring them along
        </button>
      </section>
    </div>
  );
}
