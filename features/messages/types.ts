export type MessageLang = "ar" | "en" | "uz" | "es" | "ko" | "tr" | "fr";

export type Reply = {
  id: string;
  name: string | null;
  country: string;
  orig: MessageLang;
  ago: number;
  to?: string;
  text: Partial<Record<MessageLang, string>>;
  children?: Reply[];
};

export type Message = {
  id: string;
  name: string | null;
  country: string;
  orig: MessageLang;
  ago: number;
  reactions: number;
  text: Partial<Record<MessageLang, string>>;
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
