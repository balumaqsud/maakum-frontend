"use server";

import { cookies } from "next/headers";
import { createMessage, createReply, isMessageId, setReaction } from "@/lib/api";
import { composeError, validateCompose, type ComposeError, type ComposeInput } from "@/features/messages/compose";

const REACHED_COOKIE = "maakum_reached";

export type SubmitResult = { ok: true } | { ok: false; error: ComposeError };

export async function submitMessage(input: ComposeInput): Promise<SubmitResult> {
  const parsed = validateCompose(input);
  if (!parsed.ok) return parsed;
  const result = await createMessage(parsed);
  if (!result.ok) return { ok: false, error: composeError(result.status, result.fields) };
  return { ok: true };
}

export async function submitReply(messageId: string, input: ComposeInput): Promise<SubmitResult> {
  if (!isMessageId(messageId)) return { ok: false, error: "missing" };
  const parsed = validateCompose(input);
  if (!parsed.ok) return parsed;
  const result = await createReply(messageId, parsed);
  if (!result.ok) return { ok: false, error: composeError(result.status, result.fields) };
  return { ok: true };
}

export async function reachedIds(): Promise<string[]> {
  const store = await cookies();
  return readReached(store.get(REACHED_COOKIE)?.value);
}

export async function toggleReaction(
  id: string,
  react: boolean,
): Promise<{ ok: true; reacted: boolean; reactionCount: number } | { ok: false }> {
  if (!isMessageId(id)) return { ok: false };
  const result = await setReaction(id, react);
  if (!result.ok) return { ok: false };
  const store = await cookies();
  const ids = readReached(store.get(REACHED_COOKIE)?.value).filter((item) => item !== id);
  if (result.reacted) ids.push(id);
  store.set(REACHED_COOKIE, ids.slice(-40).join(","), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return result;
}

function readReached(value: string | undefined): string[] {
  if (!value) return [];
  return value.split(",").filter((id) => isMessageId(id));
}
