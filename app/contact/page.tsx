import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Sauti about emergency care, community health or health data. Email, phone, WhatsApp and our Kampala office.",
};

export default function ContactPage() {
  const { hero, intro, emergencyNote } = contact;

  return (
    <div className="theme-light" data-header-variant="dark">
      <div className="wrap page-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="display t-display">{hero.title.join(" ")}</h1>
        <p className="lead">{hero.lead}</p>
      </div>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap contact">
          <Reveal className="contact__details">
            <p className="body-lg muted">{intro}</p>
            <div>
              <h2>Email</h2>
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
            {site.phones.map((phone) => (
              <div key={phone.tel}>
                <h2>Phone and WhatsApp · {phone.label}</h2>
                <a className="link" href={`tel:${phone.tel}`}>
                  {phone.display}
                </a>
              </div>
            ))}
            <div>
              <h2>Registered office</h2>
              <address>
                {site.address.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
            <p className="small muted" style={{ marginTop: 28, maxWidth: "40em" }}>
              {emergencyNote}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
