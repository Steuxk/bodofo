function App() {
  return (
    <main className="app app--focus">
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

        <section className="timer-card" aria-labelledby="mode-title">
          <div className="mode-pill">
            <span className="mode-pill__dot" />
            Focus mode
          </div>
          <p className="session-label">Session 01</p>
          <h1 id="mode-title">One gentle thing at a time.</h1>
          <time className="timer-display" dateTime="PT25M">
            25:00
          </time>
          <label className="task-field">
            <span>I am focusing on</span>
            <input
              type="text"
              placeholder="What needs your attention?"
              disabled
            />
          </label>
          <button className="primary-button" type="button" disabled>
            Start focusing
          </button>
          <p className="gentle-copy">Stay with this one thing.</p>
        </section>

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

