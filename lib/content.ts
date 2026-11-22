/**
 * All page copy lives here so text can be edited without touching layout code.
 * Write **two asterisks** around words to make them bold.
 * News items are not here: they are in content/news.md.
 */

import { site } from "./site";

/* ------------------------------------------------------------------ Home */

export type Shot = { src: string; width: number; height: number; label: string; alt: string; caption: string };

export const home = {
  hero: {
    title: "Emergency dispatch that",
    titleHighlight: "understands every caller.",
    lead: "A caller speaks in their own language, on any phone. Sauti transcribes, translates and triages the call, sends the nearest trained responder and alerts the hospital.",
    primary: { label: "Start a conversation", href: "/contact" },
    secondary: { label: "See how it works", href: "/#how" },
    proof: [
      "Built for **50+ languages**, live in **Luganda, Swahili and English**",
      "**Any phone**, no app, no internet",
    ],
    /** The Sauti Command screenshot beside the headline. Always say "test data" in the caption. */
    shot: {
      src: "/images/command/voice.jpg",
      width: 900,
      height: 1685,
      label: "Voice call",
      alt: "Sauti Command voice panel: a call in Luganda transcribed and translated to English, ranked red as an obstetric emergency, located at Kalerwe market, with the nearest unit recommended",
      caption: "A call in Luganda, transcribed, translated and triaged. Sauti Command, test data.",
    } satisfies Shot,
  },

  different: {
    eyebrow: "What makes Sauti different",
    title: "An emergency call only works if someone understands it.",
    languages: {
      title: "Understands the caller, in 50+ languages",
      body: "People in an emergency speak the language they think in. Sauti listens in that language, writes down what was said and gives the dispatcher an English summary within seconds.",
      examples: ["Luganda", "Swahili", "English", "and more"],
    },
    chain: {
      title: "One chain, from the caller to the hospital",
      body: "Sauti connects the caller, trained community first responders, transport and the receiving hospital in one record. The hospital knows what is coming before the patient arrives.",
      ticks: ["Nearest available responder alerted first", "Works alongside existing ambulance services"],
    },
    triage: {
      title: "AI triage, checked by a person",
      body: "Each call is ranked red, yellow or green from what the caller says, so the most urgent cases go first. A trained dispatcher confirms every decision, and the right hospital is alerted before arrival.",
      shot: {
        src: "/images/command/incident.jpg",
        width: 900,
        height: 1671,
        label: "Incident",
        alt: "Sauti Command incident panel: responders ranked by road time, receiving hospitals and a pre-alert sent to the hospital",
        caption: "Responders ranked by road time, and the hospital alerted before arrival. Sauti Command, test data.",
      } satisfies Shot,
    },
  },

  how: {
    eyebrow: "How it works",
    title: "Four steps, on any phone, on any network.",
    steps: [
      { name: "Call", body: "A toll-free USSD code or voice line, from any basic phone. No data, no app." },
      { name: "Triage", body: "Sauti transcribes, translates and ranks the call. The dispatcher confirms." },
      { name: "Respond", body: "The nearest trained community first responder is sent." },
      { name: "Treat or transfer", body: "First aid on scene, then transport to a hospital that is ready." },
    ],
    data: {
      title: "Every call becomes",
      titleHighlight: "data.",
      body: "Where and when emergencies happen, how serious they are and how long help takes. Recorded as part of the response, never as extra paperwork, and stored on servers in Uganda.",
    },
  },

  partners: {
    eyebrow: "Work with us",
    title: "Who we build with.",
    paths: [
      {
        who: "Governments",
        title: "See where emergencies happen",
        body: "A dispatch layer that works with your existing services and gives your planners data they have never had.",
        href: "/contact?topic=health-system",
        go: "Talk to us",
      },
      {
        who: "Employers",
        title: "Emergency cover for your staff",
        body: "One number your workers can call in their own language, on site or on the road.",
        href: "/contact?topic=employer",
        go: "Talk to us",
      },
      {
        who: "Investors and funders",
        title: "Back the data layer for emergency care",
        body: "The market, the model and the case for Sauti.",
        href: "/investors",
        go: "For investors",
      },
      {
        who: "Researchers and partners",
        title: "Study care where the record was empty",
        body: "Work with us on emergency care, language AI and health data where emergencies have never been recorded.",
        href: "/contact?topic=research",
        go: "Talk to us",
      },
    ],
  },

  /**
   * The founder's note, signed by Hillary. Setting `ready: false` hides the
   * section on the live site (it then shows only on npm run dev, marked as a
   * draft).
   */
  founder: {
    ready: true,
    eyebrow: "A note from the founder",
    paragraphs: [
      "Anyone who has called for help in an emergency knows the minutes that follow. You want to know that someone understood you, and that someone is coming.",
      "I grew up on the outskirts of Masindi, where an emergency usually meant finding a boda boda, a phone with credit and someone who knew which health centre was open. I have seen people close to me lose their lives in those minutes. Usually the doctors were there. The help just could not be organised in time.",
      "Sauti is our answer to those minutes. A caller speaks in their own language, on any phone, a trained responder is sent, and the hospital knows who is coming before they arrive. We are a team of doctors and engineers, and we are building this with governments, employers and insurers.",
      "If you run emergency services, look after people at work, or invest in health, we would like to hear from you. Where you live should not decide whether help reaches you.",
    ],
    name: "Hillary Turinawe",
    role: "Founder and CEO",
    photo: "/images/team/hillary-turinawe-studio.jpg",
  },

  /** First name first; "Dr." for everyone who holds it. */
  team: {
    title: "Team",
    lead: "Clinicians and engineers building Sauti.",
    members: [
      { name: "Hillary Turinawe", role: "Founder and CEO", photo: "/images/team/hillary-turinawe-studio.jpg" },
      { name: "Dr. Ronald Kyeyune", role: "Chief Operating Officer", photo: "/images/team/ronald-kyeyune.jpg" },
      { name: "Dr. Bernard Mwesigye", role: "Medical Director", photo: "/images/team/bernard-mwesigye.jpg" },
      { name: "Dr. Ambrose Okello", role: "Research Lead", photo: "/images/team/ambrose-okello-full.jpg" },
      { name: "Dr. Jacob Busingye", role: "Clinical Implementation Lead", photo: "/images/team/jacob-busingye.jpg" },
      { name: "Dr. John Onama", role: "Chief Financial Officer", photo: "/images/team/onama-john.jpg" },
      { name: "Dr. Pascal Mathew Okorobe", role: "Head of Research and Development", photo: "/images/team/okorobe-pascal-mathew.jpg" },
      { name: "Lauben Mpairwe", role: "Software Engineer", photo: "/images/team/mpairwe-lauben.jpg" },
      { name: "David Rwemera", role: "Software Engineer", photo: "/images/team/david-rwemera-studio.jpg" },
    ] as { name: string; role: string; photo?: string }[],
  },

  /** The homepage shows the news block only once there are at least `minItems` items in content/news.md. */
  news: {
    title: "Latest news",
    viewAll: "View all news",
    minItems: 3,
  },
};

