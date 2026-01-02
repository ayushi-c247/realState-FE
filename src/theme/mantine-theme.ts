// theme/mantine-theme.ts
import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    brand: [
      "var(--primary-color)",
      "var(--primary-color)",
      "var(--primary-color)",
      "var(--primary-color)",
      "var(--primary-color)",
      "var(--primary-color)",
      "var(--primary-color)",
      "var(--primary-color)",
      "var(--primary-color)",
      "var(--primary-color)",
    ],
  },
  primaryColor: "brand",
  fontFamily: "var(--font-poppins), sans-serif",
  fontSizes: {
    sm: "var(--font-size-sm)",
    md: "var(--font-size-base)",
    lg: "var(--font-size-lg)",
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
  },
  spacing: {
    xs: "var(--spacing-xs)",
    sm: "var(--spacing-sm)",
    md: "var(--spacing-md)",
    lg: "var(--spacing-lg)",
    xl: "var(--spacing-xl)",
  },
});
