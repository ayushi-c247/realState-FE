import * as yup from "yup";

import { EMAIL_REGEX } from "@/constants";
import { passwordValidationRules } from "@/utils";

export const loginValidationSchema = (tLogin: (key: string) => string) =>
  yup.object().shape({
    email: yup
      .string()
      .required(tLogin("validation.email.required"))
      .test(
        "no-spaces",
        tLogin("validation.email.space"),
        (value) => !/\s/.test(value ?? "")
      )
      .matches(EMAIL_REGEX, tLogin("validation.email.invalid")),
    password: yup
      .string()
      .required(tLogin("validation.password.required"))
      .test(
        "no-spaces",
        tLogin("validation.password.space"),
        (value) => !/\s/.test(value ?? "")
      ),
  });

export const changePasswordValidationSchema = (
  tPassword: (key: string) => string
) =>
  yup.object().shape({
    newPassword: passwordValidationRules,
    confirmNewPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        tPassword("validation.confirmNewPassword.match")
      )
      .required(tPassword("validation.confirmNewPassword.required")),
  });

export const resetPasswordValidationSchema = (
  tPassword: (key: string) => string
) =>
  yup.object().shape({
    password: passwordValidationRules,
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        tPassword("validation.confirmPassword.match")
      )
      .required(tPassword("validation.confirmPassword.required")),
  });
