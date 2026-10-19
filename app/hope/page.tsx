import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";

export const metadata: Metadata = {
  title: "A little hope",
};

export default function HopePage() {
  return (
    <article className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        <LocaleText k="hopeTitle" />
      </h1>
      <p className="mt-3 text-lg text-neutral-700">
        <LocaleText k="hopeLead" />
      </p>
    </article>
  );
}
