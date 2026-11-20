"use client";

import { useEffect, useState } from "react";

let navigatedBefore = false;

/**
 * Wraps each page and is created anew on every navigation. When a move
 * between pages was not animated by a View Transition (back and forward
 * buttons, or browsers without View Transitions), the new page fades in
 * instead of appearing at once. Never on the first page load.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(
    () => typeof window !== "undefined" && navigatedBefore && !document.documentElement.classList.contains("vt-running"),
  );

  useEffect(() => {
    navigatedBefore = true;
  }, []);

  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
