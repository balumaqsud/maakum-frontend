import { LocaleText } from "@/components/shared/locale-text";

export default function MessageLoading() {
  return (
    <p className="text-ink-soft">
      <LocaleText k="loading" />
    </p>
  );
}