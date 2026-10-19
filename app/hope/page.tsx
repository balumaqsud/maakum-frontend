import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";
import { SectionHeading } from "@/components/shared/section-heading";
import { copy, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta("/hope", "A little hope", copy("hopeLead"), { index: false });

export default function HopePage() {
  return (
    <SectionHeading
      as="h1"
      align="center"
      title={<LocaleText k="hopeTitle" />}
      description={<LocaleText k="hopeLead" />}
    />
  );
}
