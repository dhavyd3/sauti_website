"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ButtonIcon } from "./Button";
import { Logo } from "./Logo";
import { cx } from "@/lib/cx";
import { companyNav, primaryNav, site } from "@/lib/site";

/** `light` = light text for dark sections, `dark` = dark text for light sections. */
type Variant = "light" | "dark";

const TOP_THRESHOLD = 24;
const HIDE_AFTER = 160;

export function Header() {
  const pathname = usePathname();
  const [variant, setVariant] = useState<Variant>("light");
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const lastY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  // Track scroll position, direction, and the section under the header.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setAtTop(y < TOP_THRESHOLD);

      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > HIDE_AFTER);
        lastY.current = y;
      }

      const probe = (headerRef.current?.offsetHeight ?? 80) / 2;
      let next: Variant | null = null;
      for (const section of document.querySelectorAll<HTMLElement>("[data-header-variant]")) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          next = section.dataset.headerVariant === "dark" ? "dark" : "light";
        }
      }
      if (next) setVariant(next);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    lastY.current = window.scrollY;
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Lock page scroll while the full-screen menu is open; Escape closes things.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSubOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setSubOpen(false);
  };

  const isCurrent = (href: string) => (pathname === href ? "page" : undefined);
  const companyActive = companyNav.some((item) => item.href === pathname);
  const allLinks = [{ label: "Home", href: "/" }, ...primaryNav, ...companyNav];

  return (
    <>
      <header
        ref={headerRef}
        className={cx(
          "site-header",
          menuOpen ? "is-light" : `is-${variant}`,
          atTop || menuOpen ? "is-top" : "is-pill",
          hidden && !menuOpen && "is-hidden",
          menuOpen && "is-menu-open",
        )}
        onFocusCapture={() => setHidden(false)}
      >
        <div className="site-header__bar">
          <Link href="/" className="site-header__logo" aria-label={`${site.name}, home`} onClick={closeAll}>
            <Logo />
          </Link>

          <nav className="site-header__nav" aria-label="Main">
            <ul>
              {primaryNav.map((item) => (
                <li key={item.href} className="site-header__item">
                  <Link href={item.href} className="site-header__link" aria-current={isCurrent(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li
                className={cx("site-header__item", subOpen && "is-open")}
                onPointerEnter={(event) => event.pointerType === "mouse" && setSubOpen(true)}
                onPointerLeave={(event) => event.pointerType === "mouse" && setSubOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setSubOpen(false);
                }}
              >
                <button
                  type="button"
                  className="site-header__link"
                  aria-expanded={subOpen}
                  aria-controls="company-menu"
                  aria-current={companyActive ? "page" : undefined}
                  onClick={() => setSubOpen((open) => !open)}
                >
                  Company
                  <svg className="site-header__chev" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 2.5 L4 5.5 L7 2.5" />
                  </svg>
                </button>
                <ul id="company-menu" className="site-header__sub">
                  {companyNav.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} aria-current={isCurrent(item.href)} onClick={() => setSubOpen(false)}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>

          <div className="site-header__actions">
            <Link href="/contact?topic=partnership" className="btn btn--outline btn--plain site-header__partner">
              Partner with us
            </Link>
            <Link href="/contact" className="btn btn--outline site-header__cta" onClick={closeAll}>
              Get in touch
              <ButtonIcon />
            </Link>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={cx("site-menu", menuOpen && "is-open")} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Menu">
          <ul className="site-menu__links display t-xl">
            {allLinks.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(item.href)} onClick={closeAll} style={{ "--i": i } as CSSProperties}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
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
