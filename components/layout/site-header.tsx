"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { LocaleText } from "@/components/shared/locale-text";
import { documentTitle, type ChromeKey } from "@/lib/i18n";

const links: { href: string; key: ChromeKey }[] = [
  { href: "/", key: "navHome" },
  { href: "/messages", key: "messagesTitle" },
  { href: "/about", key: "about" },
];

function current(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/messages") return pathname === "/messages" || pathname.startsWith("/messages/");
  return pathname === href;
}

function PenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
      <path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#0d3326" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M3 7h20M3 13h20M3 19h20" />
    </svg>
  );
}

function Logo() {
  return (
    <Link href="/" className="hm-logo" aria-label="Ma'akum">
      <span className="hm-logo-ar" lang="ar">
        معكم
      </span>
      <span className="hm-logo-en">MA’AKUM</span>
    </Link>
  );
}

function HeaderFrame({
  pathname,
  open,
  menuId,
  onToggle,
  buttonRef,
  panelRef,
}: {
  pathname: string;
  open: boolean;
  menuId: string;
  onToggle: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
  panelRef?: React.Ref<HTMLElement>;
}) {
  const hope = pathname === "/hope";

  return (
    <header className={`site-head home-face${open ? " is-open" : ""}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:inset-s-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
      >
        <LocaleText k="skip" />
      </a>
      <div className="hm-in">
        <Logo />
        <span id="site-nav-label" className="sr-only">
          <LocaleText k="navLabel" />
        </span>
        {hope ? (
          <div className="hm-hr">
            <nav aria-labelledby="site-nav-label">
              <Link href="/" className="hm-close">
                <LocaleText k="close" />
              </Link>
            </nav>
          </div>
        ) : (
          <>
            <nav id={menuId} ref={panelRef} className="hm-nav" aria-labelledby="site-nav-label">
              {links.map((link) => (
                <Link key={link.href} href={link.href} aria-current={current(pathname, link.href) ? "page" : undefined}>
                  <LocaleText k={link.key} />
                </Link>
              ))}
            </nav>
            <div className="hm-hr">
              <LanguageSwitcher />
              <Link href="/write" className="hm-btn hm-dark hm-sm hm-write">
                <LocaleText k="writeMessage" />
                <PenIcon />
              </Link>
              <button
                type="button"
                ref={buttonRef}
                className="hm-burger"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={onToggle}
              >
                <span className="sr-only">{open ? <LocaleText k="closeMenu" /> : <LocaleText k="menu" />}</span>
                <MenuIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname && pathname !== "/hope";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const restoreFocus = useRef(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const lang = document.documentElement.lang === "ar" ? "ar" : "en";
      document.title = documentTitle(lang, pathname, document.title);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      if (restoreFocus.current) {
        buttonRef.current?.focus();
        restoreFocus.current = false;
      }
      return;
    }
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      restoreFocus.current = true;
      setMenuPath(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <HeaderFrame
      pathname={pathname}
      open={open}
      menuId={menuId}
      buttonRef={buttonRef}
      panelRef={panelRef}
      onToggle={() => {
        if (open) {
          restoreFocus.current = false;
          setMenuPath(null);
          return;
        }
        setMenuPath(pathname);
      }}
    />
  );
}

export function SiteHeaderFallback() {
  return <HeaderFrame pathname="" open={false} menuId="site-menu" onToggle={() => undefined} />;
}
