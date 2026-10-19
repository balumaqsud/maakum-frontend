import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">
        <LocaleText k="privacyTitle" />
      </h1>
      <p className="mt-3 text-lg text-neutral-700">
        <LocaleText k="privacyBody" />
      </p>
    </article>
  );
}
