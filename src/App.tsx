import { useCallback, useEffect, useState } from "react";
import { BreathingGuide } from "./components/BreathingGuide";
import { CompanionModal } from "./components/CompanionModal";
import { FloatingCompanion } from "./components/FloatingCompanion";
import { SquatBreak } from "./components/SquatBreak";
import { ThoughtDump } from "./components/ThoughtDump";
import { TimerCard } from "./components/TimerCard";
import {
  DEFAULT_FOCUS_DURATION,
  getFocusDurationSeconds,
  SESSION_DURATIONS,
} from "./config";
import { useCountdown } from "./hooks/useCountdown";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type {
  BuddySettings,
  FocusDurationMinutes,
  Mode,
  Thought,
} from "./types/bodofo";

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
  const [focusDuration, setFocusDuration] =
    useLocalStorage<FocusDurationMinutes>(
      "bodofo:focus-duration",
      DEFAULT_FOCUS_DURATION,
    );
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
      const isSquatSession = completedSessions % 2 === 0;
      setFocusSessionCount(completedSessions);
      setCurrentMode(isSquatSession ? "squat" : "breathing");
      return;
    }

    if (currentMode === "breathing") {
      setCurrentMode("focus");
    }
  }, [currentMode, focusSessionCount, setFocusSessionCount]);

  const countdown = useCountdown({
    initialSeconds:
      currentMode === "focus"
        ? getFocusDurationSeconds(focusDuration)
        : currentMode === "breathing"
          ? SESSION_DURATIONS.breathing
          : 0,
    onComplete: handleTimerComplete,
  });

  useEffect(() => {
    const modeDuration =
      currentMode === "focus"
        ? getFocusDurationSeconds(focusDuration)
        : currentMode === "breathing"
          ? SESSION_DURATIONS.breathing
          : 0;
    countdown.reset(modeDuration);
    if (currentMode === "breathing") {
      countdown.start();
    }
    // The stable mode boundary intentionally owns each fresh countdown.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMode]);

  const returnToFocus = () => setCurrentMode("focus");
  const changeFocusDuration = (duration: FocusDurationMinutes) => {
    setFocusDuration(duration);
    countdown.reset(getFocusDurationSeconds(duration));
  };
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
      <div className="room-accents" aria-hidden="true">
        <span />
        <span />
        <span />
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
            focusDuration={focusDuration}
            focusSessionCount={focusSessionCount}
            remainingSeconds={countdown.remainingSeconds}
            status={countdown.status}
            onTaskChange={setCurrentTask}
            onDurationChange={changeFocusDuration}
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
            onComplete={returnToFocus}
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

    </main>
  );
}

export default App;
