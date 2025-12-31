import { NextRequest, NextResponse } from "next/server";

import {
  getCorrectSubdomainForRole,
  getSubdomainConfig,
  getSubdomainFromHostname,
  isDevelopmentEnvironment,
  isRoleAllowedOnSubdomain,
} from "@/config/subdomains";

import { PATH_AUTH, paths } from "@/routes";

export const PUBLIC_ROUTES = [
  paths.ROOT_LOGIN,
  paths.ROOT_SIGNUP,
  PATH_AUTH.forgotPassword,
  PATH_AUTH.resetPassword,
  paths.ROOT_CREATE_PASSWORD,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hostname =
    request.headers.get("host") ||
    request.headers.get("x-forwarded-host") ||
    request.nextUrl.hostname;

  const currentSubdomain = getSubdomainFromHostname(hostname);
  const subdomainConfig = getSubdomainConfig(currentSubdomain);

  const token = request.cookies.get("token")?.value;
  let payload = null;

  if (token) {
    try {
      payload = JSON.parse(atob(token.split(".")[1] || "{}"));
    } catch (error) {
      console.warn("Invalid token in middleware:", error);
    }
  }

  if (pathname === "/") {
    if (payload?.role) {
      // Skip subdomain redirects in development
      if (
        !isDevelopmentEnvironment(hostname) &&
        !isRoleAllowedOnSubdomain(payload.role, currentSubdomain)
      ) {
        const correctSubdomainUrl = getCorrectSubdomainForRole(payload.role);
        const homePath = paths.ROOT_DASHBOARD;
        return NextResponse.redirect(new URL(homePath, correctSubdomainUrl));
      }
      const homePath = paths.ROOT_DASHBOARD;
      return NextResponse.redirect(new URL(homePath, request.url));
    } else {
      // In development, always use default /login, not subdomain-specific login
      const loginPath = isDevelopmentEnvironment(hostname)
        ? paths.ROOT_LOGIN
        : subdomainConfig.defaultLoginPath;
      return NextResponse.redirect(new URL(loginPath, request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isPublicRoute) {
    if (payload?.role) {
      // Skip subdomain redirects in development
      if (
        !isDevelopmentEnvironment(hostname) &&
        !isRoleAllowedOnSubdomain(payload.role, currentSubdomain)
      ) {
        const correctSubdomainUrl = getCorrectSubdomainForRole(payload.role);
        const homePath = paths.ROOT_DASHBOARD;
        return NextResponse.redirect(new URL(homePath, correctSubdomainUrl));
      }
      const homePath = paths.ROOT_DASHBOARD;
      return NextResponse.redirect(new URL(homePath, request.url));
    }
    return NextResponse.next();
  }

  if (payload?.role) {
    // Skip subdomain redirects in development (only enforce route restrictions)
    if (
      !isDevelopmentEnvironment(hostname) &&
      !isRoleAllowedOnSubdomain(payload.role, currentSubdomain)
    ) {
      const correctSubdomainUrl = getCorrectSubdomainForRole(payload.role);
      const redirectUrl = new URL(pathname, correctSubdomainUrl);
      request.nextUrl.searchParams.forEach((value, key) => {
        redirectUrl.searchParams.set(key, value);
      });

      return NextResponse.redirect(redirectUrl);
    }
  } else {
    // In development, always use default /login, not subdomain-specific login
    const loginPath = isDevelopmentEnvironment(hostname)
      ? paths.ROOT_LOGIN
      : subdomainConfig.defaultLoginPath;
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
