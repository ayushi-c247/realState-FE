import { Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import Select from "react-select";

export const StepProperty = ({ form }: any) => {
  const { setValue, watch, formState, trigger } = form;
  const tUser = useTranslations("userManagement");
  const preferredTypes = watch("preferred_property_types") || [];
  const ownership = watch("ownership_structure") || null;

  const propertyTypeOptions = [
    { value: "Apartment", label: "Apartment" },
    { value: "Villa", label: "Villa" },
    { value: "Commercial", label: "Commercial" },
  ];

  const ownershipOptions = [
    { value: "SOLE", label: "Sole" },
    { value: "JOINT", label: "Joint" },
    { value: "FRACTIONAL", label: "Fractional" },
    { value: "LEASEBACK", label: "Leaseback" },
  ];

  return (
    <>
      <Title order={4}>
        {tUser("profile.steps.propertyPreferences.title")}
      </Title>

      {/* Preferred Property Types – MULTI SELECT */}
      <label style={{ fontSize: 14, fontWeight: 500, marginTop: 12 }}>
        {tUser("profile.steps.propertyPreferences.preferredPropertyTypes")}
      </label>
      <Select
        options={propertyTypeOptions}
        value={propertyTypeOptions.filter((opt) =>
          preferredTypes?.includes(opt.value)
        )}
        onChange={(opt: any) => {
          setValue("preferred_property_types", opt?.value, {
            shouldValidate: true,
          });
          trigger("preferred_property_types");
        }}
        placeholder={tUser(
          "profile.steps.propertyPreferences.preferredPropertyTypesPlaceholder"
        )}
      />
      {formState.errors.preferred_property_types?.message && (
        <p style={{ color: "red", fontSize: 12 }}>
          {formState.errors.preferred_property_types?.message}
        </p>
      )}

      {/* Ownership Structure – SINGLE SELECT */}
      <label style={{ fontSize: 14, fontWeight: 500, marginTop: 12 }}>
        {tUser("profile.steps.propertyPreferences.ownershipStructure")}
      </label>
      <Select
        options={ownershipOptions}
        value={ownershipOptions.find((o) => o.value === ownership) || null}
        onChange={(opt: any) => {
          setValue("ownership_structure", opt?.value || null, {
            shouldValidate: true,
          });
          trigger("ownership_structure");
        }}
        placeholder={tUser(
          "profile.steps.propertyPreferences.ownershipStructurePlaceholder"
        )}
      />
      {formState.errors.ownership_structure?.message && (
        <p style={{ color: "red", fontSize: 12 }}>
          {formState.errors.ownership_structure?.message}
        </p>
      )}
    </>
  );
};
