"use client";

import Select from "react-select";
import { Title, Stack } from "@mantine/core";

export const StepRiskHorizon = ({ form }: any) => {
  const { setValue, watch, formState, trigger } = form;

  const selectedRisk = watch("risk_tolerance");
  const selectedHorizon = watch("investment_horizon");

  const riskOptions = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
  ];

  const horizonOptions = [
    { value: "SHORT", label: "Short (<5 yrs)" },
    { value: "MEDIUM", label: "Medium (5–10 yrs)" },
    { value: "LONG", label: "Long (>10 yrs)" },
  ];

  return (
    <Stack>
      {/* Risk Tolerance */}
      <label>Risk Tolerance</label>
      <Select
        placeholder="Select Risk Tolerance"
        options={riskOptions}
        value={riskOptions.find((o) => o.value === selectedRisk) || null}
        onChange={(option: any) => {
          setValue("risk_tolerance", option?.value, { shouldValidate: true });
          trigger("risk_tolerance");
        }}
      />
      {formState.errors.risk_tolerance && (
        <p style={{ color: "red", fontSize: 12 }}>
          {formState.errors.risk_tolerance.message}
        </p>
      )}
      <label>Investment Horizon</label>
      <Select
        placeholder="Select Investment Horizon"
        options={horizonOptions}
        value={horizonOptions.find((o) => o.value === selectedHorizon) || null}
        onChange={(option: any) => {
          setValue("investment_horizon", option?.value, {
            shouldValidate: true,
          });
          trigger("investment_horizon");
        }}
      />
      {formState.errors.investment_horizon && (
        <p style={{ color: "red", fontSize: 12 }}>
          {formState.errors.investment_horizon.message}
        </p>
      )}
    </Stack>
  );
};
