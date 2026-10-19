export function Ornament() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-6 inset-e-0 hidden w-36 text-brass opacity-80 sm:block"
    >
      <svg viewBox="0 0 120 88" fill="none" className="w-full">
        <path d="M12 84 V46 A48 48 0 0 1 108 46 V84" stroke="currentColor" strokeWidth="1.25" />
      </svg>
      <svg viewBox="0 0 64 88" className="absolute top-6 inset-e-2 w-10 text-olive" fill="currentColor">
        <path d="M32 80 C30 52 34 28 32 8" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <ellipse cx="22" cy="30" rx="11" ry="5" transform="rotate(-35 22 30)" />
        <ellipse cx="44" cy="42" rx="11" ry="5" transform="rotate(32 44 42)" />
        <ellipse cx="24" cy="56" rx="10" ry="4.5" transform="rotate(-28 24 56)" />
      </svg>
      <svg viewBox="0 0 24 24" fill="none" className="absolute top-2 inset-s-1 w-4 text-brass">
        <path d="M12 2 L22 12 L12 22 L2 12 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M12 7 L17 12 L12 17 L7 12 Z" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
