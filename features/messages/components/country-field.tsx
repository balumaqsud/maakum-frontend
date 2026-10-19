"use client";

import { FormField } from "@/components/ui/form-field";
import { LocaleText } from "@/components/shared/locale-text";
import { countryChoices } from "@/features/messages/compose";
import { translate } from "@/lib/i18n";

export function CountryField({ error }: { error?: boolean }) {
  return (
    <FormField
      label={
        <>
          <LocaleText k="writeCountry" /> <span className="font-normal text-ink-soft"><LocaleText k="writeOptional" /></span>
        </>
      }
      error={error ? <LocaleText k="writeCountryInvalid" /> : undefined}
    >
      <select name="country" className="field-control" defaultValue="">
        <option value="">{`${translate("en", "writeChoose")} / ${translate("ar", "writeChoose")}`}</option>
        {countryChoices.map((country) => (
          <option key={country.id} value={country.id}>
            {`${country.en} / ${country.ar}`}
          </option>
        ))}
      </select>
    </FormField>
  );
}
