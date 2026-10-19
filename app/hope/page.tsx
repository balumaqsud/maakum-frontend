import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "A little hope",
};

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
