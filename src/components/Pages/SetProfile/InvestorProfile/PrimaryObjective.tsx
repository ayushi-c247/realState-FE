import { Radio, Title } from "@mantine/core";

export const StepObjective = ({ form }: any) => {
  const { setValue, formState } = form;

  return (
    <>
      <Title order={4}>Primary Investment Objective</Title>

      <Radio.Group
        mt="md"
        onChange={(v) => setValue("primary_objective", v)}
        error={formState.errors.primary_objective?.message}
      >
        <Radio value="YIELD" label="Yield (Rental Income)" />
        <Radio value="APPRECIATION" label="Appreciation" />
        <Radio value="LIFESTYLE" label="Lifestyle" />
        <Radio value="DIVERSIFICATION" label="Diversification" />
      </Radio.Group>
    </>
  );
};
