"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Pinned, scrubbed sequences only run on wide screens when motion is welcome. */
export const MQ_PINNED = "(min-width: 992px) and (prefers-reduced-motion: no-preference)";
/** Lighter scroll effects (parallax, reveals) run whenever motion is welcome. */
export const MQ_MOTION = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
