import { describe, expect, it } from "vitest";
import { documentTitle, relativeTime, replyCount } from "@/lib/i18n";

describe("relativeTime", () => {
  it("formats minutes, hours, and days in both languages", () => {
    expect(relativeTime(1)).toEqual({ en: "1 minute ago", ar: "قبل دقيقة" });
    expect(relativeTime(120)).toEqual({ en: "2 hours ago", ar: "قبل ساعتين" });
    expect(relativeTime(3 * 1440)).toEqual({ en: "3 days ago", ar: "قبل 3 أيام" });
  });
});

describe("replyCount", () => {
  it("formats zero, one, and many replies", () => {
    expect(replyCount(0)).toEqual({ en: "No replies yet.", ar: "لا توجد ردود بعد." });
    expect(replyCount(1)).toEqual({ en: "1 reply", ar: "ردّ واحد" });
    expect(replyCount(2)).toEqual({ en: "2 replies", ar: "ردّان" });
  });
});

describe("documentTitle", () => {
  it("keeps a conversation name and switches the brand with the language", () => {
    expect(documentTitle("en", "/messages/20000000-0000-4000-8000-000000000001", "Mina — Ma'akum")).toBe(
      "Mina — Ma'akum",
    );
    expect(documentTitle("ar", "/messages/20000000-0000-4000-8000-000000000001", "Mina — Ma'akum")).toBe(
      "Mina — معكم",
    );
  });
});
