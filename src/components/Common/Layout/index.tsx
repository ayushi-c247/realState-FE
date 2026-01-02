"use client";
import { AppShell, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";

import AuthGate from "@/components/Auth/AuthGate";
import Header from "@/components/Common/Header";
import Sidebar from "@/components/Common/SideBar";

import { useAuth } from "@/lib/Contexts/AuthProvider";

import { USER_ROLE } from "@/constants";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { role } = useAuth();

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  // mobile sidebar toggle
  const handleToggleMobileSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const isBelow992 = useMediaQuery("(max-width: 992px)");

  return (
    <AuthGate>
      <AppShell
        layout="alt"
        navbar={{
          width: sidebarOpen
            ? "var(--sidebar-width-open)"
            : "var(--sidebar-width-collapsed)",
          breakpoint: "base",
          collapsed: { mobile: true },
        }}
        header={{ height: "var(--app-shell-header)" }}
        padding="md"
      >
        {typeof role === "string" &&
          (role === USER_ROLE.AGENT ||
            role === USER_ROLE.INVESTOR ||
            (role === USER_ROLE.ADMIN && isBelow992)) && (
            <AppShell.Header p={0}>
              <Header
                mobileSidebarOpen={mobileSidebarOpen}
                onToggleSidebar={handleToggleMobileSidebar}
              />
            </AppShell.Header>
          )}
        {((!mobileSidebarOpen && role === USER_ROLE.INVESTOR) ||
          (!mobileSidebarOpen && role === USER_ROLE.AGENT) ||
          (!mobileSidebarOpen && role === USER_ROLE.ADMIN && isBelow992)) && (
          <Box
            className="overlay"
            onClick={() => setMobileSidebarOpen((prev) => !prev)}
          ></Box>
        )}
        <AppShell.Navbar p="md">
          <Sidebar
            sidebarOpen={sidebarOpen}
            mobileSidebarOpen={mobileSidebarOpen}
            onToggleSidebar={handleToggleSidebar}
          />
        </AppShell.Navbar>

        <AppShell.Main
          className={
            typeof role === "string" &&
            (role === USER_ROLE.INVESTOR ||
              role === USER_ROLE.AGENT ||
              (role === USER_ROLE.ADMIN && isBelow992))
              ? "program-main-page"
              : ""
          }
        >
          {children}
        </AppShell.Main>
      </AppShell>
    </AuthGate>
  );
}
