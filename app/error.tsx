"use client";

import { useEffect } from "react";
import { LocaleText } from "@/components/shared/locale-text";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">
        <LocaleText k="errorTitle" />
      </h1>
      <button type="button" className="mt-6 underline" onClick={() => retry()}>
        <LocaleText k="retry" />
      </button>
    </div>
  );
}
