import Link from "next/link";
import type { ReactNode } from "react";
import { isExternal } from "@/lib/site";

type Variant = "primary" | "secondary" | "outline";

/** Arrow that gives way to a heartbeat line on hover. */
export function ButtonIcon() {
  return (
    <span className="btn__icon" aria-hidden="true">
      <svg className="btn__arrow" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5.5 11 L12.5 3.5 M6.5 3.5 H12.5 V9.5" />
      </svg>
      <svg className="btn__pulse" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0.75 7 H5 L6.4 5.2 L8.4 12 L10.7 2 L12.5 8.6 L13.6 7 H17.25" />
      </svg>
    </span>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  /** primary: black; secondary: white (for dark sections); outline: the text colour. */
  variant?: Variant;
  size?: "md" | "lg";
  icon?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", icon = true, className }: ButtonLinkProps) {
  const classes = ["btn", `btn--${variant}`, size === "lg" && "btn--lg", !icon && "btn--plain", className].filter(Boolean).join(" ");
  const content = (
    <>
      {children}
      {icon && <ButtonIcon />}
    </>
  );

  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
