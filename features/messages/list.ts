export const PAGE_SIZE = 4;

export type ReadMode = "orig" | "ar" | "en";

export type ListQuery = {
  read: ReadMode;
  cursor?: string;
};

export type ListParams = {
  read?: string | string[];
  cursor?: string | string[];
};

function one(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseListQuery(params: ListParams): ListQuery & { explicitRead: boolean } {
  const readRaw = one(params.read);
  const explicitRead = readRaw === "orig" || readRaw === "ar" || readRaw === "en";
  const read: ReadMode = readRaw === "ar" || readRaw === "en" ? readRaw : "orig";
  const cursor = one(params.cursor)?.trim() || undefined;
  return { read, cursor, explicitRead };
}

export function listHref(query: ListQuery, id?: string): string {
  const params = new URLSearchParams();
  if (query.read !== "orig") params.set("read", query.read);
  if (query.cursor) params.set("cursor", query.cursor);
  const path = id ? `/messages/${id}` : "/messages";
  const search = params.toString();
  return search ? `${path}?${search}` : path;
}
