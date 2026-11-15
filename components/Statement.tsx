"use client";

import { useRef } from "react";
import { WIDE_PULSE } from "./Logo";
import { Media } from "./Media";
import { home } from "@/lib/content";
import { gsap, MQ_MOTION, useGSAP } from "@/lib/gsap";

/** A full-width picture with one statement and the heartbeat line drawn across it. */
export function Statement() {
  const root = useRef<HTMLElement>(null);
  const { quote, note, media } = home.statement;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION, () => {
        const path = root.current?.querySelector<SVGPathElement>(".statement__pulse path");
        if (!path) return;
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "center 45%", scrub: 0.6 } },
        );
        gsap.fromTo(
          ".statement__media",
          { yPercent: -6, scale: 1.12 },
          { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="statement theme-light" data-header-variant="dark">
      <div className="statement__card" data-header-variant="light">
        <div className="statement__media">
          <Media id={media} decorative />
        </div>
        <div className="statement__shade" />
        <svg className="statement__pulse" viewBox="0 0 600 120" aria-hidden="true">
          <path d={WIDE_PULSE} />
        </svg>
        <div className="statement__text">
          <p className="statement__quote">{quote}</p>
          <p className="statement__note">{note}</p>
        </div>
      </div>
    </section>
  );
}
