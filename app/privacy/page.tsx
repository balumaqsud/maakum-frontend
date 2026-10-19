import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-[40rem]">
      <SectionHeading
        as="h1"
        title={<LocaleText k="privacyTitle" />}
        description={<LocaleText k="privacyBody" />}
      />
    </article>
  );
}
