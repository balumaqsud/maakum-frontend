import Link from "next/link";
import { LocaleText } from "@/components/shared/locale-text";
import { countryName } from "@/features/messages/data";
import type { Message } from "@/features/messages/types";

function Both({ en, ar }: { en: string; ar: string }) {
  return (
    <>
      <span className="locale-en">{en}</span>
      <span className="locale-ar" lang="ar">
        {ar}
      </span>
    </>
  );
}

export function MessageCard({ message, hero = false, href }: { message: Message; hero?: boolean; href?: string }) {
  const name = message.name ?? <LocaleText k="anonymous" />;
  const quote = message.text[message.orig] ?? "";

  return (
    <article className="min-w-0 py-8">
      <p className="mb-3 flex flex-wrap items-center gap-x-2 text-[0.92rem] text-ink">
        {href ? (
          <Link href={href} className="font-semibold underline decoration-1 underline-offset-4">
            {name}
          </Link>
        ) : (
          <span className="font-semibold">{name}</span>
        )}
        <span aria-hidden className="text-ink-soft">
          ·
        </span>
        <span className="text-ink-soft">
          <Both en={countryName(message.country, "en")} ar={countryName(message.country, "ar")} />
        </span>
      </p>
      <p
        className={
          hero
            ? "quote text-[clamp(1.5rem,6.2vw,2.15rem)] leading-normal"
            : "quote text-[1.25rem] leading-relaxed"
        }
        lang={message.orig}
        dir={message.orig === "ar" ? "rtl" : "ltr"}
      >
        {quote}
      </p>
    </article>
  );
}
