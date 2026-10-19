import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import { chromium } from "playwright";

const PORT = 3100;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const LABEL = process.argv[2];

if (LABEL !== "before" && LABEL !== "after") {
  console.error("Usage: npm run measure -- before|after");
  process.exit(1);
}

function loadEnv() {
  if (!existsSync(".env")) return;
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2];
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let output = "";
    const collect = (chunk) => {
      output += chunk;
      process.stdout.write(chunk);
    };
    child.stdout.on("data", collect);
    child.stderr.on("data", collect);
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

function routeTable(output) {
  const lines = output.split("\n");
  const start = lines.findIndex((line) => line.includes("Route (app)"));
  if (start === -1) return output.trim().split("\n").slice(-40).join("\n");
  const table = [];
  for (const line of lines.slice(start)) {
    table.push(line);
    if (table.length > 4 && line.trim() === "") break;
  }
  return table.join("\n").trim();
}

async function timedFetch(url) {
  const start = performance.now();
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  const ttfbMs = Math.round(performance.now() - start);
  await response.text();
  return {
    status: response.status,
    ttfbMs,
    totalMs: Math.round(performance.now() - start),
  };
}

async function waitForServer() {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(ORIGIN, { signal: AbortSignal.timeout(2000) });
      if (response.status < 500) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`Production server did not answer on ${ORIGIN}`);
}

async function labPages(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await context.addInitScript(() => {
    window.__lab = { lcpMs: 0, cls: 0 };
    new PerformanceObserver((list) => {
      const last = list.getEntries().at(-1);
      if (last) window.__lab.lcpMs = last.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__lab.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  const page = await context.newPage();
  const pages = [];

  async function visit(path) {
    await page.goto(`${ORIGIN}${path}`, { waitUntil: "load" });
    await page.waitForTimeout(1500);
    const vitals = await page.evaluate(() => {
      const scriptBytes = performance
        .getEntriesByType("resource")
        .filter((entry) => entry.initiatorType === "script" || /\.js(\?|$)/.test(entry.name))
        .reduce((sum, entry) => sum + (entry.transferSize || 0), 0);
      return {
        lcpMs: Math.round(window.__lab.lcpMs),
        cls: Math.round(window.__lab.cls * 1000) / 1000,
        scriptBytes,
      };
    });
    pages.push({ path, ...vitals });
    return vitals;
  }

  await visit("/");
  await visit("/messages");
  const conversation = await page
    .locator('a[href*="/messages/"]')
    .evaluateAll((links) => {
      const match = links
        .map((link) => link.getAttribute("href") ?? "")
        .find((href) => /\/messages\/[0-9a-f-]{36}/i.test(href));
      return match ? match.split("?")[0] : null;
    });
  if (!conversation) throw new Error("No published conversation link on /messages");
  await visit(conversation);

  const reaction = page.getByRole("button", { name: /This reached me/ }).first();
  const before = (await reaction.innerText()).replace(/\s+/g, " ").trim();
  const clickStart = performance.now();
  await reaction.click();
  await page.waitForFunction(
    (previous) => {
      const button = [...document.querySelectorAll("button")].find((item) =>
        (item.innerText || "").includes("This reached me"),
      );
      if (!button || button.disabled) return false;
      return button.innerText.replace(/\s+/g, " ").trim() !== previous;
    },
    before,
  );
  const reactionClickMs = Math.round(performance.now() - clickStart);
  const changed = (await reaction.innerText()).replace(/\s+/g, " ").trim();
  await reaction.click();
  await page.waitForFunction(
    (expected) => {
      const button = [...document.querySelectorAll("button")].find((item) =>
        (item.innerText || "").includes("This reached me"),
      );
      if (!button || button.disabled) return false;
      return button.innerText.replace(/\s+/g, " ").trim() === expected;
    },
    before,
  );
  if (changed === before) throw new Error("Reaction control did not change");

  await visit("/write");
  await context.close();
  return { pages, reactionClickMs, conversation };
}

loadEnv();
const apiBase = process.env.API_URL?.replace(/\/$/, "");
if (!apiBase) {
  console.error("API_URL is missing");
  process.exit(1);
}

const version = JSON.parse(readFileSync("package.json", "utf8")).dependencies.next;
console.log(`\nBuilding production bundle (${LABEL})...\n`);
const buildOutput = await run("npx", ["next", "build"]);

console.log("\nTiming the API and the production homepage...\n");
const api = await timedFetch(`${apiBase}/messages?limit=4&order=newest`);
const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLog = "";
server.stdout.on("data", (chunk) => {
  serverLog += chunk;
});
server.stderr.on("data", (chunk) => {
  serverLog += chunk;
});

let browser;
try {
  await waitForServer();
  const homepage = await timedFetch(`${ORIGIN}/`);
  browser = await chromium.launch();
  const lab = await labPages(browser);
  const snapshot = {
    recordedAt: new Date().toISOString(),
    nextVersion: version,
    viewport: { width: 1280, height: 800 },
    goals: { lcpMs: 2500, inpMs: 200, cls: 0.1 },
    build: {
      routeTable: routeTable(buildOutput),
      firstLoadJs: null,
      note: "Next.js 16 does not print a First Load JS column. scriptBytes is the JavaScript transferred in the browser.",
    },
    api: { path: "/messages?limit=4", ...api },
    homepage,
    lab: {
      pages: lab.pages,
      conversation: lab.conversation,
      reactionClickMs: lab.reactionClickMs,
      reactionNote: "Lab click duration for the reaction control. This is not field INP.",
    },
  };

  mkdirSync("perf", { recursive: true });
  const file = "perf/baseline.json";
  const existing = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  existing[LABEL] = snapshot;
  writeFileSync(file, `${JSON.stringify(existing, null, 2)}\n`);
  console.log(`\n${LABEL} baseline written to ${file}`);
  console.log(JSON.stringify(snapshot, null, 2));
} catch (error) {
  console.error(serverLog);
  throw error;
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
