import { countries } from "@/features/messages/data";

export const TEXT_LIMIT = 2000;
export const NAME_LIMIT = 80;

export const countryChoices = countries.filter((country) => country.id !== "other");

export type ComposeError =
  | "empty"
  | "long"
  | "name"
  | "country"
  | "rate"
  | "blocked"
  | "missing"
  | "closed"
  | "failed";

export type ComposeInput = {
  text: string;
  displayName: string;
  countryCode: string;
};

export function codePoints(value: string): number {
  return [...value].length;
}

export function validateCompose(
  input: ComposeInput,
): { ok: true; text: string; displayName?: string; countryCode?: string } | { ok: false; error: ComposeError } {
  const text = input.text.trim();
  const name = input.displayName.trim();
  const country = input.countryCode.trim().toLowerCase();

  if (!text) return { ok: false, error: "empty" };
  if (codePoints(text) > TEXT_LIMIT) return { ok: false, error: "long" };
  if (codePoints(name) > NAME_LIMIT) return { ok: false, error: "name" };
  if (country && !countryChoices.some((item) => item.id === country)) return { ok: false, error: "country" };

  return {
    ok: true,
    text,
    displayName: name || undefined,
    countryCode: country ? country.toUpperCase() : undefined,
  };
}

export function composeError(status: number | "unavailable", fields: Record<string, string>): ComposeError {
  if (fields.countryCode) return "country";
  if (fields.displayName) return "name";
  if (fields.text || status === 413) return "long";
  if (status === 400) return "failed";
  if (status === 403) return "blocked";
  if (status === 404) return "missing";
  if (status === 409) return "closed";
  if (status === 429) return "rate";
  return "failed";
}
