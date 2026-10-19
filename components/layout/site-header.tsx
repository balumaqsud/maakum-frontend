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
  "inline-flex min-h-11 items-center px-2 font-sans text-[0.95rem] font-medium text-ink-soft hover:text-ink aria-[current=page]:text-ink aria-[current=page]:shadow-[inset_0_-2px_0_var(--color-brass)]";

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
      <Button href="/write" className={stacked ? "mt-2 self-start" : "ms-2"}>
        <LocaleText k="writeMessage" />
      </Button>
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
    <header className="border-b border-line">
      <Container className="flex flex-wrap items-center justify-between gap-3 py-4 max-[420px]:gap-1">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:inset-s-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          <LocaleText k="skip" />
        </a>
        <Link href="/" className="flex items-baseline gap-2" aria-label="Ma'akum">
          <span lang="ar" className="font-arabic text-[1.65rem] leading-none text-olive max-[420px]:text-2xl">
            معكم
          </span>
          <span className="text-[0.82rem] font-semibold tracking-[0.14em] text-ink-soft uppercase max-[420px]:text-[0.66rem] max-[420px]:tracking-[0.08em]">
            Ma&apos;akum
          </span>
        </Link>
        <span id="site-nav-label" className="sr-only">
          <LocaleText k="navLabel" />
        </span>
        <div className="flex items-center gap-1">
          {hope ? (
            <nav aria-labelledby="site-nav-label" className="flex items-center gap-0.5">
              <Link href="/" className={linkClass}>
                <LocaleText k="close" />
              </Link>
            </nav>
          ) : (
            <>
              <nav
                aria-labelledby="site-nav-label"
                className="hidden items-center gap-0.5 min-[721px]:flex"
              >
                <NavLinks pathname={pathname} />
              </nav>
              <button
                type="button"
                ref={buttonRef}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 font-sans text-sm font-semibold text-ink min-[721px]:hidden"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={onToggle}
              >
                {open ? <LocaleText k="closeMenu" /> : <LocaleText k="menu" />}
              </button>
            </>
          )}
          <LanguageSwitcher />
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
