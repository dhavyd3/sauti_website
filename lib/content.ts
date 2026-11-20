/**
 * All page copy lives here so text can be edited without touching layout code.
 * Write **two asterisks** around words to make them bold.
 * News items are not here: they are in content/news.md.
 */

/* ------------------------------------------------------------------ Home */

export type Shot = { src: string; width: number; height: number; label: string; alt: string; caption: string };

export const home = {
  hero: {
    status: "Piloting in Kampala, Uganda",
    title: "Emergency dispatch that",
    titleHighlight: "understands every caller.",
    lead: "A caller speaks in their own language, on any phone. Sauti transcribes, translates and triages the call, sends the nearest trained responder and alerts the hospital. Every call becomes health data.",
    primary: { label: "Start a conversation", href: "/contact" },
    secondary: { label: "See how it works", href: "/#how" },
    proof: [
      "**50+** languages",
      "**Any phone**, no app, no internet",
      "Team from **Bonn**, **Makerere** and **MUST**",
    ],
    /**
     * The photo beside the headline. If it is a stock photo, add the credit
     * as `credit: "Photo: Jane Doe on Unsplash"`; it then shows under it.
     */
    photo: {
      src: "/images/hero-ambulance.jpg",
      width: 1600,
      height: 1200,
      alt: "An ambulance with its emergency lights on, speeding along a road at dusk",
      credit: "",
    },
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
      { name: "Call", body: "A toll-free voice call or SMS from any basic phone. No data, no app." },
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
        body: "Where we are, what we are building next and how to reach the founder.",
        href: "/investors",
        go: "For investors",
      },
      {
        who: "Researchers and partners",
        title: "Study care where the record was empty",
        body: "Work with us on emergency care, language AI and health data in low-resource settings.",
        href: "/contact?topic=research",
        go: "Talk to us",
      },
    ],
  },

  /**
   * The founder's note. The paragraphs are still the placeholder from the
   * client's demo: replace them with Hillary's final text when it arrives.
   * Setting `ready: false` hides the section on the live site (it then shows
   * only on npm run dev, marked as a draft).
   */
  founder: {
    ready: true,
    eyebrow: "A note from the founder",
    paragraphs: [
      "When someone collapses on a Kampala road, the people around them usually know what to do: call someone. The problem is what happens next. Nobody on the other end may speak their language, and nobody is sure who is closest.",
      "We built Sauti so that the first call works, and so that every call teaches the health system something it did not know.",
    ],
    name: "Hillary Turinawe",
    role: "Co-founder and CEO",
    photo: "/images/team/hillary-turinawe.jpg",
  },

  team: {
    eyebrow: "Team",
    title: "Doctors, engineers and researchers from Uganda and Germany.",
    members: [
      { name: "Hillary Turinawe", role: "Co-founder and CEO", photo: "/images/team/hillary-turinawe.jpg" },
      { name: "Dr. Ronald Kyeyune", role: "Chief Operating Officer", photo: "/images/team/ronald-kyeyune.jpg" },
      { name: "Bernard Mwesigye", role: "Medical Director", photo: "/images/team/bernard-mwesigye.jpg" },
      { name: "Dr. Ambrose Okello", role: "Principal Investigator", photo: "/images/team/ambrose-okello.jpg" },
      { name: "Dr. Busingye Jacob", role: "Clinical Implementation", photo: "/images/team/jacob.jpg" },
      { name: "Onama John", role: "Chief Financial Officer", photo: "/images/team/onama-john.jpg" },
      { name: "Okorobe Pascal Mathew", role: "Head of Research and Development", photo: "/images/team/okorobe-pascal-mathew.jpg" },
      { name: "Mpairwe Lauben", role: "Technical engineer", photo: "/images/team/mpairwe-lauben.jpg" },
      { name: "Rwemera David", role: "Technical engineer", photo: "/images/team/rwemera-david.jpg" },
    ] as { name: string; role: string; photo?: string }[],
  },

  news: {
    title: "Latest news",
    viewAll: "View all news",
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
      "The contact form sends your name, organisation, email address, phone number if you give it, and message to our team so we can reply. The website passes the message straight to our team's email inbox, which Zoho Mail hosts in the EU, and does not keep a copy. If you email us or message us on WhatsApp, we use your details only to reply. We do not add you to a mailing list.",
      "We count page views with GoatCounter, which sets no cookies and does not track you across sites.",
      "The website does not use advertising or social media trackers.",
    ],
  },
};
