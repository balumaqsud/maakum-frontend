import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";
import { SectionHeading } from "@/components/shared/section-heading";
import { MessageForm } from "@/app/write/message-form";
import { copy, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta("/write", "Write", copy("writeLead"));

export default function WritePage() {
  return (
    <article className="max-w-[40rem]">
      <SectionHeading
        as="h1"
        title={<LocaleText k="writeTitle" />}
        description={<LocaleText k="writeLead" />}
      />
      <p className="mt-6 max-w-[28rem] border-s-2 border-brass ps-4 text-ink-soft">
        <LocaleText k="writeRules" />
      </p>
      <MessageForm />
    </article>
  );
}
