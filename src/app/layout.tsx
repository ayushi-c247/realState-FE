import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "mantine-datatable/styles.layer.css";
// ‼️ import carousel styles after core package styles
import '@mantine/carousel/styles.css';
// Import global SCSS (where your _variables.scss is included)
import "@/styles/globals.scss";

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import React, { ReactNode } from "react";

import RouteTransition from "@/components/RouterTransition/RouterTransition";
import { metadata, poppins } from "@/constants/common";
import { AuthProvider } from "@/lib/Contexts/AuthProvider";
import ReactQueryProvider from "@/lib/react-query-provider";
import { theme } from "@/theme/mantine-theme";
export { metadata };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/skillsome-favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/skillsome-favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <ColorSchemeScript />
      </head>
      <body className={`${poppins.variable}`}>
        <MantineProvider theme={theme}>
          <RouteTransition />
          <ReactQueryProvider>
            <Notifications position="top-right" />
            <NextIntlClientProvider messages={messages} locale={locale}>
              <AuthProvider>
                {children}
              </AuthProvider>
            </NextIntlClientProvider>
          </ReactQueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
