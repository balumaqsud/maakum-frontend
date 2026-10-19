export function SectionHeading({
  as = "h2",
  title,
  description,
  action,
  align = "start",
}: {
  as?: "h1" | "h2";
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  align?: "start" | "center";
}) {
  const Tag = as;
  const size =
    as === "h1"
      ? "text-[clamp(2.7rem,12vw,4.5rem)] leading-none"
      : "text-[clamp(1.45rem,5vw,1.9rem)] leading-snug";

  return (
    <div
      className={`flex flex-wrap items-end gap-4 ${align === "center" ? "justify-center text-center" : "justify-between"}`}
    >
      <div className={align === "center" ? "mx-auto max-w-[34rem]" : "max-w-[34rem]"}>
        <Tag className={size}>{title}</Tag>
        {description ? <p className="mt-4 text-lg text-ink-soft">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
