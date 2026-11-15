# Sauti Health website: current-site analysis and reference sites

Prepared 14 Nov 2026. Source: live review of https://sautihealth.com/ (page text, CSS, metadata and page code), plus the internal build prompt (`../sauti-build-prompt.md`) for product facts that the current site does not mention.

---

## Part 1. What the current site is

A single long page (about 5,000 px tall) with five anchor sections. There are no other pages: `/about`, `/team`, `/contact`, `/blog`, `/privacy`, `/sitemap.xml` and `/robots.txt` all return 404.

| Section | Anchor | Content |
| --- | --- | --- |
| Hero | `#top` | Pill "Piloting in Kampala, Uganda". H1 "Medicine's most powerful tools should reach everyone." Two buttons: "Start a conversation" (mailto) and "How emergency response works" (jumps to #emergency). University credit line. |
| 01 The gap | `#gap` | 4.5 billion people without full essential health coverage; community health work goes unrecorded. |
| 02 Our approach | `#approach` | "Decouple data generation from infrastructure dependency." Four numbered pillars. |
| 03 Where we start | `#emergency` | Four steps: Call, Triage (red/yellow/green), Respond, Treat or transfer. Callout "Every call becomes data." |
| 04 Let's talk | `#contact` | Email, two phone/WhatsApp numbers, registered office. |
| Footer | | Legal name and registration number. |

### 1.1 Content inventory (reuse in the new site)

**Positioning**
- Page title: "Sauti Health · Health data infrastructure, starting with emergency response"
- Meta description: "Sauti builds data infrastructure that generates structured health intelligence from places that have never had any, starting with emergency response."
- Logo tagline: "dispatch. respond. save."
- Hero H1: "Medicine's most powerful tools should reach everyone."
- Hero sub: "Sauti builds data infrastructure that generates structured health intelligence from places that have never had any, starting with emergency response."
- Credibility: "Built by a team from University of Bonn (Germany), Makerere University and Mbarara University of Science and Technology."

**01 The gap.** "The absence of data is not a technical problem. It is a structural one." About 4.5 billion people are not fully covered by essential health services. Community health workers act every day but their work goes unrecorded; what is never recorded cannot be planned for, so the cycle repeats. Sauti connects what happens in the community to what institutions can see.
Source: WHO and World Bank, *Tracking Universal Health Coverage: 2023 Global Monitoring Report*.

**02 Our approach.** "Decouple data generation from infrastructure dependency." Voice and text on any basic mobile phone; no app, no internet, no existing system required.
1. *A new class of health data*: generating records where the record was zero. Timestamped, geolocated, longitudinal records linked to outcomes.
2. *Coordination as infrastructure*: the act of coordination is the act of recording. Every dispatch, referral and response generates data automatically.
3. *Compounding value*: a dataset that grows more valuable over time. Response times, case distribution, seasonal burden and resource gaps become visible to health ministries.
4. *Replicable by design*: built for any context where action outpaces visibility.

**03 Where we start.** "Emergency response first. Any phone, any network, help on the way."
1. *Call*: toll-free short code or voice call from any basic phone. No data, no app.
2. *Triage*: each call is classed red, yellow or green so the most urgent go first.
3. *Respond*: the nearest trained community first responder is alerted and sent.
4. *Treat or transfer*: first aid on scene, then transport to the nearest health facility.
"Every call becomes data": time and place, severity, caller, response times and on-scene findings, captured as a byproduct of care and stored on servers in Uganda.

**04 Contact**
- Email: info@sautihealth.com
- Phone / WhatsApp Uganda: +256 764 442 593
- Phone / WhatsApp Germany: +49 157 3785 8903
- Registered office: Plot 160, Sir Apollo Kaggwa Road, Kampala, Uganda
- Legal: © 2026 Sauti Dispatch Limited · Reg. No. 80034434888019 · Kampala, Uganda

### 1.2 Product facts the current site leaves out (from the build prompt)

Check with the team which of these may be public before using them.
- Pilot area: six wards of Kawempe Division, Kampala (Bwaise I, II, III, Kazo-Angola, Kawempe I, Kawempe II).
- Two responder roles per incident: a Village Health Team (VHT) member for first aid and a community transporter (boda boda).
- Escalation: if nobody accepts, the search widens in rings and the request is forwarded to the nearest registered health centre.
- Channels: zero-rated USSD short code and a toll-free voice line with recorded Luganda and English prompts. Works on a basic 2G handset with no data and no airtime.
- Responders are paid by mobile money (MTN MoMo, Airtel Money).
- Every incident is tracked from call to facility with timestamps (T1 to T7) analysed by the pilot study.
- All personal data stays in Uganda, on Sauti's own servers at two Ugandan sites.

### 1.3 Current design system (as built)

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#F5F5F3` | page background |
| `--surface` | `#FFFFFF` | alternate sections |
| `--ink` | `#17221C` | headings, body |
| `--ink-soft` | `#4E5A54` | body copy |
| `--ink-faint` | `#6B756F` | captions |
| `--line` | `#E3E5E1` | dividers |
| `--green` | `#059153` | buttons, accents |
| `--green-ink` | `#046B3D` | eyebrow labels, pill text |
| `--green-tint` | `#EAF5EF` | pill background |
| triage red / amber | `#C8372D` / `#E0A100` | triage chips |

**Logo colours (from the logo file):** lime `#C9F44B`, near-black `#100D10`, tagline olive `#528000` in a serif italic.

- Font: Plus Jakarta Sans 400–800 (Google Fonts). H1 76px / 800 / −1.4px tracking; H2 28px / 700; H3 18–19px / 700.
- Buttons: 10px radius; primary solid green with white text; secondary white with a 1px grey border.
- Layout: 1120px container, sections alternate `#F5F5F3` and white.
- Analytics: GoatCounter (cookieless, privacy-friendly). Worth keeping.

### 1.4 Why it doesn't look professional

1. **The site doesn't match its own logo.** The logo is lime and black with a serif italic tagline; the site uses a generic emerald green and never uses the lime. The brand reads as two different companies.
2. **No imagery at all.** No photos of Kampala, responders, boda bodas or phones, no illustrations, no icons, no diagrams. It's about 5,000 px of text on near-white.
3. **No motion.** No transitions or animations anywhere in the CSS.
4. **One page only.** No About/Team, How it works, Pilot, Partners, Research/Data, News or Privacy page. No sitemap or robots.txt, which hurts search visibility.
5. **Generic buttons.** Standard rounded rectangles that any template ships with; nothing ownable.
6. **Every call to action is a `mailto:` link.** No contact form, so visitors without a mail client set up hit a dead end.
7. **Weak proof.** The universities are a line of plain text with no logos. No team faces, no numbers, no partner wall.
8. **No privacy page.** For a company whose product is health data, a public privacy notice matters, and the internal security docs already include one.
9. **No social share image.** There's no `og:image` or Twitter card, so links shared on WhatsApp or LinkedIn show no preview picture.
10. **Raster logo.** The logo and favicon are base64-embedded PNGs; they should be SVG for sharpness and page weight.

### 1.5 What's worth keeping

- The copy. It's clear, serious and well-argued; it mostly needs structure and visuals, not a rewrite.
- The red / yellow / green triage system. It's a natural visual motif (status dots, chips, a pulse line).
- The heartbeat mark. It's the strongest brand asset, and the ECG line can drive animations (line-draw on load, hover pulse on buttons).
- The numbered-section editorial structure (01, 02, 03).
- Cookieless analytics and the "data stays in Uganda" message.

---

## Part 2. Five reference sites

All five were checked live on 14 Nov 2026. Fonts, colours, button styles and libraries below come from each site's page code. The browser pane was hidden during this review, so I couldn't capture screenshots; open each link to judge the look yourself.

### 1. Zipline: https://www.zipline.com/
**What they do:** medical drone delivery, started in Rwanda and Ghana. The best-known African health-logistics brand.
**Design:** cinematic and confident. Warm cream background (`#F7F4E8`), huge condensed display headlines (custom "FK Screamer" face) with short punchy lines ("Look up", "More time, delivered."), background video, and pill-shaped buttons.
**Borrow for Sauti:** full-bleed photography and video of real places, very short big headlines, cream base instead of grey-white, storytelling down the page.

### 2. RapidSOS: https://rapidsos.com/
**What they do:** emergency response data and AI for 911 and first responders. The closest sector match to "every call becomes data".
**Design:** black and charcoal sections (`#000`, `#1A1A1A`), the clean geometric "Aeonik" sans with a mono companion, black/white pill buttons ("Book a demo"), lots of product-UI imagery and short video, story cards ("13 Seconds: The Documentary").
**Borrow:** a dark "data" section showing the dispatch flow as a product UI, audience-specific pages (health systems, researchers, partners), story and documentary cards.

### 3. Corti: https://www.corti.ai/
**What they do:** AI for emergency calls and clinical conversations, with a "sovereign cloud" pitch.
**Design:** near-black page (`#08090A`) with a **lime accent (`#B8F818`), almost the same colour as the Sauti logo lime (`#C9F44B`)**. "Booton" sans paired with IBM Plex Mono and Departure Mono for a technical, data-infrastructure feel; an animated canvas graphic in the hero.
**Borrow:** proof that black plus lime looks premium in health tech, monospace labels for data and timestamps (fits T1–T7, coordinates, call IDs), and "sovereign data" messaging that matches data staying in Uganda.

### 4. Abridge: https://www.abridge.com/
**What they do:** voice AI for clinical conversations. A thematic match, since "Sauti" means "voice" in Swahili.
**Design:** warm and editorial. Off-white (`#FBF9F6`) with a single strong accent (orange `#EA2C00`), the "Avantt" sans, big stat callouts ("100M+ conversations powered each year"), and smooth scroll-triggered animations built with GSAP ScrollTrigger on Webflow.
**Borrow:** the animation approach (reveal-on-scroll, pinned sections, counters), one-accent discipline, and a calm, humane tone for a serious subject.

### 5. Prepared (now part of Axon): https://www.prepared911.com/
**What they do:** AI for 911 call-takers and dispatchers.
**Design:** cream (`#FCF9F2`) with a dark olive-charcoal section (`#2E2F29`), "Season Sans" with DM Mono, small-radius dark buttons, and a staged "from the first ring to the final…" product walkthrough.
**Borrow:** a staged walkthrough of the call journey that maps directly onto Sauti's Call → Triage → Respond → Treat flow, and mono step labels.

**Honourable mention: Medic, https://medic.org/** (Community Health Toolkit, for community health workers across Africa). The visual design is dated, but its information architecture is a good model for pages: About, Strategy, Tools, Research, Stories, Reports & Financials.

---

## Part 3. Early direction (to confirm before building)

- **Colour:** build from the logo. Lime `#C9F44B` as the signature accent, near-black ink, warm off-white base; keep red / amber / green only for triage. Retire the emerald `#059153`, or keep a deep green only for small text where lime fails contrast.
- **Signature button:** a pill with a small ECG "pulse" line that draws across on hover (or a triage-dot that beats), so the button itself carries the heartbeat mark.
- **Motion:** ECG line-draw in the hero, scroll reveals, a pinned Call → Triage → Respond → Treat sequence, and counters. Respect `prefers-reduced-motion`.
- **Candidate pages:** Home, How it works, The pilot (Kawempe), About & team, Research & data, Partners, News/Stories, Contact (with a form), Privacy.
