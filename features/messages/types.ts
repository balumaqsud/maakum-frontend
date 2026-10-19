export type MessageLang = "ar" | "en" | "uz" | "es" | "ko" | "tr" | "fr";

export type Reply = {
  id: string;
  name: string | null;
  country: string;
  orig: string;
  ago: number;
  reactionCount: number;
  text: Partial<Record<string, string>>;
  children?: Reply[];
};

export type Message = {
  id: string;
  name: string | null;
  country: string;
  orig: string;
  ago: number;
  replyCount: number;
  reactionCount: number;
  text: Partial<Record<string, string>>;
  replies: Reply[];
};

export type Stats = {
  messages: number;
  countries: number;
  replies: number;
};

export type Country = {
  id: string;
  en: string;
  ar: string;
};
