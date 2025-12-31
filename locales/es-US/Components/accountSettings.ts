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
      country: {
        label: "Country",
        placeholder: "Select country",
        error: "Country is required",
      },
      nickName: {
        label: "Child Name",
        placeholder: "Enter child name",
      },
      userName: {
        label: "Username",
      },
      dob: {
        label: "Date of Birth",
        placeholder: "Select date of birth",
        error: "Date of Birth is required",
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
    nickName: {
      required: "Child name is required",
      noNumbers: "Child name cannot contain numbers",
    },
  },
  profilePictureUpdate: "Profile picture updated successfully.",
  profilePictureUpdateFailed: "Failed to update profile picture. Please try again.",
  profilePictureDelete: "Profile picture removed successfully.",
  parentProfileBelowText: "If you need any further assistance, feel free to contact the ",
  contactParent: "contact your parent.",
  needChanges: "If you need to change your",
  emailAddress: "e-mail address",
  username: "username",
  profileUplaodError: "Could not delete old avatar from storage. Please try again later.",
};

export default { accountSettings };
