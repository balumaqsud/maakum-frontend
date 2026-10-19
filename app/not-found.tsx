import { EmptyState } from "@/components/shared/empty-state";
import { LocaleText } from "@/components/shared/locale-text";

export default function NotFound() {
  return (
    <EmptyState
      title={<LocaleText k="notFoundTitle" />}
      body={<LocaleText k="notFoundBody" />}
      href="/"
      action={<LocaleText k="backHome" />}
    />
  );
}
