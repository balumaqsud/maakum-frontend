import type { ReadMode } from "@/features/messages/list";
import type { Reply } from "@/features/messages/types";
import { ReplyList } from "@/features/messages/components/reply-list";
import { ReplySession } from "@/features/messages/components/reply-session";

export function ReplyThread({
  rootId,
  replies,
  reading,
  reached,
  hideEmpty = false,
}: {
  rootId: string;
  replies: Reply[];
  reading: ReadMode;
  reached: string[];
  hideEmpty?: boolean;
}) {
  return (
    <ReplySession rootId={rootId}>
      <ReplyList parentId={rootId} replies={replies} reading={reading} reached={reached} hideEmpty={hideEmpty} />
    </ReplySession>
  );
}
