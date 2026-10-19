import "server-only";

import { cacheLife } from "next/cache";
import { cookies } from "next/headers";
import { connection } from "next/server";
import type { Message, Reply } from "@/features/messages/types";

const VISITOR_COOKIE = "maakum_visitor";
const REQUEST_TIMEOUT_MS = 8000;
const FEED_LIMIT = { min: 1, max: 100 } as const;

export const MESSAGE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isMessageId(id: string): boolean {
  return MESSAGE_ID.test(id);
}

export type PublishedNote = {
  id: string;
  parentId: string | null;
  rootId: string | null;
  depth: number;
  displayName: string | null;
  countryCode: string | null;
  originalText: string;
  originalLanguage: string | null;
  translations: Record<string, string>;
  replyCount: number;
  reactionCount: number;
  createdAt: string | null;
  publishedAt: string | null;
};

export type PublishedFeed = {
  items: PublishedNote[];
  nextCursor: string | null;
};

export type PublishedThread = {
  root: PublishedNote;
  replies: PublishedNote[];
};

export type AcceptedMessage = {
  id: string;
  status: "pending";
};

export type AcceptedReply = AcceptedMessage & {
  rootId: string;
};

export type ReactionState = {
  reacted: boolean;
  reactionCount: number;
};

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
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

type ApiSuccess = {
  ok: true;
  status: number;
  body: unknown;
  visitor: string | null;
};

type ApiFailure = {
  ok: false;
  status: number | "unavailable";
  body: unknown;
  visitor: string | null;
};

type ApiResult = ApiSuccess | ApiFailure;

function apiBase(): string | null {
  const value = process.env.API_URL?.trim().replace(/\/$/, "");
  return value || null;
}

function unavailable(visitor: string | null = null): ApiFailure {
  return { ok: false, status: "unavailable", body: null, visitor };
}

function visitorFrom(headers: Headers): string | null {
  const listed = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [];
  const fromHeader = headers.get("set-cookie");
  const cookiesToRead = listed.length > 0 ? listed : fromHeader ? [fromHeader] : [];
  return cookiesToRead.map((item) => /^maakum_visitor=([^;]+)/.exec(item)?.[1]).find(Boolean) ?? null;
}

async function request(
  path: string,
  init?: { method?: "GET" | "POST" | "DELETE"; body?: Record<string, unknown>; cookie?: string },
): Promise<ApiResult> {
  const base = apiBase();
  if (!base) return unavailable();

  const method = init?.method ?? "GET";
  const headers: Record<string, string> = { accept: "application/json" };
  if (init?.cookie) headers.cookie = `${VISITOR_COOKIE}=${init.cookie}`;
  if (init?.body) headers["content-type"] = "application/json";

  try {
    const response = await fetch(`${base}${path}`, {
      method,
      headers,
      body: init?.body ? JSON.stringify(init.body) : undefined,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      ...(method === "GET" ? {} : { cache: "no-store" as const }),
    });
    const visitor = visitorFrom(response.headers);
    const body = await response.json().catch(() => null);
    if (body === null || typeof body !== "object") return unavailable(visitor);
    if (!response.ok) return { ok: false, status: response.status, body, visitor };
    return { ok: true, status: response.status, body, visitor };
  } catch {
    return unavailable();
  }
}

async function visitorCookie(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(VISITOR_COOKIE)?.value;
}

