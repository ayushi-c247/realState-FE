"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useBlockBrowserNavigation } from "@/components/Common/BlockBrowserNavigation";
import { useAuth } from "@/lib/Contexts/AuthProvider";
import { Box } from "@mantine/core";

function DashboardComponent() {
  useBlockBrowserNavigation(true);
  const router = useRouter();
  const { userData, role } = useAuth();

  return <Box>Hi Dashboard</Box>;
}

export default DashboardComponent;
