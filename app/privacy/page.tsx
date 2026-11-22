import type { Metadata } from "next";
import type { ReactNode } from "react";
import { privacy } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "What personal data Sauti collects, why, who sees it, how long we keep it and what your rights are.",
  alternates: { canonical: "/privacy" },
};

const Email = ({ address }: { address: string }) => <a href={`mailto:${address}`}>{address}</a>;

/** One section of the notice: closed by default, opens when its heading is clicked. */
function Fold({ id, title, className, children }: { id: string; title: string; className?: string; children: ReactNode }) {
  return (
    <details className="fold" id={id}>
      <summary>
        <h2 className="t-h3">{title}</h2>
        <span className="fold__icon" aria-hidden="true" />
      </summary>
      <div className={className ? `fold__body ${className}` : "fold__body"}>{children}</div>
    </details>
  );
}

function CollectTable({ label, rows }: { label: string; rows: typeof privacy.collect }) {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label={label}>
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
          {rows.map((row) => (
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
  );
}

function RetentionList({ rows }: { rows: typeof privacy.retention }) {
  return (
    <dl className="rows rows--small">
      {rows.map((row) => (
        <div key={row.data}>
          <dt>{row.data}</dt>
          <dd>{row.period}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function PrivacyPage() {
  const p = privacy;

  return (
    <>
      <div className="wrap page-head">
        <p className="eyebrow">Last updated {p.updated}</p>
        <h1 className="t-hero">{p.title}</h1>
        <p className="legal-summary">
          <strong>In short:</strong> {p.summary} <Email address={site.email} /> or <a href={`tel:${site.dpo.tel}`}>{site.dpo.phone}</a>.
        </p>
        <p className="lead" style={{ maxWidth: 760 }}>
          {p.intro}
        </p>
      </div>

      <div className="section section--flush">
        <div className="wrap legal">
          <Fold id="who-we-are" title="Who we are">
            <dl className="rows">
              {p.who.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.value}
                    {row.email && (
                      <>
                        , <Email address={row.email} />
                      </>
                    )}
                    {row.phone && (
                      <>
                        , <a href={`tel:${row.tel}`}>{row.phone}</a>
                      </>
                    )}
                    {row.after && <>. {row.after}</>}
                  </dd>
                </div>
              ))}
            </dl>
          </Fold>

          <Fold id="what-we-collect" title="What we collect and why">
            <CollectTable label="What we collect and why" rows={p.collect} />
            <p>{p.collectNote}</p>
          </Fold>

          <Fold id="where-data-is-kept" title="Where your data is kept and who sees it" className="prose">
            <ul>
              {p.where.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Fold>

          <Fold id="how-long" title="How long we keep it">
            <RetentionList rows={p.retention} />
          </Fold>

          <Fold id="research" title={p.research.title}>
            <h3 className="fold__sub">What we collect and why</h3>
            <CollectTable label="What we collect for research and why" rows={p.research.collect} />
            <h3 className="fold__sub">How long we keep it</h3>
            <RetentionList rows={p.research.retention} />
          </Fold>

          <Fold id="your-rights" title="Your rights">
            {p.rights.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Fold>

          <Fold id="if-something-goes-wrong" title="If something goes wrong">
            <p>{p.breach}</p>
          </Fold>

          <Fold id="complaints" title="Complaints">
            <p>{p.complaints}</p>
          </Fold>

          <Fold id="changes" title="Changes to this notice">
            <p>{p.changes}</p>
          </Fold>

          <Fold id="short-form" title={p.shortForm.title} className="prose">
            <p>{p.shortForm.intro}</p>
            <blockquote>{p.shortForm.text}</blockquote>
          </Fold>

          <Fold id="this-website" title={p.website.title} className="prose">
            <ul>
              {p.website.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Fold>

          <p className="muted legal__approval">{p.approval}</p>
        </div>
      </div>
    </>
  );
}
