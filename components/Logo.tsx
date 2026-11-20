/** Heartbeat line of the Sauti mark, on a 64×64 grid. */
export const MARK_PULSE = "M7 34 H22 L25.5 27 L30.5 9 L36.5 55 L41.5 29 L44.5 39 L47.5 34 H57";

/** Wide heartbeat line, on a 600×120 grid. */
export const WIDE_PULSE = "M4 60 H192 L212 46 L234 60 L258 8 L290 112 L316 42 L334 72 L350 60 H596";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#c9f44b" />
      <path d={MARK_PULSE} fill="none" stroke="#0a0a0a" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The mark and the word "sauti" in the text colour, so it works on black and on white. */
export function Logo() {
  return (
    <span className="logo">
      <LogoMark className="logo__mark" />
      <span className="logo__word">sauti</span>
    </span>
  );
}
