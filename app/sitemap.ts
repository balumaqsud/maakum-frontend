import type { MetadataRoute } from "next";
import { getMessageFeed } from "@/lib/api";
import { siteOrigin } from "@/lib/site";

const staticPaths = ["/", "/messages", "/about", "/privacy", "/write"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = siteOrigin();
  const ids = new Set<string>();
  let cursor: string | undefined;

  for (let page = 0; page < 20; page += 1) {
    const feed = await getMessageFeed({ limit: 100, cursor });
    if (!feed) break;
    for (const item of feed.items) ids.add(item.id);
    if (!feed.nextCursor || feed.nextCursor === cursor) break;
    cursor = feed.nextCursor;
  }

  return [...staticPaths.map((path) => ({ url: `${origin}${path}` })), ...[...ids].map((id) => ({ url: `${origin}/messages/${id}` }))];
}
