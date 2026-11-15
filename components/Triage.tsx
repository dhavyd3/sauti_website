/**
 * The three triage classes as plain coloured text. Readings carry meaning in
 * their colour and words only: no pill, no fill, no border.
 */
export function Triage({ className }: { className?: string }) {
  return (
    <p className={["readings", className].filter(Boolean).join(" ")} aria-label="Triage classes: red, yellow, green">
      <span className="reading reading--red">Red</span>
      <span className="reading reading--amber">Yellow</span>
      <span className="reading reading--green">Green</span>
    </p>
  );
}
