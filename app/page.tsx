import { Suspense, type ReactNode } from "react";
import type { Metadata } from "next";
import { ClosingBand } from "@/components/home/closing-band";
import { HomeCard } from "@/components/home/home-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LocaleText } from "@/components/shared/locale-text";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getHomeStats } from "@/features/messages/data";
import type { Stats } from "@/features/messages/types";
import { getMessageFeed } from "@/lib/api";
import { copy, siteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ma'akum",
  description: copy("homeLead"),
  url: siteOrigin(),
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function StatIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-9 items-center justify-center rounded-full bg-olive-soft text-olive">{children}</span>
  );
}

function StatsRow({ stats }: { stats: Stats | null }) {
  const items = [
    {
      key: "statsMessages" as const,
      value: stats?.messages,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M5 6h14v9H8l-3 3z" />
        </svg>
      ),
    },
    {
      key: "statsCountries" as const,
      value: stats?.countries,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16M12 4c2 2.4 2 13.6 0 16M12 4c-2 2.4-2 13.6 0 16" />
        </svg>
      ),
    },
    {
      key: "statsReplies" as const,
      value: stats?.replies,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M7 8h10M7 12h6" />
          <path d="M5 5h14v10H8l-3 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-8">
      <ul className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <li key={item.key} className="flex min-w-0 items-center gap-2">
            <StatIcon>{item.icon}</StatIcon>
            <span className="min-w-0">
              {typeof item.value === "number" ? (
                <span className="block font-serif text-xl leading-none text-ink">{item.value.toLocaleString("en")}</span>
              ) : null}
              <span className="block text-xs text-ink-soft">
                <LocaleText k={item.key} />
              </span>
            </span>
          </li>
        ))}
      </ul>
      {stats === null ? (
        <p className="mt-3 max-w-[28rem] text-sm text-ink-soft">
          <LocaleText k="statsFallback" />
        </p>
      ) : null}
    </div>
  );
}

const archShape = "M50 1C28 14 8 44 6 78V138H94V78C92 44 72 14 50 1Z";

const archMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 138'><path fill='black' d='${archShape}'/></svg>`,
)}")`;

function OliveSprig({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 200 110" aria-hidden className={className} fill="none">
      <path d="M12 96C52 78 108 52 188 14" stroke="#5c6b44" strokeWidth="1.6" />
      {[
        [36, 84, -42, "#6d7d52"],
        [58, 70, 28, "#5a6848"],
        [78, 78, -18, "#7d8c60"],
        [96, 52, 36, "#546244"],
        [118, 58, -24, "#6a784e"],
        [136, 38, 22, "#61724a"],
        [158, 32, -30, "#738258"],
      ].map(([x, y, rotate, fill]) => (
        <ellipse
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          rx="20"
          ry="7.5"
          fill={fill as string}
          transform={`rotate(${rotate} ${x} ${y})`}
        />
      ))}
    </svg>
  );
}

function ArchPanel() {
  return (
    <div className="relative grid grid-cols-[minmax(0,1.15fr)_auto] items-center gap-2 min-[900px]:gap-4">
      <div className="relative">
        <div className="relative w-full" style={{ aspectRatio: "100 / 138" }}>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: archMask,
              WebkitMaskImage: archMask,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <img
              src="/home/arch-view.jpg"
              alt=""
              className="h-full w-full object-cover object-[center_42%]"
            />
          </div>
          <svg viewBox="0 0 100 138" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <path d={archShape} fill="none" stroke="#c4a36a" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <OliveSprig className="pointer-events-none absolute bottom-0 -start-6 w-40 min-[900px]:hidden" />
        <OliveSprig className="pointer-events-none absolute -start-8 -top-6 hidden w-32 -rotate-12 min-[900px]:block" />
        <OliveSprig className="pointer-events-none absolute -bottom-3 -end-8 hidden w-40 origin-bottom-right -rotate-6 min-[900px]:block" />
      </div>
      <div className="flex w-[7.1rem] flex-col items-center text-center min-[900px]:w-[8.5rem]">
        <div className="mb-3 hidden flex-col items-center min-[900px]:flex" aria-hidden>
          <span className="h-10 w-px bg-brass/80" />
          <svg viewBox="0 0 24 24" className="size-4 text-brass" fill="currentColor">
            <path d="M12 1.5l1.2 4.2 3.2-3.2-1.1 4.4 4.4-1.1-3.2 3.2L21 12l-4.5 1.2 3.2 3.2-4.4-1.1 1.1 4.4-3.2-3.2L12 22.5l-1.2-4.2-3.2 3.2 1.1-4.4-4.4 1.1 3.2-3.2L3 12l4.5-1.2-3.2-3.2 4.4 1.1L7.6 4.3l3.2 3.2z" />
          </svg>
        </div>
        <p lang="ar" className="font-arabic text-lg leading-snug text-ink min-[900px]:text-[1.65rem]">
          لستم وحدكم
        </p>
        <p className="mt-1 text-[0.65rem] text-ink-soft italic whitespace-nowrap min-[900px]:text-sm">&ldquo;You are not alone.&rdquo;</p>
        <span aria-hidden className="mt-2 h-px w-10 bg-brass/80" />
      </div>
    </div>
  );
}

