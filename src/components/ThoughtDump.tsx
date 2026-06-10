import { useState, type FormEvent } from "react";
import type { Mode, Thought } from "../types/bodofo";

interface ThoughtDumpProps {
  mode: Mode;
  thoughts: Thought[];
  onAdd: (text: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function ThoughtDump({
  mode,
  thoughts,
  onAdd,
  onRemove,
  onClear,
}: ThoughtDumpProps) {
  const [draft, setDraft] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onAdd(text);
    setDraft("");
  };

  return (
    <aside className={`thought-dump thought-dump--${mode}`}>
      <header className="thought-dump__header">
        <div>
          <span className="eyebrow">Thought dock</span>
          <h2>Park it for later.</h2>
        </div>
        <span className="thought-count" aria-label={`${thoughts.length} thoughts`}>
          {thoughts.length}
        </span>
      </header>

      <form className="thought-form" onSubmit={handleSubmit}>
        <label htmlFor="thought-input">You can park that thought here.</label>
        <div>
          <input
            id="thought-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add a passing thought..."
            maxLength={120}
          />
          <button type="submit" aria-label="Add thought">
            +
          </button>
        </div>
      </form>

      <div className="thought-list" aria-live="polite">
        {thoughts.length === 0 ? (
          <p className="empty-thoughts">Nothing waiting. Nice and clear.</p>
        ) : (
          thoughts.map((thought, index) => (
            <article
              className="thought-note"
              key={thought.id}
              data-thought-id={thought.id}
              style={{
                "--note-tilt": `${index % 2 === 0 ? -1.2 : 1.2}deg`,
              } as React.CSSProperties}
            >
              <p>{thought.text}</p>
              <button
                type="button"
                onClick={() => onRemove(thought.id)}
                aria-label={`Remove thought: ${thought.text}`}
              >
                ×
              </button>
            </article>
          ))
        )}
      </div>

      {thoughts.length > 0 && (
        <button className="clear-thoughts" type="button" onClick={onClear}>
          Clear all
        </button>
      )}
    </aside>
  );
}

