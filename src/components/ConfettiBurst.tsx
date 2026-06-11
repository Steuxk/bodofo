import type { CSSProperties } from "react";

const pieces = [
  ["#ff8a5b", -72, -104, -22],
  ["#ffd978", -48, -126, 18],
  ["#fff5ec", -25, -112, 42],
  ["#ffb87d", 0, -132, -14],
  ["#ffe9b3", 28, -116, 26],
  ["#ff9f68", 52, -124, -38],
  ["#ff8a5b", 74, -96, 16],
  ["#ffd978", -86, -70, 34],
  ["#fff5ec", 86, -68, -24],
  ["#ffb87d", -58, -88, -42],
  ["#ffe9b3", 60, -86, 44],
  ["#ff9f68", -10, -98, 12],
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
