import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * Multi-Subdomain Configuration for Next.js
 *
 * This configuration enables the app to work across multiple subdomains:
 * - portal.skillsome.com (for Admin, Parent, Co-Parent, Child)
 * - content.skillsome.com (for Expert)
 * - admin.skillsome.com (future-ready for Admin-only subdomain)
 */
const nextConfig: NextConfig & {
  eslint?: {
    ignoreDuringBuilds: boolean;
  };
} = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = {
        type: "memory",
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/tinymce/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  /**
   * Rewrites configuration for subdomain routing
   *
   * This allows Next.js to handle requests from different subdomains
   * while serving the same application with different access controls.
   *
   * The middleware handles the actual subdomain-based routing logic.
   */
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
  serverExternalPackages: ["require-in-the-middle"],
};
const configWithIntl = withNextIntl(nextConfig);
export default withSentryConfig(configWithIntl, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "chapter247-infotech",

  project: "skillsome",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
