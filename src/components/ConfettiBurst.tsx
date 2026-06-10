import type { CSSProperties } from "react";

const pieces = [
  ["#ed766d", -72, -104, -22],
  ["#f3c75b", -48, -126, 18],
  ["#79b8c8", -25, -112, 42],
  ["#aaa2d7", 0, -132, -14],
  ["#ed9a5f", 28, -116, 26],
  ["#5eaaa8", 52, -124, -38],
  ["#ed766d", 74, -96, 16],
  ["#f3c75b", -86, -70, 34],
  ["#79b8c8", 86, -68, -24],
  ["#aaa2d7", -58, -88, -42],
  ["#ed9a5f", 60, -86, 44],
  ["#5eaaa8", -10, -98, 12],
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
