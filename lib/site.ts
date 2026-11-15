export const site = {
  name: "Sauti Health",
  legalName: "Sauti Dispatch Limited",
  url: "https://sautihealth.com",
  tagline: "dispatch. respond. save.",
  title: "Sauti Health · Health data infrastructure, starting with emergency response",
  description:
    "Sauti builds data infrastructure that generates structured health intelligence from places that have never had any, starting with emergency response.",
  email: "info@sautihealth.com",
  phones: [
    { label: "Uganda", display: "+256 764 442 593", tel: "+256764442593", whatsapp: "256764442593" },
    { label: "Germany", display: "+49 157 3785 8903", tel: "+4915737858903", whatsapp: "4915737858903" },
  ],
  address: ["Plot 160, Makerere", "Sir Apollo Kaggwa Road", "P.O. Box 23488", "Kampala, Uganda"],
  regNo: "80034434888019",
  pdpoRegistration: "PDPO-202605-12657",
  goatcounter: "https://sautihealth.goatcounter.com/count",
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "The pilot", href: "/pilot" },
];

export const companyNav: NavItem[] = [
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export const footerNav: NavItem[][] = [
  [
    { label: "How it works", href: "/how-it-works" },
    { label: "The pilot", href: "/pilot" },
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  [
    { label: "Privacy notice", href: "/privacy" },
    { label: "Partner with us", href: "/contact?topic=partnership" },
  ],
];
