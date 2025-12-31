"use client";

import Select from "react-select";
import { Title, Stack } from "@mantine/core";
import { Country, State, City } from "country-state-city";

export const StepRegions = ({ form }: any) => {
  const { setValue, watch, formState } = form;

  const selectedCountry = watch("country");
  const selectedState = watch("state");
  const selectedRegions = watch("preferred_regions") || [];

  // Country options
  const countryOptions = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode,
  }));

  // State options (depends on country)
  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry).map((s) => ({
        label: s.name,
        value: s.isoCode,
      }))
    : [];

  // City options (depends on state)
  const cityOptions =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry, selectedState).map((c) => ({
          label: c.name,
          value: c.name,
        }))
      : [];

  return (
    <>
      <Title order={4}>Preferred Regions</Title>

      <Stack mt="md">
        {/* Country */}
        <Select
          placeholder="Select Country"
          options={countryOptions}
          onChange={(v: any) => {
            setValue("country", v?.value);
            setValue("state", null);
            setValue("preferred_regions", []);
          }}
        />

        {/* State */}
        {selectedCountry && (
          <Select
            placeholder="Select State"
            options={stateOptions}
            onChange={(v: any) => {
              setValue("state", v?.value);
              setValue("preferred_regions", []);
            }}
          />
        )}

        {/* City */}
        {selectedState && (
          <Select
            isMulti
            placeholder="Select Cities"
            options={cityOptions}
            value={cityOptions.filter((c) => selectedRegions.includes(c.value))}
            onChange={(v: any) =>
              setValue(
                "preferred_regions",
                v.map((item: any) => item.value),
                { shouldValidate: true }
              )
            }
          />
        )}

        {formState.errors.preferred_regions && (
          <p style={{ color: "red", fontSize: 12 }}>
            {formState.errors.preferred_regions.message}
          </p>
        )}
      </Stack>
    </>
  );
};
