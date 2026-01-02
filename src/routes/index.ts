export const paths = {
  ROOT_ADMIN: "/admin",
  ROOT_USER_MANAGEMENT: "/admin/user",
  ROOT_INVESTOR_MANAGEMENT: "/admin/user/investor",
  ROOT_AGENT_MANAGEMENT: "/admin/user/agent",
  ROOT_DASHBOARD: "/dashboard",
  ROOT_LOGIN: "/login",
  ROOT_SIGNUP: "/signup",
  ROOT_PROFILE: "/set-profile",
  ROOT_SETTING: "/admin/settings",
  ROOT_ACCOUNT_SETTINGS: "/account-settings",
  ROOT_NO_CHILD_LINK: "/forbidden",
  ROOT_CREATE_PASSWORD: "/create-password",
  ROOT_CONGRATULATION: "/congratulations",
};

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
const ROOTS_DASHBOARD = "/dashboard";
const ROOTS_AUTH = "/authentication";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD, "/default"),
  analytics: path(ROOTS_DASHBOARD, "/analytics"),
  saas: path(ROOTS_DASHBOARD, "/saas"),
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, "/signin"),
  passwordReset: path(ROOTS_AUTH, "/password-reset"),
  resetPassword: "/reset-password",
  forgotPassword: "/forgot-password",
  signup: "/signup",
};
