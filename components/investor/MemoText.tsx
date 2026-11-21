"use client";

import { memo } from "react";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";
import { CopyChip } from "./Controls";

/*
 * The memo's prose sections. They never change with the model, so they are
 * memoised and do not redraw while the sliders move.
 */

/** Superscript link to a numbered source. */
export const R = ({ n }: { n: number }) => (
  <sup className="ref">
    <a href={`#r${n}`}>{n}</a>
  </sup>
);

const [uganda, germany] = site.phones;

export const Market = memo(function Market() {
  return (
      <section className="memo-sec" id="market">
        <div className="wrap memo-two">
          <div>
            <p className="eyebrow">Why now</p>
            <h2 className="t-h2-sm">The payers already exist. What is missing is the system that turns a call into a verified response.</h2>
          </div>
          <div className="memo-prose">
            <p>
              <b>Governments.</b> National emergency services are being built and paid for per response. Kenya&apos;s Social Health Authority pays KES 4,500 for each ambulance evacuation within 25 km and KES 75 per kilometre beyond, only against a verified record.
              <R n={2} /> Nigeria&apos;s national emergency medical service has grown from one territory to 34 states and is now building a national digital dispatch platform.
              <R n={11} />
            </p>
            <p>
              <b>Employers.</b> Under Uganda&apos;s Workers Compensation Act, an employer owes 60 months of a worker&apos;s earnings for a death or permanent total incapacity, plus medical costs.
              <R n={3} /> A faster, documented response costs less than the claim.
            </p>
            <p>
              <b>Insurers.</b> Health insurance coverage ranges from under 2% to 79% across the countries surveyed, with public schemes expanding fastest.
              <R n={4} /> Insurers pay for emergency care and need it verified.
            </p>
          </div>
        </div>
      </section>
  );
});

export const DataAsset = memo(function DataAsset() {
  return (
      <section className="memo-sec" id="data">
        <div className="wrap memo-two">
          <div>
            <p className="eyebrow">The data asset</p>
            <h2 className="t-h2-sm">The first minutes of an emergency are the least recorded part of any health system.</h2>
          </div>
          <div className="memo-prose">
            <p>Each Sauti call produces a timestamped, located, triaged case: what happened, how severe it was, who responded, how long each step took and where the patient went. It is captured as part of the response, so it costs nothing extra to collect.</p>
            <p>The voice and triage models are trained by Sauti on its own calls, in the languages callers actually speak. Each new country adds languages and cases, which makes the next country cheaper to enter and the models harder to copy.</p>
            <p className="memo-small">Data revenue is not included in the model.</p>
          </div>
        </div>
      </section>
  );
});

export const Evidence = memo(function Evidence() {
  return (
      <section className="memo-sec" id="evidence">
        <div className="wrap">
          <div className="memo-col">
            <p className="eyebrow">What the evidence says</p>
            <h2 className="t-h2-sm">Coordinated first response saves lives at low cost.</h2>
          </div>
          <div className="memo-two memo-evidence">
            <div className="memo-card">
              <h3>Trauma</h3>
              <p>
                Across low and middle income countries, prehospital trauma systems were associated with a 25% relative reduction in mortality (95% CI 15 to 34%), larger in rural areas. Three of the four rural programmes used trained lay responders as the first tier.
                <R n={5} /> In Kampala, lay responders trained in one day retained and used their skills for at least six months.
                <R n={6} />
              </p>
            </div>
            <div className="memo-card">
              <h3>Obstetric emergencies</h3>
              <p>
                Tanzania&apos;s m-mama community transport system completed referrals for USD 170 each against USD 472 by ambulance alone.
                <R n={7} /> In its first year in Sengerema it was associated with a 27% fall in maternal mortality, at about USD 2,000 per maternal life saved.
                <R n={8} /> The government has since taken the programme national.
                <R n={14} />
              </p>
            </div>
          </div>
        </div>
      </section>
  );
});

export const Round = memo(function Round() {
  return (
      <section className="memo-sec" id="round">
        <div className="wrap memo-two">
          <div>
            <p className="eyebrow">The round</p>
            <h2 className="t-h2-sm">Raising now.</h2>
            <p className="memo-p">Round size, terms and use of funds are shared in conversation.</p>
          </div>
          <div className="memo-prose">
            <p className="eyebrow" style={{ marginBottom: 0 }}>
              Company
            </p>
            <p>
              {site.legalName}, incorporated in Kampala in 2026. A team of nine: emergency physicians, clinicians and software engineers. The product is built and running: call intake in local languages, AI triage, responder dispatch and hospital pre-alerts.
            </p>
            <p>Registered with Uganda&apos;s Personal Data Protection Office. Data held on servers in-country. Backed by an angel investor.</p>
          </div>
        </div>
      </section>
  );
});

