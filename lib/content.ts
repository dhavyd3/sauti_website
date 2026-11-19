import type { MediaId } from "./media";

/**
 * All page copy lives here so text can be edited without touching layout code.
 * Facts come from the current sautihealth.com, the Kawempe Corridor study
 * protocol (v2.0) and the Privacy Notice of 15.07.2026. Nothing is invented.
 */

/* ------------------------------------------------------------------ Home */

export const home = {
  hero: {
    status: "Piloting in Kampala, Uganda",
    title: ["Every call", "counts"],
    lead: "Emergency help from any phone, on any network. And the health data that never existed.",
    cta: { label: "See how it works", href: "/how-it-works" },
    media: "homeHero" as MediaId,
  },
  gap: {
    lines: ["4.5 billion people", "aren’t fully covered", "by essential health care"],
    source: "WHO and World Bank, Tracking Universal Health Coverage: 2023 Global Monitoring Report.",
    chip: "neighbourhood" as MediaId,
    panels: [
      {
        title: ["Care happens", "every day"],
        body: "Where services are thinnest, community health workers act every day. Their work goes unrecorded.",
        media: "neighbourhood" as MediaId,
      },
      {
        title: ["Unrecorded", "means unseen"],
        body: "What is never recorded cannot be seen, and what cannot be seen cannot be planned for.",
        media: "records" as MediaId,
      },
      {
        title: ["So the cycle", "repeats"],
        body: "The health system never learns from the places where care is thinnest. Sauti breaks that cycle by connecting what happens in the community to what institutions can see.",
        media: "junction" as MediaId,
      },
    ],
  },
  statement: {
    quote: "The absence of data is not a technical problem. It is a structural one.",
    note: "Where Sauti starts",
    media: "kampalaHills" as MediaId,
  },
  how: {
    title: ["How Sauti", "works"],
    steps: [
      {
        name: "Call",
        body: "A toll-free short code or voice call from any basic phone. No data, no app.",
        media: "phoneInHand" as MediaId,
      },
      {
        name: "Triage",
        body: "Each call is classed red, yellow or green so the most urgent go first.",
        media: "triage" as MediaId,
        triage: true,
      },
      {
        name: "Respond",
        body: "The nearest trained community first responder is alerted and sent.",
        media: "responder" as MediaId,
      },
      {
        name: "Treat or transfer",
        body: "First aid on scene, then transport to the nearest health facility.",
        media: "facility" as MediaId,
      },
    ],
  },
  data: {
    title: ["Every call", "becomes data."],
    body: "Time and place of each call, its severity, response times and what responders find on scene. Captured as a byproduct of care, never as extra paperwork, and stored on servers in Uganda.",
    cta: { label: "Follow a call", href: "/how-it-works" },
    media: "junction" as MediaId,
  },
  approach: {
    eyebrow: "Our approach",
    steps: [
      {
        title: ["A new class", "of health data."],
        body: "Timestamped, geolocated, longitudinal records linked to outcomes, created where none existed.",
        media: "records" as MediaId,
      },
      {
        title: ["Coordination", "as infrastructure."],
        body: "Every dispatch, referral and response generates data automatically. The act of coordination is the act of recording.",
        media: "responder" as MediaId,
      },
      {
        title: ["Compounding", "value."],
        body: "Response times, case distribution, seasonal burden and resource gaps become visible to health ministries.",
        media: "kampalaHills" as MediaId,
      },
      {
        title: ["Replicable", "by design."],
        body: "Built for any context where action outpaces visibility. The pilot tests the model in one place, so it can travel to the next.",
        media: "neighbourhood" as MediaId,
      },
    ],
  },
  stats: [
    { value: 0, decimals: 0, unit: "", label: "Apps or data bundles needed", media: "phoneInHand" as MediaId },
    { value: 1.6, decimals: 1, unit: " km", label: "Junction to referral hospital", media: "junction" as MediaId },
    { value: 60, decimals: 0, unit: " days", label: "Of live dispatch in the pilot", media: "transporter" as MediaId },
  ],
  explore: {
    title: "Go deeper",
    cta: { label: "Get in touch", href: "/contact" },
    cards: [
      { title: "How a call becomes a response", href: "/how-it-works", media: "phoneInHand" as MediaId },
      { title: "Inside the Kawempe corridor pilot", href: "/pilot", media: "junction" as MediaId },
      { title: "Who is building Sauti, and why", href: "/about", media: "kampalaHills" as MediaId },
      { title: "How we protect personal data", href: "/privacy", media: "records" as MediaId },
    ],
  },
};

