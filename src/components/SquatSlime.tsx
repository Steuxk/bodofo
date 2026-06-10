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
          <radialGradient id="slime-fill" cx="34%" cy="22%" r="82%">
            <stop offset="0" stopColor="#dff8ff" stopOpacity="0.84" />
            <stop offset="0.3" stopColor="#7ceeff" stopOpacity="0.72" />
            <stop offset="0.68" stopColor="#4db6d6" stopOpacity="0.68" />
            <stop offset="1" stopColor="#215d8c" stopOpacity="0.78" />
          </radialGradient>
          <linearGradient id="slime-edge" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#dff8ff" stopOpacity="0.78" />
            <stop offset="0.55" stopColor="#8ce6ff" stopOpacity="0.42" />
            <stop offset="1" stopColor="#4db6d6" stopOpacity="0.62" />
          </linearGradient>
          <radialGradient id="slime-inner-glow" cx="50%" cy="34%" r="65%">
            <stop offset="0" stopColor="#dff8ff" stopOpacity="0.34" />
            <stop offset="1" stopColor="#8ce6ff" stopOpacity="0" />
          </radialGradient>
          <filter id="slime-glow" x="-35%" y="-35%" width="170%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.30 0 0 0 0 0.71 0 0 0 0 0.84 0 0 0 0.42 0"
            />
          </filter>
        </defs>
        <path
          d="M27 102c0-15 9-24 17-34 9-12 8-29 20-38 10-8 23-9 34-4 17 7 18 27 27 41 7 11 12 20 9 35-4 18-20 25-54 25-35 0-53-8-53-25Z"
          fill="#4db6d6"
          opacity="0.3"
          filter="url(#slime-glow)"
        />
        <path
          d="M27 102c0-15 9-24 17-34 9-12 8-29 20-38 10-8 23-9 34-4 17 7 18 27 27 41 7 11 12 20 9 35-4 18-20 25-54 25-35 0-53-8-53-25Z"
          fill="url(#slime-fill)"
          stroke="url(#slime-edge)"
          strokeWidth="2"
        />
        <path
          d="M37 98c8 12 22 17 43 17 25 0 39-6 47-19-2 20-18 29-47 29-30 0-45-9-43-27Z"
          fill="#061826"
          opacity="0.12"
        />
        <ellipse cx="80" cy="71" rx="47" ry="43" fill="url(#slime-inner-glow)" />
        <ellipse cx="63" cy="78" rx="3.5" ry="4.5" fill="#0f2740" opacity="0.82" />
        <ellipse cx="98" cy="78" rx="3.5" ry="4.5" fill="#0f2740" opacity="0.82" />
        <path
          d="M68 93c8 7 17 7 25 0"
          fill="none"
          stroke="#0f2740"
          strokeLinecap="round"
          strokeWidth="2.5"
          opacity="0.82"
        />
        <path
          d="M49 55c7-13 18-20 31-20"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="7"
          opacity="0.42"
        />
        <circle cx="109" cy="54" r="5" fill="#dff8ff" opacity="0.28" />
        <circle cx="116" cy="64" r="2.5" fill="#dff8ff" opacity="0.4" />
        <ellipse
          cx="55"
          cy="67"
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
