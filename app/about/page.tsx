import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">
        <LocaleText k="aboutTitle" />
      </h1>
      <p className="mt-3 text-lg text-neutral-700">
        <LocaleText k="aboutLead" />
      </p>
      <h2 className="mt-8 text-2xl font-semibold">
        <LocaleText k="howTitle" />
      </h2>
      <ol className="mt-4 flex flex-col gap-4">
        <li>
          <h3 className="font-semibold">
            <LocaleText k="how1Title" />
          </h3>
          <p className="mt-1 text-neutral-700">
            <LocaleText k="how1Body" />
          </p>
        </li>
        <li>
          <h3 className="font-semibold">
            <LocaleText k="how2Title" />
          </h3>
          <p className="mt-1 text-neutral-700">
            <LocaleText k="how2Body" />
          </p>
        </li>
        <li>
          <h3 className="font-semibold">
            <LocaleText k="how3Title" />
          </h3>
          <p className="mt-1 text-neutral-700">
            <LocaleText k="how3Body" />
          </p>
        </li>
      </ol>
    </article>
  );
}
