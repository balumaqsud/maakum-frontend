"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { LocaleText } from "@/components/shared/locale-text";

function current(pathname: string, href: string) {
  if (href === "/messages") {
    return pathname === "/messages" || pathname.startsWith("/messages/");
  }
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const hope = pathname === "/hope";

  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex w-full max-w-[1080px] flex-wrap items-center justify-between gap-3 px-5 py-4 max-[420px]:gap-2 max-[420px]:px-4">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:inset-s-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
        >
          <LocaleText k="skip" />
        </a>
        <Link href="/" className="flex items-baseline gap-2" aria-label="Ma'akum">
          <span lang="ar" className="text-2xl leading-none max-[420px]:text-xl">
            معكم
          </span>
          <span className="text-xs tracking-widest uppercase max-[420px]:text-[0.66rem]">
            Ma&apos;akum
          </span>
        </Link>
        <span id="site-nav-label" className="sr-only">
          <LocaleText k="navLabel" />
        </span>
        <nav aria-labelledby="site-nav-label" className="flex flex-wrap items-center gap-1">
          {hope ? (
            <Link href="/" className="px-2 py-2 text-sm">
              <LocaleText k="close" />
            </Link>
          ) : (
            <>
              <Link
                href="/messages"
                aria-current={current(pathname, "/messages") ? "page" : undefined}
                className="px-2 py-2 text-sm aria-[current=page]:underline"
              >
                <LocaleText k="read" />
              </Link>
              <Link
                href="/write"
                aria-current={current(pathname, "/write") ? "page" : undefined}
                className="px-2 py-2 text-sm font-semibold aria-[current=page]:underline"
              >
                <LocaleText k="write" />
              </Link>
            </>
          )}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
