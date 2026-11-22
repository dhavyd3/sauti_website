/**
 * Company details used across the site: contact, registration, navigation.
 * Page copy lives in lib/content.ts; news items in content/news.md.
 */
export const site = {
  name: "Sauti Health",
  legalName: "Sauti Dispatch Limited",
  url: "https://sautihealth.com",
  slogan: "Every voice counts",
  tagline: "dispatch. respond. save.",
  title: "Sauti Health · AI emergency dispatch in 50+ languages, on any phone",
  description:
    "Sauti is an AI dispatch and data layer for emergency care. Callers speak in their own language on any phone. Sauti transcribes, triages and sends the nearest trained responder.",
  email: "info@sautihealth.com",
  phones: [
    { label: "Uganda", display: "+256 764 442 593", tel: "+256764442593", whatsapp: "256764442593" },
    { label: "Germany", display: "+49 157 3785 8903", tel: "+4915737858903", whatsapp: "4915737858903" },
  ],
  address: ["Plot 160, Makerere", "Sir Apollo Kaggwa Road", "P.O. Box 23488", "Kampala, Uganda"],
  regNo: "80034434888019",
  pdpoRegistration: "PDPO-202605-12657",
  /** Data Protection Officer, named in the privacy notice. The phone is the line callers use for their data. */
  dpo: { name: "Lauben Mpairwe", email: "privacy@sautihealth.com", phone: "+256 773 336 896", tel: "+256773336896" },
  goatcounter: "https://sautihealth.goatcounter.com/count",
  /**
   * Google Search Console, "HTML tag" method: paste only the code from the
   * content="..." part of the tag Google gives you. Not needed if the site is
   * verified as a Domain property through DNS (the recommended way).
   */
  googleSiteVerification: "",
} as const;

export type NavItem = { label: string; href: string };

/** Header links. Sections of the homepage are linked as /#id so they work from every page. */
export const mainNav: NavItem[] = [
  { label: "What we do", href: "/#different" },
  { label: "How it works", href: "/#how" },
  { label: "Work with us", href: "/#partners" },
];

/** The "Company" drop-down menu in the header, after mainNav. */
export const companyNav: NavItem[] = [
  { label: "Investors", href: "/investors" },
  { label: "Team", href: "/#team" },
  { label: "News", href: "/news" },
];

export const footerNav: NavItem[][] = [
  [
    { label: "What we do", href: "/#different" },
    { label: "How it works", href: "/#how" },
    { label: "Team", href: "/#team" },
    { label: "News", href: "/news" },
  ],
  [
    { label: "Contact", href: "/contact" },
    { label: "Investors", href: "/investors" },
    { label: "Privacy notice", href: "/privacy" },
  ],
];

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);
