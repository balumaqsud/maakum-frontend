import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArchVisual } from "@/components/home/arch-visual";
import { MessagesSection } from "@/components/home/messages-section";
import { SiteClosing } from "@/components/home/site-closing";
import { Stats } from "@/components/home/stats";
import { copy, siteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ma'akum",
  description: copy("homeLead"),
  url: siteOrigin(),
};

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <article className="home-page home-face bleed -my-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <div className="hm-sl" aria-hidden />
      <div className="hm-sr" aria-hidden>
        <Image src="/images/stone-wall.webp" alt="" fill sizes="130px" className="object-cover" />
      </div>
      <section className="hm-hero">
        <div className="hm-in">
          <div>
            <div className="hm-eb">MA’AKUM&nbsp;·&nbsp;WITH YOU</div>
            <h1 className="hm-title">
              You are not
              <br />
              alone.
            </h1>
            <p className="hm-lead">
              Kind words from people all over the world, written for people in Gaza. Read them, answer them, or leave a few of your own.
            </p>
            <div className="hm-ctas">
              <Link className="hm-btn hm-dark" href="/messages">
                Read messages <Arrow />
              </Link>
              <Link className="hm-btn hm-lt" href="/write">
                Write a message
              </Link>
            </div>
            <Stats />
          </div>
          <ArchVisual />
        </div>
      </section>
      <MessagesSection />
      <SiteClosing />
    </article>
  );
}
