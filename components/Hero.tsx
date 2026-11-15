"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ButtonLink } from "./Button";
import { Media } from "./Media";
import { SectionMask } from "./SectionMask";
import { cx } from "@/lib/cx";
import { gsap, MQ_MOTION, useGSAP } from "@/lib/gsap";
import type { MediaId } from "@/lib/media";

type HeroProps = {
  title: string[];
  lead: string;
  media: MediaId;
  /** A live reading shown above the headline, e.g. where the pilot runs. */
  status?: string;
  eyebrow?: string;
  cta?: { label: string; href: string };
  short?: boolean;
  /** Colour of the section that follows, for the curved edge. */
  nextColor?: string;
};

/** Full-bleed opening: picture, display headline, short lead, one button, curved lower edge. */
export function Hero({ title, lead, media, status, eyebrow, cta, short, nextColor }: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION, () => {
        const scrollTrigger = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero__media", { yPercent: 7, ease: "none", scrollTrigger });
        gsap.to(".hero__inner", { y: -110, ease: "none", scrollTrigger });
      });
    },
    { scope: root },
  );

  const delay = (seconds: number) => ({ "--reveal-delay": `${seconds}s` }) as CSSProperties;

  return (
    <section ref={root} className={cx("hero", short && "hero--short", ready && "is-in")} data-header-variant="light">
      <div className="hero__media">
        <Media id={media} priority />
      </div>
      <div className="hero__shade" />

      <div className="wrap hero__inner">
        {status && (
          <p className="hero__status reveal" style={delay(0.85)}>
            <span className="reading reading--live">{status}</span>
          </p>
        )}
        {eyebrow && (
          <p className="eyebrow hero__eyebrow reveal" style={delay(0.85)}>
            {eyebrow}
          </p>
        )}
        <h1 className="display t-display">
          {title.map((line, i) => (
            <span key={line} className="rise-line" style={delay(0.9 + i * 0.12)}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <div className="hero__foot reveal" style={delay(1.25)}>
          <p className="lead">{lead}</p>
          {cta && (
            <ButtonLink href={cta.href} variant="secondary">
              {cta.label}
            </ButtonLink>
          )}
        </div>
      </div>

      <SectionMask position="bottom" color={nextColor} />
    </section>
  );
}
