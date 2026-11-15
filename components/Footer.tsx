"use client";

import Link from "next/link";
import { useRef } from "react";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";
import { Media } from "./Media";
import { SectionMask } from "./SectionMask";
import { footer } from "@/lib/content";
import { gsap, MQ_MOTION, useGSAP } from "@/lib/gsap";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION, () => {
        // The picture drifts while the headline rises into place.
        gsap.fromTo(
          ".site-footer__media",
          { yPercent: -7 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
        gsap.fromTo(
          ".site-footer__title",
          { yPercent: 70, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 55%", end: "bottom bottom", scrub: 0.4 } },
        );
      });
    },
    { scope: root },
  );

  const primaryPhone = site.phones[0];

  return (
    <footer ref={root} className="site-footer" data-header-variant="light">
      <div className="site-footer__media">
        <Media id={footer.media} decorative />
      </div>
      <div className="site-footer__shade" />
      <SectionMask position="top" />

      <div className="wrap site-footer__headline">
        <p className="display t-display site-footer__title">
          <span className="site-footer__first">
            <span>{footer.title[0]}</span>
            <ButtonLink href={footer.cta.href} variant="secondary">
              {footer.cta.label}
            </ButtonLink>
          </span>
          <span style={{ display: "block" }}>{footer.title[1]}</span>
        </p>
      </div>

      <div className="wrap site-footer__bottom">
        <div>
          <Link href="/" aria-label={`${site.name}, home`} style={{ display: "inline-flex" }}>
            <Logo />
          </Link>
          <p className="site-footer__tagline">{site.tagline}</p>
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
        </div>

        <div className="site-footer__icons">
          <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="M3.5 7.5 L12 13.5 L20.5 7.5" />
            </svg>
          </a>
          <a href={`https://wa.me/${primaryPhone.whatsapp}`} aria-label={`WhatsApp ${primaryPhone.display}`} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 20 L5.3 15.6 A8.2 8.2 0 1 1 8.5 18.7 Z" />
              <path d="M9.2 8.6 C9 10.9 13 14.9 15.4 14.8 L16.3 13.6 L14.6 12.6 L13.9 13.3 C12.8 12.9 11.3 11.4 10.8 10.2 L11.5 9.5 L10.5 7.8 Z" />
            </svg>
          </a>
          <a href={`tel:${primaryPhone.tel}`} aria-label={`Call ${primaryPhone.display}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6.5 3.5 H9.5 L11 7.5 L9 9 C10 11.5 12.5 14 15 15 L16.5 13 L20.5 14.5 V17.5 C20.5 19 19.3 20.5 17.5 20.5 C10 20 4 14 3.5 6.5 C3.5 4.7 5 3.5 6.5 3.5 Z" />
            </svg>
          </a>
        </div>

        <div className="site-footer__legal">
          <span>
            © {new Date().getFullYear()} {site.legalName} · Reg. No. {site.regNo} · Kampala, Uganda
          </span>
          <span>{footer.note}</span>
        </div>
      </div>
    </footer>
  );
}
