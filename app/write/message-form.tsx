"use client";

import { useState, type FormEvent } from "react";
import { LocaleText } from "@/components/shared/locale-text";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";

export function MessageForm() {
  const [error, setError] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = new FormData(event.currentTarget).get("message");
    setError(typeof text !== "string" || text.trim().length === 0);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-6">
      <FormField
        label={<LocaleText k="writeField" />}
        help={<LocaleText k="writeHelp" />}
        error={error ? <LocaleText k="writeEmpty" /> : undefined}
      >
        <textarea
          name="message"
          rows={7}
          className="field-control"
          dir="auto"
          onChange={() => setError(false)}
        />
      </FormField>
      <Button type="submit">
        <LocaleText k="send" />
      </Button>
    </form>
  );
}
