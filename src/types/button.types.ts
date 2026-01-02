import { ButtonProps } from "@mantine/core";

export const BUTTON_TYPES = {
  SUBMIT: "submit",
  RESET: "reset",
  BUTTON: "button",
} as const;

export type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];

export interface ExtendedButtonProps extends ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}
