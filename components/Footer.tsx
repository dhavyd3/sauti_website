import Link from "next/link";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";
import { footer } from "@/lib/content";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const [uganda] = site.phones;

  return (
    <footer className="site-footer">
      {/* The slogan with the ways to reach us, as in the demo's contact section */}
      <div className="wrap site-footer__contact">
        <div>
          <p className="site-footer__title">
            {footer.slogan} <em>{footer.sloganHighlight}</em>
          </p>
          <p className="site-footer__lead">{footer.lead}</p>
          <div className="actions">
            <ButtonLink href={footer.cta.href} variant="secondary" size="lg">
              {footer.cta.label}
            </ButtonLink>
            <ButtonLink href={`https://wa.me/${uganda.whatsapp}`} variant="outline" size="lg">
              WhatsApp
            </ButtonLink>
          </div>
        </div>

        <dl className="site-footer__list">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          {site.phones.map((phone) => (
            <div key={phone.tel}>
              <dt>Phone · WhatsApp · {phone.label}</dt>
              <dd>
                <a href={`tel:${phone.tel}`}>{phone.display}</a>
              </dd>
            </div>
          ))}
          <div>
            <dt>Registered office</dt>
            <dd>{site.address.join(", ")}</dd>
          </div>
        </dl>
      </div>

      <div className="wrap site-footer__bottom">
        <div>
          <Link href="/" aria-label={`${site.name}, home`} style={{ display: "inline-flex" }}>
            <Logo />
          </Link>
          <p className="site-footer__tagline">{site.tagline}</p>
        </div>
        <nav className="site-footer__cols" aria-label="Footer">
          {footerNav.map((column, i) => (
            <ul key={i}>
              {column.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
        <div className="site-footer__legal">
          © {new Date().getFullYear()} {site.legalName} · Reg. No. {site.regNo} · Kampala, Uganda
        </div>
      </div>
    </footer>
  );
}
