"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";
import { companyNav, mainNav, site } from "@/lib/site";

/** Scrolled further than this: the bar becomes a compact pill. */
const PILL_AFTER = 24;
/** Scrolling down past this hides the bar; scrolling up brings it back. */
const HIDE_AFTER = 160;

/** The phone menu: every link, with the Company ones under their own label. */
const MENU_GROUPS = (() => {
  let index = 0;
  const numbered = (items: { label: string; href: string }[]) => items.map((item) => ({ ...item, index: index++ }));
  return [
    { id: "main", label: null, items: numbered([{ label: "Home", href: "/" }, ...mainNav]) },
    { id: "company", label: "Company", items: numbered(companyNav) },
    { id: "contact", label: null, items: numbered([{ label: "Contact", href: "/contact" }]) },
  ];
})();

/**
 * Floating black bar at the top of every page. Once the page is scrolled it
 * shrinks into a compact pill, hides while you scroll down and comes back as
 * soon as you scroll up. On phones the links move into a full-screen menu.
 *
 * Kept light so it stays smooth on any phone: the scroll handler only reads
 * window.scrollY once per frame and sets two data attributes (no React
 * re-render, no layout reads), and the moving parts animate with transform
 * and opacity. Styles: globals.css, "Header".
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const companyRef = useRef<HTMLLIElement>(null);
  const pointerType = useRef("");

  // Pill and hide-on-scroll.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let lastY = Math.max(0, window.scrollY);
    let frame = 0;

    const set = (key: "scrolled" | "hidden", value: boolean) => {
      if (header.dataset[key] !== String(value)) header.dataset[key] = String(value);
    };

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      set("scrolled", y > PILL_AFTER);
      const delta = y - lastY;
      if (Math.abs(delta) < 8) return;
      // A jump of more than a screen in one frame is a link to a section
      // (e.g. /#team from another page), not someone scrolling: stay in view.
      const hide = delta > 0 && delta < window.innerHeight && y > HIDE_AFTER;
      set("hidden", hide);
      if (hide) setCompanyOpen(false);
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // A new page starts with the bar in view.
  useEffect(() => {
    if (headerRef.current) headerRef.current.dataset.hidden = "false";
  }, [pathname]);

  // Lock page scroll while the phone menu is open; Escape closes it.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // The Company menu closes on Escape and on a click or tap anywhere else.
  useEffect(() => {
    if (!companyOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!companyRef.current?.contains(event.target as Node)) setCompanyOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setCompanyOpen(false);
      companyRef.current?.querySelector("button")?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [companyOpen]);

  const close = () => {
    setOpen(false);
    setCompanyOpen(false);
  };

  const current = (href: string) => (href === pathname ? "page" : undefined);
  const companyCurrent = companyNav.some((item) => item.href === pathname);

  return (
    <>
      <header ref={headerRef} className={`site-header${open ? " is-open" : ""}`}>
        <div className="site-header__bar">
          <Link href="/" className="site-header__logo" aria-label={`${site.name}, home`} onClick={close}>
            <Logo />
          </Link>

          <nav className="site-header__nav" aria-label="Main">
            <ul>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="site-header__link">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li
                ref={companyRef}
                className={`site-header__company${companyOpen ? " is-open" : ""}`}
                onPointerEnter={(event) => event.pointerType === "mouse" && setCompanyOpen(true)}
                onPointerLeave={(event) => event.pointerType === "mouse" && setCompanyOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setCompanyOpen(false);
                }}
              >
                <button
                  type="button"
                  className={`site-header__link${companyCurrent ? " is-current" : ""}`}
                  aria-expanded={companyOpen}
                  aria-controls="company-menu"
                  onPointerDown={(event) => {
                    pointerType.current = event.pointerType;
                  }}
                  onClick={() => {
                    // With a mouse, hovering has already opened it: a click keeps it open.
                    // Touch and keyboard toggle it.
                    if (pointerType.current === "mouse") setCompanyOpen(true);
                    else setCompanyOpen((value) => !value);
                    pointerType.current = "";
                  }}
                >
                  Company
                  <svg className="site-header__chev" viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M2 3.75 L5 6.75 L8 3.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <ul id="company-menu" className="site-header__sub">
                  {companyNav.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} aria-current={current(item.href)} onClick={() => setCompanyOpen(false)}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>

          <div className="site-header__actions">
            <ButtonLink href="/contact" variant="secondary" className="site-header__cta">
              Get in touch
            </ButtonLink>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={`site-menu${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Menu">
          {MENU_GROUPS.map((group) => (
            <div key={group.id} className="site-menu__group">
              {group.label && <p className="site-menu__label">{group.label}</p>}
              <ul className="site-menu__links">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={current(item.href)} onClick={close} style={{ "--i": item.index } as CSSProperties}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="site-menu__foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.phones.map((phone) => (
            <a key={phone.tel} href={`tel:${phone.tel}`}>
              {phone.display} · {phone.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
