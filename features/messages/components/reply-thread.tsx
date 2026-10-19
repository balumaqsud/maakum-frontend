"use client";

import { useState, type FormEvent } from "react";
import { LocaleText } from "@/components/shared/locale-text";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { submitReply } from "@/features/messages/actions";
import { TEXT_LIMIT, type ComposeError } from "@/features/messages/compose";
import { CountryField } from "@/features/messages/components/country-field";
import { ReactionButton } from "@/features/messages/components/reaction-button";
import { countryName, langs } from "@/features/messages/data";
import type { ReadMode } from "@/features/messages/list";
import type { Reply } from "@/features/messages/types";
import { relativeTime, translate, type ChromeKey } from "@/lib/i18n";

const errorKey: Record<ComposeError, ChromeKey> = {
  empty: "writeEmpty",
  long: "writeLong",
  name: "writeNameLong",
  country: "writeCountryInvalid",
  rate: "writeRate",
  blocked: "writeBlocked",
  missing: "replyMissing",
  closed: "replyClosed",
  failed: "writeFailed",
};

type PendingReply = {
  id: string;
  parentId: string;
  text: string;
  name: string;
};

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

function PendingNote({ item }: { item: PendingReply }) {
  return (
    <li className="min-w-0 border-s-2 border-brass ps-5">
      <p className="text-[0.88rem] font-semibold">{item.name || <LocaleText k="anonymous" />}</p>
      <p className="quote mt-2 text-[1.14rem]" dir="auto">
        {item.text}
      </p>
      <p className="mt-2 text-sm text-ink-soft">
        <LocaleText k="replyPending" />
      </p>
    </li>
  );
}

function Letters({
  parentId,
  replies,
  reading,
  reached,
  pending,
  hideEmpty,
  onReply,
}: {
  parentId: string;
  replies: Reply[];
  reading: ReadMode;
  reached: string[];
  pending: PendingReply[];
  hideEmpty: boolean;
  onReply: (id: string, name: string | null) => void;
}) {
  const here = pending.filter((item) => item.parentId === parentId);
  if (replies.length === 0 && here.length === 0) {
    if (hideEmpty) return null;
    return (
      <p className="mt-4 text-ink-soft">
        <LocaleText k="noReplies" />
      </p>
    );
  }

  return (
    <ul className="mt-4 flex flex-col gap-6">
      {replies.map((reply) => (
        <Letter key={reply.id} reply={reply} reading={reading} reached={reached} pending={pending} onReply={onReply} />
      ))}
      {here.map((item) => (
        <PendingNote key={item.id} item={item} />
      ))}
    </ul>
  );
}

function Letter({
  reply,
  reading,
  reached,
  pending,
  onReply,
}: {
  reply: Reply;
  reading: ReadMode;
  reached: string[];
  pending: PendingReply[];
  onReply: (id: string, name: string | null) => void;
}) {
  const original = reply.text[reply.orig] ?? "";
  const selected = reading === "orig" ? original : reply.text[reading];
  const unavailable = reading !== "orig" && !selected;
  const quote = selected || original;
  const quoteLang = unavailable || reading === "orig" ? reply.orig : reading;
  const place = reply.country ? countryName(reply.country, "en") : "";
  const time = relativeTime(reply.ago);
  const readingLabel = reading === "ar" ? langs.ar : reading === "en" ? langs.en : null;
  const nestedPending = pending.filter((item) => item.parentId === reply.id);

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
        <Button
          type="button"
          variant="text"
          onClick={() => onReply(reply.id, reply.name)}
        >
          <LocaleText k="replyTo" />
        </Button>
      </div>
      {reply.children?.length || nestedPending.length ? (
        <ul className="mt-4 flex flex-col gap-4">
          {reply.children?.map((child) => (
            <Letter key={child.id} reply={child} reading={reading} reached={reached} pending={pending} onReply={onReply} />
          ))}
          {nestedPending.map((item) => (
            <PendingNote key={item.id} item={item} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function ReplyThread({
  rootId,
  replies,
  reading,
  reached,
  hideEmpty = false,
}: {
  rootId: string;
  replies: Reply[];
  reading: ReadMode;
  reached: string[];
  hideEmpty?: boolean;
}) {
  const [target, setTarget] = useState<{ id: string; name: string | null } | null>(null);
  const [pending, setPending] = useState<PendingReply[]>([]);
  const [error, setError] = useState<ComposeError | null>(null);
  const [notice, setNotice] = useState(false);
  const [busy, setBusy] = useState(false);
  const parentId = target?.id ?? rootId;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = String(data.get("message") ?? "");
    const displayName = String(data.get("name") ?? "");
    const countryCode = String(data.get("country") ?? "");
    setBusy(true);
    setNotice(false);
    const result = await submitReply(parentId, { text, displayName, countryCode });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const replyTo = parentId;
    setPending((items) => [
      ...items,
      { id: `pending-${items.length + 1}`, parentId: replyTo, text: text.trim(), name: displayName.trim() },
    ]);
    const message = form.elements.namedItem("message");
    if (message instanceof HTMLTextAreaElement) message.value = "";
    setError(null);
    setNotice(true);
    setTarget(null);
  }

  return (
    <section className="mt-12">
      <h2 className="text-[clamp(1.45rem,5vw,1.9rem)]">
        <LocaleText k="repliesTitle" />
      </h2>
      <Letters
        parentId={rootId}
        replies={replies}
        reading={reading}
        reached={reached}
        pending={pending}
        hideEmpty={hideEmpty}
        onReply={(id, name) => {
          setTarget({ id, name });
          setNotice(false);
        }}
      />
      <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-6">
        {target ? (
          <p className="text-sm text-ink-soft">
            <span className="locale-en">
              {translate("en", "replyingTo").replace("{name}", target.name ?? translate("en", "anonymous"))}
            </span>
            <span className="locale-ar" lang="ar">
              {translate("ar", "replyingTo").replace("{name}", target.name ?? translate("ar", "anonymous"))}
            </span>
          </p>
        ) : null}
        <FormField
          label={<LocaleText k="replyField" />}
          help={<LocaleText k="writeHelp" />}
          error={error && error !== "name" && error !== "country" ? <LocaleText k={errorKey[error]} /> : undefined}
        >
          <textarea name="message" rows={4} maxLength={TEXT_LIMIT * 2} className="field-control" dir="auto" />
        </FormField>
        <FormField
          label={
            <>
              <LocaleText k="writeName" />{" "}
              <span className="font-normal text-ink-soft">
                <LocaleText k="writeOptional" />
              </span>
            </>
          }
          error={error === "name" ? <LocaleText k="writeNameLong" /> : undefined}
        >
          <input name="name" type="text" maxLength={80} className="field-control" dir="auto" autoComplete="name" />
        </FormField>
        <CountryField error={error === "country"} />
        <div className="flex flex-wrap gap-3">
          <Button type="submit" pending={busy}>
            <LocaleText k="replySend" />
          </Button>
          {target ? (
            <Button type="button" variant="text" onClick={() => setTarget(null)}>
              <LocaleText k="cancel" />
            </Button>
          ) : null}
        </div>
        {notice ? (
          <p role="status" className="text-ink-soft">
            <LocaleText k="replyOk" />
          </p>
        ) : null}
      </form>
    </section>
  );
}
