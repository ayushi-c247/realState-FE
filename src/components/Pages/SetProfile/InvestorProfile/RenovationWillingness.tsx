import { Title } from "@mantine/core";
import Select from "react-select";

export const StepRenovationWillingness = ({ form }: any) => {
  const { setValue, formState, trigger, watch } = form;

  const options = [
    { value: "TURNKEY", label: "Turnkey" },
    { value: "LIGHT", label: "Light" },
    { value: "FULL", label: "Full" },
  ];

  return (
    <>
      <Title order={4}>Renovation Willingness</Title>
      <Select
        styles={{ container: (base) => ({ ...base, marginTop: 12 }) }}
        options={options}
        value={
          options.find((o) => o.value === watch("renovation_willingness")) ||
          null
        }
        onChange={(selectedOption) => {
          setValue("renovation_willingness", selectedOption?.value, {
            shouldValidate: true,
          });
          trigger("renovation_willingness");
        }}
        placeholder="Select renovation willingness"
        isClearable
      />

      {formState.errors.renovation_willingness?.message && (
        <p style={{ color: "red", marginTop: 6 }}>
          {formState.errors.renovation_willingness.message}
        </p>
      )}
    </>
  );
};
