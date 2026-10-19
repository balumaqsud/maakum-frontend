import type { Metadata } from "next";
import { EmptyState } from "@/components/shared/empty-state";
import { LocaleText } from "@/components/shared/locale-text";
import { Button } from "@/components/ui/button";
import { countryName, getMessage } from "@/features/messages/data";
import { MessageCard } from "@/features/messages/components/message-card";
import { listHref, parseListQuery, type ListParams } from "@/features/messages/list";
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
  searchParams: Promise<ListParams>;
};

export const instant = false;

export async function generateMetadata({ params }: MessagePageProps): Promise<Metadata> {
  const { id } = await params;
  const message = getMessage(id);
  return { title: message ? (message.name ?? translate("en", "anonymous")) : "Message" };
}

function Thread({ replies }: { replies: Reply[] }) {
  if (replies.length === 0) {
    return (
      <p className="mt-4 text-ink-soft">
        <LocaleText k="noReplies" />
      </p>
    );
  }

  return (
    <ul className="mt-4 flex flex-col gap-4">
      {replies.map((reply) => (
        <li key={reply.id} className="min-w-0 border-s-2 border-line ps-5">
          <p className="text-[0.88rem] text-ink">
            <span className="font-semibold">{reply.name ?? <LocaleText k="anonymous" />}</span>
            <span aria-hidden className="px-2 text-ink-soft">
              ·
            </span>
            <span className="text-ink-soft">
              <Both en={countryName(reply.country, "en")} ar={countryName(reply.country, "ar")} />
            </span>
          </p>
          <p className="quote mt-2 text-[1.14rem]" lang={reply.orig} dir={reply.orig === "ar" ? "rtl" : "ltr"}>
            {reply.text[reply.orig]}
          </p>
          {reply.children ? <Thread replies={reply.children} /> : null}
        </li>
      ))}
    </ul>
  );
}

export default async function MessagePage({ params, searchParams }: MessagePageProps) {
  const { id } = await params;
  const query = parseListQuery(await searchParams);
  const message = getMessage(id);
  const back = listHref(query);

  if (!message) {
    return (
      <EmptyState
        title={<LocaleText k="missingTitle" />}
        body={<LocaleText k="missingBody" />}
        href={back}
        action={<LocaleText k="backMessages" />}
      />
    );
  }

  return (
    <article className="max-w-[40rem]">
      <Button href={back} variant="text">
        <LocaleText k="backMessages" />
      </Button>
      <MessageCard message={message} hero reading={query.read} showReading />
      <section className="mt-12">
        <h2 className="text-[clamp(1.45rem,5vw,1.9rem)]">
          <LocaleText k="repliesTitle" />
        </h2>
        <Thread replies={message.replies} />
      </section>
    </article>
  );
}
