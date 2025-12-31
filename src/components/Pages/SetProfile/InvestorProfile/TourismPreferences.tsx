import { MultiSelect, Title } from "@mantine/core";

export const StepTourism = ({ form }: any) => {
  const { setValue } = form;

  return (
    <>
      <Title order={4}>Tourism & Lifestyle Preferences</Title>

      <MultiSelect
        mt="md"
        data={[
          "Coastal",
          "Urban",
          "Rural",
          "Ski",
          "Cultural",
          "Events",
        ]}
        onChange={(v) => setValue("tourism_preferences", v)}
      />
    </>
  );
};
