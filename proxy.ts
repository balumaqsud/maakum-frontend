import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { translate } from "@/lib/i18n";

const MESSAGE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function text(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function missingPage(): NextResponse {
  const title = text(translate("en", "missingTitle"));
  const body = text(translate("en", "missingBody"));
  const action = text(translate("en", "backMessages"));
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} — Ma'akum</title>
</head>
<body style="margin:0;background:#f8f5ee;color:#172923;font:20px/1.6 Georgia,serif">
<main style="max-width:40rem;margin:0 auto;padding:4rem 1.25rem">
<h1 style="font-weight:500;font-size:2rem">${title}</h1>
<p style="color:#3c4a44">${body}</p>
<p><a href="/messages" style="color:#204c40">${action}</a></p>
</main>
</body>
</html>`;
  return new NextResponse(html, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex",
    },
  });
}

export function proxy(request: NextRequest) {
  const id = request.nextUrl.pathname.match(/^\/messages\/([^/]+)$/)?.[1];
  if (!id || MESSAGE_ID.test(id)) return NextResponse.next();
  return missingPage();
}

export const config = {
  matcher: "/messages/:id",
};
