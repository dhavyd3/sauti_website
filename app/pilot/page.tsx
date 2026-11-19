import type { Metadata } from "next";
import { Cta, SectionHead } from "@/components/Blocks";
import { Hero } from "@/components/Hero";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { ScrubWords } from "@/components/ScrubWords";
import { StatCards } from "@/components/StatCards";
import { pilot } from "@/lib/content";

export const metadata: Metadata = {
  title: "The pilot",
  description: "The Kawempe Corridor Dispatch Study: a feasibility study of community-coordinated emergency dispatch over basic mobile phones in Kampala.",
};

export default function PilotPage() {
  const { hero, setting, facts, design, lessons, details, cta } = pilot;

  return (
    <>
      <Hero {...hero} />

      <section className="section theme-light" data-header-variant="dark">
        <div className="wrap split">
          <div className="split__body">
            <ScrubWords text={setting.title} className="display t-lg" />
            {setting.paragraphs.map((paragraph) => (
              <p key={paragraph} className="body-lg muted">
                {paragraph}
              </p>
            ))}
          </div>
          <Reveal className="split__media reveal-media">
            <Media id={setting.media} sizes="(min-width: 992px) 50vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <section className="section theme-light" data-header-variant="dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <StatCards stats={facts} />
        </div>
      </section>

      <section className="section theme-dark" data-header-variant="light">
        <div className="wrap">
          <SectionHead eyebrow={design.eyebrow} title={design.title} />
          <div className="duo">
            <Reveal>
              <h3 className="eyebrow" style={{ marginBottom: 16 }}>
                Primary objective
              </h3>
              <p className="lead">{design.primary}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="eyebrow" style={{ marginBottom: 6 }}>
                Secondary objectives
              </h3>
              <ul className="ticklist" style={{ gridTemplateColumns: "1fr" }}>
                {design.secondary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal>
            <p className="body-lg muted" style={{ marginTop: 56, maxWidth: "44em" }}>
              {design.limit}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section theme-light" data-header-variant="dark">
        <div className="wrap">
          <SectionHead eyebrow={lessons.eyebrow} title={lessons.title} lead={lessons.intro} />
          <div className="trio">
            {lessons.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <h3 className="display t-sm">{item.title}</h3>
                <p className="body-lg">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-light" data-header-variant="dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead title={[details.title]} size="t-lg" />
          <dl className="rows">
            {details.rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Cta {...cta} />
    </>
  );
}
