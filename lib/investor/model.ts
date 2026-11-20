/**
 * The investor memo's model, ported one-to-one from the original script
 * (index.html, November 2026). Same formulas, same order of operations, same
 * rounding in the formatters, so every figure matches the memo.
 */
import { COUNTRY_ROWS, CONFLICT_ISOS, PARAM_ROWS, type ParamKey } from "./data";

export type { ParamKey };

export type Country = {
  iso: string;
  name: string;
  /** Population, millions */
  pop: number;
  /** Births per 1,000 people */
  cbr: number;
  /** Life expectancy */
  le: number;
  /** GDP per capita, USD */
  gdp: number | null;
  /** Road deaths per 100,000 */
  road: number;
  /** Maternal deaths per 100,000 births */
  mmr: number;
  /** Mobile subscriptions per 100 */
  mob: number;
  /** Health insurance coverage, % */
  ins: number | null;
};

export const COUNTRIES: Country[] = COUNTRY_ROWS.map(([iso, name, pop, cbr, le, gdp, road, mmr, mob, ins]) => ({
  iso, name, pop, cbr, le, gdp, road, mmr, mob, ins,
}));

const BY_ISO = new Map(COUNTRIES.map((c) => [c.iso, c]));
export const byIso = (iso: string) => BY_ISO.get(iso)!;
export const CONFLICT = new Set(CONFLICT_ISOS);

export const KES_TARIFF = 4500;
export const GIVEWELL = 5000;

export type Kind = "d" | "m" | "a";
export type Param = { key: ParamKey; label: string; def: number; min: number; max: number; step: number; kind: Kind; unit: string; note: string };

export const PARAMS = Object.fromEntries(
  (Object.keys(PARAM_ROWS) as ParamKey[]).map((key) => {
    const [label, def, min, max, step, kind, unit, note] = PARAM_ROWS[key];
    return [key, { key, label, def, min, max, step, kind, unit, note }];
  }),
) as Record<ParamKey, Param>;

export type Inputs = Record<ParamKey, number>;
export const DEFAULTS = Object.fromEntries((Object.keys(PARAMS) as ParamKey[]).map((k) => [k, PARAMS[k].def])) as Inputs;

export type Fees = { annual: boolean; dispatch: boolean };
/** iso → planned contract year (1 to 10) */
export type Selection = Record<string, number>;
/** iso → year signed (99 = never) and year lost (99 = never) */
export type Schedule = Record<string, { sign: number; lost: number }>;
export type Preset = "one" | "wave" | "broad";

/* ------------------------------------------------------------ Formatting */

export function usd(v: number): string {
  const a = Math.abs(v);
  const s = v < 0 ? "−" : "";
  if (!isFinite(v)) return "n/a";
  if (a >= 1e9) return s + "$" + (a / 1e9).toFixed(2) + "bn";
  if (a >= 1e6) return s + "$" + (a / 1e6).toFixed(a >= 1e8 ? 0 : a >= 1e7 ? 1 : 2) + "M";
  if (a >= 1e3) return s + "$" + (a / 1e3).toFixed(a >= 1e5 ? 0 : 1) + "k";
  return s + "$" + a.toFixed(a < 1 ? 3 : a < 10 ? 2 : 0);
}

export function num(v: number): string {
  if (!isFinite(v)) return "n/a";
  if (v >= 1e9) return (v / 1e9).toFixed(2) + "bn";
  if (v >= 1e6) return (v / 1e6).toFixed(v >= 1e8 ? 0 : 1) + "M";
  if (v >= 1e4) return Math.round(v / 1e3) + "k";
  return Math.round(v).toLocaleString("en-US");
}

/** How a slider's value is shown next to its label. */
export function formatParam(k: ParamKey, v: number): string {
  const u = PARAMS[k].unit;
  if (u === "USD") return v < 10 ? "$" + v.toFixed(2) : usd(v);
  if (u === "%") return (v % 1 ? v.toFixed(1) : v) + "%";
  if (u === "×") return v.toFixed(1) + "×";
  if (u === "yr") return k === "exitYear" ? "Year " + v : v + " yrs";
  if (u === "min") return v + " min";
  if (u === "M") return v.toFixed(1) + "M";
  if (u === "n") return num(v);
  return String(v);
}

/* ------------------------------------------------- Demand and contracts */

/** Emergencies per person per year. */
export const perPerson = (c: Country, x: Inputs) => (c.road / 1e5) * (1 + x.injPerDeath) + (c.cbr / 1000) * (x.obsCompl / 100) + x.otherInc / 1000;

export const centres = (c: Country, x: Inputs) => Math.max(1, Math.ceil(c.pop / x.peoplePerCentre));