export const footer = {
  title: ["Sauti.", "Every voice counts."],
  cta: { label: "Get in touch", href: "/contact" },
  media: "footerSky" as MediaId,
  note: "Images on this site are illustrative.",
};

/* ----------------------------------------------------------------- About */

export type TeamMember = { name: string; role: string; photo?: string };

export const about = {
  hero: {
    eyebrow: "About Sauti",
    title: ["We make care", "visible"],
    lead: "Medicine’s most powerful tools should reach everyone.",
    media: "kampalaHills" as MediaId,
  },
  story: {
    title: "Where action outpaces visibility",
    paragraphs: [
      "Sauti builds data infrastructure that generates structured health intelligence from places that have never had any, starting with emergency response.",
      "About 4.5 billion people are not fully covered by essential health services. Where they live, community health workers act every day, but their work goes unrecorded. Sauti connects what happens in the community to what institutions can see.",
    ],
    media: "neighbourhood" as MediaId,
  },
  why: {
    eyebrow: "Why emergency response first",
    title: ["The minutes", "that matter most"],
    points: [
      {
        title: "The thinnest record",
        body: "The minutes after an emergency are where coordination matters most and where the record is thinnest. Hospital records begin at the door.",
      },
      {
        title: "Coordination, not distance",
        body: "In our pilot area, a specialist maternity unit sits 1.6 kilometres from the junction where emergencies concentrate. What is missing is a number to call and someone to send.",
      },
      {
        title: "The phone people already have",
        body: "Sauti works over voice and text on any basic mobile phone. No app, no internet, no existing system required.",
      },
    ],
  },
  team: {
    title: ["Meet the Sauti", "Health team"],
    intro:
      "Sauti is built by a team from the University of Bonn, Makerere University and Mbarara University of Science and Technology.",
    /** Add `photo: "/images/team/file.jpg"` to a person once you have their picture. */
    members: [
      { name: "Hillary Turinawe", role: "Founder and CEO", photo: "/images/team/hillary-turinawe.jpg" },
      { name: "Dr. Ronald Kyeyune", role: "Chief Operating Officer", photo: "/images/team/ronald-kyeyune.jpg" },
      { name: "Bernard Mwesigye", role: "Emergency Physician", photo: "/images/team/bernard-mwesigye.jpg" },
      { name: "Dr. Ambrose Okello", role: "Emergency Physician", photo: "/images/team/ambrose-okello.jpg" },
      { name: "Dr. Jacob", role: "Emergency Doctor", photo: "/images/team/jacob.jpg" },
      { name: "Onama John", role: "Chief Financial Officer", photo: "/images/team/onama-john.jpg" },
      { name: "Okorobe Pascal Mathew", role: "Head of Research and Development", photo: "/images/team/okorobe-pascal-mathew.jpg" },
      { name: "Mpairwe Lauben", role: "Technical engineer", photo: "/images/team/mpairwe-lauben.png" },
      { name: "Rwemera David", role: "Technical engineer", photo: "/images/team/rwemera-david.jpg" },
    ] as TeamMember[],
  },
  cta: {
    title: ["Let’s build", "this together"],
    body: "We are building with researchers, health systems and partners. If you work on emergency care, community health or health data, we would like to hear from you.",
    cta: { label: "Start a conversation", href: "/contact" },
  },
};

/* ---------------------------------------------------------- How it works */

