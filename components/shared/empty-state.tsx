import Link from "next/link";

export function EmptyState({
  title,
  body,
  href,
  action,
}: {
  title: React.ReactNode;
  body: React.ReactNode;
  href: string;
  action: React.ReactNode;
}) {
  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-lg text-neutral-700">{body}</p>
      <Link href={href} className="mt-6 inline-block underline">
        {action}
      </Link>
    </div>
  );
}
