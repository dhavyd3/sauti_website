"use client";

import { useRef, type ElementType } from "react";
import { cx } from "@/lib/cx";
import { gsap, MQ_MOTION, useGSAP } from "@/lib/gsap";

type Props = { text: string; as?: ElementType; className?: string };

/** A headline whose words go from faint to full strength as it scrolls up the viewport. */
export function ScrubWords({ text, as: Tag = "h2", className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION, () => {
        gsap.fromTo(
          "span",
          { opacity: 0.2 },
          { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: ref.current, start: "top 88%", end: "top 38%", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={cx("scrub-words", className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
