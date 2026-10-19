import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "About",
};

const steps = [
  ["how1Title", "how1Body"],
  ["how2Title", "how2Body"],
  ["how3Title", "how3Body"],
] as const;

export default function AboutPage() {
  return (
    <article className="max-w-[40rem]">
      <SectionHeading
        as="h1"
        title={<LocaleText k="aboutTitle" />}
        description={<LocaleText k="aboutLead" />}
      />
      <section className="mt-12">
        <SectionHeading as="h2" title={<LocaleText k="howTitle" />} />
        <ol className="mt-6 flex flex-col gap-6">
          {steps.map(([title, body]) => (
            <li key={title} className="min-w-0">
              <h3 className="font-sans font-semibold">
                <LocaleText k={title} />
              </h3>
              <p className="mt-1 text-ink-soft">
                <LocaleText k={body} />
              </p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
