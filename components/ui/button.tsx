import Link from "next/link";
import { LoadingState } from "@/components/shared/loading-state";

const variants = {
  primary: "bg-olive text-ivory hover:brightness-110",
  secondary: "border border-line bg-transparent text-ink hover:border-olive",
  text: "bg-transparent px-3 text-olive underline decoration-1 underline-offset-4 hover:text-ink",
} as const;

export function Button({
  variant = "primary",
  href,
  type = "button",
  pending = false,
  pendingLabel,
  onClick,
  children,
  className = "",
}: {
  variant?: keyof typeof variants;
  href?: string;
  type?: "button" | "submit";
  pending?: boolean;
  pendingLabel?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const classes = [
    "inline-flex min-h-11 items-center justify-center rounded-full px-7 font-sans text-base font-semibold",
    "motion-safe:transition motion-safe:active:scale-[0.98] disabled:opacity-60",
    variants[variant],
    className,
  ].join(" ");
  const content = pending ? <LoadingState inline title={pendingLabel ?? children} /> : children;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-busy={pending || undefined} disabled={pending}>
      {content}
    </button>
  );
}
