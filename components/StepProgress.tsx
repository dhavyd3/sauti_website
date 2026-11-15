"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { cx } from "@/lib/cx";

export type StepProgressHandle = {
  /** Mark step `index` active and fill it to `progress` (0 to 1). */
  set: (index: number, progress: number) => void;
};

type Props = {
  labels: string[];
  onSelect?: (index: number) => void;
  /** Fill with Sauti lime instead of the text colour (for dark sections). */
  accent?: boolean;
  small?: boolean;
  className?: string;
};

/**
 * The scroll-progress control: one narrow bar per step. The active bar grows
 * and fills as you scroll; each bar is a button that jumps to its step.
 * Updates go straight to the DOM so scrolling never re-renders React.
 */
export const StepProgress = forwardRef<StepProgressHandle, Props>(function StepProgress(
  { labels, onSelect, accent, small, className },
  ref,
) {
  const root = useRef<HTMLDivElement>(null);
  const current = useRef(0);

  useImperativeHandle(
    ref,
    () => ({
      set(index, progress) {
        const el = root.current;
        if (!el) return;
        if (index !== current.current) {
          current.current = index;
          Array.from(el.children).forEach((bar, i) => {
            bar.classList.toggle("is-active", i === index);
            bar.classList.toggle("is-past", i < index);
            if (i === index) bar.setAttribute("aria-current", "step");
            else bar.removeAttribute("aria-current");
          });
        }
        el.style.setProperty("--progress", progress.toFixed(3));
      },
    }),
    [],
  );

  return (
    <div ref={root} className={cx("steps", accent && "steps--accent", small && "steps--sm", className)} role="group" aria-label="Steps in this section">
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          className={cx("steps__bar", i === 0 && "is-active")}
          aria-label={`Go to: ${label}`}
          aria-current={i === 0 ? "step" : undefined}
          onClick={() => onSelect?.(i)}
        >
          <span className="steps__fill" />
        </button>
      ))}
    </div>
  );
});
