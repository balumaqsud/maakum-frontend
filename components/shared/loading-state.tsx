import { StatePanel } from "@/components/shared/state-panel";

export function LoadingState({
  title,
  body,
  inline = false,
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  inline?: boolean;
}) {
  if (inline) {
    return <span role="status">{title}</span>;
  }

  return <StatePanel role="status" title={title} body={body} />;
}