export const howItWorks = {
  hero: {
    eyebrow: "How it works",
    title: ["Any phone.", "Any network."],
    lead: "Help on the way, without an app, a smartphone or a data bundle.",
    media: "phoneInHand" as MediaId,
  },
  principle: {
    title: "Built for the phone people already have",
    paragraphs: [
      "All of Sauti’s intelligence sits on the server. Anyone with a basic handset can complete every essential step. Smartphone features are additions, never requirements.",
      "This is a design decision, not a resource constraint. Most people living within mobile coverage in sub-Saharan Africa do not use the internet, and a design that depends on smartphones leaves out the people most at risk in an emergency.",
    ],
  },
  journey: {
    title: ["One call,", "start to finish"],
    steps: [
      {
        name: "Reach Sauti",
        body: "Dial the toll-free short code or call the voice line from any basic phone. Recorded prompts in Luganda and English are answered on the keypad.",
        media: "phoneInHand" as MediaId,
      },
      {
        name: "Triage",
        body: "A few short questions class the emergency red, yellow or green, so the most urgent calls go first.",
        media: "triage" as MediaId,
        triage: true,
      },
      {
        name: "Alert the nearest responders",
        body: "The nearest trained community first responder is alerted and sent, together with a community transporter. If one cannot take the call, the alert passes to the next.",
        media: "responder" as MediaId,
      },
      {
        name: "Treat, then transfer",
        body: "First aid on scene from a Village Health Team member, then transport by boda boda to the nearest health facility.",
        media: "transporter" as MediaId,
      },
      {
        name: "Hand over and follow up",
        body: "The patient is handed over at the facility, and Sauti calls back later to check how they are.",
        media: "facility" as MediaId,
      },
    ],
  },
  responders: {
    eyebrow: "Who responds",
    title: ["Two roles,", "one response"],
    roles: [
      {
        name: "Village Health Team member",
        body: "A trained and certified community health volunteer who gives first aid at the scene.",
      },
      {
        name: "Community transporter",
        body: "A boda boda rider who carries the patient to the nearest health facility.",
      },
    ],
    note: "Responders are paid by mobile money for each completed response.",
    media: "responder" as MediaId,
  },
  data: {
    eyebrow: "The record",
    title: ["Every call", "becomes data"],
    intro: "The record is a byproduct of care, never extra paperwork.",
    items: [
      "Time and place of each call",
      "How serious it was",
      "How long each stage of the response took",
      "What the responder found and did on scene",
      "Where the patient was taken",
      "How the patient was a day or two later",
    ],
    note: "All personal data is stored on servers in Uganda. Researchers work with a version that has no names or phone numbers.",
    cta: { label: "Read the privacy notice", href: "/privacy" },
  },
};

/* ----------------------------------------------------------------- Pilot */

