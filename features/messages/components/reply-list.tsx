import { LocaleText } from "@/components/shared/locale-text";
import { countryName, langs } from "@/features/messages/data";
import type { ReadMode } from "@/features/messages/list";
import type { Reply } from "@/features/messages/types";
import { relativeTime } from "@/lib/i18n";
import { ReactionButton } from "@/features/messages/components/reaction-button";
import { EmptyOrPending, PendingBranch, PendingNotes, ReplyButton } from "@/features/messages/components/reply-session";

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

function ReplyLetter({
  reply,
  reading,
  reached,
}: {
  reply: Reply;
  reading: ReadMode;
  reached: string[];
}) {
  const original = reply.text[reply.orig] ?? "";
  const selected = reading === "orig" ? original : reply.text[reading];
  const unavailable = reading !== "orig" && !selected;
  const quote = selected || original;
  const quoteLang = unavailable || reading === "orig" ? reply.orig : reading;
  const place = reply.country ? countryName(reply.country, "en") : "";
  const time = relativeTime(reply.ago);
  const readingLabel = reading === "ar" ? langs.ar : reading === "en" ? langs.en : null;
  const nested = reply.children ?? [];

  return (
    <li className="min-w-0 border-s-2 border-line ps-5">
      <p className="text-[0.88rem] text-ink">
        <span className="font-semibold">{reply.name ?? <LocaleText k="anonymous" />}</span>
        {place ? (
          <>
            <span aria-hidden className="px-2 text-ink-soft">
              ·
            </span>
            <span className="text-ink-soft">
              <Both en={place} ar={countryName(reply.country, "ar")} />
            </span>
          </>
        ) : null}
        <span aria-hidden className="px-2 text-ink-soft">
          ·
        </span>
        <span className="text-ink-soft">
          <Both en={time.en} ar={time.ar} />
        </span>
      </p>
      {unavailable ? (
        <p className="mt-2 text-sm text-ink-soft">
          <LocaleText k="translationMissing" />
        </p>
      ) : null}
      {readingLabel && !unavailable ? (
        <p className="mt-2 font-sans text-[0.78rem] font-semibold text-olive">
          <Both en={readingLabel.en} ar={readingLabel.ar} />
        </p>
      ) : null}
      <p className="quote mt-2 text-[1.14rem]" lang={quoteLang || undefined} dir={quoteLang === "ar" ? "rtl" : "ltr"}>
        {quote}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <ReactionButton id={reply.id} count={reply.reactionCount} active={reached.includes(reply.id)} />
        <ReplyButton id={reply.id} name={reply.name} />
      </div>
      {nested.length ? (
        <ul className="mt-4 flex flex-col gap-4">
          {nested.map((child) => (
            <ReplyLetter key={child.id} reply={child} reading={reading} reached={reached} />
          ))}
          <PendingNotes parentId={reply.id} />
        </ul>
      ) : (
        <PendingBranch parentId={reply.id} />
      )}
    </li>
  );
}

export function ReplyList({
  parentId,
  replies,
  reading,
  reached,
  hideEmpty,
}: {
  parentId: string;
  replies: Reply[];
  reading: ReadMode;
  reached: string[];
  hideEmpty: boolean;
}) {
  if (replies.length === 0) return <EmptyOrPending parentId={parentId} hideEmpty={hideEmpty} />;

  return (
    <ul className="mt-4 flex flex-col gap-6">
      {replies.map((reply) => (
        <ReplyLetter key={reply.id} reply={reply} reading={reading} reached={reached} />
      ))}
      <PendingNotes parentId={parentId} />
    </ul>
  );
}
