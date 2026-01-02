import * as yup from "yup";

import { EMAIL_REGEX } from "@/constants";
import { passwordValidationRules } from "@/utils";

/**
 * Validation schema for admin login
 */

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .test(
      "no-spaces",
      "Email cannot contain spaces",
      (value) => !/\s/.test(value || "")
    )
    .matches(EMAIL_REGEX, "Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .test(
      "no-spaces",
      "Password cannot contain spaces",
      (value) => !/\s/.test(value || "")
    ),
});

export const changePasswordValidationSchema = (
  tPassword: (key: string) => string
) =>
  yup.object().shape({
    newPassword: passwordValidationRules,
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

export const resetPasswordValidationSchema = yup.object().shape({
  password: passwordValidationRules,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
