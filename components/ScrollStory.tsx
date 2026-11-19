"use client";

import { useRef, type CSSProperties } from "react";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { StepProgress, type StepProgressHandle } from "./StepProgress";
import { home } from "@/lib/content";
import { gsap, PINNED, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToY } from "@/lib/scroll";

const { lines, source, chip, panels } = home.gap;

/** Timeline units: one for the headline, one for the picture growing, one per panel. */
const INTRO_UNITS = 2;
const TOTAL_UNITS = INTRO_UNITS + panels.length;

function Headline() {
  return (
    <h2 className="display t-xl">
      <span className="story__line">{lines[0]}</span>
      <span className="story__line">
        <span className="story__chip">
          <Media id={chip} decorative sizes="200px" />
        </span>
        {lines[1]}
      </span>
      <span className="story__line">{lines[2]}</span>
    </h2>
  );
}

/**
 * The gap, told on scroll. A picture chip set into the headline grows into a
 * large card that holds still while three short statements pass beside it
 * (wide screens) or beneath it (phones).
 */
export function ScrollStory() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ticks = useRef<StepProgressHandle>(null);
  const trigger = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        const el = stage.current;
        if (!el || !track.current) return;
        const q = gsap.utils.selector(el);
        const chipEl = q(".story__chip")[0] as HTMLElement;
        const slotEl = q(".story__slot")[0] as HTMLElement;
        const float = q(".story__float")[0];
        const introLines = q(".story__line");
        const panelEls = q(".story__panel");
        const pictures = q(".story__float .media");

        // offset* ignores transforms, so these stay correct mid-animation.
        const box = (node: HTMLElement) => ({ x: node.offsetLeft, y: node.offsetTop, w: node.offsetWidth, h: node.offsetHeight });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: track.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const local = Math.max(0, self.progress * TOTAL_UNITS - INTRO_UNITS);
              const index = Math.min(panels.length - 1, Math.floor(local));
              ticks.current?.set(index, Math.min(1, local - index));
            },
          },
        });
        trigger.current = tl.scrollTrigger ?? null;

        // Headline lines darken one after another; the chip pops into its slot.
        tl.fromTo(introLines.slice(1), { opacity: 0.16 }, { opacity: 1, duration: 0.45, stagger: 0.3 }, 0.05)
          .fromTo(
            float,
            { x: () => box(chipEl).x, y: () => box(chipEl).y, width: () => box(chipEl).w, height: () => box(chipEl).h, scale: 0 },
            { scale: 1, duration: 0.4, ease: "power2.out" },
            0.15,
          )
          // The chip grows into the large card; the headline makes way.
          .to(
            float,
            { x: () => box(slotEl).x, y: () => box(slotEl).y, width: () => box(slotEl).w, height: () => box(slotEl).h, borderRadius: 20, duration: 1, ease: "power2.inOut" },
            1,
          )
          .to(q(".story__intro"), { yPercent: -10, opacity: 0, duration: 0.55, ease: "power1.in" }, 1)
          .fromTo(panelEls[0], { opacity: 0, yPercent: 14 }, { opacity: 1, yPercent: 0, duration: 0.45, ease: "power2.out" }, 1.55)
          .fromTo(q(".story__ticks"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.7);

        // Each further panel: text rolls, the next picture wipes up over the last.
        for (let i = 1; i < panelEls.length; i++) {
          const at = INTRO_UNITS + i - 0.25;
          tl.to(panelEls[i - 1], { opacity: 0, yPercent: -14, duration: 0.22, ease: "power1.in" }, at)
            .fromTo(
              pictures[i],
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power2.inOut" },
              at,
            )
            .fromTo(panelEls[i], { opacity: 0, yPercent: 14 }, { opacity: 1, yPercent: 0, duration: 0.28, ease: "power2.out" }, at + 0.22);
        }
        tl.set({}, {}, TOTAL_UNITS);

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
    scrollToY(st.start + ((INTRO_UNITS + index + 0.5) / TOTAL_UNITS) * (st.end - st.start));
  };

  return (
    <section className="theme-light" data-header-variant="dark">
      {/* Stacked version: reduced motion, and phones held sideways */}
      <div className="only-static story-static wrap">
        <Reveal>
          <Headline />
          <p className="small muted story__source">Source: {source}</p>
        </Reveal>
        <div className="story-static__panels">
          {panels.map((panel) => (
            <Reveal key={panel.body}>
              <div className="story-static__media">
                <Media id={panel.media} sizes="100vw" />
              </div>
              <h3 className="display t-lg">{panel.title.join(" ")}</h3>
              <p className="body-lg">{panel.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Pinned version */}
      <div className="only-pinned">
        <div ref={track} className="pin-track" style={{ "--pin-length": TOTAL_UNITS * 0.9 } as CSSProperties}>
          <div ref={stage} className="pin-stage story__stage">
            <div className="story__intro">
              <div className="wrap">
                <Headline />
                <p className="small muted story__source">Source: {source}</p>
              </div>
            </div>

            <div className="story__panels">
              <div className="wrap story__grid">
                <div className="story__slot" />
                <div className="story__copy">
                  {panels.map((panel) => (
                    <div key={panel.body} className="story__panel">
                      <h3 className="display t-lg">
                        {panel.title.map((line) => (
                          <span key={line} style={{ display: "block" }}>
                            {line}
                          </span>
                        ))}
                      </h3>
                      <p className="body-lg">{panel.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <StepProgress
                ref={ticks}
                className="story__ticks"
                small
                labels={panels.map((panel) => panel.title.join(" "))}
                onSelect={goTo}
              />
            </div>

            <div className="story__float">
              {panels.map((panel) => (
                <Media key={panel.body} id={panel.media} sizes="(min-width: 992px) 50vw, 100vw" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
