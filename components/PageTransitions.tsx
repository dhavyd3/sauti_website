"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Animated moves between pages. Clicking a link to another page of the site
 * runs it through the browser's View Transitions: the page you leave fades out
 * and lifts a little, the new one fades in and settles (styles in
 * globals.css, "Page transitions"). The header stays put.
 *
 * Browsers without View Transitions, back and forward, and visitors who ask
 * for reduced motion fall back to app/template.tsx (a short fade-in) or to
 * no animation at all.
 */
export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const finish = useRef<(() => void) | null>(null);

  // The new page has rendered: let the browser capture it and animate.
  useEffect(() => {
    finish.current?.();
    finish.current = null;
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      // Other sites, mailto:, tel: and links within the same page are not page changes.
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      const root = document.documentElement;
      root.classList.add("vt-running");

      const transition = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            finish.current = resolve;
            router.push(url.pathname + url.search + url.hash);
            // Never hold the page frozen if the route does not change as expected.
            setTimeout(resolve, 2000);
          }),
      );
      // A second click while one is running skips the first; that is expected, not an error.
      transition.ready.catch(() => undefined);
      transition.finished.finally(() => root.classList.remove("vt-running"));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
