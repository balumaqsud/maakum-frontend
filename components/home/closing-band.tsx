import Image from "next/image";
import Link from "next/link";
import { OliveBranch } from "@/components/home/olive-branch";
import { LocaleText } from "@/components/shared/locale-text";
import { Container } from "@/components/ui/container";

const paper = "#FFFDF8";

export function ClosingBand() {
  return (
    <footer className="relative z-10 -mt-[4.5rem] min-h-[20rem] bg-[#173C32] text-ivory min-[900px]:-mt-[7.5rem] min-[900px]:min-h-[24rem]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/home/skyline.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_46%]"
        />
        <div className="absolute inset-0 bg-[#173C32]/28" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#173C32] via-[#173C32]/78 to-[#173C32]/18 rtl:bg-gradient-to-l" />
      </div>
      <svg
        aria-hidden
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[7.5rem] w-full -translate-y-10 min-[900px]:h-[11rem] min-[900px]:-translate-y-14"
      >
        <path
          fill={paper}
          d="M0 0h1440v20c-200 10-420 48-680 62-250 14-500-8-760 18V0Z"
        />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 140 140"
        className="pointer-events-none absolute bottom-0 start-0 z-[2] hidden h-32 w-32 text-[#C4A36A]/70 [mask-image:radial-gradient(circle_at_bottom_left,black_20%,transparent_75%)] min-[700px]:block min-[900px]:h-44 min-[900px]:w-44 rtl:[mask-image:radial-gradient(circle_at_bottom_right,black_20%,transparent_75%)]"
      >
        <pattern id="footer-lattice" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M11 1.5 20.5 11 11 20.5 1.5 11Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <path d="M11 6 16 11 11 16 6 11Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <rect width="140" height="140" fill="url(#footer-lattice)" />
      </svg>
      <OliveBranch
        facing="fall"
        className="pointer-events-none absolute end-0 top-2 z-[2] hidden w-36 min-[700px]:block min-[900px]:top-0 min-[900px]:w-52"
      />
      <Container className="relative z-[2] pt-16 pb-8 min-[900px]:pt-24 min-[900px]:pb-10">
        <div className="flex max-w-[34rem] items-start gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ivory/30">
            <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5zM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
            </svg>
          </span>
          <p className="font-serif text-[1.65rem] leading-snug min-[900px]:text-[1.85rem]">
            <LocaleText k="footerLine" />
          </p>
        </div>
        <Link href="/privacy" className="mt-6 inline-flex min-h-11 items-center text-sm text-ivory/70 underline decoration-1 underline-offset-4">
          <LocaleText k="privacy" />
        </Link>
      </Container>
    </footer>
  );
}
