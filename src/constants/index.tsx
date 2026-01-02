export const USER_ROLE = {
  INVESTOR: "INVESTOR",
  ADMIN: "ADMIN",
  AGENT: "AGENET",
} as const;

// Add Investor Agent Management Tab Constants
export const INVESTOR_AGENT_TABS = {
  INVESTOR: "investor",
  AGENT: "agent",
} as const;

export type InvestorAgentTab =
  (typeof INVESTOR_AGENT_TABS)[keyof typeof INVESTOR_AGENT_TABS];

export const UserStatus = {
  active: "ACTIVE",
  inactive: "INACTIVE",
  pending: "PENDING",
};

export const handleRouteChange = (
  url: string,
  hasUnsavedChanges: boolean,
  isSubmitting: boolean
) => {
  if (hasUnsavedChanges && !isSubmitting) {
    const confirmNavigation = window.confirm(
      "You have unsaved changes. Are you sure you want to leave this page?"
    );

    if (!confirmNavigation) {
      // Prevent navigation by throwing an error
      throw "Route change aborted by user";
    }
  }
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 50,
};
export const PAGINATION_CONSTANT = ["5", "10", "20", "50"];
export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 80;

// Name allows alphabets + space
export const NAME_REGEX = /^[A-Za-z ]+$/;

// Basic email validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Password length */
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 20;