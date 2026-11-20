import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sauti Health about AI emergency dispatch: governments and health systems, employers, investors, researchers and press. We usually reply within two working days.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <div className="wrap page-head">
        <p className="eyebrow">{contact.eyebrow}</p>
        <h1 className="t-hero">{contact.title}</h1>
        <p className="lead">{contact.lead}</p>
      </div>

      <section className="section section--flush">
        <div className="wrap contact">
          <div className="contact__form">
            <ContactForm />
          </div>

          <aside className="contact__details" aria-label="Other ways to reach us">
            <dl className="details">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              {site.phones.map((phone) => (
                <div key={phone.tel}>
                  <dt>Phone and WhatsApp · {phone.label}</dt>
                  <dd>
                    <a href={`tel:${phone.tel}`}>{phone.display}</a>
                    <a className="details__wa" href={`https://wa.me/${phone.whatsapp}`} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </dd>
                </div>
              ))}
              <div>
                <dt>Registered office</dt>
                <dd>
                  <address>
                    {site.address.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
