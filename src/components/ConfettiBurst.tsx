import type { CSSProperties } from "react";

const pieces = [
  ["#8ce6ff", -72, -104, -22],
  ["#4db6d6", -48, -126, 18],
  ["#dff8ff", -25, -112, 42],
  ["#668ab0", 0, -132, -14],
  ["#7ceeff", 28, -116, 26],
  ["#215d8c", 52, -124, -38],
  ["#8ce6ff", 74, -96, 16],
  ["#4db6d6", -86, -70, 34],
  ["#dff8ff", 86, -68, -24],
  ["#668ab0", -58, -88, -42],
  ["#7ceeff", 60, -86, 44],
  ["#215d8c", -10, -98, 12],
] as const;

export function ConfettiBurst() {
  return (
    <div className="confetti-burst" aria-hidden="true">
      {pieces.map(([color, x, y, rotation], index) => (
        <i
          key={`${color}-${index}`}
          style={
            {
              "--confetti-color": color,
              "--confetti-x": `${x}px`,
              "--confetti-y": `${y}px`,
              "--confetti-rotation": `${rotation}deg`,
              "--confetti-delay": `${index * 35}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
