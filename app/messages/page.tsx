import Link from "next/link";
import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";
import { messages } from "@/features/messages/data";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessagesPage() {
  return (
    <article>
      <header className="max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          <LocaleText k="messagesTitle" />
        </h1>
        <p className="mt-3 text-lg text-neutral-700">
          <LocaleText k="messagesLead" />
        </p>
      </header>
      <ul className="mt-8 flex flex-col gap-6">
        {messages.map((message) => (
          <li key={message.id} className="max-w-xl">
            <h2 className="font-semibold">
              <Link href={`/messages/${message.id}`} className="underline">
                {message.name ?? <LocaleText k="anonymous" />}
              </Link>
            </h2>
            <p className="mt-2" lang={message.orig} dir={message.orig === "ar" ? "rtl" : "ltr"}>
              {message.text[message.orig]}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
