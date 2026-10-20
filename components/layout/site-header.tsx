"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { LocaleText } from "@/components/shared/locale-text";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
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

const linkClass =
  "relative inline-flex min-h-11 items-center px-3 font-sans text-[0.95rem] font-medium text-ink-soft hover:text-ink aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:bottom-2 aria-[current=page]:after:left-1/2 aria-[current=page]:after:h-0.5 aria-[current=page]:after:w-5 aria-[current=page]:after:-translate-x-1/2 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-olive";

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20h4L18 10l-4-4L4 16v4z" strokeLinejoin="round" />
      <path d="M13 7l4 4" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex flex-col leading-none" aria-label="Ma'akum">
      <span lang="ar" className="font-arabic text-[1.85rem] text-olive">
        معكم
      </span>
      <span className="text-[0.62rem] font-semibold tracking-[0.22em] text-ink-soft uppercase">Ma&apos;akum</span>
    </Link>
  );
}

function NavLinks({ pathname, stacked = false }: { pathname: string; stacked?: boolean }) {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={current(pathname, link.href) ? "page" : undefined}
          className={stacked ? `${linkClass} w-full` : linkClass}
        >
          <LocaleText k={link.key} />
        </Link>
      ))}
      {stacked ? (
        <Button href="/write" className="mt-2 gap-2 self-start">
          <PenIcon />
          <LocaleText k="writeMessage" />
        </Button>
      ) : null}
    </>
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
    <header className="border-b border-line/80 bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:inset-s-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
      >
        <LocaleText k="skip" />
      </a>
      <Container className="grid grid-cols-[1fr_auto] items-center gap-3 py-3 min-[721px]:grid-cols-[1fr_auto_1fr]">
        <Logo />
        <span id="site-nav-label" className="sr-only">
          <LocaleText k="navLabel" />
        </span>
        {hope ? <span className="hidden min-[721px]:block" /> : (
          <nav aria-labelledby="site-nav-label" className="hidden items-center justify-center gap-1 min-[721px]:flex">
            <NavLinks pathname={pathname} />
          </nav>
        )}
        <div className="flex items-center justify-end gap-1">
          {hope ? (
            <nav aria-labelledby="site-nav-label">
              <Link href="/" className={linkClass}>
                <LocaleText k="close" />
              </Link>
            </nav>
          ) : (
            <>
              <button
                type="button"
                ref={buttonRef}
                className="inline-flex size-11 items-center justify-center rounded-full text-ink min-[721px]:hidden"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={onToggle}
              >
                <span className="sr-only">{open ? <LocaleText k="closeMenu" /> : <LocaleText k="menu" />}</span>
                <MenuIcon open={open} />
              </button>
              <LanguageSwitcher />
              <div className="ms-1 hidden min-[721px]:block">
                <Button href="/write" className="gap-2">
                  <PenIcon />
                  <LocaleText k="writeMessage" />
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
      {hope ? null : (
        <nav
          id={menuId}
          ref={panelRef}
          hidden={!open}
          aria-labelledby="site-nav-label"
          className="border-t border-line min-[721px]:hidden"
        >
          <Container className="flex flex-col items-stretch py-3">
            <NavLinks pathname={pathname} stacked />
          </Container>
        </nav>
      )}
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
