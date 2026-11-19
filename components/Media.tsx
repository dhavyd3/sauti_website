import Image from "next/image";
import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { media, type MediaId } from "@/lib/media";

type MediaProps = {
  id: MediaId;
  /** Responsive size hint for the real image, e.g. "(min-width: 992px) 50vw, 100vw". */
  sizes?: string;
  priority?: boolean;
  /** Set when the same picture is already described nearby, or it is pure atmosphere. */
  decorative?: boolean;
  className?: string;
};

/**
 * Fills its positioned parent with a picture slot. While the slot has no file
 * yet it renders a tinted placeholder of the same shape.
 */
export function Media({ id, sizes = "100vw", priority = false, decorative = false, className }: MediaProps) {
  const item = media[id];

  if (item.src) {
    return (
      <div className={cx("media", className)}>
        {/* --focus only takes effect on small screens (see .media img in components.css). */}
        <Image src={item.src} alt={decorative ? "" : item.alt} fill sizes={sizes} priority={priority} style={{ "--focus": item.focus } as CSSProperties} />
      </div>
    );
  }

  return (
    <div
      className={cx("media", "media--placeholder", `media--${item.tone}`, className)}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": item.alt })}
    />
  );
}
