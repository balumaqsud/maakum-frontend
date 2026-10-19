import { Suspense } from "react";
import type { Metadata } from "next";
import { ClearFilters, MessageFilters, RememberRead } from "@/app/messages/filters";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LocaleText } from "@/components/shared/locale-text";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { MessageCard } from "@/features/messages/components/message-card";
import { listHref, PAGE_SIZE, parseListQuery, type ListParams } from "@/features/messages/list";
import { getMessageFeed } from "@/lib/api";
import { copy, pageMeta } from "@/lib/site";

export async function generateMetadata({ searchParams }: { searchParams: Promise<ListParams> }): Promise<Metadata> {
  const query = parseListQuery(await searchParams);
  return pageMeta("/messages", "Messages", copy("messagesLead"), { index: !query.cursor });
}

export default function MessagesPage({ searchParams }: { searchParams: Promise<ListParams> }) {
  return (
    <article className="max-w-[40rem]">
      <SectionHeading
        as="h1"
        title={<LocaleText k="messagesTitle" />}
        description={<LocaleText k="messagesLead" />}
      />
      <Suspense
        fallback={
          <div className="mt-8 min-h-80">
            <p className="text-ink-soft">
              <LocaleText k="loading" />
            </p>
          </div>
        }
      >
        <div className="min-h-80">
          <MessageBrowser searchParams={searchParams} />
        </div>
      </Suspense>
    </article>
  );
}

async function MessageBrowser({ searchParams }: { searchParams: Promise<ListParams> }) {
  const query = parseListQuery(await searchParams);
  const feed = await getMessageFeed({ limit: PAGE_SIZE, cursor: query.cursor });

  if (!feed) {
    return (
      <div className="mt-8">
        <ErrorState
          title={<LocaleText k="errorTitle" />}
          action={
            <Button href="/messages" variant="text">
              <LocaleText k="backMessages" />
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <>
      <RememberRead read={query.read} explicit={query.explicitRead} />
      <MessageFilters query={query} />
      {feed.items.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title={<LocaleText k="noMatchesTitle" />}
            body={<LocaleText k="noMatchesBody" />}
            action={<ClearFilters />}
          />
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {feed.items.map((message) => (
            <li key={message.id}>
              <MessageCard
                message={message}
                reading={query.read}
                showReading
                conversation
                href={listHref(query, message.id)}
              />
            </li>
          ))}
        </ul>
      )}
      {feed.nextCursor ? (
        <div className="mt-8">
          <Button href={listHref({ read: query.read, cursor: feed.nextCursor })} variant="secondary">
            <LocaleText k="showMore" />
          </Button>
        </div>
      ) : null}
    </>
  );
}
