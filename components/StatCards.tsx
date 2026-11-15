"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Media } from "./Media";
import { gsap } from "@/lib/gsap";
import type { MediaId } from "@/lib/media";

export type Stat = { value: number; decimals: number; unit: string; label: string; media: MediaId };

const format = (value: number, decimals: number) =>
  value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const card = useRef<HTMLDivElement>(null);
  const number = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = card.current;
    const out = number.current;
    if (!el || !out) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    // Count up from zero behind the lime cover, which wipes away on arrival.
    const counter = { value: 0 };
    out.textContent = format(0, stat.decimals);
    let tween: gsap.core.Tween | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.classList.add("is-in");
        tween = gsap.to(counter, {
          value: stat.value,
          duration: 1.6,
          delay: 0.25 + index * 0.12,
          ease: "power2.out",
          onUpdate: () => {
            out.textContent = format(counter.value, stat.decimals);
          },
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      tween?.kill();
      out.textContent = format(stat.value, stat.decimals);
    };
  }, [stat.value, stat.decimals, index]);

  return (
    <div ref={card} className="stat" style={{ "--reveal-delay": `${index * 0.12}s` } as CSSProperties}>
      <Media id={stat.media} decorative sizes="(min-width: 768px) 33vw, 100vw" />
      <div className="stat__shade" />
      <div className="stat__cover" />
      <p className="stat__text">
        <span className="display t-lg" style={{ display: "block" }}>
          <span ref={number}>{format(stat.value, stat.decimals)}</span>
          {stat.unit}
        </span>
        <span className="display t-sm stat__label" style={{ display: "block" }}>
          {stat.label}
        </span>
      </p>
    </div>
  );
}

/** Rounded picture cards carrying one figure each. Every figure is a sourced fact. */
export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="stats">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  );
}
