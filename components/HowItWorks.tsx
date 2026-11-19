"use client";

import { useRef, type CSSProperties } from "react";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { StepProgress, type StepProgressHandle } from "./StepProgress";
import { Triage } from "./Triage";
import { gsap, PINNED, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { MediaId } from "@/lib/media";
import { scrollToY } from "@/lib/scroll";

export type HowStep = { name: string; body: string; media: MediaId; triage?: boolean };

type Props = { title: string[]; steps: HowStep[] };

/**
 * Pinned walk-through. On wide screens the title holds on the left, each
 * step's name and text on the right, and in the centre a lime card slides up
 * with the step's picture riding over it. On phones the same pieces stack:
 * title on top, card in the middle, text beneath. The progress control sits
 * bottom-left, or beside the card on phones.
 */
export function HowItWorks({ title, steps }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef<StepProgressHandle>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const count = steps.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        const el = stage.current;
        if (!el || !track.current) return;
        const q = gsap.utils.selector(el);
        const cards = q(".how__card");
        const covers = q(".how__cover");
        const pictures = q(".how__media");
        const texts = q(".how__text");
        const vh = () => window.innerHeight;

        // Arrival: the first card rides in while the section scrolls into place.
        // The text fades in as a block (.how__texts) so this timeline never
        // touches the step texts the held timeline below swaps; two scrubbed
        // timelines on one element fight after a fast flick.
        gsap.set(texts[0], { opacity: 1 });
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: track.current, start: "top 92%", end: "top top", scrub: 0.4, invalidateOnRefresh: true },
          })
          .fromTo(q(".how__title"), { opacity: 0.22 }, { opacity: 1, duration: 0.5 }, 0.15)
          .fromTo(covers[0], { y: () => vh() * 0.7 }, { y: 0, duration: 0.7 }, 0)
          .fromTo(pictures[0], { y: () => vh() * 0.95 }, { y: 0, duration: 0.72 }, 0.28)
          .fromTo(q(".how__texts"), { opacity: 0, yPercent: 12 }, { opacity: 1, yPercent: 0, duration: 0.4 }, 0.6);

        // Held: one unit of scroll per step, changes centred on each boundary.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: track.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const local = self.progress * count;
              const index = Math.min(count - 1, Math.floor(local));
              progress.current?.set(index, Math.min(1, local - index));
            },
          },
        });
        trigger.current = tl.scrollTrigger ?? null;

        for (let i = 1; i < count; i++) {
          const at = i - 0.25;
          tl.to(cards[i - 1], { y: () => -vh(), duration: 0.5, ease: "power1.in" }, at)
            .to(texts[i - 1], { opacity: 0, yPercent: -12, duration: 0.2 }, at)
            .fromTo(covers[i], { y: () => vh() }, { y: 0, duration: 0.4, ease: "power2.out" }, at + 0.05)
            .fromTo(pictures[i], { y: () => vh() }, { y: 0, duration: 0.45, ease: "power2.out" }, at + 0.2)
            .fromTo(texts[i], { opacity: 0, yPercent: 12 }, { opacity: 1, yPercent: 0, duration: 0.25 }, at + 0.3);
        }
        tl.set({}, {}, count);

        return () => {
          trigger.current = null;
        };
      });
    },
    { scope: stage, dependencies: [count] },
  );

  const goTo = (index: number) => {
    const st = trigger.current;
    if (!st) return;
    scrollToY(st.start + ((index + 0.5) / count) * (st.end - st.start));
  };

  return (
    <section className="theme-light" data-header-variant="dark">
      {/* Stacked version: reduced motion, and phones held sideways */}
      <div className="only-static how-static wrap">
        <Reveal as="h2" className="display t-xl">
          {title.join(" ")}
        </Reveal>
        <ol className="how-static__steps">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.name} delay={(i % 2) * 0.08}>
              <div className="how-static__media">
                <Media id={step.media} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
              <h3 className="display t-md">{step.name}</h3>
              <p className="body-lg muted">{step.body}</p>
              {step.triage && <Triage />}
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Pinned version */}
      <div className="only-pinned">
        <div ref={track} className="pin-track" style={{ "--pin-length": count * 0.95 } as CSSProperties}>
          <div ref={stage} className="pin-stage how__stage">
            <div className="wrap how__grid">
              <h2 className="display t-lg how__title">
                {title.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </h2>

              <div className="how__cards">
                {steps.map((step) => (
                  <div key={step.name} className="how__card">
                    <div className="how__cover" />
                    <div className="how__media">
                      <Media id={step.media} sizes="(min-width: 992px) 34vw, 90vw" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="how__texts">
                {steps.map((step) => (
                  <div key={step.name} className="how__text">
                    <h3 className="display t-lg">{step.name}</h3>
                    <p className="body-lg">{step.body}</p>
                    {step.triage && <Triage />}
                  </div>
                ))}
              </div>
            </div>

            <StepProgress ref={progress} className="how__progress" labels={steps.map((step) => step.name)} onSelect={goTo} />
          </div>
        </div>
      </div>
    </section>
  );
}
