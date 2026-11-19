"use client";

import { useRef, type CSSProperties } from "react";
import { WIDE_PULSE } from "./Logo";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { StepProgress, type StepProgressHandle } from "./StepProgress";
import { home } from "@/lib/content";
import { gsap, PINNED, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToY } from "@/lib/scroll";

const { eyebrow, steps } = home.approach;
const COUNT = steps.length;

/**
 * Pinned dark section. The headline (top-left), the caption beside the
 * progress control (bottom-left) and the picture all change per step. The
 * picture sits in the rounded square of the Sauti mark with the heartbeat
 * line drawn through it, exactly as in the logo. On phones the picture sits
 * between the headline and the caption.
 */
export function Showcase() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef<StepProgressHandle>(null);
  const trigger = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(PINNED, (context) => {
        const el = stage.current;
        if (!el || !track.current) return;
        const { narrow } = context.conditions ?? {};
        const q = gsap.utils.selector(el);
        const heads = q(".show__head");
        const caps = q(".show__cap");
        const pictures = q(".show__tile .media");
        const pulse = el.querySelector<SVGPathElement>(".show__pulse path");
        if (!pulse) return;
        const length = pulse.getTotalLength();

        gsap.set(pulse, { strokeDasharray: length, strokeDashoffset: length });
        gsap.set([heads[0], caps[0]], { opacity: 1 });

        // Phones: the tile sits mid-screen, so it rises and settles as the
        // section scrolls into place.
        if (narrow) {
          gsap.fromTo(
            q(".show__tile"),
            { scale: 0.86, yPercent: 8 },
            { scale: 1, yPercent: 0, ease: "none", scrollTrigger: { trigger: track.current, start: "top 85%", end: "top top", scrub: 0.4 } },
          );
        }

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: track.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const local = self.progress * COUNT;
              const index = Math.min(COUNT - 1, Math.floor(local));
              progress.current?.set(index, Math.min(1, local - index));
            },
          },
        });
        trigger.current = tl.scrollTrigger ?? null;

        tl.to(pulse, { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" }, 0.05);

        for (let i = 1; i < COUNT; i++) {
          const at = i - 0.25;
          tl.to([heads[i - 1], caps[i - 1]], { opacity: 0, yPercent: -18, duration: 0.2, ease: "power1.in" }, at)
            .fromTo(
              pictures[i],
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power2.inOut" },
              at,
            )
            .fromTo(
              pulse,
              { strokeDashoffset: length },
              { strokeDashoffset: 0, duration: 0.5, ease: "power2.out", immediateRender: false },
              at + 0.1,
            )
            .fromTo([heads[i], caps[i]], { opacity: 0, yPercent: 18 }, { opacity: 1, yPercent: 0, duration: 0.28, ease: "power2.out" }, at + 0.22);
        }
        tl.set({}, {}, COUNT);

        return () => {
          trigger.current = null;
        };
      });
    },
    { scope: stage },
  );

  const goTo = (index: number) => {
    const st = trigger.current;
    if (!st) return;
    scrollToY(st.start + ((index + 0.5) / COUNT) * (st.end - st.start));
  };

  return (
    <section className="theme-dark" data-header-variant="light">
      {/* Stacked version: reduced motion, and phones held sideways */}
      <div className="only-static show-static wrap">
        <p className="eyebrow">{eyebrow}</p>
        <div className="show-static__steps">
          {steps.map((step, i) => (
            <Reveal key={step.body} delay={(i % 2) * 0.08}>
              <h3 className="display t-md">{step.title.join(" ")}</h3>
              <p className="body-lg muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Pinned version */}
      <div className="only-pinned">
        <div ref={track} className="pin-track" style={{ "--pin-length": COUNT * 0.95 } as CSSProperties}>
          <div ref={stage} className="pin-stage show__stage">
            <div className="wrap show__grid">
              <div className="show__left">
                <div className="show__top">
                  <h2 className="eyebrow">{eyebrow}</h2>
                  <div className="show__heads display t-lg">
                    {steps.map((step) => (
                      <h3 key={step.body} className="show__head">
                        {step.title.map((line) => (
                          <span key={line} style={{ display: "block" }}>
                            {line}
                          </span>
                        ))}
                      </h3>
                    ))}
                  </div>
                </div>

                <div className="show__foot">
                  <StepProgress ref={progress} accent labels={steps.map((step) => step.title.join(" "))} onSelect={goTo} />
                  <div className="show__caps">
                    {steps.map((step) => (
                      <p key={step.body} className="show__cap body-lg">
                        {step.body}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="show__figure">
                <div className="show__tile">
                  {steps.map((step) => (
                    <Media key={step.body} id={step.media} sizes="(min-width: 992px) 50vw, 90vw" />
                  ))}
                </div>
                <svg className="show__pulse" viewBox="0 0 600 120" aria-hidden="true">
                  <path d={WIDE_PULSE} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
