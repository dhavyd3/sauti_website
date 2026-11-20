import type { CSSProperties } from "react";
import { GIVEWELL, quantile, usd, type ModelResult } from "@/lib/investor/model";

/*
 * The memo's four charts, drawn as SVG in the site's colours. Geometry is set
 * both as attributes and as CSS, so in browsers that animate SVG geometry the
 * bars and the line glide to new values as the sliders move; elsewhere they
 * simply redraw.
 */

type Box = { x: number; y: number; width: number; height: number };

function Bar({ x, y, width, height, className }: Box & { className: string }) {
  return <rect className={className} x={x} y={y} width={width} height={height} style={{ x, y, width, height } as CSSProperties} />;
}

const nice = (v: number) => {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
};

/** Revenue by payer as stacked bars, operating result as a line, years 1 to 10. */
export function RevenueChart({ r }: { r: ModelResult }) {
  const W = 780, H = 290, pl = 62, pr = 10, pt = 12, pb = 28;
  const Y = r.yrs;
  const mx = Math.max(1, Math.max(...Y.map((y) => y.rev)));
  const mn = Math.min(0, Math.min(...Y.map((y) => y.res)));
  const st = nice((mx - mn) / 4);
  const top = Math.ceil(mx / st) * st;
  const bot = Math.floor(mn / st) * st;
  const y = (v: number) => pt + ((top - v) / (top - bot)) * (H - pt - pb);
  const bw = (W - pl - pr) / 10;

  const grid: number[] = [];
  for (let v = bot; v <= top + 1e-9; v += st) grid.push(v);

  const pts = Y.map((d, i) => [pl + i * bw + bw / 2, y(d.res)] as const);
  const line = "M" + pts.map(([px, py]) => `${px.toFixed(2)} ${py.toFixed(2)}`).join(" L");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Revenue by payer and operating result by year">
      {grid.map((v, i) => (
        <g key={i}>
          <line className="ch-grid" x1={pl} x2={W - pr} y1={y(v)} y2={y(v)} />
          <text className="ch-tick" x={pl - 8} y={y(v) + 4} textAnchor="end">
            {usd(v)}
          </text>
        </g>
      ))}
      {Y.map((d, i) => {
        const x = pl + i * bw + bw * 0.2;
        const w = bw * 0.6;
        const a = d.gov;
        const b = a + d.emp;
        const c = b + d.ins;
        return (
          <g key={d.t}>
            <Bar className="ch-gov" x={x} y={y(a)} width={w} height={Math.max(0, y(0) - y(a))} />
            <Bar className="ch-emp" x={x} y={y(b)} width={w} height={Math.max(0, y(a) - y(b))} />
            <Bar className="ch-ins" x={x} y={y(c)} width={w} height={Math.max(0, y(b) - y(c))} />
            <text className="ch-tick" x={x + w / 2} y={H - 9} textAnchor="middle">
              Y{d.t}
            </text>
          </g>
        );
      })}
      <line className="ch-zero" x1={pl} x2={W - pr} y1={y(0)} y2={y(0)} />
      <path className="ch-line" d={line} style={{ d: `path("${line}")` } as CSSProperties} />
      {pts.map(([cx, cy], i) => (
        <circle key={i} className="ch-dot" cx={cx} cy={cy} r={i === 9 ? 4 : 2.5} style={{ cx, cy } as CSSProperties} />
      ))}
    </svg>
  );
}

type Row = { label: string; from?: number; value: number; tone: "cost" | "ink" | "accent" | "bench"; text: string };