/* ---------------------------------------------------------------- Footer */

export const footer = {
  slogan: "Every voice",
  sloganHighlight: "counts.",
  lead: "If you work on emergency care, community health or health data, we would like to hear from you. We usually reply within two working days.",
  cta: { label: "Get in touch", href: "/contact" },
};

/* --------------------------------------------------------------- Contact */

export const contact = {
  eyebrow: "Contact",
  title: "Get in touch.",
  lead: "If you work on emergency care, community health or health data, we would like to hear from you. We usually reply within two working days.",
  /** The ?topic= value in links such as /contact?topic=investor picks one of these. */
  topics: [
    { value: "health-system", label: "Governments and health systems" },
    { value: "employer", label: "Emergency cover for my staff" },
    { value: "investor", label: "Investing or funding" },
    { value: "research", label: "Research or partnership" },
    { value: "press", label: "Press" },
    { value: "other", label: "Something else" },
  ],
  emergencyNote:
    "This form is not for emergencies. If someone needs urgent help, contact your local emergency services or go to the nearest health facility.",
};

/* --------------------------------------------------------------- Privacy */

type CollectRow = { who: string; what: string; why: string; basis: string };
type RetentionRow = { data: string; period: string };

/**
 * The privacy notice. Each heading on /privacy opens and closes on click.
 * When this text changes, set `updated` to the day the new version goes live.
 * The Data Protection Officer's name, email and phone are `dpo` in lib/site.ts.
 */
