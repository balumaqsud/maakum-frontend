import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";

export const metadata: Metadata = {
  title: "Write",
};

export default function WritePage() {
  return (
    <article className="max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">
        <LocaleText k="writeTitle" />
      </h1>
      <p className="mt-3 text-lg text-neutral-700">
        <LocaleText k="writeLead" />
      </p>
      <p className="mt-6 border-s-2 border-neutral-300 ps-4 text-neutral-700">
        <LocaleText k="writeRules" />
      </p>
    </article>
  );
}
