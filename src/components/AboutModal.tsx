import { useEffect, useRef } from "react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  {
    title: "Focus timer",
    description: "A simple timer to help you stay with one thing at a time.",
  },
  {
    title: "Guided breathing",
    description:
      "A short breathing exercise to reset and slow things down before jumping back into work.",
  },
  {
    title: "Movement break",
    description:
      "A quick squat session to get you moving and wake up your brain a little.",
  },
  {
    title: "Thought dock",
    description:
      "A place to park random thoughts so they don't keep bouncing around in your head.",
  },
  {
    title: "Body double",
    description:
      "A small companion that hangs around while you work. Sometimes it's easier to focus when it feels like you're not doing it alone.",
  },
] as const;

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="about-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close About BoDoFo"
        >
          ×
        </button>

        <header className="about-modal__header">
          <p className="eyebrow">The story behind the project</p>
          <h2 id="about-modal-title">About BoDoFo</h2>
        </header>

        <div className="about-modal__content">
          <div className="about-modal__intro">
            <p>
              BoDoFo (Body Doubling Focus) is a little focus companion I built
              to help with short attention spans, distractions, and staying
              motivated throughout the day.
            </p>
            <p>
              Instead of trying to be another productivity app, it's designed
              to gently help you stay with the task you're already doing.
            </p>
            <p>
              Have fun using it however you need, whether you're studying,
              working, reading, writing, or just trying to get through a few
              focused minutes.
            </p>
          </div>

          <section className="about-modal__section">
            <h3>Why I built this</h3>
            <p>
              I often catch myself jumping between tasks, chasing new ideas,
              or getting distracted halfway through something important.
            </p>
            <p>
              BoDoFo started as a small experiment to combine a few techniques
              that help me personally:
            </p>
            <ul>
              <li>timed focus sessions</li>
              <li>guided breathing</li>
              <li>movement breaks</li>
              <li>body doubling</li>
              <li>quickly parking distracting thoughts</li>
            </ul>
            <p>
              Nothing groundbreaking, just a simple tool that tries to make
              focusing a little easier.
            </p>
          </section>

          <section className="about-modal__section">
            <h3>What's inside?</h3>
            <div className="about-feature-list">
              {features.map((feature) => (
                <article className="about-feature" key={feature.title}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-modal__section about-modal__disclaimer">
            <h3>A small disclaimer</h3>
            <p>
              This project was mostly vibecoded and built in about a day.
            </p>
            <p>
              The goal wasn't perfection. It was to quickly explore an idea,
              build something useful, and see where it goes.
            </p>
            <p>If you find it helpful, that's already a win.</p>
          </section>
        </div>

        <footer className="about-modal__footer">
          <strong>Built by Stef</strong>
          <span>Have fun and happy focusing ✨</span>
        </footer>
      </section>
    </div>
  );
}
