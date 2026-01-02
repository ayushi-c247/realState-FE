import { USER_ROLE } from "@/constants";

export type SubdomainType = "portal";

export interface SubdomainConfig {
  name: string;
  allowedRoles: string[];
  defaultLoginPath: string;
  redirectOnUnauthorized: string;
  description: string;
}

export const SUBDOMAIN_CONFIG: Record<SubdomainType, SubdomainConfig> = {
  portal: {
    name: "portal",
    allowedRoles: [USER_ROLE.ADMIN, USER_ROLE.AGENT, USER_ROLE.INVESTOR],
    defaultLoginPath: "/login",
    redirectOnUnauthorized: "/login",
    description: "Main portal for admin, parents, co-parents, and children",
  },
};

export const ROLE_TO_SUBDOMAIN: Record<string, SubdomainType> = {
  [USER_ROLE.ADMIN]: "portal",
  [USER_ROLE.INVESTOR]: "portal",
  [USER_ROLE.AGENT]: "portal",
};

export const getDomainConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "skillsome.com";

  return {
    isDevelopment,
    baseDomain,
    getSubdomainUrl: (subdomain: SubdomainType) => {
      if (isDevelopment) {
        return `http://localhost:${process.env.PORT || 3000}`;
      }
      return `https://${subdomain}.${baseDomain}`;
    },
  };
};

export const getSubdomainFromHostname = (hostname: string): SubdomainType => {
  if (
    hostname.includes("localhost") ||
    hostname.includes("127.0.0.1") ||
    hostname.includes("nip.io") ||
    process.env.NODE_ENV === "development"
  ) {
    return "portal";
  }

  const parts = hostname.split(".");

  if (parts.length >= 2) {
    const subdomain = parts[0] as SubdomainType;

    if (subdomain in SUBDOMAIN_CONFIG) {
      return subdomain;
    }
  }

  return "portal";
};

export const isDevelopmentEnvironment = (hostname: string): boolean => {
  return (
    hostname.includes("localhost") ||
    hostname.includes("127.0.0.1") ||
    hostname.includes("nip.io") ||
    process.env.NODE_ENV === "development"
  );
};

export const isRoleAllowedOnSubdomain = (
  role: string,
  subdomain: SubdomainType
): boolean => {
  const config = SUBDOMAIN_CONFIG[subdomain];
  return config.allowedRoles.includes(role);
};

export const getCorrectSubdomainForRole = (role: string): string => {
  const subdomain = ROLE_TO_SUBDOMAIN[role] || "portal";
  const { getSubdomainUrl } = getDomainConfig();
  return getSubdomainUrl(subdomain);
};

export const getSubdomainConfig = (
  subdomain: SubdomainType
): SubdomainConfig => {
  return SUBDOMAIN_CONFIG[subdomain];
};
