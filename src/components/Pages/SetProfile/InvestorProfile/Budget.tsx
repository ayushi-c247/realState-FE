import { BudgetUnitOption } from "@/types/Profile";
import { TextInput, Title, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import Select, { SingleValue } from "react-select";

export const StepBudget = ({ form }: any) => {
  const { register, formState } = form;
  const tUser = useTranslations("userManagement");
  const [unit, setUnit] = useState("LAKH");

  const budgetUnitOptions: BudgetUnitOption[] = [
    { label: "Lakhs (₹ Lakh)", value: "LAKH" },
    { label: "Crores (₹ Cr)", value: "CRORE" },
  ];

  return (
    <>
      <Title order={4}>{tUser("profile.steps.investmentBudget")}</Title>
      <Controller
        name="budget_unit"
        control={form.control}
        {...register}
        defaultValue="LAKH"
        render={({ field, fieldState }) => {
          return (
            <>
              <Select
                {...field}
                options={budgetUnitOptions}
                value={budgetUnitOptions.find((o) => o.value === field.value)}
                onChange={(option: SingleValue<BudgetUnitOption>) => {
                  if (!option) return;
                  setUnit(option.value);
                  field.onChange(option.value);
                }}
                placeholder="Select Budget Unit"
              />
              {fieldState.error?.message && (
                <Text size="sm" color="red" mt={2}>
                  {fieldState.error?.message}
                </Text>
              )}
            </>
          );
        }}
      />

      <Text size="sm" c="dimmed" mt={6}>
        {unit === "LAKH"
          ? "Enter amount in Lakhs. Example: 25 = ₹25,00,000"
          : "Enter amount in Crores. Example: 1.5 = ₹1,50,00,000"}
      </Text>

      <TextInput
        label={`Minimum Budget (${unit === "LAKH" ? "Lakhs" : "Crores"})`}
        placeholder="e.g., 25"
        type="number"
        mt="md"
        {...register("budget_min")}
        error={formState.errors.budget_min?.message}
      />

      <TextInput
        label={`Maximum Budget (${unit === "LAKH" ? "Lakhs" : "Crores"})`}
        placeholder="e.g., 200"
        type="number"
        mt="md"
        {...register("budget_max")}
        error={formState.errors.budget_max?.message}
      />
    </>
  );
};
