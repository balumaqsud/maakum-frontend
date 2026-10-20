import Link from "next/link";
import { LocaleText } from "@/components/shared/locale-text";
import { countryName } from "@/features/messages/data";
import type { Message } from "@/features/messages/types";
import { relativeTime } from "@/lib/i18n";

function flag(code: string) {
  if (!/^[a-z]{2}$/i.test(code)) return "";
  return [...code.toUpperCase()].map((char) => String.fromCodePoint(127397 + char.charCodeAt(0))).join("");
}

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

export function HomeCard({ message }: { message: Message }) {
  const name = message.name ?? <LocaleText k="anonymous" />;
  const text = message.text[message.orig] ?? Object.values(message.text)[0] ?? "";
  const time = relativeTime(message.ago);
  const place = message.country ? countryName(message.country, "en") : "";
  const mark = flag(message.country);

  return (
    <article className="flex h-full min-w-0 flex-col rounded-[20px] border border-line bg-white p-5 shadow-[0_18px_40px_-32px_rgb(23_41_35/0.45)]">
      <div className="flex items-start gap-2 text-sm">
        {mark ? (
          <span aria-hidden className="text-base leading-none">
            {mark}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <Link href={`/messages/${message.id}`} className="font-semibold text-ink">
              {name}
            </Link>
            {place ? (
              <span className="text-ink-soft">
                <Both en={place} ar={countryName(message.country, "ar")} />
              </span>
            ) : null}
          </p>
        </div>
        <span className="shrink-0 text-ink-soft">
          <Both en={time.en} ar={time.ar} />
        </span>
      </div>
      <p className="quote mt-4 line-clamp-4 flex-1 text-[1.05rem] text-ink" lang={message.orig || undefined}>
        {text}
      </p>
      <div className="mt-4 flex items-center gap-4 text-sm text-ink-soft">
        <span className="inline-flex min-h-11 items-center gap-1.5">
          <svg viewBox="0 0 24 24" aria-hidden className="size-4 text-danger" fill="currentColor">
            <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
          </svg>
          {message.reactionCount}
        </span>
        <Link href={`/messages/${message.id}`} className="inline-flex min-h-11 items-center font-semibold text-ink hover:text-olive">
          <LocaleText k="replyTo" />
        </Link>
      </div>
    </article>
  );
}