/** Horizontal bars with a label on the left and the value at the end of each bar. */
function BarRows({ rows, pl, rowH, max, label }: { rows: Row[]; pl: number; rowH: number; max: number; label: string }) {
  const W = 780, pr = 90;
  const sc = (W - pl - pr) / max;
  return (
    <svg viewBox={`0 0 ${W} ${rowH * rows.length + 10}`} role="img" aria-label={label}>
      {rows.map((row, i) => {
        const yy = 6 + i * rowH;
        const from = row.from ?? 0;
        const value = isFinite(row.value) ? row.value : 0;
        const x = pl + from * sc;
        const width = Math.max(1.5, value * sc);
        return (
          <g key={row.label}>
            <text className="ch-label" x={0} y={yy + 17}>
              {row.label}
            </text>
            <Bar className={`ch-${row.tone}`} x={x} y={yy + 5} width={width} height={16} />
            <text
              className="ch-value"
              x={0}
              y={yy + 17}
              transform={`translate(${x + width + 8} 0)`}
              style={{ transform: `translate(${x + width + 8}px, 0px)` }}
            >
              {row.text}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Cost per dispatch, built up from its parts, against what each payer pays. */
export function UnitChart({ r, responderPay, telecom, insIncident, dispatchFee }: { r: ModelResult; responderPay: number; telecom: number; insIncident: number; dispatchFee: boolean }) {
  const items: [string, number][] = [
    ["Responder", responderPay],
    ["Telecom", telecom],
    ["AI inference", r.aiPerCall],
  ];
  const rows: Row[] = [];
  let acc = 0;
  items.forEach(([label, v]) => {
    rows.push({ label, from: acc, value: v, tone: "cost", text: "$" + v.toFixed(v < 0.1 ? 3 : 2) });
    acc += v;
  });
  rows.push({ label: "Cost per dispatch", value: r.varCost, tone: "ink", text: "$" + r.varCost.toFixed(2) });
  rows.push({ label: "Govt fee per dispatch", value: r.priceD, tone: "accent", text: "$" + r.priceD.toFixed(2) + (dispatchFee ? "" : " (off)") });
  rows.push({ label: "Insurer fee", value: insIncident, tone: "accent", text: "$" + insIncident.toFixed(2) });
  const max = Math.max(r.priceD, r.varCost, insIncident) * 1.08;
  return <BarRows rows={rows} pl={150} rowH={34} max={max} label="Cost and price per dispatch" />;
}

/** Sauti's cost per life and per DALY against the usual benchmarks. */
export function CostEffectChart({ r }: { r: ModelResult }) {
  const rows: Row[] = [
    { label: "Sauti · cost per life saved", value: r.cpd, tone: "accent", text: usd(r.cpd) },
    { label: "GiveWell top charities · per life", value: GIVEWELL, tone: "bench", text: usd(GIVEWELL) },
    { label: "Sauti · cost per DALY", value: r.cpdaly, tone: "accent", text: usd(r.cpdaly) },
    { label: "1× GDP per capita · per DALY", value: r.gdpW, tone: "bench", text: usd(r.gdpW) },
    { label: "3× GDP per capita · per DALY", value: 3 * r.gdpW, tone: "bench", text: usd(3 * r.gdpW) },
  ];
  const max = Math.max(...rows.map((z) => (isFinite(z.value) ? z.value : 0))) * 1.05 || 1;
  return <BarRows rows={rows} pl={240} rowH={36} max={max} label="Cost-effectiveness against benchmarks" />;
}

/** Distribution of the return multiple across the Monte Carlo runs. */
export function ReturnHistogram({ samples }: { samples: number[] | null }) {
  if (!samples) return <p className="memo-fn">Run the Monte Carlo to see the distribution of your return multiple.</p>;
  const W = 780, H = 210, pl = 20, pr = 20, pb = 30, bins = 26;
  const mx = Math.max(0.5, quantile(samples, 0.98));
  const w = mx / bins;
  const cnt = new Array<number>(bins).fill(0);
  samples.forEach((x) => cnt[Math.min(bins - 1, Math.max(0, Math.floor(x / w)))]++);
  const cm = Math.max(...cnt);
  const bw = (W - pl - pr) / bins;
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Distribution of return multiple">
        {cnt.map((c, i) => {
          const h = ((H - pb - 8) * c) / cm;
          return <Bar key={i} className={i * w >= 1 ? "ch-accent" : "ch-cost"} x={pl + i * bw + 1} y={H - pb - h} width={bw - 2} height={h} />;
        })}
        {[0, 1, 2, 3, 4].map((t) => (
          <text key={t} className="ch-tick" x={pl + ((W - pl - pr) * t) / 4} y={H - 10} textAnchor="middle">
            {((mx * t) / 4).toFixed(1)}×
          </text>
        ))}
      </svg>
      <div className="memo-legend">
        <span>
          <i className="sw sw--cost" />
          Below 1×
        </span>
        <span>
          <i className="sw sw--accent" />
          1× or more
        </span>
      </div>
    </>
  );
}
