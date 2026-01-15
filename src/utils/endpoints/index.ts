export const API_ENDPOINTS = {
  // auth
  LOGIN: "/auth/login",
  LOGOUT: "/logout",
  ME: "/auth/me",
  REFRESH: "/auth/refresh",
  CHANGE_PASSWORD: "/auth/change-password",
  UPDATE_PROFILE: "/auth/update-profile",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  ACTIVATE_USER: "/auth/activate-user",

  //User
  USER: "/user",
  USERS: "/users",
  USER_ADD: "/user/add",
  INVESTOR_PROFILE: "/user/investor-profile",
  AGENT_PROFILE: "/user/agent-profile",
  USER_DETAIL: "/user/:userId",
  USER_UPDATE: "user/status",
  AGENT_UPDATE_STATUS: "user/agent-status",
  RESEND_INVITATION: "/user/resend-invitation",
  DASH_BOARD: "/dashboard",

  //Property
  PROPERTY: "/property",
  PROPERTY_STATUS_UPDATE: "/property/status",
};
