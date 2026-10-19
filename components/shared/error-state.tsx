import { StatePanel } from "@/components/shared/state-panel";

export function ErrorState({
  title,
  body,
  action,
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return <StatePanel role="alert" title={title} body={body} action={action} />;
}
