import { useCallback, useEffect, useRef, useState } from "react";
import {
  playCompletionCue,
  unlockAudio,
} from "./audio/audioFeedback";
import { BreathingGuide } from "./components/BreathingGuide";
import { BreathingComplete } from "./components/BreathingComplete";
import { BreathingPreparation } from "./components/BreathingPreparation";
import { CompanionModal } from "./components/CompanionModal";
import { FloatingCompanion } from "./components/FloatingCompanion";
import { FocusComplete } from "./components/FocusComplete";
import { SquatBreak } from "./components/SquatBreak";
import { ThoughtDump } from "./components/ThoughtDump";
import { TimerCard } from "./components/TimerCard";
import {
  DEFAULT_FOCUS_DURATION,
  getFocusDurationSeconds,
} from "./config";
import { useCountdown } from "./hooks/useCountdown";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type {
  AppStage,
  BuddySettings,
  FocusDurationMinutes,
  Mode,
  Thought,
} from "./types/bodofo";

function App() {
  const [currentStage, setCurrentStage] = useState<AppStage>("focus");
  const autoStartFocusRef = useRef(false);
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
  const currentMode: Mode =
    currentStage === "squat"
      ? "squat"
      : currentStage.startsWith("breathing")
        ? "breathing"
        : "focus";

  const handleTimerComplete = useCallback(() => {
    playCompletionCue();
    setFocusSessionCount(focusSessionCount + 1);
    setCurrentStage("focusComplete");
  }, [focusSessionCount, setFocusSessionCount]);

  const countdown = useCountdown({
    initialSeconds: getFocusDurationSeconds(focusDuration),
    onComplete: handleTimerComplete,
  });

  useEffect(() => {
    if (currentStage !== "focus") return;
    countdown.reset(getFocusDurationSeconds(focusDuration));
    if (autoStartFocusRef.current) {
      autoStartFocusRef.current = false;
      countdown.start();
    }
    // The focus boundary intentionally owns each fresh countdown.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStage]);

  useEffect(() => {
    const handleFirstInteraction = () => unlockAudio();
    window.addEventListener("pointerdown", handleFirstInteraction, {
      once: true,
    });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const returnToFocus = () => setCurrentStage("focus");
  const startAnotherFocus = () => {
    autoStartFocusRef.current = true;
    setCurrentStage("focus");
  };
  const changeFocusDuration = (duration: FocusDurationMinutes) => {
    setFocusDuration(duration);
    if (countdown.status === "idle") {
      countdown.reset(getFocusDurationSeconds(duration));
    }
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
        
      </header>

      <section className="focus-village" id="focus-room">
        <ThoughtDump
          mode={currentMode}
          currentTask={currentTask}
          thoughts={thoughts}
          onAdd={addThought}
          onRemove={(id) =>
            setThoughts((current) =>
              current.filter((thought) => thought.id !== id),
            )
          }
          onClear={() => setThoughts([])}
        />

        {currentStage === "focus" && (
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

        {currentStage === "focusComplete" && (
          <FocusComplete
            onBreathing={() => setCurrentStage("breathingPrep")}
            onSquat={() => setCurrentStage("squat")}
            onFocus={startAnotherFocus}
          />
        )}

        {currentStage === "breathingPrep" && (
          <BreathingPreparation
            onStart={() => setCurrentStage("breathing")}
            onSkip={returnToFocus}
          />
        )}

        {currentStage === "breathing" && (
          <BreathingGuide
            onComplete={() => {
              playCompletionCue();
              setCurrentStage("breathingComplete");
            }}
          />
        )}

        {currentStage === "breathingComplete" && (
          <BreathingComplete onFocus={startAnotherFocus} />
        )}

        {currentStage === "squat" && (
          <SquatBreak
            onComplete={() => {
              playCompletionCue();
              returnToFocus();
            }}
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
