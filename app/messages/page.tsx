import type { Metadata } from "next";
import { LocaleText } from "@/components/shared/locale-text";
import { SectionHeading } from "@/components/shared/section-heading";
import { MessageCard } from "@/features/messages/components/message-card";
import { messages } from "@/features/messages/data";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessagesPage() {
  return (
    <article>
      <SectionHeading
        as="h1"
        title={<LocaleText k="messagesTitle" />}
        description={<LocaleText k="messagesLead" />}
      />
      <ul className="mt-4 divide-y divide-line">
        {messages.map((message) => (
          <li key={message.id}>
            <MessageCard message={message} href={`/messages/${message.id}`} />
          </li>
        ))}
      </ul>
    </article>
  );
}
