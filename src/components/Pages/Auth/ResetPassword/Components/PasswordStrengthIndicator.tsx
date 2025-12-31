import React from "react";
import { Box, Slider, Text } from "@mantine/core";
import { PASSWORD_REQUIREMENTS } from "@/constants/resetPassword";
import { getPasswordStrength } from "@/utils/resetPassword";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
}) => {
  // Calculate actual progress based on requirements met
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  return (
    <Box mb="lg">
      <Text size="sm" fw={600} mb="xs" c="#081021">
        Strong password must contain:
      </Text>
      <Box component="ul" pl="md" mb="sm" mt={2}>
        <Text component="li" fz={12} fw={400} c={hasLength ? "green" : "#64748B"}>
          {PASSWORD_REQUIREMENTS[0]}
        </Text>
        <Text component="li" fz={12} fw={400} c={hasUpper && hasLower ? "green" : "#64748B"}>
          {PASSWORD_REQUIREMENTS[1]}
        </Text>
        <Text component="li" fz={12} fw={400} c={hasNumber ? "green" : "#64748B"}>
          {PASSWORD_REQUIREMENTS[2]}
        </Text>
        <Text component="li" fz={12} fw={400} c={hasSpecial ? "green" : "#64748B"}>
          {PASSWORD_REQUIREMENTS[3]}
        </Text>
      </Box>
    </Box>
  );
};
