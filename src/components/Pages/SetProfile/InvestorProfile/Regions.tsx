"use client";

import { Title, Stack } from "@mantine/core";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

export const StepRegions = ({ form }: any) => {
  const { control, watch, formState, trigger } = form;
  const tUser = useTranslations("userManagement");
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  // Country options
  const countryOptions = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode,
  }));

  // State options
  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry).map((s) => ({
        label: s.name,
        value: s.isoCode,
      }))
    : [];

  // City / Regions options
  const cityOptions =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry, selectedState).map((c) => ({
          label: c.name,
          value: c.name,
        }))
      : [];

  return (
    <Stack mt="md">
      <Title order={4}>{tUser("profile.steps.preferredRegions.title")}</Title>

      {/* Country */}
      <Controller
        name="country"
        control={control}
        rules={{ required: "Please select a country" }}
        render={({ field }) => (
          <Select
            {...field}
            options={countryOptions}
            value={countryOptions.find((c) => c.value === field.value) || null}
            onChange={(v: any) => {
              field.onChange(v?.value);
              trigger(["country"]);
            }}
            placeholder={tUser(
              "profile.steps.preferredRegions.countryPlaceholder"
            )}
          />
        )}
      />
      {formState.errors.country && (
        <p style={{ color: "red", fontSize: 12 }}>
          {formState.errors.country.message}
        </p>
      )}

      {/* State */}
      {selectedCountry && (
        <Controller
          name="state"
          control={control}
          rules={{ required: "Please select a state" }}
          render={({ field }) => {
            return (
              <>
                <Select
                  {...field}
                  options={stateOptions}
                  value={
                    stateOptions.find((s) => s.value === field.value) || null
                  }
                  onChange={(v: any) => {
                    field.onChange(v?.value);
                    trigger(["state"]);
                  }}
                  placeholder={tUser(
                    "profile.steps.preferredRegions.statePlaceholder"
                  )}
                />
                {formState.errors.state && (
                  <p style={{ color: "red", fontSize: 12 }}>
                    {formState.errors.state.message}
                  </p>
                )}
              </>
            );
          }}
        />
      )}

      {/* Cities / Preferred Regions */}
      {selectedState && (
        <Controller
          name="cities"
          control={control}
          rules={{
            validate: (val) =>
              val && val.length > 0 ? true : "Select at least one region",
          }}
          render={({ field }) => {
            return (
              <>
                <Select
                  {...field}
                  isMulti
                  options={cityOptions}
                  value={cityOptions.filter((c) =>
                    (field.value || []).includes(c.value)
                  )}
                  onChange={(v: any) => {
                    const values = v.map((item: any) => item.value);
                    field.onChange(values);
                    trigger("cities");
                  }}
                  placeholder={tUser(
                    "profile.steps.preferredRegions.cityPlaceholder"
                  )}
                />
                {formState.errors.cities && (
                  <p style={{ color: "red", fontSize: 12 }}>
                    {formState.errors.cities.message}
                  </p>
                )}
              </>
            );
          }}
        />
      )}
    </Stack>
  );
};
