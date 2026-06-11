interface SquatSlimeProps {
  bounceKey: number;
  isPaused: boolean;
}

export function SquatSlime({
  bounceKey,
  isPaused,
}: SquatSlimeProps) {
  return (
    <div
      className={`squat-slime ${isPaused ? "squat-slime--paused" : ""}`}
      aria-hidden="true"
    >
      <svg
        className={`squat-slime__shadow ${
          bounceKey > 0 ? "squat-slime__shadow--bounce" : ""
        }`}
        key={`shadow-${bounceKey}`}
        viewBox="0 0 160 24"
        focusable="false"
      >
        <ellipse cx="80" cy="12" rx="54" ry="8" />
      </svg>
      <svg
        className={`squat-slime__body ${
          bounceKey > 0 ? "squat-slime__body--bounce" : ""
        }`}
        key={bounceKey}
        viewBox="0 0 160 140"
        focusable="false"
      >
        <defs>
          <radialGradient id="slime-fill" cx="34%" cy="22%" r="82%">
            <stop offset="0" stopColor="#fff5ec" stopOpacity="0.9" />
            <stop offset="0.3" stopColor="#ffe9b3" stopOpacity="0.8" />
            <stop offset="0.68" stopColor="#ffb87d" stopOpacity="0.74" />
            <stop offset="1" stopColor="#ff8a5b" stopOpacity="0.82" />
          </radialGradient>
          <linearGradient id="slime-edge" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fffaf5" stopOpacity="0.88" />
            <stop offset="0.55" stopColor="#ffd978" stopOpacity="0.52" />
            <stop offset="1" stopColor="#ff9f68" stopOpacity="0.68" />
          </linearGradient>
          <radialGradient id="slime-inner-glow" cx="50%" cy="34%" r="65%">
            <stop offset="0" stopColor="#fffaf5" stopOpacity="0.44" />
            <stop offset="1" stopColor="#ffd978" stopOpacity="0" />
          </radialGradient>
          <filter id="slime-glow" x="-35%" y="-35%" width="170%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.62 0 0 0 0 0.41 0 0 0 0.42 0"
            />
          </filter>
        </defs>
        <path
          d="M80 16c31 0 55 25 55 58 0 35-19 55-55 55S25 109 25 74c0-33 24-58 55-58Z"
          fill="#ff9f68"
          opacity="0.3"
          filter="url(#slime-glow)"
        />
        <path
          d="M80 16c31 0 55 25 55 58 0 35-19 55-55 55S25 109 25 74c0-33 24-58 55-58Z"
          fill="url(#slime-fill)"
          stroke="url(#slime-edge)"
          strokeWidth="2"
        />
        <path
          d="M31 91c8 23 24 34 49 34 26 0 42-11 49-34-3 27-19 38-49 38-29 0-46-12-49-38Z"
          fill="#6b3d1f"
          opacity="0.1"
        />
        <ellipse cx="80" cy="69" rx="49" ry="49" fill="url(#slime-inner-glow)" />
        <ellipse cx="62" cy="76" rx="3.5" ry="4.5" fill="#6b3d1f" opacity="0.9" />
        <ellipse cx="98" cy="76" rx="3.5" ry="4.5" fill="#6b3d1f" opacity="0.9" />
        <path
          d="M68 91c8 7 17 7 25 0"
          fill="none"
          stroke="#6b3d1f"
          strokeLinecap="round"
          strokeWidth="2.5"
          opacity="0.82"
        />
        <path
          d="M47 51c8-14 20-21 35-21"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="7"
          opacity="0.42"
        />
        <circle cx="111" cy="49" r="5" fill="#fffaf5" opacity="0.42" />
        <circle cx="119" cy="59" r="2.5" fill="#fffaf5" opacity="0.54" />
        <ellipse
          cx="52"
          cy="65"
          rx="11"
          ry="5"
          fill="#ffffff"
          opacity="0.16"
          transform="rotate(-32 55 67)"
        />
      </svg>
    </div>
  );
}
