import { useState, type FormEvent } from "react";
import type { Mode, Thought } from "../types/bodofo";
import {
  copyText,
  exportThoughtDumpPdf,
  formatThoughtDumpText,
} from "../utils/thoughtExport";

interface ThoughtDumpProps {
  mode: Mode;
  currentTask: string;
  thoughts: Thought[];
  onAdd: (text: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function ThoughtDump({
  mode,
  currentTask,
  thoughts,
  onAdd,
  onRemove,
  onClear,
}: ThoughtDumpProps) {
  const [draft, setDraft] = useState("");
  const [actionStatus, setActionStatus] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onAdd(text);
    setDraft("");
  };

  const showStatus = (message: string) => {
    setActionStatus(message);
    window.setTimeout(() => setActionStatus(""), 2200);
  };

  const copyThoughts = async () => {
    try {
      await copyText(formatThoughtDumpText({ currentTask, thoughts }));
      showStatus("Copied to clipboard");
    } catch {
      showStatus("Copy was not available");
    }
  };

  const exportPdf = async () => {
    try {
      await exportThoughtDumpPdf({ currentTask, thoughts });
      showStatus("PDF downloaded");
    } catch {
      showStatus("PDF export was not available");
    }
  };

  return (
    <aside className={`thought-dump thought-dump--${mode}`}>
      <header className="thought-dump__header">
        <div>
          <span className="eyebrow">Thought dock</span>
          <h2>Park it for later</h2>
        </div>
        <span
          className="thought-count"
          aria-label={`${thoughts.length} ${
            thoughts.length === 1 ? "thought" : "thoughts"
          }`}
        >
          {thoughts.length}
        </span>
      </header>

      <form className="thought-form" onSubmit={handleSubmit}>
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
          <p className="empty-thoughts">Nothing waiting.</p>
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

      <footer className="thought-actions">
        <div>
          <button type="button" onClick={copyThoughts}>
            Copy
          </button>
          <button type="button" onClick={exportPdf}>
            Export thoughts
          </button>
        </div>
        <span role="status">{actionStatus}</span>
      </footer>

      {thoughts.length > 0 && (
        <button className="clear-thoughts" type="button" onClick={onClear}>
          Clear all
        </button>
      )}
    </aside>
  );
}
