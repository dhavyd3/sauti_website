"use client";

import { memo, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { formatParam, PARAMS, type Kind, type ParamKey } from "@/lib/investor/model";

const KIND: Record<Kind, string> = { d: "data", m: "market", a: "assumption" };

export function KindTag({ kind }: { kind: Kind }) {
  return <span className={`kind kind--${kind}`}>{KIND[kind]}</span>;
}

/** One model input: label with its source tag, current value, slider with a filled track, and a note. */
export const Slider = memo(function Slider({
  k,
  value,
  onChange,
  dimmed = false,
}: {
  k: ParamKey;
  value: number;
  onChange: (k: ParamKey, v: number) => void;
  dimmed?: boolean;
}) {
  const p = PARAMS[k];
  const fill = ((value - p.min) / (p.max - p.min)) * 100;
  return (
    <div className={`ctl${dimmed ? " is-dimmed" : ""}`}>
      <div className="ctl__head">
        <label htmlFor={`i-${k}`}>
          <KindTag kind={p.kind} />
          {p.label}
        </label>
        <output htmlFor={`i-${k}`}>{formatParam(k, value)}</output>
      </div>
      <input
        type="range"
        id={`i-${k}`}
        min={p.min}
        max={p.max}
        step={p.step}
        value={value}
        onChange={(event) => onChange(k, parseFloat(event.target.value))}
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
      {p.note && <small>{p.note}</small>}
    </div>
  );
});

/** Collapsible group of inputs. The open and close glide where the browser supports it (see memo.css). */
export function Group({ title, open = false, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <details className="grp" open={open}>
      <summary>
        {title}
        <span className="grp__icon" aria-hidden="true" />
      </summary>
      <div className="grp__body">{children}</div>
    </details>
  );
}

export type TabDef<T extends string> = { id: T; label: string };

/** Results tabs with an indicator that slides to the selected tab. */
export function Tabs<T extends string>({ tabs, active, onSelect }: { tabs: TabDef<T>[]; active: T; onSelect: (id: T) => void }) {
  const list = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = list.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
      if (el) setBox({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const onKey = (event: React.KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === active);
    const next = event.key === "ArrowRight" ? i + 1 : event.key === "ArrowLeft" ? i - 1 : -2;
    if (next === -2) return;
    event.preventDefault();
    const tab = tabs[(next + tabs.length) % tabs.length];
    onSelect(tab.id);
    list.current?.querySelector<HTMLElement>(`[data-tab="${tab.id}"]`)?.focus();
  };

  return (
    <div className="tabs" role="tablist" aria-label="Model results" ref={list} onKeyDown={onKey}>
      {box && <span className="tabs__ink" style={{ transform: `translateX(${box.left}px)`, width: box.width }} aria-hidden="true" />}
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          id={`t-${t.id}`}
          data-tab={t.id}
          aria-selected={t.id === active}
          aria-controls={`v-${t.id}`}
          tabIndex={t.id === active ? 0 : -1}
          onClick={() => onSelect(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/** A value people may want to paste somewhere: click to copy, with a short confirmation. */
export function CopyChip({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      className={`chip-copy${copied ? " is-copied" : ""}`}
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => setCopied(true),
          () => undefined,
        );
      }}
      aria-label={`Copy ${text}`}
    >
      <span>{text}</span>
      <span className="chip-copy__note" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

/** Key figure tile: label, value, short explanation. */
export function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="kpi">
      <div className="kpi__l">{label}</div>
      <div className="kpi__v">{value}</div>
      <div className="kpi__s">{sub}</div>
    </div>
  );
}
