type Leaf = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  fill: string;
};

const leaves: Leaf[] = [
  { x: 14, y: 146, rotate: -62, scale: 0.62, fill: "#7d8b56" },
  { x: 36, y: 134, rotate: 28, scale: 0.78, fill: "#55633c" },
  { x: 52, y: 140, rotate: -18, scale: 0.55, fill: "#93a168" },
  { x: 74, y: 122, rotate: 48, scale: 0.9, fill: "#4a5834" },
  { x: 96, y: 112, rotate: -42, scale: 0.72, fill: "#6d7c4a" },
  { x: 112, y: 102, rotate: 22, scale: 0.96, fill: "#5c6a42" },
  { x: 132, y: 88, rotate: -36, scale: 0.8, fill: "#87965c" },
  { x: 150, y: 78, rotate: 44, scale: 0.68, fill: "#617046" },
  { x: 168, y: 64, rotate: -48, scale: 0.88, fill: "#516038" },
  { x: 188, y: 52, rotate: 18, scale: 0.64, fill: "#7e8d54" },
  { x: 204, y: 40, rotate: -40, scale: 0.76, fill: "#4e5c36" },
  { x: 222, y: 30, rotate: 32, scale: 0.56, fill: "#73824e" },
  { x: 238, y: 20, rotate: -14, scale: 0.46, fill: "#8b9860" },
];

const fruits = [
  { x: 88, y: 124, fill: "#5a6840" },
  { x: 158, y: 84, fill: "#667448" },
  { x: 210, y: 48, fill: "#54623c" },
];

export function OliveBranch({
  className,
  facing = "rise",
  variant = "bough",
}: {
  className?: string;
  facing?: "rise" | "fall";
  variant?: "bough" | "sprig";
}) {
  const shown = variant === "sprig" ? leaves.slice(1, 8) : leaves;

  return (
    <svg viewBox="0 0 280 168" aria-hidden className={className} fill="none">
      <g transform={facing === "fall" ? "translate(280 0) scale(-1 1)" : undefined}>
        <path d="M6 158C86 128 168 78 274 10" stroke="#3e4b2d" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M6 158C86 128 168 78 274 10" stroke="#748254" strokeWidth="0.9" strokeLinecap="round" />
        {shown.map((leaf) => (
          <g key={`${leaf.x}-${leaf.y}`} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotate}) scale(${leaf.scale})`}>
            <path d="M0 0C24-10 68-8 96 1C68 10 24 11 0 0Z" fill={leaf.fill} />
            <path d="M10 0.3C36-1 64-0.2 84 1" stroke="#2c3820" strokeOpacity="0.28" strokeWidth="1.1" />
          </g>
        ))}
        {variant === "bough"
          ? fruits.map((fruit) => (
              <ellipse key={`${fruit.x}-${fruit.y}`} cx={fruit.x} cy={fruit.y} rx="3.2" ry="4.4" fill={fruit.fill} />
            ))
          : null}
      </g>
    </svg>
  );
}
