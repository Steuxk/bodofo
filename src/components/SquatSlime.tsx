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
        viewBox="0 0 160 130"
        focusable="false"
      >
        <defs>
          <linearGradient id="slime-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#9ddbd0" stopOpacity="0.86" />
            <stop offset="1" stopColor="#5eaaa8" stopOpacity="0.92" />
          </linearGradient>
        </defs>
        <path
          d="M26 102c0-16 10-24 18-34 8-11 7-26 19-35 10-8 25-8 36 0 13 9 12 25 20 36 8 10 16 18 16 33 0 18-19 25-55 25s-54-7-54-25Z"
          fill="url(#slime-fill)"
          stroke="#397b7e"
          strokeWidth="3"
        />
        <ellipse cx="63" cy="77" rx="4" ry="5" fill="#17324d" />
        <ellipse cx="98" cy="77" rx="4" ry="5" fill="#17324d" />
        <path
          d="M68 93c8 7 17 7 25 0"
          fill="none"
          stroke="#17324d"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <ellipse
          cx="58"
          cy="62"
          rx="15"
          ry="8"
          fill="#ffffff"
          opacity="0.24"
          transform="rotate(-24 58 62)"
        />
      </svg>
    </div>
  );
}
