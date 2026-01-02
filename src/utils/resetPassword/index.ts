import { PASSWORD_STRENGTH_LEVELS } from "@/constants/resetPassword";

export type PasswordStrength =
  (typeof PASSWORD_STRENGTH_LEVELS)[keyof typeof PASSWORD_STRENGTH_LEVELS];

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return PASSWORD_STRENGTH_LEVELS.WEAK;

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const score = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  // Fixed logic: 5/5 = STRONG, 3-4/5 = MEDIUM, 0-2/5 = WEAK
  if (score >= 5) return PASSWORD_STRENGTH_LEVELS.STRONG;
  if (score >= 3) return PASSWORD_STRENGTH_LEVELS.MEDIUM;
  return PASSWORD_STRENGTH_LEVELS.WEAK;
};
