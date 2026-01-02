import { Title, Box } from "@mantine/core";

export const StepReview = ({ form }: any) => {
  const values = form.getValues();

  return (
    <>
      <Title order={4}>Review Your Investment Profile</Title>

      <Box mt="md">
        <pre style={{ fontSize: 12 }}>{JSON.stringify(values, null, 2)}</pre>
      </Box>
    </>
  );
};
