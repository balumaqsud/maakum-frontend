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
    <button type="button" className="hm-lang" onClick={toggle}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b3a33" strokeWidth="1.5" aria-hidden>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19" />
      </svg>
      <span className="locale-en" lang="ar">
        العربية
      </span>
      <span className="locale-ar" lang="en">
        English
      </span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#2b3a33" strokeWidth="1.3" aria-hidden>
        <path d="M2 3.5l3 3 3-3" />
      </svg>
    </button>
  );
}
