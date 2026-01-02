import { match } from "assert";

const login = {
  title: "Login",
  heading: "Enter credentials to access the Real State online portal",
  forgotPasswordText: "Please enter your email to reset your password.",
  forgotPassword: "Forgot Password",
  signup: "Don't have an account? signup",
  forgotPasswordLoginLinkText: "Sign in",
  forgotPasswordLoginText: "Already have an account?",
  form: {
    title: "Login",
    email: {
      label: "Email",
      placeholder: "Enter your email",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
    },
    button: {
      login: "Login",
    },
    loading: {
      login: "Logging in...",
      verify: "Verifying...",
      forgotPassword: "Sending reset password link...",
    },
    forgotPassword: {
      title: "Forgot Password",
      link: {
        text: "Forgot Password?",
      },
      buttons: {
        send: "Send Reset Password Link",
        cancel: "Cancel",
      },
      message: {
        text: "A reset password link has been sent to your registerd email.",
        description: "You can follow that link to reset your password.",
      },
    },
  },
  validation: {
    email: {
      required: "Please enter email",
      match: "Email does not match",
      invalid: "Please enter a valid email address",
      space: "Email cannot contain spaces",
    },
    password: {
      required: "Please enter password",
      match: "Password does not match",
      space: "Password cannot contain spaces",
    },
  },
};

export default { login };
