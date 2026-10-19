"use client";

import { createContext, useContext, useState, type FormEvent, type ReactNode } from "react";
import { LocaleText } from "@/components/shared/locale-text";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { submitReply } from "@/features/messages/actions";
import { TEXT_LIMIT, type ComposeError } from "@/features/messages/compose";
import { CountryField } from "@/features/messages/components/country-field";
import { translate, type ChromeKey } from "@/lib/i18n";

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

type ReplyTarget = { id: string; name: string | null };

type ReplySessionValue = {
  pending: PendingReply[];
  choose: (target: ReplyTarget) => void;
};

const ReplyContext = createContext<ReplySessionValue | null>(null);

function useReplySession() {
  const value = useContext(ReplyContext);
  if (!value) throw new Error("Reply controls must render inside the reply session");
  return value;
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

export function ReplyButton({ id, name }: { id: string; name: string | null }) {
  const { choose } = useReplySession();
  return (
    <Button type="button" variant="text" onClick={() => choose({ id, name })}>
      <LocaleText k="replyTo" />
    </Button>
  );
}

export function PendingNotes({ parentId }: { parentId: string }) {
  const { pending } = useReplySession();
  return pending
    .filter((item) => item.parentId === parentId)
    .map((item) => <PendingNote key={item.id} item={item} />);
}

export function PendingBranch({ parentId }: { parentId: string }) {
  const { pending } = useReplySession();
  const here = pending.filter((item) => item.parentId === parentId);
  if (here.length === 0) return null;
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {here.map((item) => (
        <PendingNote key={item.id} item={item} />
      ))}
    </ul>
  );
}

export function EmptyOrPending({ parentId, hideEmpty }: { parentId: string; hideEmpty: boolean }) {
  const { pending } = useReplySession();
  const here = pending.filter((item) => item.parentId === parentId);
  if (here.length === 0) {
    if (hideEmpty) return null;
    return (
      <p className="mt-4 text-ink-soft">
        <LocaleText k="noReplies" />
      </p>
    );
  }
  return (
    <ul className="mt-4 flex flex-col gap-6">
      {here.map((item) => (
        <PendingNote key={item.id} item={item} />
      ))}
    </ul>
  );
}

export function ReplySession({ rootId, children }: { rootId: string; children: ReactNode }) {
  const [target, setTarget] = useState<ReplyTarget | null>(null);
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
    <ReplyContext.Provider
      value={{
        pending,
        choose: (next) => {
          setTarget(next);
          setNotice(false);
        },
      }}
    >
      <section className="mt-12">
        <h2 className="text-[clamp(1.45rem,5vw,1.9rem)]">
          <LocaleText k="repliesTitle" />
        </h2>
        {children}
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
    </ReplyContext.Provider>
  );
}
