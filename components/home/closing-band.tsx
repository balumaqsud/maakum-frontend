import Link from "next/link";
import { LocaleText } from "@/components/shared/locale-text";
import { Container } from "@/components/ui/container";

export function ClosingBand() {
  return (
    <footer className="relative overflow-hidden bg-[#14352c] text-ivory">
      <div className="band-pattern pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 end-0 hidden w-[46%] min-[900px]:block">
        <img src="/home/skyline.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14352c] via-[#14352c]/75 to-transparent rtl:bg-gradient-to-l" />
      </div>
      <Container className="relative grid items-center gap-8 py-14 min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:py-20">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ivory/30">
            <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5zM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
            </svg>
          </span>
          <p className="max-w-[22rem] font-serif text-[1.7rem] leading-snug">
            <LocaleText k="footerLine" />
          </p>
        </div>
        <img src="/home/skyline.jpg" alt="" className="h-44 w-full rounded-[20px] object-cover min-[900px]:hidden" />
      </Container>
      <Container className="relative pb-8">
        <Link href="/privacy" className="inline-flex min-h-11 items-center text-sm text-ivory/80 underline decoration-1 underline-offset-4">
          <LocaleText k="privacy" />
        </Link>
      </Container>
    </footer>
  );
}
