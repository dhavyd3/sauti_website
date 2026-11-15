"use client";

import { useRef, type CSSProperties } from "react";
import { ButtonLink } from "./Button";
import { Media } from "./Media";
import { InView } from "./Reveal";
import { gsap, MQ_MOTION, useGSAP } from "@/lib/gsap";
import type { MediaId } from "@/lib/media";

type Props = { title: string[]; body: string; cta: { label: string; href: string }; media: MediaId };

/** Full-bleed picture with a headline bottom-left and a button on its baseline. */
export function MidHero({ title, body, cta, media }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION, () => {
        gsap.fromTo(
          ".midhero__media",
          { yPercent: -7 },
          { yPercent: 7, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="midhero" data-header-variant="light">
      <div className="midhero__media">
        <Media id={media} decorative />
      </div>
      <div className="midhero__shade" />
      <InView className="wrap midhero__inner">
        <div className="midhero__row">
          <h2 className="display t-display">
            {title.map((line, i) => (
              <span key={line} className="rise-line" style={{ "--reveal-delay": `${i * 0.1}s` } as CSSProperties}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
          <ButtonLink href={cta.href} variant="secondary">
            {cta.label}
          </ButtonLink>
        </div>
        <p className="body-lg">{body}</p>
      </InView>
    </section>
  );
}
