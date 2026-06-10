import type { BuddyType, Mode } from "../../types/bodofo";

interface BuddySvgProps {
  type: BuddyType;
  mode?: Mode;
}

const sharedFace = (
  <>
    <circle cx="40" cy="37" r="2.2" fill="currentColor" />
    <circle cx="56" cy="37" r="2.2" fill="currentColor" />
    <path
      d="M41 46c4 4 10 4 14 0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    />
  </>
);

export function BuddySvg({ type, mode = "focus" }: BuddySvgProps) {
  return (
    <svg
      className={`buddy-svg buddy-svg--${type} buddy-svg--${mode}`}
      viewBox="0 0 96 96"
      role="img"
      aria-label={`${type} buddy`}
    >
      {type === "cat" ? (
        <>
          <path d="M27 30 31 12l14 12M69 30 65 12 51 24" fill="#efb07e" />
          <circle cx="48" cy="42" r="26" fill="#efb07e" />
          <path d="M33 53c10 8 20 8 30 0v28H33Z" fill="#d98268" />
          {sharedFace}
          <path
            d="M30 43 17 40m14 9-14 3m49-9 13-3m-14 9 14 3"
            fill="none"
            stroke="#17324d"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </>
      ) : (
        <>
          <circle
            cx="48"
            cy="35"
            r="24"
            fill={type === "gym" ? "#d9c8a9" : type === "office" ? "#d5ccea" : "#f2cf9f"}
          />
          <path
            d="M29 33c2-18 36-24 40 1-10-4-20-7-40-1Z"
            fill={type === "gym" ? "#758ec0" : type === "office" ? "#aaa2d7" : "#7d5d4c"}
          />
          {sharedFace}
          <path
            d="M24 84c2-20 12-29 24-29s22 9 24 29Z"
            fill={type === "gym" ? "#ed766d" : type === "office" ? "#79b8c8" : "#f3c75b"}
          />
          {type === "study" && (
            <>
              <path d="M22 67h52v17H22Z" fill="#fff8e9" />
              <path d="M48 68v15" stroke="#2f82a0" strokeWidth="2" />
            </>
          )}
          {type === "office" && (
            <path d="M29 66h38v22H29Z" fill="#fff8e9" stroke="#17324d" strokeWidth="2" />
          )}
          {type === "gym" && (
            <path
              d="M17 67h19m24 0h19M20 61v12m56-12v12"
              fill="none"
              stroke="#17324d"
              strokeLinecap="round"
              strokeWidth="5"
            />
          )}
        </>
      )}
      {mode === "breathing" && (
        <path
          d="M76 22c7 4 8 10 2 15"
          fill="none"
          stroke="#758ec0"
          strokeLinecap="round"
          strokeWidth="3"
        />
      )}
    </svg>
  );
}
