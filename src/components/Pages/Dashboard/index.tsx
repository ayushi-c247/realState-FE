"use client";

import React from "react";
import { useBlockBrowserNavigation } from "@/components/Common/BlockBrowserNavigation";
import { Box } from "@mantine/core";

function DashboardComponent() {
  useBlockBrowserNavigation(true);

  return <Box>Hi Dashboard</Box>;
}

export default DashboardComponent;
