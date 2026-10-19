import { describe, expect, it } from "vitest";
import { listHref, parseListQuery } from "@/features/messages/list";

describe("parseListQuery", () => {
  it("keeps a reading choice and a cursor", () => {
    expect(parseListQuery({ read: "ar", cursor: "next-page" })).toEqual({
      read: "ar",
      cursor: "next-page",
      explicitRead: true,
    });
  });

  it("reads the first value when a query key is repeated", () => {
    expect(parseListQuery({ read: ["en", "ar"], cursor: ["  tok  ", "later"] })).toEqual({
      read: "en",
      cursor: "tok",
      explicitRead: true,
    });
  });

  it("falls back to the original when the reading choice is unknown", () => {
    expect(parseListQuery({ read: "fr" })).toEqual({
      read: "orig",
      cursor: undefined,
      explicitRead: false,
    });
  });
});

describe("listHref", () => {
  it("keeps the reading choice and cursor for in-app navigation", () => {
    expect(listHref({ read: "ar", cursor: "next-page" })).toBe("/messages?read=ar&cursor=next-page");
    expect(listHref({ read: "en", cursor: "next-page" }, "abc")).toBe("/messages/abc?read=en&cursor=next-page");
  });

  it("omits the original reading choice", () => {
    expect(listHref({ read: "orig" })).toBe("/messages");
  });
});