export const privacy = {
  title: "Privacy notice",
  updated: "22 November 2026",
  /** The box at the top. The general email and the DPO's phone are added after this text. */
  summary:
    "We collect only what we need to send help and check on the patient. Emergency, patient and responder data is stored on servers in Uganda and never sold. To see, correct or delete your data, contact our Data Protection Officer at",
  intro:
    "Sauti Dispatch Limited (“Sauti”, “we”) provides emergency dispatch in Uganda. When someone dials our emergency USSD code or IVR line, we alert a trained community responder and help the patient reach a health facility. This notice explains what personal data we collect, why, who sees it, how long we keep it and what your rights are. It applies to callers and patients, to community responders, and to people who take part in the pilot study.",
  who: [
    {
      label: "Controller",
      value: `${site.legalName}, ${site.address.join(", ")}`,
      email: site.email,
      after: `Registered with the Personal Data Protection Office under ${site.pdpoRegistration}.`,
    },
    { label: "Data Protection Officer", value: site.dpo.name, email: site.dpo.email, phone: site.dpo.phone, tel: site.dpo.tel },
  ] as { label: string; value: string; email?: string; phone?: string; tel?: string; after?: string }[],
  collect: [
    {
      who: "Callers and patients",
      what: "Your phone number, where you are (area and landmark), the time, the type and seriousness of the emergency, the age group of the patient, what the responder did, where the patient was taken and how the patient was 24 to 48 hours later",
      why: "To send a responder, to guide them and to hand the patient over. To call you back to check on the patient.",
      basis: "Protecting the vital interests of a person in an emergency. This does not depend on your consent.",
    },
    {
      who: "Community responders",
      what: "Name, phone number, ward, mobile money details, training and test results, availability, alerts accepted, declined and completed, payments",
      why: "To train, alert and pay you and to keep the service safe",
      basis:
        "Your contract with us. Research use of your data needs your separate written consent, which you may decline and still work and be paid.",
    },
  ] as CollectRow[],
  collectNote:
    "Health information is sensitive personal data and gets our highest level of protection. We collect only the fields we need to dispatch help.",
  where: [
    "All emergency, patient and responder data is stored on servers in Uganda and is not sent out of the country.",
    "Only named staff with a role that needs it can see names and phone numbers. Researchers work with a version that has no names or phone numbers.",
    "Africa’s Talking carries the USSD and voice traffic for us under a data processing agreement and does not receive our research data. Mobile money providers see only what they need to make a payment.",
    "We do not sell personal data and we do not share it with anyone for marketing.",
    "We may share a version without names or phone numbers with approved researchers, only after an ethics committee has approved the use and a signed agreement is in place.",
    "We publish results only in a form that does not identify anyone.",
  ],
  retention: [{ data: "Records that identify you", period: "12 months after the study period ends, then destroyed" }] as RetentionRow[],
  research: {
    title: "If you take part in our research",
    collect: [
      {
        who: "Callers and patients, for research",
        what: "The same record, kept without your name and number",
        why: "To study whether the service works and to improve it",
        basis:
          "Your consent, asked for after the emergency. For a child, a parent or guardian’s permission and the child’s agreement. Where consent cannot be obtained, the waiver granted by the ethics committee.",
      },
      {
        who: "Interview participants",
        what: "Audio recordings if you agree, transcripts and notes",
        why: "To learn how the service works for people who use it",
        basis: "Your consent",
      },
    ] as CollectRow[],
    retention: [
      {
        data: "Research records without names or phone numbers, consent forms and the audit trail",
        period: "Five years after the study is complete, as the research rules require",
      },
      { data: "The key that links research records to you", period: "12 months after the main study results are published, then destroyed" },
      { data: "Interview audio", period: "Until the transcript is checked, and no later than 12 months after the study period ends" },
    ] as RetentionRow[],
  },
  rights: [
    "You can ask to see the data we hold about you, to correct it, to have it deleted, to object to how we use it, and to withdraw your consent at any time. If you withdraw, we remove your record from the research data and do not use it in later analysis. We cannot remove it from results that were already published, and we say so when we ask for consent. You do not need to give a reason. Anyone recorded without being asked, or the family of a patient who died, can ask us to remove the record.",
    "To use any of these rights, call or write to the Data Protection Officer using the details above. We will answer within 14 days.",
  ],
  breach:
    "If personal data is lost or exposed in a way that could harm you, we will tell the Personal Data Protection Office within 72 hours, and we will tell you without delay if the risk to you is high.",
  complaints:
    "If you are unhappy with how we handled your data, tell us first and we will try to put it right. You may also complain to the Personal Data Protection Office at www.pdpo.go.ug.",
  changes:
    "We review this notice at least once a year and whenever our processing changes. The current version is always at www.sautihealth.com and on the notice boards where the service operates.",
  shortForm: {
    title: "Short form for the USSD and IVR line",
    intro: "Read or shown to the caller after the emergency is handled, in Luganda and English:",
    text: `“Sauti recorded your call to send help. Your number stays in Uganda and is used only to check on the patient. To see, correct or delete it, call ${site.dpo.phone} or write to ${site.email}.”`,
  },
  website: {
    title: "This website",
    items: [
      "The contact form sends your name, organisation, email address, phone number if you give it, and message to our team so we can reply. The website passes the message straight to our team's email inbox, which Zoho Mail hosts in the EU, and does not keep a copy. If you email us or message us on WhatsApp, we use your details only to reply. We do not add you to a mailing list.",
      "We count page views with GoatCounter, which sets no cookies and does not track you across sites.",
      "The website does not use advertising or social media trackers.",
    ],
  },
  /** Shown as the last line of the page. */
  approval: "Approved by the Board of Directors of Sauti Dispatch Limited.",
};