async function storeVisitor(value: string | null) {
  if (!value) return;
  const store = await cookies();
  store.set(VISITOR_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

function asNote(value: unknown): PublishedNote | null {
  if (!value || typeof value !== "object") return null;
  const note = value as Partial<PublishedNote>;
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
    rootId: typeof note.rootId === "string" ? note.rootId : null,
    depth: typeof note.depth === "number" && Number.isFinite(note.depth) ? note.depth : 0,
    displayName: typeof note.displayName === "string" ? note.displayName : null,
    countryCode: typeof note.countryCode === "string" ? note.countryCode : null,
    originalText: note.originalText,
    originalLanguage: typeof note.originalLanguage === "string" ? note.originalLanguage : null,
    translations,
    replyCount: typeof note.replyCount === "number" ? note.replyCount : 0,
    reactionCount: typeof note.reactionCount === "number" ? note.reactionCount : 0,
    publishedAt: typeof note.publishedAt === "string" ? note.publishedAt : null,
    createdAt: typeof note.createdAt === "string" ? note.createdAt : null,
  };
}

function asFeed(body: unknown): PublishedFeed | null {
  if (!body || typeof body !== "object") return null;
  const value = body as { items?: unknown; nextCursor?: unknown };
  if (!Array.isArray(value.items)) return null;
  if (value.nextCursor !== null && typeof value.nextCursor !== "string") return null;
  return {
    items: value.items.flatMap((item) => {
      const note = asNote(item);
      return note ? [note] : [];
    }),
    nextCursor: typeof value.nextCursor === "string" && value.nextCursor ? value.nextCursor : null,
  };
}

function asThread(body: unknown): { root: PublishedNote; replies: PublishedNote[]; repliesOk: boolean } | null {
  if (!body || typeof body !== "object") return null;
  const value = body as { root?: unknown; replies?: unknown };
  const root = asNote(value.root);
  if (!root) return null;
  if (!Array.isArray(value.replies)) return { root, replies: [], repliesOk: false };
  return {
    root,
    replies: value.replies.flatMap((item) => {
      const note = asNote(item);
      return note ? [note] : [];
    }),
    repliesOk: true,
  };
}

function asPending(body: unknown, reply: boolean): boolean {
  if (!body || typeof body !== "object") return false;
  const value = body as { id?: unknown; status?: unknown; rootId?: unknown };
  if (typeof value.id !== "string" || !isMessageId(value.id) || value.status !== "pending") return false;
  if (reply && (typeof value.rootId !== "string" || !isMessageId(value.rootId))) return false;
  return true;
}

function asReaction(body: unknown): ReactionState | null {
  if (!body || typeof body !== "object") return null;
  const value = body as { reacted?: unknown; reactionCount?: unknown };
  if (typeof value.reacted !== "boolean" || typeof value.reactionCount !== "number" || !Number.isFinite(value.reactionCount)) {
    return null;
  }
  return { reacted: value.reacted, reactionCount: value.reactionCount };
}

function fieldsFrom(body: unknown): Record<string, string> {
  if (!body || typeof body !== "object") return {};
  const error = (body as Partial<ApiErrorBody>).error;
  if (!error?.fields || typeof error.fields !== "object") return {};
  const fields: Record<string, string> = {};
  for (const [key, message] of Object.entries(error.fields)) {
    if (typeof message === "string") fields[key] = message;
  }
  return fields;
}

function minutesSince(iso: string | null): number {
  if (!iso) return 0;
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return 0;
  return Math.max(0, Math.round((Date.now() - then) / 60000));
}

function toMessage(note: PublishedNote, replies: Reply[] = []): Message {
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

function toReply(note: PublishedNote): Reply {
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

function nestReplies(notes: PublishedNote[]): Reply[] {
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

function feedLimit(limit: number): number {
  if (!Number.isFinite(limit)) return FEED_LIMIT.min;
  return Math.min(FEED_LIMIT.max, Math.max(FEED_LIMIT.min, Math.trunc(limit)));
}

async function loadFeed(limit: number, cursor: string): Promise<PublishedFeed> {
  "use cache";
  cacheLife("minutes");
  const params = new URLSearchParams({ limit: String(limit), order: "newest" });
  if (cursor) params.set("cursor", cursor);
  const result = await request(`/messages?${params}`);
  const feed = result.ok ? asFeed(result.body) : null;
  if (!feed) throw new Error("unavailable");
  return feed;
}

async function loadThread(id: string): Promise<
  | { status: "ok"; root: PublishedNote; replies: PublishedNote[]; repliesOk: boolean }
  | { status: "missing" }
> {
  "use cache";
  cacheLife("minutes");
  const result = await request(`/messages/${encodeURIComponent(id)}`);
  if (!result.ok) {
    if (result.status === 404 || result.status === 400) return { status: "missing" };
    throw new Error("unavailable");
  }
  const thread = asThread(result.body);
  if (!thread) throw new Error("unavailable");
  return { status: "ok", root: thread.root, replies: thread.replies, repliesOk: thread.repliesOk };
}

export async function getMessageFeed(options: { limit: number; cursor?: string }): Promise<MessageFeed | null> {
  try {
    // Wait for a request before the cached read. A failed fill during `next build`
    // is not stored, and it also fails the whole prerender.
    await connection();
    const feed = await loadFeed(feedLimit(options.limit), options.cursor ?? "");
    return {
      items: feed.items.map((note) => toMessage(note)),
      nextCursor: feed.nextCursor,
    };
  } catch {
    return null;
  }
}

export async function getMessageThread(id: string): Promise<ThreadResult> {
  try {
    await connection();
    const thread = await loadThread(id);
    if (thread.status === "missing") return thread;
    return {
      status: "ok",
      repliesOk: thread.repliesOk,
      message: toMessage(thread.root, nestReplies(thread.replies)),
    };
  } catch {
    return { status: "error" };
  }
}

async function submit(
  path: string,
  body: Record<string, string>,
  reply: boolean,
): Promise<WriteResult> {
  const result = await request(path, { method: "POST", body, cookie: await visitorCookie() });
  await storeVisitor(result.visitor);
  if (!result.ok) return { ok: false, status: result.status, fields: fieldsFrom(result.body) };
  if (result.status !== 202 || !asPending(result.body, reply)) return { ok: false, status: "unavailable", fields: {} };
  return { ok: true };
}

function compact(input: { text: string; displayName?: string; countryCode?: string }): Record<string, string> {
  const body: Record<string, string> = { text: input.text };
  if (input.displayName) body.displayName = input.displayName;
  if (input.countryCode) body.countryCode = input.countryCode;
  return body;
}

export async function createMessage(input: {
  text: string;
  displayName?: string;
  countryCode?: string;
}): Promise<WriteResult> {
  return submit("/messages", compact(input), false);
}

export async function createReply(
  messageId: string,
  input: { text: string; displayName?: string; countryCode?: string },
): Promise<WriteResult> {
  return submit(`/messages/${encodeURIComponent(messageId)}/replies`, compact(input), true);
}

export async function setReaction(id: string, react: boolean): Promise<ReactionResult> {
  if (!isMessageId(id)) return { ok: false, status: "unavailable" };
  const result = await request(`/messages/${id}/reactions`, {
    method: react ? "POST" : "DELETE",
    body: {},
    cookie: await visitorCookie(),
  });
  await storeVisitor(result.visitor);
  const reaction = result.ok ? asReaction(result.body) : null;
  if (!reaction) return { ok: false, status: result.ok ? "unavailable" : result.status };
  return { ok: true, reacted: reaction.reacted, reactionCount: reaction.reactionCount };
}
