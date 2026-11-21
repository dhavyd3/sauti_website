"use client";

import { memo, useCallback, useDeferredValue, useMemo, useRef, useState } from "react";
import { ButtonIcon } from "@/components/Button";
import {
  byIso,
  centres,
  COUNTRIES,
  CONFLICT,
  contractYear,
  DEFAULTS,
  deathsPerYear,
  emptySamples,
  monteCarloRun,
  num,
  pool,
  presetSelection,
  runModel,
  scoreCountries,
  summariseMc,
  usd,
  type Country,
  type Fees,
  type Inputs,
  type McRow,
  type ModelResult,
  type ParamKey,
  type Preset,
  type Scored,
  type Selection,
} from "@/lib/investor/model";
import { site } from "@/lib/site";
import { CostEffectChart, ReturnHistogram, RevenueChart, UnitChart } from "./Charts";
import { Group, Kpi, KindTag, Slider, Tabs, type TabDef } from "./Controls";
import { MemoNav } from "./MemoNav";
import { Contact, DataAsset, Evidence, Market, R, Round, Sources } from "./MemoText";

type Tab = "rev" | "unit" | "imp" | "ret" | "how";
const TABS: TabDef<Tab>[] = [
  { id: "rev", label: "Revenue" },
  { id: "unit", label: "Unit economics" },
  { id: "imp", label: "Impact" },
  { id: "ret", label: "Return" },
  { id: "how", label: "Method" },
];

const PRESETS: { id: Preset; label: string }[] = [
  { id: "one", label: "Uganda only" },
  { id: "wave", label: "First wave" },
  { id: "broad", label: "Broad" },
];

const MC_RUNS = 1000;
const MC_PER_FRAME = 50;

type Mc =
  | { state: "idle" }
  | { state: "running"; done: number }
  | { state: "done"; rows: McRow[]; lossShare: number; moic: number[]; inputs: Inputs; sel: Selection; fees: Fees };

/** Totals across all 72 countries for the opening figures; these only depend on the data. */
const TOTALS = (() => {
  let pop = 0, road = 0, mat = 0, births = 0;
  COUNTRIES.forEach((c) => {
    const p = c.pop * 1e6;
    pop += p;
    road += (p * c.road) / 1e5;
    births += (p * c.cbr) / 1000;
    mat += (((p * c.cbr) / 1000) * c.mmr) / 1e5;
  });
  return { pop, road, births, mat };
})();

const INITIAL_SEL = presetSelection("wave", scoreCountries(DEFAULTS, true));

