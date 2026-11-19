"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-driven sequences (a stage that holds still while its content
 * changes) run in two layouts: side by side on wide screens, stacked on
 * phones and portrait tablets. Phones held sideways are too short to hold a
 * stage, so they get the plain stacked version, as does reduced motion.
 * Keep these in step with `.only-pinned` / `.only-static` in globals.css.
 */
export const MQ_PINNED_WIDE = "(min-width: 992px) and (prefers-reduced-motion: no-preference)";
export const MQ_PINNED_NARROW = "(max-width: 991px) and (min-height: 540px) and (prefers-reduced-motion: no-preference)";
export const PINNED = { wide: MQ_PINNED_WIDE, narrow: MQ_PINNED_NARROW };

/** Lighter scroll effects (parallax, reveals) run whenever motion is welcome. */
export const MQ_MOTION = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
