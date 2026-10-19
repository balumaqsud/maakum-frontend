import Link from "next/link";
import type { Metadata } from "next";
import { EmptyState } from "@/components/shared/empty-state";
import { LocaleText } from "@/components/shared/locale-text";
import { countryName, getMessage, langs } from "@/features/messages/data";
import type { Reply } from "@/features/messages/types";
import { translate } from "@/lib/i18n";

function Both({ en, ar }: { en: string; ar: string }) {
  return (
    <>
      <span className="locale-en">{en}</span>
      <span className="locale-ar" lang="ar">
        {ar}
      </span>
    </>
  );
}

type MessagePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MessagePageProps): Promise<Metadata> {
  const { id } = await params;
  const message = getMessage(id);
  return { title: message ? (message.name ?? translate("en", "anonymous")) : "Message" };
}

function Thread({ replies }: { replies: Reply[] }) {
  if (replies.length === 0) {
    return (
      <p className="mt-4 text-neutral-700">
        <LocaleText k="noReplies" />
      </p>
    );
  }

  return (
    <ul className="mt-4 flex flex-col gap-4 border-s border-neutral-200 ps-4">
      {replies.map((reply) => (
        <li key={reply.id}>
          <p className="text-sm text-neutral-600">
            {reply.name ?? <LocaleText k="anonymous" />}
            {" · "}
            <Both en={countryName(reply.country, "en")} ar={countryName(reply.country, "ar")} />
          </p>
          <p lang={reply.orig} dir={reply.orig === "ar" ? "rtl" : "ltr"}>
            {reply.text[reply.orig]}
          </p>
          {reply.children ? <Thread replies={reply.children} /> : null}
        </li>
      ))}
    </ul>
  );
}

export default async function MessagePage({ params }: MessagePageProps) {
  const { id } = await params;
  const message = getMessage(id);

  if (!message) {
    return (
      <EmptyState
        title={<LocaleText k="missingTitle" />}
        body={<LocaleText k="missingBody" />}
        href="/messages"
        action={<LocaleText k="backMessages" />}
      />
    );
  }

  return (
    <article className="max-w-xl">
      <Link href="/messages" className="underline">
        <LocaleText k="backMessages" />
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {message.name ?? <LocaleText k="anonymous" />}
      </h1>
      <p className="mt-1 text-sm text-neutral-600">
        <Both en={countryName(message.country, "en")} ar={countryName(message.country, "ar")} />
        {" · "}
        <Both en={langs[message.orig].en} ar={langs[message.orig].ar} />
      </p>
      <p className="mt-4 text-lg" lang={message.orig} dir={message.orig === "ar" ? "rtl" : "ltr"}>
        {message.text[message.orig]}
      </p>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">
          <LocaleText k="repliesTitle" />
        </h2>
        <Thread replies={message.replies} />
      </section>
    </article>
  );
}