export const pilot = {
  hero: {
    eyebrow: "The pilot",
    title: ["The Kawempe", "corridor"],
    lead: "A feasibility study of community-coordinated emergency dispatch over basic mobile phones in Kampala.",
    media: "junction" as MediaId,
  },
  setting: {
    title: "Two emergency burdens, one small area",
    paragraphs: [
      "The Kampala Northern Bypass meets Bombo Road at Bwaise and Gayaza Road at Kalerwe. The junctions carry a high density of road traffic injury, concentrated among pedestrians and motorcyclists. The surrounding wards are dense, low-income settlements with a substantial obstetric burden.",
      "Kawempe National Referral Hospital, the country’s largest specialised maternity unit, sits about 1.6 kilometres from the Bwaise junction. Everything in the study happens inside a triangle less than two kilometres on a side.",
      "The failure being addressed is coordination, not distance and not clinical capability.",
    ],
    media: "neighbourhood" as MediaId,
  },
  facts: [
    { value: 1.6, decimals: 1, unit: " km", label: "Bwaise junction to the hospital", media: "junction" as MediaId },
    { value: 23000, decimals: 0, unit: "", label: "Births a year there, approx.", media: "facility" as MediaId },
    { value: 60, decimals: 0, unit: " days", label: "Operational window", media: "transporter" as MediaId },
  ],
  design: {
    eyebrow: "Study design",
    title: ["What the pilot", "sets out to learn"],
    primary:
      "Whether coordinated community dispatch over basic mobile telephony can be delivered as intended in this setting, measured by the interval from emergency call to responder arrival at the scene.",
    secondary: [
      "Whether community responders paid per completed incident respond dependably",
      "Whether the record generated as a byproduct of the response is complete enough to support a later evaluation",
      "What one coordinated prehospital response costs to deliver",
      "Which implementation processes and local factors explain those results",
    ],
    limit:
      "The study is not designed or powered to determine whether the intervention reduces mortality, and no such claim is made from it. That question needs a larger, later study, for which this pilot supplies the operational parameters.",
  },
  lessons: {
    eyebrow: "Designed against earlier lessons",
    title: ["What an earlier", "service taught us"],
    intro:
      "An emergency call and dispatch centre for maternal and newborn referral was set up earlier in two other divisions of Kampala. Its published evaluation shaped this design.",
    items: [
      {
        title: "No app, no smartphone, no data bundle",
        body: "The earlier smartphone app failed in use: too few data bundles, poor connectivity and no time to type during an emergency.",
      },
      {
        title: "Community activation is measured",
        body: "Calls from the community under-performed before. Here it is an outcome the study measures, not an assumption.",
      },
      {
        title: "Outcomes set in advance",
        body: "Outcomes and the thresholds for moving to a larger study are specified before the first dispatch.",
      },
    ],
  },
  details: {
    title: "Study details",
    rows: [
      { label: "Full title", value: "Community coordinated prehospital emergency dispatch over basic mobile telephony in an urban corridor in Kampala" },
      { label: "Short title", value: "The Kawempe Corridor Dispatch Study" },
      { label: "Design", value: "Prospective, single-arm, observational feasibility study with a nested qualitative process evaluation" },
      { label: "Sponsor", value: "Sauti Dispatch Limited, Kampala, Uganda" },
      { label: "Study site", value: "Bwaise and Kalerwe, Kawempe Division, Kampala" },
      { label: "Receiving facility", value: "Kawempe National Referral Hospital" },
      { label: "Duration", value: "Fourteen days of mobilisation, sixty operational days, and a pre-specified thirty-day extension" },
      { label: "Data protection", value: "Registered with the Personal Data Protection Office, PDPO-202605-12657" },
    ],
  },
  cta: {
    title: ["Working on", "emergency care?"],
    body: "We welcome conversations with researchers, health systems and funders about the pilot and what follows it.",
    cta: { label: "Talk to us about the pilot", href: "/contact?topic=research" },
  },
};

/* --------------------------------------------------------------- Contact */

export const contact = {
  hero: {
    eyebrow: "Contact",
    title: ["Let’s talk"],
    lead: "This problem is large enough to warrant a serious conversation.",
  },
  intro:
    "We are building with researchers, health systems and partners. If you work on emergency care, community health or health data, we would like to hear from you.",
  topics: [
    { value: "partnership", label: "Partnership" },
    { value: "research", label: "Research or the pilot" },
    { value: "health-system", label: "Health system or facility" },
    { value: "press", label: "Press" },
    { value: "other", label: "Something else" },
  ],
  emergencyNote:
    "This form is not for emergencies. If someone needs urgent help, contact your local emergency services or go to the nearest health facility.",
};

/* --------------------------------------------------------------- Privacy */

