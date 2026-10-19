"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LocaleText } from "@/components/shared/locale-text";
import { listHref, type ListQuery, type ReadMode, type ReplyFilter } from "@/features/messages/list";
import { STORAGE_KEYS } from "@/lib/constants";
import type { ChromeKey } from "@/lib/i18n";

function saveRead(read: ReadMode) {
  try {
    localStorage.setItem(STORAGE_KEYS.read, read);
  } catch {
    // The link still changes the page when storage is blocked.
  }
}

function pill(selected: boolean) {
  return [
    "inline-flex min-h-11 items-center rounded-full border px-4 font-sans text-sm font-semibold",
    selected ? "border-olive bg-olive text-ivory" : "border-line text-ink-soft hover:border-olive hover:text-ink",
  ].join(" ");
}

const reads: { id: ReadMode; key: ChromeKey }[] = [
  { id: "orig", key: "readOriginal" },
  { id: "ar", key: "readArabic" },
  { id: "en", key: "readEnglish" },
];

const replyFilters: { id: ReplyFilter; key: ChromeKey }[] = [
  { id: "all", key: "filterAll" },
  { id: "with", key: "filterWithReplies" },
];

export function MessageFilters({ query }: { query: ListQuery }) {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <div>
        <p id="read-label" className="mb-2 font-sans text-sm font-semibold text-ink-soft">
          <LocaleText k="readIn" />
        </p>
        <div role="group" aria-labelledby="read-label" className="flex flex-wrap gap-2">
          {reads.map((item) => (
            <Link
              key={item.id}
              href={listHref({ ...query, read: item.id })}
              aria-current={query.read === item.id ? "true" : undefined}
              className={pill(query.read === item.id)}
              onClick={() => saveRead(item.id)}
            >
              <LocaleText k={item.key} />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <p id="reply-label" className="mb-2 font-sans text-sm font-semibold text-ink-soft">
          <LocaleText k="repliesTitle" />
        </p>
        <div role="group" aria-labelledby="reply-label" className="flex flex-wrap gap-2">
          {replyFilters.map((item) => (
            <Link
              key={item.id}
              href={listHref({ ...query, replies: item.id })}
              aria-current={query.replies === item.id ? "true" : undefined}
              className={pill(query.replies === item.id)}
            >
              <LocaleText k={item.key} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClearFilters() {
  return (
    <Link
      href="/messages"
      className="inline-flex min-h-11 items-center text-olive underline decoration-1 underline-offset-4"
      onClick={() => saveRead("orig")}
    >
      <LocaleText k="clearFilters" />
    </Link>
  );
}

export function RememberRead({ read, explicit }: { read: ReadMode; explicit: boolean }) {
  const router = useRouter();
  const once = useRef(false);

  useEffect(() => {
    try {
      if (explicit) {
        localStorage.setItem(STORAGE_KEYS.read, read);
        return;
      }
      if (once.current) return;
      once.current = true;
      const saved = localStorage.getItem(STORAGE_KEYS.read);
      if (saved !== "ar" && saved !== "en") return;
      const params = new URLSearchParams(window.location.search);
      params.set("read", saved);
      router.replace(`/messages?${params.toString()}`);
    } catch {
      // The list stays on the reading language already in the URL.
    }
  }, [explicit, read, router]);

  return null;
}
