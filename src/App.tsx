import { useCallback, useEffect, useState } from "react";
import { BreathingGuide } from "./components/BreathingGuide";
import { SquatBreak } from "./components/SquatBreak";
import { TimerCard } from "./components/TimerCard";
import { SESSION_DURATIONS } from "./config";
import { useCountdown } from "./hooks/useCountdown";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Mode } from "./types/bodofo";

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
        <aside className="placeholder-card placeholder-card--notes">
          <span className="eyebrow">Thought dock</span>
          <h2>Park it for later.</h2>
          <p>Your thoughts will have a cozy place to wait here.</p>
        </aside>

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

        <aside className="placeholder-card placeholder-card--buddy">
          <span className="eyebrow">Body double</span>
          <div className="buddy-placeholder" aria-hidden="true">
            <span>•ᴗ•</span>
          </div>
          <h2>A buddy is on the way.</h2>
          <p>Someone quiet to work beside you.</p>
        </aside>
      </section>

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
