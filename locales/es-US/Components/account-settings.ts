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
    confirmNewPassword: {
      required: "Please enter confirm password",
      match: "Passwords do not match",
    },
    user: {
      firstName: {
        required: "First name is required",
        max: "First name must not exceed 50 characters",
        noNumbers: "First name cannot contain numbers",
      },
      lastName: {
        required: "Last name is required",
        max: "Last name must not exceed 50 characters",
        noNumbers: "Last name cannot contain numbers",
      },
      email: {
        required: "Email is required",
        max: "Email must not exceed 80 characters",
        noSpaces: "Email cannot contain spaces",
      },
    },
  },
};

export default { accountSettings };
