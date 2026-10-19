"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import type { UiLang } from "@/lib/i18n";

export function applyUiLang(lang: UiLang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
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
      className="rounded-full border border-neutral-300 px-3 py-2 text-sm"
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
