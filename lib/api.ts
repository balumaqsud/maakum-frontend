import { cookies } from "next/headers";
import { connection } from "next/server";
import type { Message, Reply } from "@/features/messages/types";

const VISITOR_COOKIE = "maakum_visitor";

export const MESSAGE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isMessageId(id: string): boolean {
  return MESSAGE_ID.test(id);
}

type ApiNote = {
  id: string;
  parentId: string | null;
  displayName: string | null;
  countryCode: string | null;
  originalText: string;
  originalLanguage: string | null;
  translations: Record<string, string>;
  replyCount: number;
  reactionCount: number;
  publishedAt?: string;
  createdAt?: string;
};

export type MessageFeed = {
  items: Message[];
  nextCursor: string | null;
};

export type ThreadResult =
  | { status: "ok"; message: Message; repliesOk: boolean }
  | { status: "missing" }
  | { status: "error" };

export type WriteResult =
  | { ok: true }
  | { ok: false; status: number | "unavailable"; fields: Record<string, string> };

export type ReactionResult =
  | { ok: true; reacted: boolean; reactionCount: number }
  | { ok: false; status: number | "unavailable" };

function apiBase(): string | null {
  const value = process.env.API_URL?.trim().replace(/\/$/, "");
  return value || null;
}

async function readJson(
  path: string,
): Promise<{ ok: true; body: unknown } | { ok: false; status: number | "unavailable" }> {
  await connection();
  const base = apiBase();
  if (!base) return { ok: false, status: "unavailable" };

  try {
    const response = await fetch(`${base}${path}`, { cache: "no-store" });
    if (!response.ok) return { ok: false, status: response.status };
    return { ok: true, body: await response.json() };
  } catch {
    return { ok: false, status: "unavailable" };
  }
}

function minutesSince(iso: string | undefined): number {
  if (!iso) return 0;
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return 0;
  return Math.max(0, Math.round((Date.now() - then) / 60000));
}

function asNote(value: unknown): ApiNote | null {
  if (!value || typeof value !== "object") return null;
  const note = value as Partial<ApiNote>;
  if (typeof note.id !== "string" || typeof note.originalText !== "string") return null;

  const translations: Record<string, string> = {};
  if (note.translations && typeof note.translations === "object") {
    for (const [lang, text] of Object.entries(note.translations)) {
      if (typeof text === "string" && text.trim()) translations[lang] = text;
    }
  }

  return {
    id: note.id,
    parentId: typeof note.parentId === "string" ? note.parentId : null,
    displayName: typeof note.displayName === "string" ? note.displayName : null,
    countryCode: typeof note.countryCode === "string" ? note.countryCode : null,
    originalText: note.originalText,
    originalLanguage: typeof note.originalLanguage === "string" ? note.originalLanguage : null,
    translations,
    replyCount: typeof note.replyCount === "number" ? note.replyCount : 0,
    reactionCount: typeof note.reactionCount === "number" ? note.reactionCount : 0,
    publishedAt: typeof note.publishedAt === "string" ? note.publishedAt : undefined,
    createdAt: typeof note.createdAt === "string" ? note.createdAt : undefined,
  };
}

function toMessage(note: ApiNote, replies: Reply[] = []): Message {
  const orig = note.originalLanguage ?? "";
  const text: Record<string, string> = { ...note.translations };
  if (note.originalText.trim()) text[orig] = note.originalText;

  return {
    id: note.id,
    name: note.displayName,
    country: note.countryCode ? note.countryCode.toLowerCase() : "",
    orig,
    ago: minutesSince(note.publishedAt ?? note.createdAt),
    replyCount: note.replyCount,
    reactionCount: note.reactionCount,
    text,
    replies,
  };
}

function toReply(note: ApiNote): Reply {
  const message = toMessage(note);
  return {
    id: message.id,
    name: message.name,
    country: message.country,
    orig: message.orig,
    ago: message.ago,
    reactionCount: message.reactionCount,
    text: message.text,
  };
}

