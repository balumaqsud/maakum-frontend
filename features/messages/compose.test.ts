import { describe, expect, it } from "vitest";
import { composeError, validateCompose } from "@/features/messages/compose";

describe("validateCompose", () => {
  it("rejects an empty message", () => {
    expect(validateCompose({ text: "   ", displayName: "", countryCode: "" })).toEqual({
      ok: false,
      error: "empty",
    });
  });

  it("counts code points, so a long emoji string is too long", () => {
    const within = "🙂".repeat(2000);
    expect(within.length).toBeGreaterThan(2000);
    expect(validateCompose({ text: within, displayName: "", countryCode: "" }).ok).toBe(true);
    expect(validateCompose({ text: `${within}🙂`, displayName: "", countryCode: "" })).toEqual({
      ok: false,
      error: "long",
    });
  });

  it("rejects a country that is not on the list, including other", () => {
    expect(validateCompose({ text: "A few kind words.", displayName: "", countryCode: "other" })).toEqual({
      ok: false,
      error: "country",
    });
    expect(validateCompose({ text: "A few kind words.", displayName: "", countryCode: "zz" })).toEqual({
      ok: false,
      error: "country",
    });
  });

  it("keeps a listed country and uppercases it", () => {
    expect(validateCompose({ text: " A few kind words. ", displayName: " ", countryCode: "ps" })).toEqual({
      ok: true,
      text: "A few kind words.",
      displayName: undefined,
      countryCode: "PS",
    });
  });
});

describe("composeError", () => {
  it("maps HTTP 413 to the too-long error", () => {
    expect(composeError(413, {})).toBe("long");
    expect(composeError(413, { text: "too long" })).toBe("long");
  });
});
