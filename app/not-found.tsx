import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="theme-light" data-header-variant="dark">
      <div className="wrap page-intro" style={{ paddingBottom: "clamp(96px, 14vw, 200px)" }}>
        <p className="eyebrow">Error 404</p>
        <h1 className="display t-display">Page not found</h1>
        <p className="lead">The page you were looking for has moved or never existed.</p>
        <div style={{ marginTop: 28 }}>
          <ButtonLink href="/" size="lg">
            Back to the homepage
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
