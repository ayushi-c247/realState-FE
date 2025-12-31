export const PASSWORD_STRENGTH_LEVELS = {
  WEAK: { strength: "WEAK", color: "#EA3535" }, // red
  MEDIUM: { strength: "MEDIUM", color: "#FF9A00" }, // orange
  STRONG: { strength: "STRONG", color: "green" }, // green
} as const;

export const PASSWORD_REQUIREMENTS = [
  "At least 8 characters long",
  "An uppercase and a lowercase letter (A, a)",
  "A number (1,2)",
  "A special character (!, %, @, #, etc.)",
  "Password must not contain spaces"
] as const;
