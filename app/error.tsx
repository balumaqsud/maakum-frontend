"use client";

import { useEffect } from "react";
import { LocaleText } from "@/components/shared/locale-text";
import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";

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
    <ErrorState
      title={<LocaleText k="errorTitle" />}
      action={
        <Button type="button" variant="text" onClick={() => retry()}>
          <LocaleText k="retry" />
        </Button>
      }
    />
  );
}
