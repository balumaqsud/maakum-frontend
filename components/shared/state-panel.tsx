export function StatePanel({
  title,
  body,
  action,
  role,
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
  role?: "status" | "alert";
}) {
  return (
    <div role={role} className="max-w-[40rem] rounded-sheet border border-dashed border-line px-6 py-7 text-center">
      <p className="font-display text-xl">{title}</p>
      {body ? <p className="mt-2 text-ink-soft">{body}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