function nestReplies(notes: ApiNote[]): Reply[] {
  const byId = new Map<string, Reply>();
  for (const note of notes) byId.set(note.id, toReply(note));

  const roots: Reply[] = [];
  for (const note of notes) {
    const node = byId.get(note.id);
    if (!node) continue;
    const parent = note.parentId ? byId.get(note.parentId) : undefined;
    if (parent) {
      parent.children = parent.children ?? [];
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

export async function getMessageFeed(options: { limit: number; cursor?: string }): Promise<MessageFeed | null> {
  const params = new URLSearchParams({ limit: String(options.limit), order: "newest" });
  if (options.cursor) params.set("cursor", options.cursor);

  const result = await readJson(`/messages?${params}`);
  if (!result.ok || !result.body || typeof result.body !== "object") return null;

  const body = result.body as { items?: unknown; nextCursor?: unknown };
  if (!Array.isArray(body.items)) return null;

  return {
    items: body.items.flatMap((item) => {
      const note = asNote(item);
      return note ? [toMessage(note)] : [];
    }),
    nextCursor: typeof body.nextCursor === "string" && body.nextCursor ? body.nextCursor : null,
  };
}

export async function getFeaturedMessages(): Promise<Message[]> {
  const feed = await getMessageFeed({ limit: 3 });
  return feed?.items ?? [];
}

export async function getMessageThread(id: string): Promise<ThreadResult> {
  const result = await readJson(`/messages/${encodeURIComponent(id)}`);
  if (!result.ok) {
    return result.status === 404 || result.status === 400 ? { status: "missing" } : { status: "error" };
  }
  if (!result.body || typeof result.body !== "object") return { status: "error" };

  const body = result.body as { root?: unknown; replies?: unknown };
  const root = asNote(body.root);
  if (!root) return { status: "error" };

  const replyItems = Array.isArray(body.replies) ? body.replies : null;
  const replies = replyItems
    ? nestReplies(replyItems.flatMap((item) => {
        const note = asNote(item);
        return note ? [note] : [];
      }))
    : [];

  return { status: "ok", message: toMessage(root, replies), repliesOk: replyItems !== null };
}

async function visitorHeader(): Promise<string | undefined> {
  const store = await cookies();
  const value = store.get(VISITOR_COOKIE)?.value;
  return value ? `${VISITOR_COOKIE}=${value}` : undefined;
}

async function rememberVisitor(headers: Headers) {
  const listed = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [];
  const fromHeader = headers.get("set-cookie");
  const cookiesToRead = listed.length > 0 ? listed : fromHeader ? [fromHeader] : [];
  const match = cookiesToRead.map((item) => /^maakum_visitor=([^;]+)/.exec(item)?.[1]).find(Boolean);
  if (!match) return;
  const store = await cookies();
  store.set(VISITOR_COOKIE, match, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

async function writeJson(path: string, method: "POST" | "DELETE", body?: Record<string, string>): Promise<WriteResult> {
  await connection();
  const base = apiBase();
  if (!base) return { ok: false, status: "unavailable", fields: {} };

  const headers: Record<string, string> = { accept: "application/json" };
  if (body) headers["content-type"] = "application/json";
  const visitor = await visitorHeader();
  if (visitor) headers.cookie = visitor;

  try {
    const response = await fetch(`${base}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    await rememberVisitor(response.headers);
    const parsed = await response.json().catch(() => null);
    const fields = fieldsFrom(parsed);
    if (!response.ok) return { ok: false, status: response.status, fields };
    return { ok: true };
  } catch {
    return { ok: false, status: "unavailable", fields: {} };
  }
}

function fieldsFrom(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {};
  const error = (value as { error?: { fields?: unknown } }).error;
  if (!error?.fields || typeof error.fields !== "object") return {};
  const fields: Record<string, string> = {};
  for (const [key, message] of Object.entries(error.fields)) {
    if (typeof message === "string") fields[key] = message;
  }
  return fields;
}

export async function createMessage(input: {
  text: string;
  displayName?: string;
  countryCode?: string;
}): Promise<WriteResult> {
  return writeJson("/messages", "POST", compact(input));
}

export async function createReply(
  messageId: string,
  input: { text: string; displayName?: string; countryCode?: string },
): Promise<WriteResult> {
  return writeJson(`/messages/${encodeURIComponent(messageId)}/replies`, "POST", compact(input));
}

export async function setReaction(id: string, react: boolean): Promise<ReactionResult> {
  await connection();
  const base = apiBase();
  if (!base || !isMessageId(id)) return { ok: false, status: "unavailable" };

  const headers: Record<string, string> = { accept: "application/json", "content-type": "application/json" };
  const visitor = await visitorHeader();
  if (visitor) headers.cookie = visitor;

  try {
    const response = await fetch(`${base}/messages/${id}/reactions`, {
      method: react ? "POST" : "DELETE",
      headers,
      body: "{}",
      cache: "no-store",
    });
    await rememberVisitor(response.headers);
    const parsed = (await response.json().catch(() => null)) as { reacted?: unknown; reactionCount?: unknown } | null;
    if (!response.ok || typeof parsed?.reacted !== "boolean" || typeof parsed.reactionCount !== "number") {
      return { ok: false, status: response.ok ? "unavailable" : response.status };
    }
    return { ok: true, reacted: parsed.reacted, reactionCount: parsed.reactionCount };
  } catch {
    return { ok: false, status: "unavailable" };
  }
}

function compact(input: { text: string; displayName?: string; countryCode?: string }): Record<string, string> {
  const body: Record<string, string> = { text: input.text };
  if (input.displayName) body.displayName = input.displayName;
  if (input.countryCode) body.countryCode = input.countryCode;
  return body;
}
