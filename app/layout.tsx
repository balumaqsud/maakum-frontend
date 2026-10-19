import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { langBootScript } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ma'akum — You are not alone",
    template: "%s — Ma'akum",
  },
  description:
    "Kind words from people all over the world, written for people in Gaza.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: langBootScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-[1080px] flex-1 px-5 py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
