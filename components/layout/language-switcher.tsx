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
      className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 font-sans text-sm font-semibold text-ink hover:text-olive"
      onClick={toggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 2.8 2.6 15.2 0 18M12 3c-2.6 2.8-2.6 15.2 0 18" />
      </svg>
      <span className="locale-en" lang="ar">
        العربية
      </span>
      <span className="locale-ar" lang="en">
        English
      </span>
      <svg viewBox="0 0 24 24" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
