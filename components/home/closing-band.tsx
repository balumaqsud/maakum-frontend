import Link from "next/link";
import { LocaleText } from "@/components/shared/locale-text";
import { Container } from "@/components/ui/container";

export function ClosingBand() {
  return (
    <footer className="relative mt-16 bg-[#14352c] text-ivory">
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-12 w-full -translate-y-[calc(100%-1px)] text-[#14352c] min-[900px]:h-16"
      >
        <path fill="currentColor" d="M0 80V42C280 8 520 0 760 10c260 12 460 36 680 32v38H0Z" />
      </svg>
      <div className="pointer-events-none absolute inset-y-0 end-0 w-[62%] min-[900px]:w-[48%]">
        <img src="/home/skyline.jpg" alt="" className="h-full w-full object-cover object-[center_42%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14352c] via-[#14352c]/82 to-[#14352c]/15 rtl:bg-gradient-to-l" />
      </div>
      <Container className="relative grid items-center py-14 min-[900px]:py-20">
        <div className="flex max-w-[26rem] items-start gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ivory/30">
            <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5zM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
            </svg>
          </span>
          <p className="font-serif text-[1.7rem] leading-snug">
            <LocaleText k="footerLine" />
          </p>
        </div>
      </Container>
      <Container className="relative pb-8">
        <Link href="/privacy" className="inline-flex min-h-11 items-center text-sm text-ivory/80 underline decoration-1 underline-offset-4">
          <LocaleText k="privacy" />
        </Link>
      </Container>
    </footer>
  );
}
