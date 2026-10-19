import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ErrorState } from "@/components/shared/error-state";
import { LocaleText } from "@/components/shared/locale-text";
import { Button } from "@/components/ui/button";
import { MessageCard } from "@/features/messages/components/message-card";
import { ReactionButton } from "@/features/messages/components/reaction-button";
import { ReplyThread } from "@/features/messages/components/reply-thread";
import { reachedIds } from "@/features/messages/actions";
import { listHref, parseListQuery, type ListParams } from "@/features/messages/list";
import { getMessageThread, isMessageId } from "@/lib/api";
import { excerpt, pageMeta } from "@/lib/site";

type MessagePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<ListParams>;
};

export const instant = false;

export async function generateMetadata({ params }: MessagePageProps): Promise<Metadata> {
  const { id } = await params;
  if (!isMessageId(id)) notFound();
  const thread = await getMessageThread(id);
  if (thread.status === "missing") notFound();
  if (thread.status !== "ok") return pageMeta(`/messages/${id}`, "Message", undefined, { index: false });
  const description = excerpt(thread.message.text[thread.message.orig] ?? "");
  return pageMeta(`/messages/${id}`, thread.message.name ?? "Anonymous", description || undefined, { type: "article" });
}

export default async function MessagePage({ params, searchParams }: MessagePageProps) {
  const { id } = await params;
  if (!isMessageId(id)) notFound();
  const query = parseListQuery(await searchParams);
  const thread = await getMessageThread(id);
  const back = listHref(query);

  if (thread.status === "missing") notFound();

  if (thread.status === "error") {
    return (
      <ErrorState
        title={<LocaleText k="errorTitle" />}
        action={
          <Button href={back} variant="text">
            <LocaleText k="backMessages" />
          </Button>
        }
      />
    );
  }

  const reached = await reachedIds();

  return (
    <article className="max-w-[40rem]">
      <Button href={back} variant="text">
        <LocaleText k="backMessages" />
      </Button>
      <MessageCard message={thread.message} hero reading={query.read} showReading />
      <ReactionButton
        id={thread.message.id}
        count={thread.message.reactionCount}
        active={reached.includes(thread.message.id)}
      />
      {thread.repliesOk ? (
        <ReplyThread rootId={thread.message.id} replies={thread.message.replies} reading={query.read} reached={reached} />
      ) : (
        <div className="mt-12 grid gap-8">
          <ErrorState title={<LocaleText k="repliesError" />} />
          <ReplyThread rootId={thread.message.id} replies={[]} reading={query.read} reached={reached} hideEmpty />
        </div>
      )}
    </article>
  );
}
