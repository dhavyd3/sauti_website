import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="wrap page-head" style={{ paddingBottom: 140 }}>
      <p className="eyebrow">Error 404</p>
      <h1 className="t-hero">Page not found</h1>
      <p className="lead">The page you were looking for has moved or never existed.</p>
      <div className="actions">
        <ButtonLink href="/" size="lg">
          Back to the homepage
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline" size="lg" icon={false}>
          Contact us
        </ButtonLink>
      </div>
    </div>
  );
}
