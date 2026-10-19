import { Suspense } from "react";
import type { Metadata } from "next";
import { EmptyState } from "@/components/shared/empty-state";
import { LocaleText } from "@/components/shared/locale-text";
import { Ornament } from "@/components/shared/ornament";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { MessageCard } from "@/features/messages/components/message-card";
import { getHomeStats } from "@/features/messages/data";
import { getFeaturedMessages } from "@/lib/api";
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

function HomeActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button href="/messages">
        <LocaleText k="readMessages" />
      </Button>
      <Button href="/write" variant="secondary">
        <LocaleText k="writeMessage" />
      </Button>
    </div>
  );
}

async function FeaturedMessages() {
  const featured = await getFeaturedMessages();

  if (featured.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState title={<LocaleText k="featuredEmpty" />} />
      </div>
    );
  }

  return (
    <ul className="mt-4 divide-y divide-line">
      {featured.map((message) => (
        <li key={message.id}>
          <MessageCard message={message} href={`/messages/${message.id}`} />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const stats = getHomeStats();

  return (
    <article className="flex flex-col gap-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <header className="max-w-[40rem]">
        <SectionHeading
          as="h1"
          title={<LocaleText k="homeTitle" />}
          description={<LocaleText k="homeLead" />}
          action={<HomeActions />}
        />
      </header>

      <section>
        {stats === null ? (
          <p className="max-w-[40rem] text-ink-soft">
            <LocaleText k="statsFallback" />
          </p>
        ) : null}
      </section>

      <section>
        <SectionHeading as="h2" title={<LocaleText k="featuredTitle" />} />
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
      </section>

      <section className="relative max-w-[44rem] sm:pe-40">
        <Ornament />
        <SectionHeading
          as="h2"
          title={<LocaleText k="homeCloseTitle" />}
          description={<LocaleText k="homeCloseLead" />}
          action={<HomeActions />}
        />
      </section>
    </article>
  );
}
