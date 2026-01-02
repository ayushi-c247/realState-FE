const resetPassword = {
  form: {
    title: "Set Your Password",
    description: "Please enter your new password below.",
    createPassword: {
      label: "Create Password",
      placeholder: "Enter your password",
    },
    confirmPassword: {
      label: "Confirm Password",
      placeholder: "Confirm your password",
    },
    buttons: {
      save: "Save Password",
      show: "Show",
      hide: "Hide",
    },
  },
  messages: {
    tokenNotFound: "Token is missing in the query parameters.",
    noSpacesAllowed: "Spaces are not allowed.",
    success: {
      passwordUpdated: "Password updated successfully! Loading your profile...",
      redirecting: "Password reset successful! Redirecting to questionnaire...",
      forgotPassword: "Password reset successful! Redirecting to login...",
    },
    errors: {
      general: "Password reset failed. Please try again.",
      unexpected: "An unexpected error occurred. Please try again.",
      tokenInvalid:
        "Invalid or missing reset token. Please request a new password reset.",
      userDataFailed: "Failed to load user data. Please try again.",
      networkError:
        "Network error. Please check your connection and try again.",
    },
  },
  validation: {
    confirmPassword: {
      required: "Please enter confirm password",
      match: "Passwords do not match",
    },
  },
};

export default { resetPassword };
