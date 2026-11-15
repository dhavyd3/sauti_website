import type { Metadata } from "next";
import { privacy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "What personal data Sauti collects, why, who sees it, how long we keep it and what your rights are.",
};

const sections = [
  { id: "who-we-are", label: "Who we are" },
  { id: "what-we-collect", label: "What we collect and why" },
  { id: "where-data-is-kept", label: "Where your data is kept" },
  { id: "how-long", label: "How long we keep it" },
  { id: "your-rights", label: "Your rights" },
  { id: "if-something-goes-wrong", label: "If something goes wrong" },
  { id: "complaints", label: "Complaints" },
  { id: "changes", label: "Changes to this notice" },
  { id: "short-form", label: "Short form for callers" },
  { id: "this-website", label: "This website" },
];

export default function PrivacyPage() {
  const p = privacy;

  return (
    <div className="theme-light" data-header-variant="dark">
      <div className="wrap page-intro">
        <p className="eyebrow">Dated {p.date}</p>
        <h1 className="display t-display">{p.title.join(" ")}</h1>
        <p className="lead" style={{ maxWidth: "44em", fontWeight: 400 }}>
          {p.intro}
        </p>
      </div>

      <div className="section" style={{ paddingTop: 32 }}>
        <div className="wrap legal">
          <nav className="legal__nav" aria-label="On this page">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>

          <div className="legal__body">
            <section id="who-we-are">
              <h2 className="display t-md">Who we are</h2>
              <dl className="rows">
                {p.who.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="what-we-collect">
              <h2 className="display t-md">What we collect and why</h2>
              <div className="table-wrap" tabIndex={0} role="region" aria-label="What we collect and why">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Who</th>
                      <th scope="col">What we collect</th>
                      <th scope="col">Why</th>
                      <th scope="col">Our legal basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.collect.map((row) => (
                      <tr key={row.who}>
                        <th scope="row">{row.who}</th>
                        <td>{row.what}</td>
                        <td>{row.why}</td>
                        <td>{row.basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="body-lg" style={{ marginTop: 24 }}>
                {p.collectNote}
              </p>
            </section>

            <section id="where-data-is-kept" className="prose">
              <h2 className="display t-md">Where your data is kept and who sees it</h2>
              <ul className="body-lg">
                {p.where.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="how-long">
              <h2 className="display t-md">How long we keep it</h2>
              <dl className="rows">
                {p.retention.map((row) => (
                  <div key={row.data}>
                    <dt>{row.data}</dt>
                    <dd>{row.period}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="your-rights" className="prose">
              <h2 className="display t-md">Your rights</h2>
              {p.rights.map((paragraph) => (
                <p key={paragraph} className="body-lg">
                  {paragraph}
                </p>
              ))}
            </section>

            <section id="if-something-goes-wrong">
              <h2 className="display t-md">If something goes wrong</h2>
              <p className="body-lg">{p.breach}</p>
            </section>

            <section id="complaints">
              <h2 className="display t-md">Complaints</h2>
              <p className="body-lg">{p.complaints}</p>
            </section>

            <section id="changes">
              <h2 className="display t-md">Changes to this notice</h2>
              <p className="body-lg">{p.changes}</p>
            </section>

            <section id="short-form" className="prose">
              <h2 className="display t-md">Short form for the USSD and IVR line</h2>
              <p className="body-lg">{p.shortForm.intro}</p>
              <blockquote>{p.shortForm.text}</blockquote>
              <p className="muted">{p.approval}</p>
            </section>

            <section id="this-website" className="prose">
              <h2 className="display t-md">{p.website.title}</h2>
              <ul className="body-lg">
                {p.website.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
