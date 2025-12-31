import { ReactNode } from "react";

export interface CustomCardProps {
  title?: string | null;
  description?: string | null;
  icon?: ReactNode | null;
  children?: ReactNode | null;
  mb?: number;
}

export interface OnBoardingProps {
  children?: ReactNode | null;
  text?: string | null;
  className?: string | null;
  headingClass?: string | null | boolean;
}
