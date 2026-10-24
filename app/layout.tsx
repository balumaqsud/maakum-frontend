import { Suspense } from "react";
import type { Metadata } from "next";
import { Aref_Ruqaa, Inter, Newsreader, Noto_Naskh_Arabic, Noto_Sans_Arabic, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader, SiteHeaderFallback } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { langBootScript } from "@/lib/constants";
import { siteOrigin } from "@/lib/site";
import "./globals.css";

const description = "Kind words from people all over the world, written for people in Gaza.";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-source-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-naskh",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const aref = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-aref",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: "Ma'akum — You are not alone",
    template: "%s — Ma'akum",
  },
  description,
  openGraph: {
    title: "Ma'akum — You are not alone",
    description,
    siteName: "Ma'akum",
    type: "website",
    locale: "en",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ma'akum" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ma'akum — You are not alone",
    description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${sourceSerif.variable} ${sourceSans.variable} ${naskh.variable} ${notoSansArabic.variable} ${newsreader.variable} ${inter.variable} ${aref.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: langBootScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Suspense fallback={<SiteHeaderFallback />}>
          <SiteHeader />
        </Suspense>
        <main id="main" className="min-w-0 flex-1 py-8">
          <Container>{children}</Container>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