export function InvestorMemo() {
  const [S, setS] = useState<Inputs>(DEFAULTS);
  const [fees, setFees] = useState<Fees>({ annual: true, dispatch: true });
  const [excl, setExcl] = useState(true);
  const [sel, setSel] = useState<Selection>(INITIAL_SEL);
  const [preset, setPreset] = useState<Preset | null>("wave");
  const [tab, setTab] = useState<Tab>("rev");
  const [mc, setMc] = useState<Mc>({ state: "idle" });
  const mcRun = useRef(0);

  // Sliders follow the finger at once; the model, charts and tables catch up a frame later.
  const dS = useDeferredValue(S);
  const dSel = useDeferredValue(sel);
  const dFees = useDeferredValue(fees);
  const dExcl = useDeferredValue(excl);

  const ranked = useMemo(() => scoreCountries(dS, dExcl), [dS, dExcl]);
  const r = useMemo(() => runModel(dS, dSel, dFees), [dS, dSel, dFees]);

  const tam = useMemo(() => {
    let total = 0;
    pool(dExcl).forEach((c) => {
      const v = contractYear(c, dS, dFees);
      total += v.annual + v.disp;
    });
    return total;
  }, [dS, dFees, dExcl]);

  const contractRows = useMemo(() => {
    let top = ranked.slice(0, 6).map((x) => x.c);
    if (!top.some((c) => c.iso === "UGA")) top = [byIso("UGA"), ...top.slice(0, 5)];
    return top;
  }, [ranked]);

  const setInput = useCallback((k: ParamKey, v: number) => setS((prev) => ({ ...prev, [k]: v })), []);

  const applyPreset = (p: Preset) => {
    setSel(presetSelection(p, scoreCountries(S, excl)));
    setPreset(p);
  };

  const toggleCountry = useCallback((iso: string, on: boolean) => {
    setSel((prev) => {
      const next = { ...prev };
      if (on) next[iso] = 5;
      else delete next[iso];
      return next;
    });
    setPreset(null);
  }, []);

  const setYear = useCallback((iso: string, year: number) => {
    setSel((prev) => ({ ...prev, [iso]: year }));
    setPreset(null);
  }, []);

  const toggleConflict = (checked: boolean) => {
    setExcl(checked);
    if (checked)
      setSel((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((iso) => CONFLICT.has(iso) && delete next[iso]);
        return next;
      });
  };

  const toggleFee = (which: keyof Fees) =>
    setFees((f) => {
      const other = which === "annual" ? f.dispatch : f.annual;
      if (f[which] && !other) return f; // one of the two fees always stays on
      return { ...f, [which]: !f[which] };
    });

  const reset = () => {
    mcRun.current++;
    setS(DEFAULTS);
    setFees({ annual: true, dispatch: true });
    setMc({ state: "idle" });
    setSel(presetSelection("wave", scoreCountries(DEFAULTS, excl)));
    setPreset("wave");
  };

  // 1,000 runs, a few dozen per frame, so the page keeps moving and the bar fills as it goes.
  const runMonteCarlo = () => {
    if (mc.state === "running") return;
    const id = ++mcRun.current;
    const inputs = S, selection = sel, feeSet = fees;
    const samples = emptySamples();
    let done = 0;
    setMc({ state: "running", done: 0 });
    const step = () => {
      if (id !== mcRun.current) return;
      const end = Math.min(MC_RUNS, done + MC_PER_FRAME);
      for (; done < end; done++) monteCarloRun(inputs, selection, feeSet, samples);
      if (done < MC_RUNS) {
        setMc({ state: "running", done });
        requestAnimationFrame(step);
      } else {
        const { rows, lossShare } = summariseMc(samples, Object.keys(selection).length);
        setMc({ state: "done", rows, lossShare, moic: samples.moic, inputs, sel: selection, fees: feeSet });
      }
    };
    requestAnimationFrame(step);
  };

  const mcStale = mc.state === "done" && (mc.inputs !== S || mc.sel !== sel || mc.fees !== fees);

  const selNames = Object.keys(sel)
    .sort((a, b) => sel[a] - sel[b])
    .map((iso) => byIso(iso).name + " Y" + sel[iso]);


  return (
    <div className="memo">
      <Opening tam={tam} />

      <MemoNav />

      <Market />

      <ContractSection rows={contractRows} x={dS} fees={dFees} />

      <DataAsset />

      <Evidence />

      {/* The model */}
      <section className="memo-sec" id="model">
        <div className="wrap">
          <div className="memo-col">
            <p className="eyebrow">The model</p>
            <h2 className="t-h2-sm">Ten years, contract by contract, in US dollars.</h2>
            <p className="memo-p">
              Each country enters when its national contract is signed and reaches full national scope over the rollout period. Inputs are marked <KindTag kind="d" /> when they come from an official dataset, <KindTag kind="m" /> when they are prices already paid, and <KindTag kind="a" /> when they are ours to defend and yours to change. Costs are built from market prices, so margins are an output.
            </p>
          </div>

          <div className="panel">
            <aside className="panel__inputs" aria-label="Model inputs">
              <Group title="Contracts" open>
                <div className="presets" role="group" aria-label="Country scenario">
                  {PRESETS.map((p) => (
                    <button key={p.id} type="button" aria-pressed={preset === p.id} onClick={() => applyPreset(p.id)}>
                      {p.label}
                    </button>
                  ))}
                </div>
                <p className="memo-small num" style={{ marginTop: 10 }}>
                  {selNames.length} {selNames.length === 1 ? "contract" : "contracts"}: {selNames.join(", ")}
                </p>
                <p className="memo-small">
                  Contract years are set per country in the <a href="#countries">Countries</a> section.
                </p>
                <Slider k="rampYears" value={S.rampYears} onChange={setInput} />
                <Slider k="capture" value={S.capture} onChange={setInput} />
              </Group>

              <Group title="Government fees" open>
                <Slider k="peoplePerCentre" value={S.peoplePerCentre} onChange={setInput} />
                <Slider k="feePerCentre" value={S.feePerCentre} onChange={setInput} />
                <div className="seg" role="group" aria-label="Fees charged">
                  <button type="button" aria-pressed={fees.annual} onClick={() => toggleFee("annual")}>
                    Annual fee {fees.annual ? "on" : "off"}
                  </button>
                  <button type="button" aria-pressed={fees.dispatch} onClick={() => toggleFee("dispatch")}>
                    Per-dispatch fee {fees.dispatch ? "on" : "off"}
                  </button>
                </div>
                <Slider k="feeCapita" value={S.feeCapita} onChange={setInput} dimmed={!fees.annual} />
                <Slider k="tariffShare" value={S.tariffShare} onChange={setInput} dimmed={!fees.dispatch} />
              </Group>

              <Group title="Employers and insurers">
                {(["workers", "pricePerWorker", "insUptake", "pmpm", "insIncident"] as ParamKey[]).map((k) => (
                  <Slider key={k} k={k} value={S[k]} onChange={setInput} />
                ))}
              </Group>

              <Group title="Demand">
                {(["injPerDeath", "obsCompl", "otherInc"] as ParamKey[]).map((k) => (
                  <Slider key={k} k={k} value={S[k]} onChange={setInput} />
                ))}
              </Group>

              <Group title="Costs">
                {(
                  ["responderPay", "telecom", "gpu", "audioMin", "gpuThroughput", "setupCost", "staffPerCentre", "staffSalary", "countryLead", "langCost", "langsPerCountry", "respPer100k", "respCost", "overhead", "siteCost", "opex", "opexGrowth"] as ParamKey[]
                ).map((k) => (
                  <Slider key={k} k={k} value={S[k]} onChange={setInput} />
                ))}
              </Group>

              <Group title="Contract risk">
                {(["pSign", "pSignUG", "pLoss"] as ParamKey[]).map((k) => (
                  <Slider key={k} k={k} value={S[k]} onChange={setInput} />
                ))}
              </Group>

              <Group title="Impact">
                {(["redTrauma", "redMat", "ageTrauma", "ageMat", "disc"] as ParamKey[]).map((k) => (
                  <Slider key={k} k={k} value={S[k]} onChange={setInput} />
                ))}
              </Group>

              <Group title="Your terms">
                {(["inv", "pre", "dilution", "multiple", "exitYear", "kes"] as ParamKey[]).map((k) => (
                  <Slider key={k} k={k} value={S[k]} onChange={setInput} />
                ))}
              </Group>

              <button type="button" className="btn btn--outline btn--plain panel__reset" onClick={reset}>
                Reset all inputs
              </button>
            </aside>

            <div className="panel__out">
              <Outputs r={r} x={dS} fees={dFees} tab={tab} onTab={setTab} mcMoic={mc.state === "done" ? mc.moic : null} />
              {/* Monte Carlo */}
              <div className="mc">
                <button type="button" className="btn btn--primary btn--lg mc__run" onClick={runMonteCarlo} disabled={mc.state === "running"}>
                  {mc.state === "running" ? "Running" : mc.state === "done" ? "Run again" : "Run Monte Carlo"}
                  <ButtonIcon />
                </button>
                <div className="mc__status">
                  {mc.state === "running" ? (
                    <>
                      <div className="mc__bar" role="progressbar" aria-valuemin={0} aria-valuemax={MC_RUNS} aria-valuenow={mc.done} aria-label="Monte Carlo progress">
                        <span style={{ transform: `scaleX(${mc.done / MC_RUNS})` }} />
                      </div>
                      <span className="memo-small num">
                        {mc.done.toLocaleString("en-US")} of {MC_RUNS.toLocaleString("en-US")} runs
                      </span>
                    </>
                  ) : mc.state === "done" ? (
                    <span className="memo-small">
                      {MC_RUNS.toLocaleString("en-US")} runs. Probability of returning less than the investment within these scenarios: {Math.round(mc.lossShare * 100)}%. Company failure before the first contract is not modelled.
                      {mcStale && <b className="mc__stale"> Inputs have changed since this run.</b>}
                    </span>
                  ) : (
                    <span className="memo-small">{MC_RUNS.toLocaleString("en-US")} runs with contract delays, lost contracts and correlated market conditions.</span>
                  )}
                </div>
              </div>
              {mc.state === "done" && (
                <div className="mc__results">
                  <div className="memo-tbl">
                    <table>
                      <thead>
                        <tr>
                          <th>Outcome</th>
                          <th className="n">Cautious (P10)</th>
                          <th className="n">Median</th>
                          <th className="n">Strong (P90)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mc.rows.map((row) => (
                          <tr key={row.label}>
                            <td>{row.label}</td>
                            <td className="n">{row.cautious}</td>
                            <td className="n">{row.median}</td>
                            <td className="n">{row.strong}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="memo-sec" id="countries">
        <div className="wrap">
          <div className="memo-col">
            <p className="eyebrow">Countries</p>
            <h2 className="t-h2-sm">Where the same problem repeats, ranked by data.</h2>
            <p className="memo-p">
              Every low and lower-middle income country, scored on five measures you can weight: the emergency death rate (road and maternal deaths per 100,000, highest where response systems are weakest), population, mobile reach, ability to pay (GDP per capita) and health insurance coverage. Tick a country to add it to the model and set the year its contract is signed.
            </p>
          </div>
          <div className="weights">
            {(["wNeed", "wSize", "wReach", "wPay", "wIns"] as ParamKey[]).map((k) => (
              <Slider key={k} k={k} value={S[k]} onChange={setInput} />
            ))}
          </div>
          <label className="check">
            <input type="checkbox" checked={excl} onChange={(event) => toggleConflict(event.target.checked)} />
            <span>Leave out countries where operating is impractical today (active conflict or sanctions)</span>
          </label>
          <RankTable ranked={ranked} sel={dSel} x={dS} fees={dFees} onToggle={toggleCountry} onYear={setYear} />
          <p className="memo-fn">
            Population 2025; deaths are WHO road traffic deaths (2019 rate) plus maternal deaths (births × 2023 ratio), applied to 2025 population. Contract value uses the model&apos;s current prices at full scope. Insurance: share covered by any health insurance in the latest DHS; blank where not surveyed, in which case the score uses the other four measures.
          </p>
        </div>
      </section>

      <Round />

      <Contact />

      <Sources />
    </div>
  );
}

/* ------------------------------------------------------------------------
 * Parts that depend on the model. Each is memoised and receives the deferred
 * inputs, so while a slider is held only the slider redraws at once and these
 * follow a frame later, without blocking the drag.
 * --------------------------------------------------------------------- */

const Opening = memo(function Opening({ tam }: { tam: number }) {
  return (
      <header className="memo-head">
        <div className="wrap">
          <div className="memo-col">
            <p className="eyebrow">Investor memo · November 2026</p>
            <h1 className="memo-title">
              Emergency response is becoming a service governments and insurers pay for. <em>Sauti is the layer that runs it.</em>
            </h1>
            <p className="lead">
              Sauti takes an emergency call on any phone, in the caller&apos;s language, triages it with AI checked by a dispatcher, sends the nearest trained responder and alerts the receiving hospital. Every call leaves a structured record. We build national emergency response with governments, and sell to employers and health insurers alongside.
            </p>
          </div>

          <dl className="memo-meta">
            <div>
              <dt>Company</dt>
              <dd>{site.legalName}</dd>
            </div>
            <div>
              <dt>Stage</dt>
              <dd>Pre-seed, raising now</dd>
            </div>
            <div>
              <dt>Addressable</dt>
              <dd>{COUNTRIES.length} countries</dd>
            </div>
            <div>
              <dt>Annual contract value, all countries</dt>
              <dd className="num">{usd(tam)}</dd>
            </div>
          </dl>

          <div className="memo-figs">
            <div>
              <b>{(TOTALS.pop / 1e9).toFixed(1)}bn</b>
              <span>people in low and lower-middle income countries</span>
            </div>
            <div>
              <b>{num(TOTALS.road)}</b>
              <span>road traffic deaths a year, WHO estimates</span>
            </div>
            <div>
              <b>{num(TOTALS.births)}</b>
              <span>births a year, about 15% with a serious complication</span>
            </div>
            <div>
              <b>{num(TOTALS.mat)}</b>
              <span>maternal deaths a year</span>
            </div>
          </div>
          <p className="memo-small">
            Totals across the 72 low and lower-middle income countries in the World Bank classification, from World Bank and WHO estimates.
            <R n={1} />
          </p>
        </div>
      </header>
  );
});

const ContractSection = memo(function ContractSection({ rows, x, fees }: { rows: Country[]; x: Inputs; fees: Fees }) {
  return (
      <section className="memo-sec" id="contract">
        <div className="wrap">
          <div className="memo-col">
            <p className="eyebrow">A national contract</p>
            <h2 className="t-h2-sm">Three fees, sized by the country.</h2>
            <p className="memo-p">
              Sauti works with the government&apos;s own dispatch centres, ambulances and hospitals and adds what they lack: language understanding, triage, trained community responders and verified records. Governments already buy national health services this way. Ghana contracted nationwide medical drone delivery as a four-year service for USD 12.5 million, about USD 0.10 per person a year.
              <R n={12} /> In India, states fund the setup of 108 emergency centres and contract out their operation.
              <R n={13} />
            </p>
          </div>

          <div className="memo-tbl">
            <table>
              <thead>
                <tr>
                  <th>Fee</th>
                  <th>Basis</th>
                  <th>Benchmark</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Setup</b> · always charged
                  </td>
                  <td>Per dispatch centre; the number of centres follows population</td>
                  <td>
                    Uganda plans 12 regional centres for about 51 million people; India&apos;s 108 infrastructure costs under USD 0.50 per person served
                    <R n={13} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Annual service</b>
                  </td>
                  <td>Per person covered, per year</td>
                  <td>
                    Ghana&apos;s national drone delivery service: about USD 0.10 per person a year
                    <R n={12} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Per verified dispatch</b>
                  </td>
                  <td>Per community response, against a complete record</td>
                  <td>
                    Kenya: KES 4,500 per ambulance evacuation
                    <R n={2} />; Tanzania&apos;s community referrals: USD 170 each
                    <R n={7} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="memo-fn">The annual and per-dispatch fees can run together or alone, depending on how a government budgets. The model lets you switch each one.</p>

          <div className="memo-tbl">
            <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th className="n">Population</th>
                  <th className="n">Centres</th>
                  <th className="n">Setup, once</th>
                  <th className="n">Annual service</th>
                  <th className="n">Dispatches a year</th>
                  <th className="n">Dispatch fees</th>
                  <th className="n">Per year</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => {
                  const v = contractYear(c, x, fees);
                  return (
                    <tr key={c.iso}>
                      <td>{c.name}</td>
                      <td className="n">{c.pop.toFixed(0)}M</td>
                      <td className="n">{centres(c, x)}</td>
                      <td className="n">{usd(v.setup)}</td>
                      <td className="n">{usd(v.annual)}</td>
                      <td className="n">{num(v.n)}</td>
                      <td className="n">{usd(v.disp)}</td>
                      <td className="n">
                        <b>{usd(v.annual + v.disp)}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="memo-fn">Contract value per year at full national scope, using the default prices in the model. Change the prices in the model and this table updates.</p>
        </div>
      </section>
  );
});

const Outputs = memo(function Outputs({
  r,
  x,
  fees,
  tab,
  onTab,
  mcMoic,
}: {
  r: ModelResult;
  x: Inputs;
  fees: Fees;
  tab: Tab;
  onTab: (t: Tab) => void;
  mcMoic: number[] | null;
}) {
  const y10 = r.yrs[9];
  const insInc = y10.members && y10.served ? y10.disp / y10.served : 0;
  const cmY = y10.rev ? y10.contrib / y10.rev : 0;
  const staffPerCentre = x.staffPerCentre * x.staffSalary * 1.4 * 12;
  return (
    <>
              <Tabs tabs={TABS} active={tab} onSelect={onTab} />

              {tab === "rev" && (
                <div className="view" id="v-rev" role="tabpanel" aria-labelledby="t-rev" key="rev">
                  <p className="memo-small" style={{ marginBottom: 14 }}>
                    On plan: every contract signs in its planned year. Run the Monte Carlo below to see the effect of delays and lost contracts.
                  </p>
                  <div className="kpis">
                    <Kpi label="Revenue, year 10" value={usd(y10.rev)} sub={`Government ${usd(y10.gov)} · Employers ${usd(y10.emp)} · Insurers ${usd(y10.ins)}`} />
                    <Kpi label="People covered, year 10" value={num(y10.served)} sub={`${num(y10.disp)} dispatches a year`} />
                    <Kpi label="First profitable year" value={r.be ? `Year ${r.be}` : "After year 10"} sub="After all costs" />
                    <Kpi label="Peak cumulative funding" value={usd(-r.trough)} sub="Before revenue covers costs" />
                  </div>
                  <div className="chart">
                    <RevenueChart r={r} />
                  </div>
                  <div className="memo-legend">
                    <span>
                      <i className="sw sw--gov" />
                      Government
                    </span>
                    <span>
                      <i className="sw sw--emp" />
                      Employers
                    </span>
                    <span>
                      <i className="sw sw--ins" />
                      Insurers
                    </span>
                    <span>
                      <i className="sw sw--line" />
                      Operating result
                    </span>
                  </div>
                  <div className="memo-tbl">
                    <table>
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th className="n">Contracts</th>
                          <th className="n">People covered</th>
                          <th className="n">Dispatches</th>
                          <th className="n">Revenue</th>
                          <th className="n">of which setup</th>
                          <th className="n">Contribution</th>
                          <th className="n">Operating result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {r.yrs.map((d) => (
                          <tr key={d.t}>
                            <td className="num">{d.t}</td>
                            <td className="n">{d.active}</td>
                            <td className="n">{num(d.served)}</td>
                            <td className="n">{num(d.disp)}</td>
                            <td className="n">{usd(d.rev)}</td>
                            <td className="n">{usd(d.setup)}</td>
                            <td className="n">{usd(d.contrib)}</td>
                            <td className={`n${d.res < 0 ? " is-neg" : ""}`}>{usd(d.res)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {tab === "unit" && (
                <div className="view" id="v-unit" role="tabpanel" aria-labelledby="t-unit" key="unit">
                  <div className="kpis">
                    <Kpi label="Cost per dispatch" value={"$" + r.varCost.toFixed(2)} sub={"AI inference $" + r.aiPerCall.toFixed(3)} />
                    <Kpi label="Govt fee per dispatch" value={"$" + r.priceD.toFixed(2)} sub={fees.dispatch ? "Contribution $" + (r.priceD - r.varCost).toFixed(2) : "Fee switched off"} />
                    <Kpi label="Contribution margin, year 10" value={(cmY * 100).toFixed(0) + "%"} sub="Before fixed and central costs" />
                    <Kpi label="Staff cost per centre" value={"$" + num(staffPerCentre) + "/yr"} sub={"Plus country team $" + num(x.countryLead * 12) + "/yr"} />
                  </div>
                  <div className="chart">
                    <UnitChart r={r} responderPay={x.responderPay} telecom={x.telecom} insIncident={x.insIncident} dispatchFee={fees.dispatch} />
                  </div>
                  <div className="memo-tbl">
                    <table>
                      <thead>
                        <tr>
                          <th>Per unit, year 10</th>
                          <th className="n">Revenue</th>
                          <th className="n">Variable cost</th>
                          <th className="n">Contribution</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Government dispatch</td>
                          <td className="n">{fees.dispatch ? "$" + r.priceD.toFixed(2) : "–"}</td>
                          <td className="n">${r.varCost.toFixed(2)}</td>
                          <td className="n">{fees.dispatch ? "$" + (r.priceD - r.varCost).toFixed(2) : "covered by annual fee"}</td>
                        </tr>
                        <tr>
                          <td>Person covered per year (annual fee)</td>
                          <td className="n">{fees.annual ? "$" + x.feeCapita.toFixed(2) : "–"}</td>
                          <td className="n">${(insInc * r.varCost * (fees.dispatch ? 0 : 1)).toFixed(3)}</td>
                          <td className="n">{fees.annual ? "$" + (x.feeCapita - insInc * r.varCost * (fees.dispatch ? 0 : 1)).toFixed(3) : "–"}</td>
                        </tr>
                        <tr>
                          <td>Insured member per year</td>
                          <td className="n">${(x.pmpm * 12 + insInc * x.insIncident).toFixed(2)}</td>
                          <td className="n">${(insInc * r.varCost).toFixed(3)}</td>
                          <td className="n">${(x.pmpm * 12 + insInc * (x.insIncident - r.varCost)).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Employer worker per year</td>
                          <td className="n">${(x.pricePerWorker * 12).toFixed(2)}</td>
                          <td className="n">${x.siteCost.toFixed(2)}</td>
                          <td className="n">${(x.pricePerWorker * 12 - x.siteCost).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="memo-fn">
                    Government staff answer calls in their own centres. Sauti pays community responders per completed response and carries telecom, AI inference on rented GPUs, technical staff in each centre, a country team, and the one-off training of its models in each new language.
                  </p>
                </div>
              )}

              {tab === "imp" && (
                <div className="view" id="v-imp" role="tabpanel" aria-labelledby="t-imp" key="imp">
                  <div className="kpis">
                    <Kpi label="Deaths averted, 10 years" value={num(r.deaths)} sub="Trauma and maternal" />
                    <Kpi label="DALYs averted, 10 years" value={num(r.dalys)} sub={x.disc + "% discount"} />
                    <Kpi label="Cost per life saved" value={usd(r.cpd)} sub="GiveWell top charities ≈ $5,000" />
                    <Kpi label="Cost per DALY" value={usd(r.cpdaly)} sub={"1× GDP per capita = " + usd(r.gdpW)} />
                  </div>
                  <div className="chart">
                    <CostEffectChart r={r} />
                  </div>
                  <p className="memo-fn">
                    Each country uses its own WHO road death rate, maternal mortality ratio, birth rate and life expectancy. DALYs count years of life lost; disability averted is left out, so the impact is understated. Cost is everything payers spend on Sauti in the model.
                  </p>
                </div>
              )}

              {tab === "ret" && (
                <div className="view" id="v-ret" role="tabpanel" aria-labelledby="t-ret" key="ret">
                  <div className="kpis">
                    <Kpi label="Your stake at exit" value={(r.stake * 100).toFixed(2) + "%"} sub={"After " + x.dilution + "% dilution"} />
                    <Kpi label="Company value at exit" value={usd(r.exitVal)} sub={x.multiple.toFixed(1) + "× recurring revenue, year " + x.exitYear} />
                    <Kpi label="Return multiple" value={r.moic.toFixed(2) + "×"} sub={"Proceeds " + usd(r.proceeds)} />
                    <Kpi label="Annual return (IRR)" value={(r.irr * 100).toFixed(1) + "%"} sub={"Over " + x.exitYear + " years, on plan"} />
                  </div>
                  <div className="chart">
                    <ReturnHistogram samples={mcMoic} />
                  </div>
                  <p className="memo-fn">Valuation, dilution and exit multiple are yours to set. This is arithmetic on the business case above, not a statement of terms.</p>
                </div>
              )}

              {tab === "how" && (
                <div className="view memo-method" id="v-how" role="tabpanel" aria-labelledby="t-how" key="how">
                  <p>
                    <b>Contracts.</b> A country enters in its contract year. Its contract scope grows in equal steps to the whole population over the rollout period. Technical preparation and the country team start one year before signing.
                  </p>
                  <p>
                    <b>Government revenue.</b> Setup = number of dispatch centres × fee per centre, invoiced half at signing and half a year later; centres = population ÷ people per centre, rounded up. Annual service fee = people in scope × fee per person. Per-dispatch fee = dispatches × price, where the price is a share of Kenya&apos;s per-evacuation tariff.
                  </p>
                  <p>
                    <b>Emergencies.</b> Per person per year in each country: WHO-estimated road deaths plus serious injuries (deaths × injuries per death), obstetric complications (births × complication share), and other medical emergencies. The capture rate is the share of these that reach the system.
                  </p>
                  <p>
                    <b>Employers and insurers.</b> Employers pay per worker per month. Insured members are people in scope × the country&apos;s health insurance coverage × the share whose insurer partners with Sauti; they pay a monthly fee per member, and their emergencies are billed to the insurer per verified incident instead of to government.
                  </p>
                  <p>
                    <b>Costs.</b> Per dispatch: responder payment, telecom and AI inference (GPU price × audio minutes ÷ throughput). Per centre per year: Sauti technical staff. Per country per year: country team and the community responder network (responders per 100,000 people × yearly cost per responder); plus model training for each new language at signing and the cost of delivering setup as a share of the setup fee. Per employer worker: on-site training and kits. Sales, account management and overhead: a share of revenue. Central: core team, platform and compliance, growing each year.
                  </p>
                  <p>
                    <b>Impact.</b> Deaths averted = emergencies captured × (trauma death rate × trauma mortality reduction + maternal death rate × maternal mortality reduction), country by country. DALYs = deaths averted × years of life remaining at the average age of death, discounted.
                  </p>
                  <p>
                    <b>Benchmarks.</b> GiveWell&apos;s top charities save a life for about USD 5,000.
                    <R n={9} /> Under the GDP-per-capita convention, an intervention is very cost-effective below one times GDP per capita per DALY and cost-effective below three times; the chart uses the population-weighted GDP per capita of the selected countries.
                  </p>
                  <p>
                    <b>Monte Carlo: where the probabilities come from.</b> Each run decides, year by year, whether each planned contract is signed (probability per year, starting in the planned year) and whether a signed contract is later lost. The default signing probability is anchored on observed timelines: Ghana went from contract to national launch within a year, Nigeria from a one-territory pilot to 34 states in about four years, and m-mama took about seven years from pilot to national government ownership. A 35% chance per year puts the median delay at about one and a half years, with a long tail of contracts that never sign within the horizon. Each run also draws a shared market factor that moves capture, prices, employer volume and insurer uptake together, plus independent draws for responder pay, responder network cost, overhead, central costs, injury ratio, both mortality reductions and the exit multiple. The table reports the 10th, 50th and 90th percentiles of 1,000 runs. These are scenarios built on stated assumptions, not forecasts. The model does not include the risk that the company fails before its first contract, which applies to any early-stage investment.
                  </p>
                  <p>
                    <b>Data.</b> Population 2025, birth rate and life expectancy 2024, GDP per capita (latest), road traffic mortality (WHO estimate, 2019), maternal mortality ratio (2023), mobile subscriptions: World Bank World Development Indicators.
                    <R n={1} /> Health insurance coverage: Demographic and Health Surveys as analysed by Barasa et al.
                    <R n={4} />
                  </p>
                </div>
              )}

    </>
  );
});

const RankTable = memo(function RankTable({
  ranked,
  sel,
  x,
  fees,
  onToggle,
  onYear,
}: {
  ranked: Scored[];
  sel: Selection;
  x: Inputs;
  fees: Fees;
  onToggle: (iso: string, on: boolean) => void;
  onYear: (iso: string, year: number) => void;
}) {
  return (
          <div className="memo-tbl memo-rank">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>In model</th>
                  <th>Country</th>
                  <th className="n">Score</th>
                  <th className="n">Population</th>
                  <th className="n">Deaths a year</th>
                  <th className="n">Per 100k</th>
                  <th className="n">Mobile /100</th>
                  <th className="n">GDP pc</th>
                  <th className="n">Insured</th>
                  <th className="n">Contract / yr</th>
                  <th>Contract year</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((row, i) => {
                  const c = row.c;
                  const on = sel[c.iso] != null;
                  const cv = contractYear(c, x, fees);
                  const deaths = deathsPerYear(c);
                  return (
                    <tr key={c.iso} className={on ? "is-sel" : undefined}>
                      <td className="n">{i + 1}</td>
                      <td>
                        <input type="checkbox" className="chk" checked={on} onChange={(event) => onToggle(c.iso, event.target.checked)} aria-label={`Include ${c.name}`} />
                      </td>
                      <td>{c.name}</td>
                      <td className="n">{row.score.toFixed(0)}</td>
                      <td className="n">{c.pop.toFixed(c.pop < 10 ? 1 : 0)}M</td>
                      <td className="n">{num(deaths)}</td>
                      <td className="n">{((deaths / (c.pop * 1e6)) * 1e5).toFixed(0)}</td>
                      <td className="n">{c.mob.toFixed(0)}</td>
                      <td className="n">{c.gdp ? usd(c.gdp) : "–"}</td>
                      <td className="n">{c.ins != null ? c.ins + "%" : "–"}</td>
                      <td className="n">{usd(cv.annual + cv.disp)}</td>
                      <td>
                        {on && (
                          <select className="yr" value={sel[c.iso]} onChange={(event) => onYear(c.iso, parseInt(event.target.value, 10))} aria-label={`Contract year for ${c.name}`}>
                            {Array.from({ length: 10 }, (_, j) => j + 1).map((yv) => (
                              <option key={yv} value={yv}>
                                Y{yv}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
  );
});
