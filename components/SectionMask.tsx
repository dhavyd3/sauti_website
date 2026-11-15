/**
 * Curved edge between two sections, drawn for Sauti: rounded corners at the
 * sides, straight slopes and a broad rounded apex. `bottom` sits at the foot of
 * a section and dips down in the middle; `top` sits at the head and rises.
 * `color` is the colour of the neighbouring section it blends into.
 */
const BOTTOM = "M0 0 Q0 24 22 30 L560 170 Q720 212 880 170 L1418 30 Q1440 24 1440 0 V200 H0 Z";
const TOP = "M0 200 Q0 176 22 170 L560 30 Q720 -12 880 30 L1418 170 Q1440 176 1440 200 V0 H0 Z";

export function SectionMask({ position, color = "var(--cream)" }: { position: "top" | "bottom"; color?: string }) {
  return (
    <div className={`section-mask section-mask--${position}`} aria-hidden="true">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ fill: color }}>
        <path d={position === "bottom" ? BOTTOM : TOP} />
      </svg>
    </div>
  );
}
