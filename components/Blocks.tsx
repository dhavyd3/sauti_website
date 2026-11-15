import type { ReactNode } from "react";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";

/** Eyebrow, display heading and optional lead that open a section. */
export function SectionHead({ eyebrow, title, lead, size = "t-xl" }: { eyebrow?: string; title: string[]; lead?: ReactNode; size?: "t-xl" | "t-lg" }) {
  return (
    <Reveal className="section-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`display ${size}`}>
        {title.map((line) => (
          <span key={line} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}

/** Closing call to action. Always on cream so the footer's curved edge meets it cleanly. */
export function Cta({ title, body, cta }: { title: string[]; body: string; cta: { label: string; href: string } }) {
  return (
    <section className="section theme-light cta" data-header-variant="dark">
      <div className="wrap">
        <Reveal className="cta__row">
          <h2 className="display t-xl">
            {title.map((line) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </h2>
          <div>
            <p className="body-lg">{body}</p>
            <ButtonLink href={cta.href} size="lg">
              {cta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
