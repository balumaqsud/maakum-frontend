import { messages } from "@/features/messages/data";
import type { Message, Reply } from "@/features/messages/types";

export const PAGE_SIZE = 4;

export type ReadMode = "orig" | "ar" | "en";
export type ReplyFilter = "all" | "with";

export type ListQuery = {
  read: ReadMode;
  replies: ReplyFilter;
  shown: number;
};

export type ListParams = {
  read?: string | string[];
  replies?: string | string[];
  shown?: string | string[];
};

function one(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function countReplies(replies: Reply[]): number {
  return replies.reduce((total, reply) => total + 1 + countReplies(reply.children ?? []), 0);
}

export function parseListQuery(params: ListParams): ListQuery & { explicitRead: boolean } {
  const readRaw = one(params.read);
  const explicitRead = readRaw === "orig" || readRaw === "ar" || readRaw === "en";
  const read: ReadMode = readRaw === "ar" || readRaw === "en" ? readRaw : "orig";
  const replies: ReplyFilter = one(params.replies) === "with" ? "with" : "all";
  const shownRaw = Number(one(params.shown));
  const shown = Number.isFinite(shownRaw) && shownRaw > PAGE_SIZE ? Math.floor(shownRaw) : PAGE_SIZE;
  return { read, replies, shown, explicitRead };
}

export function listHref(query: ListQuery, id?: string): string {
  const params = new URLSearchParams();
  if (query.read !== "orig") params.set("read", query.read);
  if (query.replies === "with") params.set("replies", "with");
  if (query.shown > PAGE_SIZE) params.set("shown", String(query.shown));
  const path = id ? `/messages/${id}` : "/messages";
  const search = params.toString();
  return search ? `${path}?${search}` : path;
}

function isListed(message: Message): boolean {
  return Boolean(message.text[message.orig]?.trim());
}

export function listMessages(query: ListQuery): { items: Message[]; total: number } {
  const filtered = messages.filter((message) => {
    if (!isListed(message)) return false;
    if (query.replies === "with" && countReplies(message.replies) === 0) return false;
    return true;
  });
  const shown = Math.min(query.shown, filtered.length);
  return { items: filtered.slice(0, shown), total: filtered.length };
}
