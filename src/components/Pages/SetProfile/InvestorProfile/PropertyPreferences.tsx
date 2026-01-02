import { MultiSelect, Select, Title } from "@mantine/core";

export const StepProperty = ({ form }: any) => {
  const { setValue, formState } = form;

  return (
    <>
      <Title order={4}>Property Preferences</Title>

      <MultiSelect
        label="Preferred Property Types"
        mt="md"
        data={["Apartment", "Villa", "Commercial"]}
        onChange={(v) => setValue("preferred_property_types", v)}
        error={formState.errors.preferred_property_types?.message}
      />

      <Select
        label="Ownership Structure"
        mt="md"
        data={[
          { value: "SOLE", label: "Sole" },
          { value: "JOINT", label: "Joint" },
          { value: "FRACTIONAL", label: "Fractional" },
          { value: "LEASEBACK", label: "Leaseback" },
        ]}
        onChange={(v) => setValue("ownership_structure", v)}
        error={formState.errors.ownership_structure?.message}
      />
    </>
  );
};
