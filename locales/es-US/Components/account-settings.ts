const accountSettings = {
  loading: "Loading user data...",
  error: "Error loading user data. Please try again.",
  header: {
    title: "Account Settings",
  },
  sections: {
    personalDetails: "Personal Details",
    securityAndPassword: "Security & Password",
  },
  buttons: {
    cancel: "Cancel",
    saveChanges: "Save Changes",
    changePassword: "Change Password",
  },
  forms: {
    fields: {
      firstName: {
        label: "First Name",
        placeholder: "Enter first name",
        error: "First name is required",
      },
      lastName: {
        label: "Last Name",
        placeholder: "Enter last name",
        error: "Last name is required",
      },
    },
  },
  changePassword: {
    form: {
      title: "Change Password",
      currentPassword: {
        label: "Current Password",
        placeholder: "Enter your current password",
      },
      newPassword: {
        label: "New Password",
        placeholder: "Enter your new password",
      },
      confirmPassword: {
        label: "Confirm Password",
        placeholder: "Confirm your new password",
      },
    },
  },
  validation: {
    changePassword: {
      newPassword: {
        validation: {
          required: "New password is required",
          min: "Password must be at least 8 characters",
          max: "Password cannot be more than 18 characters",
          pattern:
            "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
          notSameAsCurrent:
            "New password must be different from current password",
        },
      },
      confirmNewPassword: {
        validation: {
          required: "Please enter confirm password",
          match: "Passwords do not match",
        },
      },
    },
  },
};

export default { accountSettings };
