import { translate, type ChromeKey } from "@/lib/i18n";

export function LocaleText({ k }: { k: ChromeKey }) {
  return (
    <>
      <span className="locale-en">{translate("en", k)}</span>
      <span className="locale-ar" lang="ar">
        {translate("ar", k)}
      </span>
    </>
  );
}
