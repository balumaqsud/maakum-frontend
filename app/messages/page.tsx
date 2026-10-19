import { Suspense } from "react";
import type { Metadata } from "next";
import { ClearFilters, MessageFilters, RememberRead } from "@/app/messages/filters";
import { EmptyState } from "@/components/shared/empty-state";
import { LocaleText } from "@/components/shared/locale-text";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { MessageCard } from "@/features/messages/components/message-card";
import { listHref, listMessages, PAGE_SIZE, parseListQuery, type ListParams } from "@/features/messages/list";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessagesPage({ searchParams }: { searchParams: Promise<ListParams> }) {
  return (
    <article className="max-w-[40rem]">
      <SectionHeading
        as="h1"
        title={<LocaleText k="messagesTitle" />}
        description={<LocaleText k="messagesLead" />}
      />
      <Suspense fallback={<p className="mt-8 text-ink-soft"><LocaleText k="loading" /></p>}>
        <MessageBrowser searchParams={searchParams} />
      </Suspense>
    </article>
  );
}

async function MessageBrowser({ searchParams }: { searchParams: Promise<ListParams> }) {
  const query = parseListQuery(await searchParams);
  const { items, total } = listMessages(query);

  return (
    <>
      <RememberRead read={query.read} explicit={query.explicitRead} />
      <MessageFilters query={query} />
      {items.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title={<LocaleText k="noMatchesTitle" />}
            body={<LocaleText k="noMatchesBody" />}
            action={<ClearFilters />}
          />
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {items.map((message) => (
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
      {items.length < total ? (
        <div className="mt-8">
          <Button href={listHref({ ...query, shown: query.shown + PAGE_SIZE })} variant="secondary">
            <LocaleText k="showMore" />
          </Button>
        </div>
      ) : null}
    </>
  );
}
