"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { documentTitle, type UiLang } from "@/lib/i18n";

export function applyUiLang(lang: UiLang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = documentTitle(lang, window.location.pathname, document.title);
}

export function LanguageSwitcher() {
  function toggle() {
    const next: UiLang = document.documentElement.lang === "ar" ? "en" : "ar";
    applyUiLang(next);
    try {
      localStorage.setItem(STORAGE_KEYS.lang, next);
    } catch {
      // The current view still switches when storage is blocked.
    }
  }

  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center rounded-full border border-line px-4 font-sans text-sm font-semibold text-ink-soft hover:bg-surface hover:text-ink"
      onClick={toggle}
    >
      <span className="locale-en" lang="ar">
        العربية
      </span>
      <span className="locale-ar" lang="en">
        English
      </span>
    </button>
  );
}
