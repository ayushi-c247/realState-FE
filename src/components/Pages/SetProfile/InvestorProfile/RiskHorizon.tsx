import { Select, Title } from "@mantine/core";

export const StepRiskHorizon = ({ form }: any) => {
  const { setValue, formState } = form;

  return (
    <>
      <Title order={4}>Risk & Investment Horizon</Title>

      <Select
        label="Risk Tolerance"
        mt="md"
        data={[
          { value: "LOW", label: "Low" },
          { value: "MEDIUM", label: "Medium" },
          { value: "HIGH", label: "High" },
        ]}
        onChange={(v) => setValue("risk_tolerance", v)}
        error={formState.errors.risk_tolerance?.message}
      />

      <Select
        label="Investment Horizon"
        mt="md"
        data={[
          { value: "SHORT", label: "Short (<5 yrs)" },
          { value: "MEDIUM", label: "Medium (5–10 yrs)" },
          { value: "LONG", label: "Long (>10 yrs)" },
        ]}
        onChange={(v) => setValue("investment_horizon", v)}
        error={formState.errors.investment_horizon?.message}
      />
    </>
  );
};
