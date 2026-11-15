import type { Metadata } from "next";
import { Cta, SectionHead } from "@/components/Blocks";
import { ButtonLink } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { ScrubWords } from "@/components/ScrubWords";
import { howItWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "How it works",
  description: "From a call on any basic phone to triage, community responders and handover at a health facility, and the record each call leaves behind.",
};

export default function HowItWorksPage() {
  const { hero, principle, journey, responders, data } = howItWorks;

  return (
    <>
      <Hero {...hero} />

      <section className="section theme-light" data-header-variant="dark">
        <div className="wrap duo">
          <ScrubWords text={principle.title} className="display t-lg" />
          <div className="prose">
            {principle.paragraphs.map((paragraph) => (
              <p key={paragraph} className="body-lg muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks title={journey.title} steps={journey.steps} />

      <section className="section theme-dark" data-header-variant="light">
        <div className="wrap split">
          <Reveal className="split__media">
            <Media id={responders.media} sizes="(min-width: 992px) 50vw, 100vw" />
          </Reveal>
          <div>
            <SectionHead eyebrow={responders.eyebrow} title={responders.title} size="t-lg" />
            <div className="duo">
              {responders.roles.map((role, i) => (
                <Reveal key={role.name} delay={i * 0.08}>
                  <h3 className="display t-sm">{role.name}</h3>
                  <p className="body-lg muted" style={{ marginTop: 12 }}>
                    {role.body}
                  </p>
                </Reveal>
              ))}
            </div>
            <p className="body-lg" style={{ marginTop: 36 }}>
              {responders.note}
            </p>
          </div>
        </div>
      </section>

      <section className="section theme-light" data-header-variant="dark" id="data">
        <div className="wrap">
          <SectionHead eyebrow={data.eyebrow} title={data.title} lead={data.intro} />
          <Reveal>
            <ul className="ticklist">
              {data.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p className="body-lg muted" style={{ margin: "36px 0 24px", maxWidth: "36em" }}>
              {data.note}
            </p>
            <ButtonLink href={data.cta.href} variant="outline">
              {data.cta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <Cta
        title={["Want to see", "it in practice?"]}
        body="We are happy to walk researchers, health systems and partners through the service and the pilot."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
    </>
  );
}
