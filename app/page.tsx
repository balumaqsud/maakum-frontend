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

function ArchPanel() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <img
        src="/home/arch.jpg"
        alt=""
        className="aspect-[3/4] w-full rounded-[28px] object-cover shadow-[0_24px_50px_-36px_rgb(23_41_35/0.55)]"
      />
      <div className="flex w-[5.25rem] flex-col items-center gap-2 text-center min-[900px]:w-28">
        <svg viewBox="0 0 24 24" aria-hidden className="size-5 text-brass" fill="currentColor">
          <path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8z" />
        </svg>
        <p lang="ar" className="font-arabic text-lg leading-snug text-ink min-[900px]:text-2xl">
          لستم وحدكم
        </p>
        <p className="text-[0.7rem] text-ink-soft italic min-[900px]:text-sm">&ldquo;You are not alone.&rdquo;</p>
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
      <Container className="relative py-8 min-[900px]:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-8 start-0 hidden w-16 opacity-40 min-[900px]:block"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, var(--color-line) 1.2px, transparent 1.4px)",
            backgroundSize: "10px 10px",
          }}
        />
        <div className="grid items-center gap-10 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[900px]:gap-12">
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
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/messages" className="gap-2">
                <LocaleText k="readMessages" />
                <Arrow />
              </Button>
              <Button href="/write" variant="secondary" className="bg-white">
                <LocaleText k="writeMessage" />
              </Button>
            </div>
            <StatsRow stats={stats} />
          </div>
          <ArchPanel />
        </div>
      </Container>

      <section className="bg-white py-12 min-[900px]:py-16">
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
              <LocaleText k="viewAll" />
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