/** One year of a country's contract at full scope, government fees only. */
export function contractYear(c: Country, x: Inputs, fees: Fees) {
  const pop = c.pop * 1e6;
  const disp = (pop * perPerson(c, x) * x.capture) / 100;
  const priceD = ((KES_TARIFF / x.kes) * x.tariffShare) / 100;
  return { setup: centres(c, x) * x.feePerCentre, annual: fees.annual ? pop * x.feeCapita : 0, disp: fees.dispatch ? disp * priceD : 0, n: disp };
}

/* ---------------------------------------------------------------- Ranking */

function pct(arr: number[], v: number) {
  const n = arr.length;
  let c = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] < v) c++;
    else if (arr[i] === v) c += 0.5;
  }
  return n > 1 ? c / (n - 1) : 0.5;
}

/** Road and maternal deaths a year. */
export function deathsPerYear(c: Country) {
  const p = c.pop * 1e6;
  return (p * c.road) / 1e5 + (((p * c.cbr) / 1000) * c.mmr) / 1e5;
}

export const pool = (excludeConflict: boolean) => COUNTRIES.filter((c) => !(excludeConflict && CONFLICT.has(c.iso)));

export type Scored = { c: Country; score: number };

/** Every country in the pool, scored on the five weighted measures, best first. */
export function scoreCountries(x: Inputs, excludeConflict: boolean): Scored[] {
  const pl = pool(excludeConflict);
  const rate = (c: Country) => (deathsPerYear(c) / (c.pop * 1e6)) * 1e5;
  const need = pl.map(rate);
  const size = pl.map((c) => Math.log(c.pop));
  const mob = pl.map((c) => Math.min(c.mob, 130));
  const pay = pl.filter((c) => c.gdp).map((c) => Math.log(c.gdp!));
  const ins = pl.filter((c) => c.ins != null).map((c) => c.ins!);

  return pl
    .map((c) => {
      const parts: [number, number][] = [
        [x.wNeed, pct(need, rate(c))],
        [x.wSize, pct(size, Math.log(c.pop))],
        [x.wReach, pct(mob, Math.min(c.mob, 130))],
      ];
      if (c.gdp) parts.push([x.wPay, pct(pay, Math.log(c.gdp))]);
      if (c.ins != null) parts.push([x.wIns, pct(ins, c.ins)]);
      const w = parts.reduce((a, p) => a + p[0], 0);
      const s = w ? parts.reduce((a, p) => a + p[0] * p[1], 0) / w : 0;
      return { c, score: s * 100 };
    })
    .sort((a, b) => b.score - a.score);
}

/** Uganda in year 3, plus the best-ranked countries for the wider scenarios. */
export function presetSelection(p: Preset, ranked: Scored[]): Selection {
  const sel: Selection = { UGA: 3 };
  const r = ranked.filter((x) => x.c.iso !== "UGA");
  if (p === "wave") [4, 5, 5, 6].forEach((y, i) => r[i] && (sel[r[i].c.iso] = y));
  if (p === "broad") r.slice(0, 14).forEach((x, i) => (sel[x.c.iso] = Math.min(10, 4 + Math.floor(i / 2))));
  return sel;
}

/* ------------------------------------------------------------ The model */

export type Year = {
  t: number; served: number; disp: number; gov: number; setup: number; emp: number; ins: number;
  varc: number; fixC: number; deaths: number; dalys: number; members: number; active: number;
  rev: number; contrib: number; central: number; res: number;
};

export type ModelResult = {
  yrs: Year[]; be: number | null; trough: number; revT: number; deaths: number; dalys: number; cpd: number; cpdaly: number; gdpW: number;
  exitVal: number; stake: number; proceeds: number; moic: number; irr: number; aiPerCall: number; varCost: number; priceD: number;
};

