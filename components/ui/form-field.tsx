import { cloneElement, useId, type ReactElement, type ReactNode } from "react";

export function FormField({
  label,
  help,
  error,
  children,
}: {
  label: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  children: ReactElement<{
    id?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  }>;
}) {
  const id = useId();
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-sans text-[0.95rem] font-semibold">
        {label}
      </label>
      {cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {help ? (
        <p id={helpId} className="text-sm text-ink-soft">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-[0.92rem] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
