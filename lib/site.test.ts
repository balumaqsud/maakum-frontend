import { describe, expect, it } from "vitest";
import { excerpt } from "@/lib/site";

describe("excerpt", () => {
  it("trims on code points and does not add country or reaction text", () => {
    const original = `ن🙂${"ن".repeat(200)}`;
    const result = excerpt(original);
    expect([...result].length).toBeLessThan([...original].length);
    expect(result).toBe(`${[...original].slice(0, 157).join("")}…`);
    expect(result.endsWith("…")).toBe(true);
    expect(result).not.toMatch(/Palestine|reached|Uzbekistan/);
    expect(excerpt("A short note.")).toBe("A short note.");
  });
});
