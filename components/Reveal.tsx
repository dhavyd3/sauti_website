"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cx } from "@/lib/cx";

type InViewProps = {
  as?: ElementType;
  className?: string;
  /** Seconds to wait after entering the viewport. */
  delay?: number;
  children?: ReactNode;
};

/** Adds `is-in` to its element the first time it scrolls into view. */
export function InView({ as: Tag = "div", className, delay, children }: InViewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Fades and lifts its content into place when it enters the viewport. */
export function Reveal({ className, ...rest }: InViewProps) {
  return <InView className={cx("reveal", className)} {...rest} />;
}