export function runModel(x: Inputs, sel: Selection, fees: Fees, sched?: Schedule): ModelResult {
  const ctry = Object.keys(sel).map((i) => {
    const s = sched ? sched[i] : { sign: sel[i], lost: 99 };
    return { c: byIso(i), y: s.sign, lost: s.lost };
  });
  const aiPerCall = (x.gpu * x.audioMin) / x.gpuThroughput;
  const priceD = ((KES_TARIFF / x.kes) * x.tariffShare) / 100;
  const varCost = x.responderPay + x.telecom + aiPerCall;
  const yll = (L: number, r: number) => {
    L = Math.max(0, L);
    r = r / 100;
    return r > 0 ? (1 - Math.exp(-r * L)) / r : L;
  };

  const yrs: Year[] = [];
  let anySigned = 99;
  ctry.forEach((o) => {
    if (o.y < anySigned) anySigned = o.y;
  });

  for (let t = 1; t <= 10; t++) {
    const Y = { t, served: 0, disp: 0, gov: 0, setup: 0, emp: 0, ins: 0, varc: 0, fixC: 0, deaths: 0, dalys: 0, members: 0, active: 0 } as Year;
    ctry.forEach((o) => {
      const c = o.c;
      if (t === o.y - 1 && o.y <= 10) Y.fixC += x.countryLead * 12; // preparation year
      if (t < o.y || t >= o.lost) return;
      Y.active++;
      const k = t - o.y;
      const scope = Math.min(1, (k + 1) / x.rampYears);
      const served = c.pop * 1e6 * scope;
      const nC = centres(c, x);
      const disp = (served * perPerson(c, x) * x.capture) / 100;
      const members = served * ((c.ins || 0) / 100) * (x.insUptake / 100);
      const insDisp = disp * ((c.ins || 0) / 100) * (x.insUptake / 100);
      const setupFee = nC * x.feePerCentre * (k === 0 || k === 1 ? 0.5 : 0);
      const g = setupFee + (fees.annual ? served * x.feeCapita : 0) + (fees.dispatch ? (disp - insDisp) * priceD : 0);
      const ins = members * x.pmpm * 12 + insDisp * x.insIncident;
      Y.served += served;
      Y.disp += disp;
      Y.gov += g;
      Y.setup += setupFee;
      Y.ins += ins;
      Y.members += members;
      Y.varc += disp * varCost + (setupFee * x.setupCost) / 100;
      Y.fixC +=
        Math.ceil(nC * scope) * x.staffPerCentre * x.staffSalary * 1.4 * 12 +
        x.countryLead * 12 +
        (k === 0 ? x.langsPerCountry * x.langCost : 0) +
        (served / 1e5) * x.respPer100k * x.respCost;
      const dT = (((((served * x.capture) / 100) * (c.road / 1e5)) * x.redTrauma) / 100);
      const dM = (((((served * x.capture) / 100) * (c.cbr / 1000)) * (c.mmr / 1e5) * x.redMat) / 100);
      Y.deaths += dT + dM;
      Y.dalys += dT * yll(c.le - x.ageTrauma, x.disc) + dM * yll(c.le - x.ageMat, x.disc);
    });
    const workers = t >= anySigned ? x.workers * Math.min(1, (t - anySigned + 1) / Math.max(1, 10 - anySigned + 1)) : 0;
    Y.emp = workers * x.pricePerWorker * 12;
    Y.varc += workers * x.siteCost;
    Y.rev = Y.gov + Y.emp + Y.ins;
    Y.varc += (Y.rev * x.overhead) / 100;
    Y.contrib = Y.rev - Y.varc;
    Y.central = x.opex * Math.pow(1 + x.opexGrowth / 100, t - 1);
    Y.res = Y.contrib - Y.fixC - Y.central;
    yrs.push(Y);
  }

  const sum = (f: keyof Year) => yrs.reduce((a, y) => a + y[f], 0);
  let be: number | null = null;
  for (let i = 0; i < 10; i++)
    if (yrs[i].res > 0) {
      be = i + 1;
      break;
    }
  let cum = 0;
  let trough = 0;
  yrs.forEach((y) => {
    cum += y.res;
    trough = Math.min(trough, cum);
  });
  const ex = yrs[x.exitYear - 1];
  const recur = ex.rev - ex.setup;
  const exitVal = Math.max(0, recur * x.multiple);
  const stake = (x.inv / (x.pre + x.inv)) * (1 - x.dilution / 100);
  const proceeds = exitVal * stake;
  const moic = proceeds / x.inv;
  const irr = moic > 0 ? Math.pow(moic, 1 / x.exitYear) - 1 : -1;
  const revT = sum("rev");
  const deaths = sum("deaths");
  const dalys = sum("dalys");
  let tp = 0;
  let tg = 0;
  ctry.forEach((o) => {
    tp += o.c.pop;
    tg += o.c.pop * (o.c.gdp || 0);
  });

  return {
    yrs, be, trough, revT, deaths, dalys,
    cpd: deaths ? revT / deaths : NaN,
    cpdaly: dalys ? revT / dalys : NaN,
    gdpW: tp ? tg / tp : 0,
    exitVal, stake, proceeds, moic, irr, aiPerCall, varCost, priceD,
  };
}

/* ----------------------------------------------------------- Monte Carlo */

export function quantile(a: number[], q: number) {
  const s = a.slice().sort((x, y) => x - y);
  const i = (s.length - 1) * q;
  const l = Math.floor(i);
  const h = Math.ceil(i);
  return s[l] + (s[h] - s[l]) * (i - l);
}

