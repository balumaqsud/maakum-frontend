import { expect, test, type Page } from "@playwright/test";

async function firstConversation(page: Page) {
  await page.goto("/messages");
  const href = await page.locator('a[href*="/messages/"]').first().getAttribute("href");
  expect(href).toBeTruthy();
  return href!.split("?")[0];
}

async function noOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1;
  });
  expect(overflow).toBe(false);
}

test("reading opens a conversation from the list", async ({ page }) => {
  const path = await firstConversation(page);
  await page.goto(path);
  await expect(page.getByRole("heading", { level: 1 })).not.toBeEmpty();
  await expect(page.locator(".quote").first()).not.toBeEmpty();
});

test("the language control switches the document language and back", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "العربية" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await page.getByRole("button", { name: "English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("Arabic reading updates the list address and shows a quote", async ({ page }) => {
  await page.goto("/messages");
  await page.getByRole("link", { name: "Arabic", exact: true }).click();
  await expect(page).toHaveURL(/\/messages\?read=ar/);
  await expect(page.locator(".quote").first()).not.toBeEmpty();
});

test("an empty write stays on the form and explains what is missing", async ({ page }) => {
  await page.goto("/write");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Please write a few words first." })).toContainText(
    "Please write a few words first.",
  );
  await expect(page.getByRole("heading", { name: "Write a few kind words." })).toBeVisible();
});

test("an empty reply stays on the conversation", async ({ page }) => {
  const path = await firstConversation(page);
  await page.goto(path);
  const heading = page.getByRole("heading", { level: 1 });
  const title = await heading.innerText();
  await page.getByRole("button", { name: "Send reply" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Please write a few words first." })).toContainText(
    "Please write a few words first.",
  );
  await expect(heading).toHaveText(title);
  await expect(page).toHaveURL(new RegExp(path));
});

test("a reaction toggles and then returns to the previous count", async ({ page }) => {
  const path = await firstConversation(page);
  await page.goto(path);
  const reaction = page.getByRole("button", { name: /This reached me/ }).first();
  const before = (await reaction.innerText()).replace(/\s+/g, " ").trim();
  await reaction.click();
  await expect.poll(async () => (await reaction.innerText()).replace(/\s+/g, " ").trim()).not.toBe(before);
  await reaction.click();
  await expect.poll(async () => (await reaction.innerText()).replace(/\s+/g, " ").trim()).toBe(before);
});

test("the mobile menu opens, takes focus, and returns it on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("link", { name: "Home" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
});

test("critical pages do not overflow at 320px or 1280px", async ({ page }) => {
  const conversation = await firstConversation(page);
  const paths = ["/", "/messages", `${conversation}?read=ar`, "/write"];
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of paths) {
      await page.goto(path);
      await noOverflow(page);
    }
  }
});

test("a kind message and a kind reply are accepted for review", async ({ page }) => {
  await page.goto("/write");
  await page.getByRole("textbox", { name: "Your message" }).fill("Thinking of you from the quiet test.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("heading", { name: "Your words are on their way." })).toBeVisible();

  const path = await firstConversation(page);
  await page.goto(path);
  await page.getByRole("textbox", { name: "Your reply" }).fill("A kind reply from the quiet test.");
  await page.getByRole("button", { name: "Send reply" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Thank you. Your reply is waiting for a short review." })).toContainText(
    "Thank you. Your reply is waiting for a short review.",
  );
});
