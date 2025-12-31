import { default as login } from "./login";
import { default as resetPassword } from "./reset-password";
import signup from "./signup";

const Auth = {
  ...login,
  ...resetPassword,
  ...signup,
};

export default Auth;
