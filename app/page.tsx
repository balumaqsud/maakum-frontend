import Link from "next/link";
import { LocaleText } from "@/components/shared/locale-text";
import { getMessage, stats } from "@/features/messages/data";

export default function Home() {
  const featured = getMessage("m1");
  const featuredText = featured?.text.en ?? featured?.text[featured.orig] ?? "";
  const featuredLang = featured?.text.en ? "en" : (featured?.orig ?? "en");

  return (
    <article className="flex flex-col gap-10">
      <header className="max-w-xl">
        <h1 className="text-[clamp(2.7rem,12vw,4.5rem)] font-medium leading-none tracking-tight">
          <LocaleText k="homeTitle" />
        </h1>
        <p className="mt-4 text-lg text-neutral-700">
          <LocaleText k="homeLead" />
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/messages" className="rounded-full bg-neutral-900 px-4 py-2 text-white">
            <LocaleText k="readMessages" />
          </Link>
          <Link href="/write" className="rounded-full border border-neutral-300 px-4 py-2">
            <LocaleText k="writeMessage" />
          </Link>
        </div>
      </header>

      {featured ? (
        <section className="max-w-xl">
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            <LocaleText k="featuredLabel" />
          </h2>
          <p className="mt-3" lang={featuredLang} dir={featuredLang === "ar" ? "rtl" : "ltr"}>
            {featuredText}
          </p>
          <Link href={`/messages/${featured.id}`} className="mt-3 inline-block underline">
            <LocaleText k="readMessages" />
          </Link>
        </section>
      ) : null}

      <section>
        <h2 className="text-2xl font-semibold">
          <LocaleText k="howTitle" />
        </h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
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
      </section>

      <section className="max-w-xl">
        <h2 className="text-2xl font-semibold">
          <LocaleText k="careTitle" />
        </h2>
        <p className="mt-2 text-neutral-700">
          <LocaleText k="careBody" />
        </p>
      </section>

      <ul className="flex flex-wrap gap-6">
        <li>
          <p className="text-2xl font-semibold">{stats.messages.toLocaleString("en")}</p>
          <p>
            <LocaleText k="statsMessages" />
          </p>
        </li>
        <li>
          <p className="text-2xl font-semibold">{stats.countries.toLocaleString("en")}</p>
          <p>
            <LocaleText k="statsCountries" />
          </p>
        </li>
        <li>
          <p className="text-2xl font-semibold">{stats.replies.toLocaleString("en")}</p>
          <p>
            <LocaleText k="statsReplies" />
          </p>
        </li>
      </ul>
    </article>
  );
}
