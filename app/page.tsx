import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonIcon, ButtonLink } from "@/components/Button";
import { WIDE_PULSE } from "@/components/Logo";
import { NewsGrid } from "@/components/NewsGrid";
import { Rich } from "@/components/Rich";
import { Screenshot } from "@/components/Screenshot";
import { home } from "@/lib/content";
import { getNews } from "@/lib/news";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: site.title },
  alternates: { canonical: "/" },
};

/** What Google reads about the company: name, contact, address, slogan. */
const organisation = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/sauti-logo-full.png`,
  slogan: site.slogan,
  description: "AI dispatch and data layer for emergency care, piloting in Kampala, Uganda.",
  email: site.email,
  telephone: site.phones[0].tel,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address[0]}, ${site.address[1]}`,
    postOfficeBoxNumber: site.address[2].replace("P.O. Box ", ""),
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
  founder: { "@type": "Person", name: home.founder.name },
};

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export default function HomePage() {
  const { hero, different, how, partners, founder, team } = home;
  const news = getNews(4);
  const showFounder = founder.ready || process.env.NODE_ENV === "development";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }} />

      {/* Hero: the demo's light background, a thin line below */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__grid">
          <div className="hero__text">
            <p className="status">
              <i aria-hidden="true" />
              {hero.status}
            </p>
            <h1 className="t-hero" id="hero-title">
              {hero.title} <em>{hero.titleHighlight}</em>
            </h1>
            <p className="hero__lead">{hero.lead}</p>
            <div className="actions">
              <ButtonLink href={hero.primary.href} size="lg">
                {hero.primary.label}
              </ButtonLink>
              <ButtonLink href={hero.secondary.href} variant="outline" size="lg" icon={false}>
                {hero.secondary.label}
              </ButtonLink>
            </div>
            <ul className="proof">
              {hero.proof.map((item) => (
                <li key={item}>
                  <Rich text={item} />
                </li>
              ))}
            </ul>
          </div>
          <figure className="hero__photo">
            <div className="hero__frame">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                width={hero.photo.width}
                height={hero.photo.height}
                priority
                sizes="(max-width: 991px) min(100vw, 560px), 460px"
              />
            </div>
            {hero.photo.credit && <figcaption>{hero.photo.credit}</figcaption>}
          </figure>
        </div>
      </section>

      {/* What makes Sauti different: arranged as in the demo */}
      <section className="section section--line" id="different" aria-labelledby="different-title">
        <div className="wrap">
          <p className="eyebrow">{different.eyebrow}</p>
          <h2 className="t-h2 different__title" id="different-title">
            {different.title}
          </h2>

          <div className="pair">
            <div>
              <span className="fnum">01</span>
              <h3 className="t-h3">{different.languages.title}</h3>
              <p>{different.languages.body}</p>
              <ul className="chips" aria-label="Examples of supported languages">
                {different.languages.examples.map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="fnum">02</span>
              <h3 className="t-h3">{different.chain.title}</h3>
              <p>{different.chain.body}</p>
              <ul className="ticks">
                {different.chain.ticks.map((tick) => (
                  <li key={tick}>{tick}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="feature">
            <div>
              <span className="fnum">03</span>
              <h3 className="t-h3">{different.triage.title}</h3>
              <p>{different.triage.body}</p>
              <ul className="triage" aria-label="Triage levels">
                <li>
                  <i style={{ background: "var(--red)" }} aria-hidden="true" />
                  Red
                </li>
                <li>
                  <i style={{ background: "var(--amber)" }} aria-hidden="true" />
                  Yellow
                </li>
                <li>
                  <i style={{ background: "var(--green)" }} aria-hidden="true" />
                  Green
                </li>
              </ul>
            </div>
            <Screenshot className="feature__shot" shot={different.triage.shot} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section theme-dark" id="how" aria-labelledby="how-title">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">{how.eyebrow}</p>
            <h2 className="t-h2" id="how-title">
              {how.title}
            </h2>
          </div>
          <ol className="steps">
            {how.steps.map((step, i) => (
              <li key={step.name}>
                <span className="steps__n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3">{step.name}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="databand">
            <svg className="databand__pulse" viewBox="0 0 600 120" aria-hidden="true">
              <path d={WIDE_PULSE} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="t-h2-sm">
              {how.data.title} <em>{how.data.titleHighlight}</em>
            </h3>
            <p className="body-lg">{how.data.body}</p>
          </div>
        </div>
      </section>

      {/* Work with us */}
      <section className="section" id="partners" aria-labelledby="partners-title">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">{partners.eyebrow}</p>
            <h2 className="t-h2" id="partners-title">
              {partners.title}
            </h2>
          </div>
          <ul className="paths">
            {partners.paths.map((path) => (
              <li key={path.who}>
                <Link className="path" href={path.href}>
                  <span className="path__who">{path.who}</span>
                  <h3 className="t-h3">{path.title}</h3>
                  <p>{path.body}</p>
                  <span className="btn btn--primary path__go">
                    {path.go}
                    <ButtonIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Founder's note: hidden on the live site until the final text is in (see lib/content.ts) */}
      {showFounder && (
        <section className="section section--tint" id="founder" aria-labelledby="founder-title">
          <div className="wrap founder">
            <div className="founder__photo">
              <Image src={founder.photo} alt={`${founder.name}, ${founder.role} of Sauti Health`} width={800} height={800} sizes="260px" />
            </div>
            <div>
              <p className="eyebrow" id="founder-title">
                {founder.eyebrow}
              </p>
              {!founder.ready && <p className="draft">Draft: hidden on the live site until the final text is in</p>}
              <blockquote>
                {founder.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </blockquote>
              <p className="founder__sig">
                <strong>{founder.name}</strong>
                {founder.role}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      <section className="section" id="team" aria-labelledby="team-title">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">{team.eyebrow}</p>
            <h2 className="t-h2" id="team-title">
              {team.title}
            </h2>
          </div>
          <ul className="team">
            {team.members.map((member) => (
              <li key={member.name}>
                <div className="team__photo">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      width={800}
                      height={800}
                      sizes="(max-width: 767px) 50vw, (max-width: 1100px) 33vw, 230px"
                    />
                  ) : (
                    <span aria-hidden="true">{initials(member.name)}</span>
                  )}
                </div>
                <h3 className="team__name">{member.name}</h3>
                <p className="team__role">{member.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* News */}
      {news.length > 0 && <NewsGrid id="news" items={news} title={home.news.title} viewAll={{ label: home.news.viewAll, href: "/news" }} />}
    </>
  );
}
