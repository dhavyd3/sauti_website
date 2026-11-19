import type { Metadata } from "next";
import Image from "next/image";
import { Cta, SectionHead } from "@/components/Blocks";
import { Hero } from "@/components/Hero";
import { MARK_PULSE } from "@/components/Logo";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { ScrubWords } from "@/components/ScrubWords";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Sauti builds health data infrastructure for places that have never had any, starting with emergency response in Kampala.",
};

export default function AboutPage() {
  const { hero, story, why, team, cta } = about;

  return (
    <>
      <Hero {...hero} />

      <section className="section theme-light" data-header-variant="dark">
        <div className="wrap split">
          <Reveal className="split__media reveal-media">
            <Media id={story.media} sizes="(min-width: 992px) 50vw, 100vw" />
          </Reveal>
          <div className="split__body">
            <ScrubWords text={story.title} className="display t-lg" />
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="body-lg muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-dark" data-header-variant="light">
        <div className="wrap">
          <SectionHead eyebrow={why.eyebrow} title={why.title} />
          <div className="trio">
            {why.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08}>
                <h3 className="display t-sm">{point.title}</h3>
                <p className="body-lg">{point.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team: heading left, intro right, then square portraits with name and role. */}
      <section className="section theme-light" data-header-variant="dark" id="team">
        <div className="wrap">
          <Reveal className="team-head">
            <h2 className="display t-lg">
              {team.title.map((line) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="lead">{team.intro}</p>
          </Reveal>

          <ul className="team">
            {team.members.map((member, i) => (
              <Reveal as="li" key={member.name} delay={(i % 4) * 0.06}>
                {member.photo ? (
                  <div className="team__photo">
                    <Image src={member.photo} alt={`Portrait of ${member.name}`} fill sizes="(min-width: 860px) 266px, 50vw" />
                  </div>
                ) : (
                  // Outlined square that holds the place until this person's photo is added.
                  <div className="team__photo team__photo--empty" aria-hidden="true">
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d={MARK_PULSE} />
                    </svg>
                  </div>
                )}
                <p className="team__name">{member.name}</p>
                <p className="team__role">{member.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Cta {...cta} />
    </>
  );
}
