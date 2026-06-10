import { useCallback, useEffect, useState } from "react";
import { BreathingGuide } from "./components/BreathingGuide";
import { CompanionModal } from "./components/CompanionModal";
import { FloatingCompanion } from "./components/FloatingCompanion";
import { SquatBreak } from "./components/SquatBreak";
import { ThoughtDump } from "./components/ThoughtDump";
import { TimerCard } from "./components/TimerCard";
import { SESSION_DURATIONS } from "./config";
import { useCountdown } from "./hooks/useCountdown";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { BuddySettings, Mode, Thought } from "./types/bodofo";

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>("focus");
  const [currentTask, setCurrentTask] = useLocalStorage(
    "bodofo:current-task",
    "",
  );
  const [focusSessionCount, setFocusSessionCount] = useLocalStorage(
    "bodofo:focus-session-count",
    0,
  );
  const [squatCount, setSquatCount] = useState(0);
  const [thoughts, setThoughts] = useLocalStorage<Thought[]>(
    "bodofo:thoughts",
    [],
  );
  const [buddySettings, setBuddySettings] = useLocalStorage<BuddySettings>(
    "bodofo:buddy-settings",
    { name: "Milo", type: "study" },
  );
  const [isBuddyModalOpen, setIsBuddyModalOpen] = useState(false);

  const handleTimerComplete = useCallback(() => {
    if (currentMode === "focus") {
      const completedSessions = focusSessionCount + 1;
      setFocusSessionCount(completedSessions);
      setCurrentMode(completedSessions % 2 === 0 ? "squat" : "breathing");
      return;
    }

    if (currentMode === "breathing") {
      setCurrentMode("focus");
    }
  }, [currentMode, focusSessionCount, setFocusSessionCount]);

  const countdown = useCountdown({
    initialSeconds: SESSION_DURATIONS[currentMode],
    onComplete: handleTimerComplete,
  });

  useEffect(() => {
    countdown.reset(SESSION_DURATIONS[currentMode]);
    if (currentMode === "breathing") {
      countdown.start();
    }
    if (currentMode === "squat") {
      setSquatCount(0);
    }
    // The stable mode boundary intentionally owns each fresh countdown.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMode]);

  const returnToFocus = () => setCurrentMode("focus");
  const addThought = (text: string) => {
    setThoughts((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        text,
        createdAt: Date.now(),
      },
    ]);
  };

  return (
    <main className={`app app--${currentMode}`}>
      <div className="sky-decor" aria-hidden="true">
        <span className="cloud cloud--one" />
        <span className="cloud cloud--two" />
        <span className="sun" />
      </div>

      <header className="site-header">
        <a className="brand" href="#focus-room" aria-label="BoDoFo home">
          <span className="brand__mark">B</span>
          <span>
            <strong>BoDoFo</strong>
            <small>Body Doubling Focus</small>
          </span>
        </a>
        <p className="tagline">
          Stay focused. <span>Breathe. Move. Come back.</span>
        </p>
      </header>

      <section className="focus-village" id="focus-room">
        <ThoughtDump
          mode={currentMode}
          thoughts={thoughts}
          onAdd={addThought}
          onRemove={(id) =>
            setThoughts((current) =>
              current.filter((thought) => thought.id !== id),
            )
          }
          onClear={() => setThoughts([])}
        />

        {currentMode === "focus" && (
          <TimerCard
            currentTask={currentTask}
            focusSessionCount={focusSessionCount}
            remainingSeconds={countdown.remainingSeconds}
            status={countdown.status}
            onTaskChange={setCurrentTask}
            onStart={countdown.start}
            onPause={countdown.pause}
            onResume={countdown.resume}
            onReset={() => countdown.reset()}
          />
        )}

        {currentMode === "breathing" && (
          <BreathingGuide
            remainingSeconds={countdown.remainingSeconds}
            totalSeconds={SESSION_DURATIONS.breathing}
          />
        )}

        {currentMode === "squat" && (
          <SquatBreak
            squatCount={squatCount}
            onIncrement={() =>
              setSquatCount((count) => Math.min(10, count + 1))
            }
            onDone={returnToFocus}
            onSkip={returnToFocus}
          />
        )}

      </section>

      <FloatingCompanion
        mode={currentMode}
        settings={buddySettings}
        onCustomize={() => setIsBuddyModalOpen(true)}
      />
      <CompanionModal
        isOpen={isBuddyModalOpen}
        settings={buddySettings}
        onClose={() => setIsBuddyModalOpen(false)}
        onSave={(settings) => {
          setBuddySettings(settings);
          setIsBuddyModalOpen(false);
        }}
      />

      <footer className="village-footer" aria-hidden="true">
        <div className="hill hill--back" />
        <div className="house house--one">
          <span />
        </div>
        <div className="house house--two">
          <span />
        </div>
        <div className="wave wave--one" />
        <div className="wave wave--two" />
      </footer>
    </main>
  );
}

export default App;
