import Link from "next/link";
import { LocaleText } from "@/components/shared/locale-text";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line py-8 text-sm text-ink-soft">
      <Container className="flex flex-col gap-3">
        <p className="max-w-[44rem]">
          <LocaleText k="footerLine" />
        </p>
        <span id="footer-nav-label" className="sr-only">
          <LocaleText k="navLabel" />
        </span>
        <nav aria-labelledby="footer-nav-label" className="flex flex-wrap gap-x-4">
          <Link href="/messages" className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4">
            <LocaleText k="messagesTitle" />
          </Link>
          <Link href="/about" className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4">
            <LocaleText k="about" />
          </Link>
          <Link href="/privacy" className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4">
            <LocaleText k="privacy" />
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
