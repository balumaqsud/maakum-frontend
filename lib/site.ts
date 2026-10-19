import type { Metadata } from "next";
import { translate, type ChromeKey } from "@/lib/i18n";

export function siteOrigin(): string {
  const value = process.env.SITE_URL?.trim().replace(/\/$/, "");
  return value || "http://localhost:3000";
}

export function copy(key: ChromeKey): string {
  return translate("en", key);
}

export function excerpt(text: string, limit = 160): string {
  const flat = text.replace(/\s+/g, " ").trim();
  const chars = [...flat];
  if (chars.length <= limit) return flat;
  return `${chars.slice(0, limit - 3).join("")}…`;
}

export function pageMeta(
  path: string,
  title: string,
  description?: string,
  options?: { index?: boolean; type?: "website" | "article" },
): Metadata {
  const branded = `${title} — Ma'akum`;
  const index = options?.index ?? true;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      title: branded,
      description,
      url: path,
      type: options?.type ?? "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ma'akum" }],
    },
    twitter: {
      card: "summary_large_image",
      title: branded,
      description,
      images: ["/opengraph-image"],
    },
  };
}
