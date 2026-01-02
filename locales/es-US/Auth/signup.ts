import login from "./login";

const signup = {
  title: "Signup",
  heading: "Enter credentials to access the RealState online portal",
  forgotPasswordLoginText: "Already have an account?",
  childLoginText: "Are you a child user?",
  parentLoginText: "Are you a parent user?",
  form: {
    title: "Signup",
    email: {
      label: "Email",
      placeholder: "Enter your email",
    },
    firstName: {
      label: "First Name",
      placeholder: "Enter your first name",
    },
    lastName: {
      label: "Last Name",
      placeholder: "Enter your last name",
    },

    button: {
      signup: "Signup",
      login: "Login",
    },
    loading: {
      Signup: "Signup...",
    },
  },
  validation: {
    email: {
      label: "Email",
      placeholder: "Enter your email",
      required: "Email is required",
      inValidMail: "Email is not valid",
      max: "Email must not exceed 80 characters",
      space: "Email cannot contain spaces",
    },
    firstName: {
      label: "First Name",
      placeholder: "Enter your first name",
      required: "First name is required",
      max: "First name must not exceed 50 characters",
      onlyCharacters: "First name can contain only letters",
    },
    lastName: {
      label: "Last Name",
      placeholder: "Enter your last name",
      required: "Last name is required",
      max: "Last name must not exceed 50 characters",
      onlyCharacters: "Last name can contain only letters",
    },
  },
  alreadyHaveAccount: "Already have an account?",
};

export default { signup };