export const Contact = memo(function Contact() {
  return (
      <section className="memo-sec memo-contact theme-dark" id="contact">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h2 className="t-h2">Get in touch with us.</h2>
          <div className="memo-contact__chips">
            <CopyChip text={site.email} />
            <CopyChip text={germany.display} />
            <CopyChip text={uganda.display} />
          </div>
          <div className="actions">
            <ButtonLink href="/contact?topic=investor" variant="secondary" size="lg">
              Send a message
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}?subject=${encodeURIComponent("Sauti investor conversation")}`} variant="outline" size="lg">
              Email
            </ButtonLink>
          </div>
          <p className="memo-contact__addr">
            {site.address.join(", ")} · Reg. No. {site.regNo}
          </p>
        </div>
      </section>
  );
});

export const Sources = memo(function Sources() {
  return (
      <section className="memo-sec" id="sources">
        <div className="wrap">
          <p className="eyebrow">Sources</p>
          <ol className="refs">
            <li id="r1">
              World Bank, World Development Indicators (API, accessed November 2026): SP.POP.TOTL, SP.DYN.CBRT.IN, SP.DYN.LE00.IN, NY.GDP.PCAP.CD, SH.STA.TRAF.P5 (WHO estimate), SH.STA.MMRT (WHO/UN MMEIG), IT.CEL.SETS.P2; country income classification.{" "}
              <a href="https://data.worldbank.org" target="_blank" rel="noopener noreferrer">data.worldbank.org</a>
            </li>
            <li id="r2">
              Social Health Authority, Kenya. Ambulance emergency transfer tariffs, Annexure B3-B, September 2026.{" "}
              <a href="https://www.sha.go.ke/wp-content/uploads/2026/09/ANNEXURE-B3-B-Ambulance-Emergency-Transfer-Tariffs.pdf" target="_blank" rel="noopener noreferrer">sha.go.ke</a>
            </li>
            <li id="r3">
              Workers Compensation Act, Cap. 225, Laws of Uganda.{" "}
              <a href="https://ira.go.ug/cp/uploads/Workers%20Compensation%20Act%20Cap%20225.pdf" target="_blank" rel="noopener noreferrer">ira.go.ug</a>
            </li>
            <li id="r4">
              Barasa E, Kazungu J, Nguhiu P, Ravishankar N. Examining the level and inequality in health insurance coverage in 36 sub-Saharan African countries. BMJ Global Health 2021;6:e004712.{" "}
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8076950/" target="_blank" rel="noopener noreferrer">PMC8076950</a>
            </li>
            <li id="r5">
              Henry JA, Reingold AL. Prehospital trauma systems reduce mortality in developing countries: a systematic review and meta-analysis. J Trauma Acute Care Surg 2012;73:261–8.{" "}
              <a href="https://supportsummaries.epistemonikos.org/support-summaries/show/do-pre-hospital-trauma-systems-reduce-mortalitya" target="_blank" rel="noopener noreferrer">SUPPORT summary</a>
            </li>
            <li id="r6">
              Jayaraman S et al. First Things First: effectiveness and scalability of a basic prehospital trauma care program for lay first-responders in Kampala, Uganda. PLoS ONE 2009;4:e6955.{" "}
              <a href="https://ideas.repec.org/a/plo/pone00/0006955.html" target="_blank" rel="noopener noreferrer">record</a>
            </li>
            <li id="r7">
              Community-based transport system in Shinyanga, Tanzania. PLOS Global Public Health 2023.{" "}
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10395988/" target="_blank" rel="noopener noreferrer">PMC10395988</a>
            </li>
            <li id="r8">
              Touch Foundation. Mobilising Maternal Health: m-mama in Sengerema, Tanzania, 2017.{" "}
              <a href="https://www.telecomtv.com/content/tracker/vodafone-foundations-pioneering-ambulance-taxi-service-reduces-maternal-mortality-rate-by-a-quarter-new-research-reveals-26961" target="_blank" rel="noopener noreferrer">summary</a>
            </li>
            <li id="r9">
              GiveWell, cost to save a life for top charities (April 2024), as compiled by Our World in Data.{" "}
              <a href="https://ourworldindata.org/cost-effectiveness" target="_blank" rel="noopener noreferrer">ourworldindata.org</a>
            </li>
            <li id="r10">
              Google Cloud, NVIDIA L4 on-demand price per GPU-hour (us-central1), as listed November 2026.{" "}
              <a href="https://computeprices.com/providers/google/gpus/l4" target="_blank" rel="noopener noreferrer">computeprices.com</a>
            </li>
            <li id="r11">
              Federal Ministry of Health, Nigeria: NEMSAS expansion to 34 states and plans for a digital emergency dispatch platform, July 2026, as reported by Premium Times.{" "}
              <a href="https://www.premiumtimesng.com/health/health-news/894343-fg-expands-emergency-healthcare-system-to-34-states-plans-digital-dispatch-platform.html" target="_blank" rel="noopener noreferrer">premiumtimesng.com</a>
            </li>
            <li id="r12">
              Government of Ghana, Public Procurement Authority approval of a USD 12.5 million, four-year contract for nationwide medical drone delivery (December 2018), as reported by Citi Newsroom.{" "}
              <a href="https://citinewsroom.com/2018/12/03/govt-signs-12m-deal-for-nationwide-drone-delivery-of-medical-supplies/" target="_blank" rel="noopener noreferrer">citinewsroom.com</a>
            </li>
            <li id="r13">
              108 emergency service, India: government-funded setup, operations contracted to private operators; infrastructure under USD 0.50 per person served.{" "}
              <a href="https://en.wikipedia.org/wiki/108_(emergency_telephone_number)" target="_blank" rel="noopener noreferrer">summary</a>; Andhra Pradesh 108 request for proposals{" "}
              <a href="https://cfw.ap.nic.in/pdf/108%20RFP-%20final%20version.pdf" target="_blank" rel="noopener noreferrer">cfw.ap.nic.in</a>
            </li>
            <li id="r14">
              Vodafone Foundation. m-mama expands nationally in Tanzania, April 2022.{" "}
              <a href="https://foundation.vodafone.com/news/vodafone-foundation/m-mama-expands-nationally-in-tanzania" target="_blank" rel="noopener noreferrer">foundation.vodafone.com</a>
            </li>
          </ol>
          <p className="memo-small memo-disclaimer">For discussion with prospective investors; not an offer of securities.</p>
        </div>
      </section>
  );
});