/** Triangular draw between a and b with mode c. */
function tri(a: number, c: number, b: number) {
  if (b <= a) return c;
  c = Math.min(Math.max(c, a), b);
  const u = Math.random();
  const f = (c - a) / (b - a);
  return u < f ? a + Math.sqrt(u * (b - a) * (c - a)) : b - Math.sqrt((1 - u) * (b - a) * (b - c));
}

export type McSamples = { rev: number[]; res: number[]; signed: number[]; deaths: number[]; cpdaly: number[]; moic: number[]; be: number[] };
export const emptySamples = (): McSamples => ({ rev: [], res: [], signed: [], deaths: [], cpdaly: [], moic: [], be: [] });

/** One Monte Carlo run: contract delays, lost contracts and correlated market conditions. Adds its outcomes to `o`. */
export function monteCarloRun(S: Inputs, sel: Selection, fees: Fees, o: McSamples) {
  const x = { ...S };
  const m = tri(0.6, 1, 1.35);
  x.capture = Math.min(90, S.capture * m);
  x.feeCapita = S.feeCapita * m;
  x.tariffShare = Math.min(100, S.tariffShare * m);
  x.workers = S.workers * tri(0.3, 1, 1.4) * m;
  x.insUptake = Math.min(90, S.insUptake * m * tri(0.5, 1, 1.3));
  x.responderPay = tri(S.responderPay * 0.75, S.responderPay, S.responderPay * 1.5);
  x.overhead = tri(S.overhead * 0.8, S.overhead, Math.min(70, S.overhead * 1.5));
  x.respCost = tri(S.respCost * 0.7, S.respCost, S.respCost * 1.8);
  x.opex = tri(S.opex * 0.85, S.opex, S.opex * 1.8);
  x.injPerDeath = tri(Math.max(2, S.injPerDeath * 0.7), S.injPerDeath, S.injPerDeath * 2);
  x.redTrauma = tri(15, S.redTrauma, 34);
  x.redMat = tri(Math.max(5, S.redMat * 0.5), S.redMat, Math.min(45, S.redMat * 1.3));
  x.multiple = tri(Math.max(1, S.multiple * 0.5), S.multiple, S.multiple * 2);

  const sched: Schedule = {};
  let nSigned = 0;
  Object.keys(sel).forEach((iso) => {
    const p = (iso === "UGA" ? S.pSignUG : S.pSign) / 100;
    let y = sel[iso];
    while (y <= 10 && Math.random() > p) y++;
    let lost = 99;
    if (y <= 10) {
      nSigned++;
      for (let t = y + 1; t <= 10; t++) {
        if (Math.random() < S.pLoss / 100) {
          lost = t;
          break;
        }
      }
    }
    sched[iso] = { sign: y <= 10 ? y : 99, lost };
  });

  const r = runModel(x, sel, fees, sched);
  o.rev.push(r.yrs[9].rev);
  o.res.push(r.yrs[9].res);
  o.signed.push(nSigned);
  o.deaths.push(r.deaths);
  o.cpdaly.push(isFinite(r.cpdaly) ? r.cpdaly : 1e9);
  o.moic.push(r.moic);
  o.be.push(r.be || 11);
}

export type McRow = { label: string; cautious: string; median: string; strong: string };

/** P10, median and P90 of each outcome; for costs and years "cautious" is the high end. */
export function summariseMc(o: McSamples, contracts: number): { rows: McRow[]; lossShare: number } {
  const defs: [string, keyof McSamples, (v: number) => string, boolean][] = [
    ["Contracts signed by year 10", "signed", (v) => Math.round(v) + " of " + contracts, false],
    ["Revenue, year 10", "rev", usd, false],
    ["Operating result, year 10", "res", usd, false],
    ["Deaths averted, 10 years", "deaths", num, false],
    ["Cost per DALY", "cpdaly", usd, true],
    ["Return multiple", "moic", (v) => v.toFixed(2) + "×", false],
    ["First profitable year", "be", (v) => (v > 10 ? "after Y10" : "Year " + Math.round(v)), true],
  ];
  const rows = defs.map(([label, key, f, inverse]) => {
    const a = o[key];
    const lo = inverse ? 0.9 : 0.1;
    const hi = inverse ? 0.1 : 0.9;
    return { label, cautious: f(quantile(a, lo)), median: f(quantile(a, 0.5)), strong: f(quantile(a, hi)) };
  });
  const lossShare = o.moic.filter((v) => v < 1).length / o.moic.length;
  return { rows, lossShare };
}
