import Link from "next/link";
import { LocaleText } from "@/components/shared/locale-text";
import { Button } from "@/components/ui/button";
import { countryName, langs, languageName } from "@/features/messages/data";
import type { ReadMode } from "@/features/messages/list";
import type { Message } from "@/features/messages/types";
import { relativeTime, replyCount, translate } from "@/lib/i18n";

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

export function MessageCard({
  message,
  hero = false,
  href,
  reading = "orig",
  showReading = false,
  conversation = false,
}: {
  message: Message;
  hero?: boolean;
  href?: string;
  reading?: ReadMode;
  showReading?: boolean;
  conversation?: boolean;
}) {
  const name = message.name ?? <LocaleText k="anonymous" />;
  const original = message.text[message.orig] ?? "";
  const selected = reading === "orig" ? original : message.text[reading];
  const unavailable = reading !== "orig" && !selected;
  const quote = selected || original;
  const quoteLang = unavailable || reading === "orig" ? message.orig : reading;
  const time = relativeTime(message.ago);
  const place = message.country ? countryName(message.country, "en") : "";
  const language = message.orig ? languageName(message.orig) : null;
  const replies = replyCount(message.replyCount);
  const readingLabel =
    reading === "ar" ? langs.ar : reading === "en" ? langs.en : { en: translate("en", "readOriginal"), ar: translate("ar", "readOriginal") };
  const enTranslation = reading === "orig" && message.orig !== "en" ? message.text.en : undefined;
  const arTranslation = reading === "orig" && message.orig !== "ar" ? message.text.ar : undefined;

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
        {place ? (
          <>
            <span aria-hidden className="text-ink-soft">
              ·
            </span>
            <span className="text-ink-soft">
              <Both en={place} ar={countryName(message.country, "ar")} />
            </span>
          </>
        ) : null}
        <span aria-hidden className="text-ink-soft">
          ·
        </span>
        <span className="text-ink-soft">
          <Both en={time.en} ar={time.ar} />
        </span>
        <span aria-hidden className="text-ink-soft">
          ·
        </span>
        {language ? (
          <>
            <span className="text-ink-soft">
              <Both en={language.en} ar={language.ar} />
            </span>
            <span aria-hidden className="text-ink-soft">
              ·
            </span>
          </>
        ) : null}
        <span className="text-ink-soft">
          <Both en={replies.en} ar={replies.ar} />
        </span>
      </p>
      {unavailable ? (
        <p className="mb-3 text-sm text-ink-soft">
          <LocaleText k="translationMissing" />
        </p>
      ) : null}
      {showReading ? (
        <p className="mb-2 font-sans text-[0.78rem] font-semibold text-olive">
          <Both en={unavailable ? translate("en", "readOriginal") : readingLabel.en} ar={unavailable ? translate("ar", "readOriginal") : readingLabel.ar} />
        </p>
      ) : null}
      <p
        className={
          hero
            ? "quote text-[clamp(1.5rem,6.2vw,2.15rem)] leading-normal"
            : "quote text-[1.25rem] leading-relaxed"
        }
        lang={quoteLang}
        dir={quoteLang === "ar" ? "rtl" : "ltr"}
      >
        {quote}
      </p>
      {enTranslation ? (
        <p className="locale-en quote mt-4 text-base text-ink" lang="en" dir="ltr">
          <span className="mb-1 block font-sans text-[0.78rem] font-semibold text-ink-soft">
            {translate("en", "translationLabel")}
          </span>
          {enTranslation}
        </p>
      ) : null}
      {arTranslation ? (
        <p className="locale-ar quote mt-4 text-base text-ink" lang="ar" dir="rtl">
          <span className="mb-1 block font-sans text-[0.78rem] font-semibold text-ink-soft">
            {translate("ar", "translationLabel")}
          </span>
          {arTranslation}
        </p>
      ) : null}
      {conversation && href ? (
        <Button href={href} variant="text">
          <LocaleText k="openConversation" />
        </Button>
      ) : null}
    </article>
  );
}
