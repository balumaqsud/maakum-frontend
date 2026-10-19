import { Button } from "@/components/ui/button";
import { StatePanel } from "@/components/shared/state-panel";

export function EmptyState({
  title,
  body,
  href,
  action,
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  href?: string;
  action?: React.ReactNode;
}) {
  const control = href ? (
    <Button href={href} variant="text">
      {action}
    </Button>
  ) : (
    action
  );

  return <StatePanel title={title} body={body} action={control} />;
}
