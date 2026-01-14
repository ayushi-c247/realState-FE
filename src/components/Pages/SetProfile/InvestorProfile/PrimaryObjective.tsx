import { Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import Select from "react-select";

export const StepObjective = ({ form }: any) => {
  const { setValue, formState, trigger, watch } = form;
  const tUser = useTranslations("userManagement");

  const options = [
    { value: "YIELD", label: "Yield (Rental Income)" },
    { value: "APPRECIATION", label: "Appreciation" },
    { value: "LIFESTYLE", label: "Lifestyle" },
    { value: "DIVERSIFICATION", label: "Diversification" },
  ];

  return (
    <>
      <Title order={4}>
        {tUser("profile.steps.primaryInvestmentObjective")}
      </Title>

      <Select
        styles={{ container: (base) => ({ ...base, marginTop: 12 }) }}
        options={options}
        value={options.find((o) => o.value === watch("primary_objective"))}
        onChange={(selectedOption) => {
          setValue("primary_objective", selectedOption?.value, {
            shouldValidate: true,
          });
          trigger("primary_objective");
        }}
        placeholder="Select primary investment objective"
      />

      {formState.errors.primary_objective?.message && (
        <p style={{ color: "red", marginTop: 6 }}>
          {formState.errors.primary_objective.message}
        </p>
      )}
    </>
  );
};
