"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { id: "market", label: "Market" },
  { id: "contract", label: "Contracts" },
  { id: "data", label: "Data" },
  { id: "evidence", label: "Evidence" },
  { id: "model", label: "Model" },
  { id: "countries", label: "Countries" },
  { id: "round", label: "Round" },
];

/**
 * The memo's own section bar, held under the site header. It marks the
 * section being read and keeps that link in view on narrow screens. Clicks
 * glide to the section (components/SmoothScroll.tsx).
 */
export function MemoNav() {
  const [active, setActive] = useState<string | null>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => Boolean(el));
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const el of sections) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Keep the current link visible in the bar when it scrolls sideways on a phone.
  useEffect(() => {
    const scroller = bar.current;
    const link = scroller?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!scroller || !link) return;
    const left = link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2;
    scroller.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="memo-nav" aria-label="Memo sections">
      <div className="wrap memo-nav__inner">
        <div className="memo-nav__links" ref={bar}>
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} data-id={l.id} aria-current={active === l.id ? "location" : undefined}>
              {l.label}
            </a>
          ))}
        </div>
        <a className="btn btn--primary btn--plain memo-nav__cta" href="#contact">
          Get in touch
        </a>
      </div>
    </nav>
  );
}
