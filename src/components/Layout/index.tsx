"use client";
import { AppShell } from "@mantine/core";
import React, { useState } from "react";

import AuthGate from "@/components/Auth/AuthGate";
import Sidebar from "@/components/Common/SideBar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <AuthGate>
      <AppShell
        layout="alt"
        navbar={{
          width: sidebarOpen
            ? "var(--sidebar-width-open)"
            : "var(--sidebar-width-collapsed)",
          breakpoint: "sm",
          collapsed: { mobile: true },
        }}
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Navbar p="md">
          <Sidebar
            sidebarOpen={sidebarOpen}
            onToggleSidebar={handleToggleSidebar}
          />
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </AuthGate>
  );
}
