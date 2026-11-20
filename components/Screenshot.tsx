import Image from "next/image";
import type { Shot } from "@/lib/content";

/** A Sauti Command screenshot in a window frame, cropped from the top, with its caption. */
export function Screenshot({ shot, priority = false, className }: { shot: Shot; priority?: boolean; className?: string }) {
  return (
    <figure className={["shot", className].filter(Boolean).join(" ")}>
      <div className="shot__card">
        <div className="shot__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>SAUTI COMMAND</span>
          <small>· {shot.label}</small>
        </div>
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} priority={priority} sizes="(max-width: 767px) 100vw, 520px" />
      </div>
      <figcaption>{shot.caption}</figcaption>
    </figure>
  );
}