export const privacy = {
  title: ["Privacy", "notice"],
  date: "15 July 2026",
  intro:
    "Sauti Dispatch Limited (“Sauti”, “we”) runs an emergency dispatch service in Kampala. When someone dials our emergency USSD code or IVR line, we alert a trained community responder and help the patient reach a health facility. This notice explains what personal data we collect, why, who sees it, how long we keep it and what your rights are. It applies to callers and patients, to community responders, and to people who take part in the pilot study.",
  who: [
    {
      label: "Controller",
      value:
        "Sauti Dispatch Limited, Plot 160, Makerere, Sir Apollo Kagwa Road, P.O. Box 23488, Kampala. Registered with the Personal Data Protection Office under PDPO-202605-12657.",
    },
    { label: "Data Protection Officer", value: "Hillary Turinawe (interim), hillary@sautihealth.com, +256 764 442 593" },
    {
      label: "Independent officer",
      value: "An independent Data Protection Officer will take over by 31.12.2026. This notice will then be updated.",
    },
  ],
  collect: [
    {
      who: "Callers and patients",
      what: "Your phone number, where you are (area and landmark), the time, the type and seriousness of the emergency, the age group of the patient, what the responder did, where the patient was taken and how the patient was 24 to 48 hours later",
      why: "To send a responder, to guide them and to hand the patient over. To call you back to check on the patient.",
      basis: "Protecting the vital interests of a person in an emergency. This does not depend on your consent.",
    },
    {
      who: "Callers and patients, for research",
      what: "The same record, kept without your name and number",
      why: "To study whether the service works and to improve it",
      basis:
        "Your consent, asked for after the emergency. For a child, a parent or guardian’s permission and the child’s agreement. Where consent cannot be obtained, the waiver granted by the ethics committee.",
    },
    {
      who: "Community responders",
      what: "Name, phone number, ward, mobile money details, training and test results, availability, alerts accepted, declined and completed, payments",
      why: "To train, alert and pay you and to keep the service safe",
      basis:
        "Your contract with us. Research use of your data needs your separate written consent, which you may decline and still work and be paid.",
    },
    {
      who: "Interview participants",
      what: "Audio recordings if you agree, transcripts and notes",
      why: "To learn how the service works for people who use it",
      basis: "Your consent",
    },
  ],
  collectNote:
    "Health information is sensitive personal data and gets our highest level of protection. We collect only the fields we need to dispatch help.",
  where: [
    "All personal data is stored on servers in Uganda. We do not send it out of the country.",
    "Only named staff with a role that needs it can see names and phone numbers. Researchers work with a version that has no names or phone numbers.",
    "Africa’s Talking carries the USSD and voice traffic for us under a data processing agreement and does not receive our research data. Mobile money providers see only what they need to make a payment.",
    "We do not sell personal data and we do not share it with anyone for marketing.",
    "We may share a version without names or phone numbers with approved researchers, only after an ethics committee has approved the use and a signed agreement is in place.",
    "We publish results only in a form that does not identify anyone.",
  ],
  retention: [
    { data: "Records that identify you", period: "12 months after the study period ends, then destroyed" },
    {
      data: "Research records without names or phone numbers, consent forms and the audit trail",
      period: "Five years after the study is complete, as the research rules require",
    },
    { data: "The key that links research records to you", period: "12 months after the main study results are published, then destroyed" },
    { data: "Interview audio", period: "Until the transcript is checked, and no later than 12 months after the study period ends" },
  ],
  rights: [
    "You can ask to see the data we hold about you, to correct it, to have it deleted, to object to how we use it, and to withdraw your consent at any time. If you withdraw, we remove your record from the research data and do not use it in later analysis. We cannot remove it from results that were already published, and we say so when we ask for consent. You do not need to give a reason. A person who ended up in our records without being asked, for example because they died or could not be reached, can also ask us to remove the record.",
    "To use any of these rights, call or write to the Data Protection Officer using the details above. We will answer within 14 days.",
  ],
  breach:
    "If personal data is lost or exposed in a way that could harm you, we will tell the Personal Data Protection Office within 72 hours, and we will tell you without delay if the risk to you is high.",
  complaints:
    "If you are unhappy with how we handled your data, tell us first and we will try to put it right. You may also complain to the Personal Data Protection Office at www.pdpo.go.ug.",
  changes:
    "We review this notice at least once a year and whenever our processing changes. The current version is always at www.sautihealth.com and on the notice boards where the service operates.",
  shortForm: {
    intro: "Read or shown to the caller after the emergency is handled, in Luganda and English:",
    text: "“Sauti has recorded your call to send help. We keep your number only to call you back and to pay responders, in Uganda, and do not share it. You may ask us to see, correct or delete it, or to stop using it for research, by calling +256 764 442 593. Full notice: www.sautihealth.com.”",
  },
  approval: "Approved by the Board of Directors of Sauti Dispatch Limited.",
  website: {
    title: "This website",
    items: [
      "The contact form sends your name, organisation, email address and message to our team by email so we can reply. We do not add you to a mailing list.",
      "We count page views with GoatCounter, which sets no cookies and does not track you across sites.",
      "The website does not use advertising or social media trackers.",
    ],
  },
};
