"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { LocaleText } from "@/components/shared/locale-text";
import { Container } from "@/components/ui/container";

function current(pathname: string, href: string) {
  if (href === "/messages") {
    return pathname === "/messages" || pathname.startsWith("/messages/");
  }
  return pathname === href;
}

const linkClass =
  "inline-flex min-h-11 items-center px-2 font-sans text-[0.95rem] font-medium text-ink-soft hover:text-ink aria-[current=page]:text-ink aria-[current=page]:shadow-[inset_0_-2px_0_var(--color-brass)]";

function HeaderFrame({ pathname }: { pathname: string }) {
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
        <nav aria-labelledby="site-nav-label" className="flex flex-wrap items-center gap-0.5">
          {hope ? (
            <Link href="/" className={linkClass}>
              <LocaleText k="close" />
            </Link>
          ) : (
            <>
              <Link
                href="/messages"
                aria-current={current(pathname, "/messages") ? "page" : undefined}
                className={linkClass}
              >
                <LocaleText k="read" />
              </Link>
              <Link
                href="/write"
                aria-current={current(pathname, "/write") ? "page" : undefined}
                className={`${linkClass} font-semibold text-olive`}
              >
                <LocaleText k="write" />
              </Link>
            </>
          )}
          <LanguageSwitcher />
        </nav>
      </Container>
    </header>
  );
}

export function SiteHeader() {
  return <HeaderFrame pathname={usePathname()} />;
}

export function SiteHeaderFallback() {
  return <HeaderFrame pathname="" />;
}
