"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const LINKS = [
  { id: "market", label: "Market" },
  { id: "contract", label: "Contracts" },
  { id: "data", label: "Data" },
  { id: "evidence", label: "Evidence" },
  { id: "model", label: "Model" },
  { id: "countries", label: "Countries" },
  { id: "round", label: "Round" },
];

/** Circumference of the progress ring (r = 13). */
const RING = 2 * Math.PI * 13;

/** The header's slot for page controls (Header.tsx). Not there during server rendering. */
const noSubscribe = () => () => {};
const getSlot = () => document.getElementById("header-extra");
const getServerSlot = () => null;

/**
 * The memo's sections, in two places, so nothing is pinned over the text:
 *
 * - a contents row under the opening, which scrolls away with the page;
 * - while reading, a switcher inside the site header (rendered into its
 *   #header-extra slot): the current section, a ring showing how far through
 *   the memo you are, and a list to jump to any section. It travels with the
 *   header, which hides while you scroll down and returns when you scroll up,
 *   so it never covers anything the header does not already cover.
 *
 * Clicks glide to the section (components/SmoothScroll.tsx). Styles: memo.css.
 */
export function MemoNav() {
  const [active, setActive] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const slot = useSyncExternalStore(noSubscribe, getSlot, getServerSlot);
  const switcher = useRef<HTMLDivElement>(null);

  // Which section is being read, and how far through the memo the reader is.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => Boolean(el));
    const end = document.getElementById("contact");
    if (!sections.length) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = -1;
      sections.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
      const start = sections[0].getBoundingClientRect().top;
      const stop = (end ?? sections[sections.length - 1]).getBoundingClientRect().top;
      const span = stop - start || 1;
      setProgress(Math.round(Math.min(1, Math.max(0, (line - start) / span)) * 100) / 100);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // The list closes on Escape, on a click or tap elsewhere, and once the page scrolls on.
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const onPointer = (event: PointerEvent) => {
      if (!switcher.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      switcher.current?.querySelector("button")?.focus();
    };
    const onScroll = () => Math.abs(window.scrollY - startY) > 48 && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  // After jumping, let go of focus so the header can hide again as you read on.
  const jumped = () => {
    setOpen(false);
    (document.activeElement as HTMLElement | null)?.blur();
  };

  const current = LINKS[active];

  return (
    <>
      <nav className="memo-nav" aria-label="Memo sections">
        <div className="wrap memo-nav__inner">
          <div className="memo-nav__links">
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`}>
                {l.label}
              </a>
            ))}
          </div>
          <a className="btn btn--primary btn--plain memo-nav__cta" href="#contact">
            Get in touch
          </a>
        </div>
      </nav>

      {slot &&
        current &&
        createPortal(
          <div ref={switcher} className={`memo-switch${open ? " is-open" : ""}`}>
            <button
              type="button"
              className="memo-switch__btn"
              aria-expanded={open}
              aria-controls="memo-switch-menu"
              aria-label={`Section ${active + 1} of ${LINKS.length}: ${current.label}. Jump to another section`}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="memo-switch__ring" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="13" className="memo-switch__track" />
                  <circle
                    cx="16"
                    cy="16"
                    r="13"
                    className="memo-switch__fill"
                    strokeDasharray={RING}
                    strokeDashoffset={RING * (1 - progress)}
                  />
                </svg>
                <span>{active + 1}</span>
              </span>
              <span className="memo-switch__label">{current.label}</span>
              <svg className="memo-switch__chev" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 3.75 L5 6.75 L8 3.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div id="memo-switch-menu" className="memo-switch__menu">
              {LINKS.map((l, i) => (
                <a key={l.id} href={`#${l.id}`} aria-current={i === active ? "location" : undefined} onClick={jumped}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </a>
              ))}
              <hr />
              <a href="#contact" onClick={jumped}>
                <span aria-hidden="true">→</span>
                Get in touch
              </a>
            </div>
          </div>,
          slot,
        )}
    </>
  );
}
