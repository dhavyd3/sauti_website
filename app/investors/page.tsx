import type { Metadata } from "next";
import { InvestorMemo } from "@/components/investor/InvestorMemo";
import "./memo.css";

// The QR code on Sauti's business cards and marketing material points here:
// keep the address sautihealth.com/investors working.
// Like the original memo, this page asks search engines not to list it.
export const metadata: Metadata = {
  title: "Investor memo",
  description:
    "Sauti Health: the market, unit economics and impact of emergency response where national dispatch is being built, with an interactive country-by-country model.",
  alternates: { canonical: "/investors" },
  robots: { index: false, follow: false },
};

export default function InvestorsPage() {
  return <InvestorMemo />;
}
