export function Container({
  width = "page",
  className = "",
  children,
}: {
  width?: "page" | "read";
  className?: string;
  children: React.ReactNode;
}) {
  const max = width === "read" ? "max-w-[40rem]" : "max-w-[1080px]";

  return (
    <div className={`mx-auto w-full min-w-0 px-5 max-[420px]:px-4 ${max} ${className}`}>{children}</div>
  );
}
