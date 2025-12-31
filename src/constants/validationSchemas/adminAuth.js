import * as yup from "yup";
/**
 * Validation schema for admin login
 */
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .test("no-spaces", "Email cannot contain spaces", (value) => !/\s/.test(value || ""))
    .matches(emailRegex, "Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .test("no-spaces", "Password cannot contain spaces", (value) => !/\s/.test(value || "")),
});
export const childLoginValidationSchema = yup.object().shape({
  user_name: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .test("no-spaces", "Password cannot contain spaces", (value) => !/\s/.test(value || "")),
});

export const sendOtpSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  otp: yup.string().when("$step", {
    is: (step) => step === "VerifyOtp",
    then: (schema) =>
      schema
        .required("OTP is required")
        .length(6, "OTP must be 6 digits")
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

// 3) Verify‐OTP Schema (email + partnerType + 6-digit OTP)
export const expertValidationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

/**
 * Validation schema for admin profile update
 */
export const updateProfileValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is required")
    .max(80, "First name should not exceed 80 characters.")
    .min(2, "First name must be at least 2 characters.")
    .test(
      "not-only-spaces",
      "First name can only contain letters",
      (value) => value?.trim().length > 0,
    )
    .matches(/^[A-Za-z]+$/, "First name can only contain letters"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .test("not-only-spaces", "Email can only contain letters", (value) => value?.trim().length > 0)
    .max(254, "Email cannot be more than 254 characters")
    .test("no-spaces", "Email cannot contain spaces", (value) => !/\s/.test(value || ""))
    .test("valid-domain", "Email must contain a valid domain (e.g., .com, .net)", (value) => {
      const domainRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return domainRegex.test(value || "");
    })
    .test("local-part-length", "The part before @ must be 80 characters", (value) => {
      if (!value || !value.includes("@")) return true; // let other tests catch invalid formats
      const localPart = value.split("@")[0];
      return localPart.length <= 80;
    }),
});

export const changePasswordValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .max(18, "Password cannot be more than 18 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,18}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
    )
    .test(
      "not-same-as-current",
      "New password must be different from current password",
      function (value) {
        return value !== this.parent.currentPassword;
      },
    ),
  confirmNewPassword: yup
    .string()
    .required("Please enter confirm password")
    .test("passwords-match", "Passwords do not match", function (value) {
      return this.parent.newPassword === value;
    }),
});