async function FeaturedMessages() {
  const featured = await getMessageFeed({ limit: 3 });

  if (!featured) {
    return (
      <div className="mt-8">
        <ErrorState title={<LocaleText k="errorTitle" />} />
      </div>
    );
  }

  if (featured.items.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState title={<LocaleText k="featuredEmpty" />} />
      </div>
    );
  }

  return (
    <ul className="mt-8 grid gap-4 min-[900px]:grid-cols-3">
      {featured.items.map((message) => (
        <li key={message.id}>
          <HomeCard message={message} />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const stats = getHomeStats();

  return (
    <article className="bleed -my-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 end-0 w-16 overflow-hidden bg-[length:280px_auto] bg-center min-[900px]:w-[48%] min-[900px]:bg-[length:640px_auto]"
          style={{ backgroundImage: "url(/home/wall.jpg)" }}
        >
          <div className="absolute inset-0 bg-ivory/30" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-ivory/20 to-ivory rtl:bg-gradient-to-r min-[900px]:via-ivory/15 min-[900px]:to-ivory" />
          <svg viewBox="0 0 80 80" className="absolute top-6 end-1 size-14 text-brass/25 min-[900px]:hidden">
            <path
              fill="currentColor"
              d="M40 4l4 14 14-4-6 13 13 6-14 4 4 14-13-6-6 13-4-14-14 4 6-13-13-6 14-4z"
            />
          </svg>
        </div>
        <Container className="relative py-8 min-[900px]:py-12">
          <div className="grid items-center gap-10 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[900px]:gap-8">
            <div>
              <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-ink-soft">
                <LocaleText k="homeEyebrow" />
              </p>
              <h1 className="mt-3 max-w-[12ch] font-serif text-[2.7rem] leading-[1.05] text-olive min-[900px]:text-[3.6rem]">
                <LocaleText k="homeTitle" />
              </h1>
              <p className="mt-4 max-w-[34rem] text-lg text-ink-soft">
                <LocaleText k="homeLead" />
              </p>
              <div className="mt-6 flex flex-nowrap items-center gap-1.5 min-[900px]:gap-3">
                <Button href="/messages" className="gap-1.5 whitespace-nowrap px-3 text-[0.8125rem] min-[420px]:px-4 min-[420px]:text-sm min-[900px]:gap-2 min-[900px]:px-7 min-[900px]:text-base">
                  <LocaleText k="readMessages" />
                  <Arrow />
                </Button>
                <Button href="/write" variant="secondary" className="whitespace-nowrap bg-white px-3 text-[0.8125rem] min-[420px]:px-4 min-[420px]:text-sm min-[900px]:px-7 min-[900px]:text-base">
                  <LocaleText k="writeMessage" />
                </Button>
              </div>
              <StatsRow stats={stats} />
            </div>
            <ArchPanel />
          </div>
        </Container>
      </div>

      <section className="relative z-10 bg-white py-12 min-[900px]:py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-start gap-3">
              <svg viewBox="0 0 24 24" aria-hidden className="mt-1 size-5 shrink-0 text-brass" fill="currentColor">
                <path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8z" />
              </svg>
              <div>
                <h2 className="font-serif text-[1.7rem] text-ink min-[900px]:text-[2rem]">
                  <LocaleText k="featuredTitle" />
                </h2>
                <p className="mt-1 max-w-[36rem] text-ink-soft">
                  <LocaleText k="featuredLead" />
                </p>
              </div>
            </div>
            <Button href="/messages" variant="text" className="gap-1 px-0">
              <span className="min-[900px]:hidden">
                <LocaleText k="viewAllShort" />
              </span>
              <span className="hidden min-[900px]:inline">
                <LocaleText k="viewAll" />
              </span>
              <Arrow />
            </Button>
          </div>
          <Suspense
            fallback={
              <div className="mt-8 min-h-80">
                <p className="text-ink-soft">
                  <LocaleText k="loading" />
                </p>
              </div>
            }
          >
            <div className="min-h-80">
              <FeaturedMessages />
            </div>
          </Suspense>
        </Container>
      </section>

      <ClosingBand />
    </article>
  );
}
