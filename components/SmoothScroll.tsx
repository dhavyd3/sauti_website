"use client";

import { useEffect } from "react";

/** Same feel as the earlier site's scroll (Lenis, 1.1 s, exponential ease-out), without the library. */
const DURATION = 1100;
const ease = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Clicking a link to a section of the page you are on (the header links on
 * the homepage, the section links on /investors) glides there instead of
 * jumping. Normal page scrolling is left alone. Visitors who ask for reduced
 * motion get the jump.
 */
export function SmoothScroll() {
  useEffect(() => {
    let frame = 0;
    const stop = () => cancelAnimationFrame(frame);

    const glide = (to: number) => {
      stop();
      const from = window.scrollY;
      const distance = to - from;
      if (Math.abs(distance) < 2) return;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        window.scrollTo(0, from + distance * ease(t));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return;

      let top = 0;
      if (url.hash) {
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (!target) return;
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        top = target.getBoundingClientRect().top + window.scrollY - margin;
      } else if (link.getAttribute("href") !== url.pathname) {
        return;
      }

      event.preventDefault();
      if (url.hash !== window.location.hash) window.history.pushState(window.history.state, "", url.hash || url.pathname);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const to = Math.max(0, Math.min(top, max));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) window.scrollTo(0, to);
      else glide(to);
    };

    // A wheel, touch or key press takes the page back from the glide.
    const interrupt = () => stop();

    document.addEventListener("click", onClick, true);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", interrupt);
    return () => {
      stop();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", interrupt);
    };
  }, []);

  return null;
}
