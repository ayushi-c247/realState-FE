import { Title } from "@mantine/core";
import Select from "react-select";

export const StepTourism = ({ form }: any) => {
  const { setValue, watch, trigger } = form;

  const selectedValues = watch("tourism_preferences") || [];

  const options = [
    { value: "Coastal", label: "Coastal" },
    { value: "Urban", label: "Urban" },
    { value: "Rural", label: "Rural" },
    { value: "Ski", label: "Ski" },
    { value: "Cultural", label: "Cultural" },
    { value: "Events", label: "Events" },
  ];

  return (
    <>
      <Title order={4}>Tourism & Lifestyle Preferences</Title>
      <Select
        options={options}
        value={options.filter((o) => selectedValues.includes(o.value))}
        onChange={(option: any) => {
          setValue("tourism_preferences", option.value, {
            shouldValidate: true,
          });
          trigger?.("tourism_preferences");
        }}
        placeholder="Select tourism preferences"
      />
    </>
  );
};
