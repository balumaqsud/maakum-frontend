import Link from "next/link";
import { LocaleText } from "@/components/shared/locale-text";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-200">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-3 px-5 py-8 text-sm text-neutral-600">
        <p className="max-w-xl">
          <LocaleText k="care" />
        </p>
        <span id="footer-nav-label" className="sr-only">
          <LocaleText k="navLabel" />
        </span>
        <nav aria-labelledby="footer-nav-label" className="flex flex-wrap gap-4">
          <Link href="/about" className="underline">
            <LocaleText k="about" />
          </Link>
          <Link href="/privacy" className="underline">
            <LocaleText k="privacy" />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
