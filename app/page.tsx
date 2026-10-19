import { LocaleText } from "@/components/shared/locale-text";
import { Ornament } from "@/components/shared/ornament";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { MessageCard } from "@/features/messages/components/message-card";
import { getMessage, stats } from "@/features/messages/data";

export default function Home() {
  const featured = getMessage("m1");

  return (
    <article className="relative flex flex-col gap-16">
      <Ornament />
      <header className="relative max-w-[40rem]">
        <SectionHeading
          as="h1"
          title={<LocaleText k="homeTitle" />}
          description={<LocaleText k="homeLead" />}
          action={
            <div className="flex flex-wrap gap-3">
              <Button href="/messages">
                <LocaleText k="readMessages" />
              </Button>
              <Button href="/write" variant="secondary">
                <LocaleText k="writeMessage" />
              </Button>
            </div>
          }
        />
      </header>

      {featured ? (
        <section className="relative max-w-[40rem] rounded-sheet border border-line bg-ivory px-6 py-2 shadow-sheet">
          <h2 className="pt-6 font-sans text-[0.78rem] font-semibold tracking-[0.12em] text-ink-soft uppercase">
            <LocaleText k="featuredLabel" />
          </h2>
          <MessageCard message={featured} hero />
          <Button href={`/messages/${featured.id}`} variant="text">
            <LocaleText k="readMessages" />
          </Button>
        </section>
      ) : null}

      <section>
        <SectionHeading as="h2" title={<LocaleText k="howTitle" />} />
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {(
            [
              ["how1Title", "how1Body"],
              ["how2Title", "how2Body"],
              ["how3Title", "how3Body"],
            ] as const
          ).map(([title, body], index) => (
            <li key={title} className="min-w-0">
              <span className="font-display text-[2.4rem] leading-none text-brass">{index + 1}</span>
              <h3 className="mt-2 font-sans text-base font-semibold">
                <LocaleText k={title} />
              </h3>
              <p className="mt-1 max-w-[22rem] text-ink-soft">
                <LocaleText k={body} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-[44rem]">
        <SectionHeading as="h2" title={<LocaleText k="careTitle" />} description={<LocaleText k="careBody" />} />
      </section>

      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem] text-ink-soft">
        <li>
          <strong className="font-semibold text-ink">{stats.messages.toLocaleString("en")}</strong>{" "}
          <LocaleText k="statsMessages" />
        </li>
        <li>
          <strong className="font-semibold text-ink">{stats.countries.toLocaleString("en")}</strong>{" "}
          <LocaleText k="statsCountries" />
        </li>
        <li>
          <strong className="font-semibold text-ink">{stats.replies.toLocaleString("en")}</strong>{" "}
          <LocaleText k="statsReplies" />
        </li>
      </ul>
    </article>
  );
}
