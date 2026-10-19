"use client";

import { useState, type FormEvent } from "react";
import { LocaleText } from "@/components/shared/locale-text";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { submitMessage } from "@/features/messages/actions";
import { TEXT_LIMIT, codePoints, type ComposeError } from "@/features/messages/compose";
import { CountryField } from "@/features/messages/components/country-field";
import type { ChromeKey } from "@/lib/i18n";

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

export function MessageForm() {
  const [error, setError] = useState<ComposeError | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = String(data.get("message") ?? "");
    setBusy(true);
    const result = await submitMessage({
      text,
      displayName: String(data.get("name") ?? ""),
      countryCode: String(data.get("country") ?? ""),
    });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSent(text.trim());
    setError(null);
  }

  if (sent) {
    return (
      <div className="mt-8 grid gap-4">
        <h2 className="text-[clamp(1.45rem,5vw,1.9rem)]">
          <LocaleText k="writeOkTitle" />
        </h2>
        <p className="text-ink-soft">
          <LocaleText k="writeOkBody" />
        </p>
        <p className="quote text-[1.15rem]" dir="auto">
          {sent}
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setSent(null);
            setCount(0);
          }}
        >
          <LocaleText k="writeAgain" />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-6">
      <FormField
        label={<LocaleText k="writeField" />}
        help={<LocaleText k="writeHelp" />}
        error={error && error !== "name" && error !== "country" ? <LocaleText k={errorKey[error]} /> : undefined}
      >
        <textarea
          name="message"
          rows={7}
          maxLength={TEXT_LIMIT * 2}
          className="field-control"
          dir="auto"
          required
          onChange={(event) => {
            setCount(codePoints(event.target.value));
            setError(null);
          }}
        />
      </FormField>
      <p className="text-sm text-ink-soft" aria-live="polite">
        {count} / {TEXT_LIMIT}
      </p>
      <FormField
        label={
          <>
            <LocaleText k="writeName" /> <span className="font-normal text-ink-soft"><LocaleText k="writeOptional" /></span>
          </>
        }
        error={error === "name" ? <LocaleText k="writeNameLong" /> : undefined}
      >
        <input name="name" type="text" maxLength={80} className="field-control" dir="auto" autoComplete="name" />
      </FormField>
      <CountryField error={error === "country"} />
      <Button type="submit" pending={busy}>
        <LocaleText k="send" />
      </Button>
    </form>
  );
}
