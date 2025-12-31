import * as yup from "yup";

export const passwordValidationRules = yup
  .string()
  .required("Password is required")
  .test(
    "no-space",
    "Password must not contain spaces",
    (value) => !/\s/.test(value || "")
  )
  .test("uppercase", "Password must contain an uppercase letter", (value) =>
    /[A-Z]/.test(value || "")
  )
  .test("lowercase", "Password must contain a lowercase letter", (value) =>
    /[a-z]/.test(value || "")
  )
  .test("number", "Password must contain a number", (value) =>
    /[0-9]/.test(value || "")
  )
  .test("special", "Password must contain a special character", (value) =>
    /[^A-Za-z0-9]/.test(value || "")
  )
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must not exceed 18 characters");

export const frontSideParentValidationSchema = (t: (key: string) => string) =>
  yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .required(t("validation.firstName.required"))
      .max(80, t("validation.firstName.max"))
      .test("valid-first-name", (value, ctx) => {
        if (!value) return true; // required handles empty
        if (/\d/.test(value))
          return ctx.createError({
            message: t("validation.firstName.noNumbers"),
          });
        if (!/^[A-Za-z\s'-]+$/.test(value))
          return ctx.createError({
            message: t("validation.firstName.noSpecialChars"),
          });
        return true;
      }),
    lastName: yup
      .string()
      .trim()
      .required(t("validation.lastName.required"))
      .max(80, t("validation.lastName.max"))
      .test("valid-first-name", (value, ctx) => {
        if (!value) return true; // required handles empty
        if (/\d/.test(value))
          return ctx.createError({
            message: t("validation.lastName.noNumbers"),
          });
        if (!/^[A-Za-z\s'-]+$/.test(value))
          return ctx.createError({
            message: t("validation.lastName.noSpecialChars"),
          });
        return true;
      }),
    country: yup.string().required("Country is required"),
    email: yup
      .string()
      .transform((val) => val?.trim())
      .required(t("validation.email.required"))
      .email(t("validation.email.inValidMail"))
      .test(
        "no-spaces",
        t("validation.email.space"),
        (value) => !/\s/.test(value || "")
      ),
    linkChildId: yup
      .array()
      .of(yup.number().required())
      .min(1, "At least one child must be linked")
      .required("Child linking is required")
      .compact(),
  });
export const frontSideParentValidationSchemaParent = (
  t: (key: string) => string
) =>
  yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .required(t("validation.firstName.required"))
      .max(80, t("validation.firstName.max"))
      .test("valid-first-name", (value, ctx) => {
        if (!value) return true; // required handles empty
        if (/\d/.test(value))
          return ctx.createError({
            message: t("validation.firstName.noNumbers"),
          });
        if (!/^[A-Za-z\s'-]+$/.test(value))
          return ctx.createError({
            message: t("validation.firstName.noSpecialChars"),
          });
        return true;
      }),
    lastName: yup
      .string()
      .trim()
      .required(t("validation.lastName.required"))
      .max(80, t("validation.lastName.max"))
      .test("valid-first-name", (value, ctx) => {
        if (!value) return true; // required handles empty
        if (/\d/.test(value))
          return ctx.createError({
            message: t("validation.lastName.noNumbers"),
          });
        if (!/^[A-Za-z\s'-]+$/.test(value))
          return ctx.createError({
            message: t("validation.lastName.noSpecialChars"),
          });
        return true;
      }),
    country: yup.string().required("Country is required"),
    email: yup
      .string()
      .transform((val) => val?.trim())
      .required(t("validation.email.required"))
      .email()
      .test(
        "no-spaces",
        t("validation.email.space"),
        (value) => !/\s/.test(value || "")
      ),
  });

export const frontSideResetPasswordValidationSchema = yup.object().shape({
  password: passwordValidationRules,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
