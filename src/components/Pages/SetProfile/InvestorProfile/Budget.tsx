import { TextInput, Title } from "@mantine/core";

export const StepBudget = ({ form }: any) => {
  const { register, formState } = form;

  return (
    <>
      <Title order={4}>Investment Budget</Title>

      <TextInput
        label="Minimum Budget"
        type="number"
        mt="md"
        {...register("budget_min")}
        error={formState.errors.budget_min?.message}
      />

      <TextInput
        label="Maximum Budget"
        type="number"
        mt="md"
        {...register("budget_max")}
        error={formState.errors.budget_max?.message}
      />
    </>
  );
};
