import type { Country, MessageLang, Stats } from "@/features/messages/types";

export const langs: Record<MessageLang, { en: string; ar: string }> = {
  ar: { en: "Arabic", ar: "العربية" },
  en: { en: "English", ar: "الإنجليزية" },
  uz: { en: "Uzbek", ar: "الأوزبكية" },
  es: { en: "Spanish", ar: "الإسبانية" },
  ko: { en: "Korean", ar: "الكورية" },
  tr: { en: "Turkish", ar: "التركية" },
  fr: { en: "French", ar: "الفرنسية" },
};

export const countries: Country[] = [
  { id: "au", en: "Australia", ar: "أستراليا" },
  { id: "ca", en: "Canada", ar: "كندا" },
  { id: "eg", en: "Egypt", ar: "مصر" },
  { id: "fr", en: "France", ar: "فرنسا" },
  { id: "de", en: "Germany", ar: "ألمانيا" },
  { id: "id", en: "Indonesia", ar: "إندونيسيا" },
  { id: "it", en: "Italy", ar: "إيطاليا" },
  { id: "jp", en: "Japan", ar: "اليابان" },
  { id: "jo", en: "Jordan", ar: "الأردن" },
  { id: "my", en: "Malaysia", ar: "ماليزيا" },
  { id: "ma", en: "Morocco", ar: "المغرب" },
  { id: "ps", en: "Gaza, Palestine", ar: "غزة، فلسطين" },
  { id: "pk", en: "Pakistan", ar: "باكستان" },
  { id: "sa", en: "Saudi Arabia", ar: "السعودية" },
  { id: "kr", en: "South Korea", ar: "كوريا الجنوبية" },
  { id: "es", en: "Spain", ar: "إسبانيا" },
  { id: "tr", en: "Türkiye", ar: "تركيا" },
  { id: "gb", en: "United Kingdom", ar: "المملكة المتحدة" },
  { id: "us", en: "United States", ar: "الولايات المتحدة" },
  { id: "uz", en: "Uzbekistan", ar: "أوزبكستان" },
  { id: "other", en: "Somewhere else", ar: "مكان آخر" },
];

export function getHomeStats(): Stats | null {
  return null;
}

export function countryName(id: string, lang: "en" | "ar"): string {
  return countries.find((country) => country.id === id)?.[lang] ?? "";
}

export function languageName(code: string): { en: string; ar: string } {
  if (code in langs) return langs[code as MessageLang];
  return { en: code, ar: code };
}
