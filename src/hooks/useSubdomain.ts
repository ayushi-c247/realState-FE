/**
 * Client-side subdomain utilities
 *
 * These hooks help with subdomain-aware navigation and URL generation
 * on the client side.
 */

import { useEffect, useState } from 'react';

import {
  getCorrectSubdomainForRole,
  getSubdomainFromHostname,
  type SubdomainType,
} from '@/config/subdomains';

/**
 * Hook to get the current subdomain
 */
export const useSubdomain = (): SubdomainType => {
  const [subdomain, setSubdomain] = useState<SubdomainType>('portal');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentSubdomain = getSubdomainFromHostname(window.location.hostname);
      setSubdomain(currentSubdomain);
    }
  }, []);

  return subdomain;
};

/**
 * Hook to generate subdomain-aware URLs
 */
export const useSubdomainUrl = () => {
  /**
   * Generate a URL for a specific role's subdomain
   */
  const getUrlForRole = (role: string, path: string = '/'): string => {
    const baseUrl = getCorrectSubdomainForRole(role);
    return `${baseUrl}${path}`;
  };

  /**
   * Navigate to a different subdomain
   */
  const navigateToSubdomain = (role: string, path: string = '/'): void => {
    const url = getUrlForRole(role, path);
    window.location.href = url;
  };

  return {
    getUrlForRole,
    navigateToSubdomain,
  };
};

/**
 * Hook to check if user should be redirected to a different subdomain
 * Useful for login pages and authentication flows
 */
export const useSubdomainRedirect = (userRole: string | null | undefined) => {
  const subdomain = useSubdomain();

  useEffect(() => {
    if (userRole && typeof window !== 'undefined') {
      const correctUrl = getCorrectSubdomainForRole(userRole);
      const currentUrl = window.location.origin;

      // If user is on wrong subdomain, redirect them
      if (correctUrl !== currentUrl) {
        window.location.href = `${correctUrl}${window.location.pathname}${window.location.search}`;
      }
    }
  }, [userRole, subdomain]);
};
