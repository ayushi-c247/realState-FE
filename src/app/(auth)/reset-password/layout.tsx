import React, { ReactNode } from "react";
import { Box } from "@mantine/core";

function CommonLoginLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <Box style={{ width: "100%", height: "100%" }}>{children}</Box>;
}

export default CommonLoginLayout;
