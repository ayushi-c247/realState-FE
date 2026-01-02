"use client";

import { ActionIcon, Container, createTheme,Loader, rem } from "@mantine/core";

const CONTAINER_SIZES: Record<string, number> = {
  // sm: 500,
  // md: 100%,
  lg: 1200,
  xl: 1400,
  xxl: 1570,
};

export const theme = createTheme({
  primaryColor: "blue",
  defaultRadius: "md",
  focusRing: "auto",
  fontFamily: "Poppins, sans-serif",
  fontFamilyMonospace: "Poppins, sans-serif",
  headings: {
    fontFamily: "Poppins, sans-serif",
  },
  colors: {
    customBlue: [
      'rgb(62, 100, 148)', // ✅ fixed here: removed the stray quote
      '#c3d1e2',
      '#a5bbd4',
      '#88a5c6',
      '#6a8fb8',
      '#3e6494',
      '#2e4c72',
      '#1e344f',
      '#0e1c2d',
      '#00040a',
    ],
  },
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "subtle",
      },
    }),
    Loader: Loader.extend({
      defaultProps: {
        type: "bars",
      },
    }),
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? rem(CONTAINER_SIZES[size])
              : rem(size),
        },
      }),
    }),
  },
});
