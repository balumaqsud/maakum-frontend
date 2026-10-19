import { EmptyState } from "@/components/shared/empty-state";
import { LocaleText } from "@/components/shared/locale-text";

export default function MessageNotFound() {
  return (
    <EmptyState
      title={<LocaleText k="missingTitle" />}
      body={<LocaleText k="missingBody" />}
      href="/messages"
      action={<LocaleText k="backMessages" />}
    />
  );
}
