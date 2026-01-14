"use client";
import { useMediaQuery } from "@mantine/hooks";
import {
  ActionIcon,
  Box,
  Menu,
  NavLink,
  ScrollArea,
  Stack,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSettings,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useMemo, useState, useEffect, useRef } from "react";

import { USER_ROLE } from "@/constants";
import { useLogoutMutation } from "@/hooks/auth";
import { useAuth } from "@/lib/Contexts/AuthProvider";
import { paths } from "@/routes";
import { SidebarProps } from "@/types";

import DashboardIcon from "../DashboardIcon/dashboardIcon";
import UserManageIcon from "../UserManagement/management";

export default function Sidebar({
  sidebarOpen: _sidebarOpen,
  mobileSidebarOpen,
  onToggleSidebar,
}: SidebarProps) {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userData, role } = useAuth();
  const { mutateAsync: logout } = useLogoutMutation();
  const isBelow992 = useMediaQuery("(max-width: 992px)");

  const manuallyOpenedOnStep2 = useRef(false);
  const isStep2Route = pathname.includes("/my-content/add-lesson/step2");

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const [openDropdowns, setOpenDropdowns] = useState({
    userManagement: false,
  });

  const roleFromQuery = useMemo<"agent" | "investor" | null>(() => {
    const role = searchParams.get("role");
    if (role === "agent" || role === "investor") return role;
    return null;
  }, [searchParams]);

  const roleFromPath = useMemo<"agent" | "investor" | null>(() => {
    if (pathname.includes("/investor")) return "agent";
    if (pathname.includes("/agent")) return "investor";
    return null;
  }, [pathname]);

  // This drives which tab is currently active
  const activeUMRole = roleFromQuery ?? roleFromPath;

  // Update openDropdowns after page load / children data ready
  useEffect(() => {
    setOpenDropdowns({
      userManagement:
        isActive(paths.ROOT_USER_MANAGEMENT) ||
        isActive(paths.ROOT_INVESTOR_MANAGEMENT) ||
        isActive(paths.ROOT_AGENT_MANAGEMENT),
    });
  }, [pathname]);

  const handleLogout = async () => {
    await logout();

    router.push(paths.ROOT_LOGIN);
  };
  const handleToggleSidebar = () => {
    if (isStep2Route) {
      manuallyOpenedOnStep2.current = !_sidebarOpen;
    }
    onToggleSidebar();

    if (_sidebarOpen) {
      setOpenDropdowns({
        userManagement: false,
      });
    }
  };

  useEffect(() => {
    if (isStep2Route && _sidebarOpen && !manuallyOpenedOnStep2.current) {
      onToggleSidebar();
    }
    if (!isStep2Route) {
      manuallyOpenedOnStep2.current = false;
    }
  }, [pathname, _sidebarOpen, onToggleSidebar, isStep2Route]);

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredNavLink, setHoveredNavLink] = useState<string | null>(null);
  const [hoverMenuPosition, setHoverMenuPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  // Track close timeout
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (
    menuKey: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!_sidebarOpen) {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);

      const rect = e.currentTarget.getBoundingClientRect();
      const sidebarRect = e.currentTarget
        .closest(".sidebar")
        ?.getBoundingClientRect();

      if (sidebarRect) {
        setHoverMenuPosition({
          top: rect.top - sidebarRect.top,
          left: rect.right - sidebarRect.left + 30,
        });
      } else {
        setHoverMenuPosition({ top: rect.top, left: rect.right });
      }

      setHoveredMenu(menuKey);
      setHoveredNavLink(menuKey); //  highlight the navlink
    }
  };

  const handleHoverMenuEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  };

  const handleHoverMenuLeave = () => {
    if (!_sidebarOpen) {
      closeTimeout.current = setTimeout(() => {
        setHoveredMenu(null);
        setHoveredNavLink(null); // remove highlight when leaving
      }, 1000);
    }
  };

  const handleNavClick = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setHoveredMenu(null);
    setHoveredNavLink(null); // remove highlight when clicked
  };

  // Updated renderHoverMenu
  const renderHoverMenu = (items: { href: string; label: string }[]) => (
    <Box
      onMouseEnter={handleHoverMenuEnter}
      onMouseLeave={handleHoverMenuLeave}
      style={{
        position: "fixed",
        left: hoverMenuPosition.left,
        top: hoverMenuPosition.top,
        background: "var(--toggle-icon)",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        padding: "12px 16px",
        zIndex: 99999999,
        minWidth: 200,
        color: "var(--white-color)",
        transform: "translateX(-10px)",
        opacity: 0,
        animation: "slideIn 0.25s ease forwards",
      }}
    >
      <Box
        style={{
          position: "absolute",
          left: "-10px",
          top: "20px",
          width: 0,
          height: 0,
          borderTop: "10px solid transparent",
          borderBottom: "10px solid transparent",
          borderRight: "10px solid var(--toggle-icon)",
        }}
      />
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          style={{
            display: "block",
            padding: "8px 12px",
            borderRadius: "8px",
            whiteSpace: "nowrap",
            color:
              pathname === item.href
                ? "var(--toggle-icon)"
                : "var(--white-color)",
            backgroundColor:
              pathname === item.href ? "var(--white-color)" : "transparent",
            textDecoration: "none",
            fontSize: "var(--mantine-font-size-sm)",
            transition: "background-color 0.2s ease, color 0.2s ease",
            marginBottom: 6,
            textAlign: "left",
          }}
          onClick={handleNavClick}
        >
          {item.label}
        </Link>
      ))}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </Box>
  );

  return (
    <Stack
      className={`sidebar ${mobileSidebarOpen ? "mobileSidebar" : ""} ${!_sidebarOpen ? "notactive" : ""}`}
      style={{
        height: "100%",
        width: _sidebarOpen ? 250 : 60,
        transition: "width 0.2s",
        justifyContent: "space-between",
      }}
    >
      <Box
        className={`humberger-button ${
          role === USER_ROLE.AGENT ||
          role === USER_ROLE.INVESTOR ||
          (role === USER_ROLE.ADMIN && isBelow992)
            ? "parent-humberger-button"
            : ""
        }`}
      >
        <ActionIcon
          variant="outline"
          size="md"
          onClick={handleToggleSidebar}
          className="toggle-button"
        >
          {_sidebarOpen ? (
            <IconChevronLeft size={24} color="var(--toggle-icon)" />
          ) : (
            <IconChevronRight size={16} color="var(--toggle-icon)" />
          )}
        </ActionIcon>
      </Box>
      <ScrollArea type="never" style={{ flex: 1 }}>
        <Stack
          gap={10}
          className={`${role === USER_ROLE.ADMIN && isBelow992 ? "admin-sidebar" : "menu-list"}`}
        >
          <Box
            pos={"sticky"}
            top={0}
            bg={"var(--sidebar-bg)"}
            w={"100%"}
            style={{ zIndex: 1, cursor: "pointer" }}
            onClick={() => {
              if (role === USER_ROLE.ADMIN) {
                router.push("/dashboard");
              }
            }}
          >
            <Image
              src={_sidebarOpen ? "/real-state-logo.png" : "/BrandLogo.svg"}
              alt="RealState Logo"
              width={_sidebarOpen ? 200 : 50}
              height={_sidebarOpen ? 100 : 50}
              className={`sidebar-logo ${
                role === USER_ROLE.AGENT ||
                role === USER_ROLE.INVESTOR ||
                (role === USER_ROLE.ADMIN && isBelow992)
                  ? "hidden"
                  : ""
              }`}
            />
          </Box>
          <Stack gap={4} className="nav-links">
            {/* Parent Links */}
            {(role === USER_ROLE.INVESTOR || role === USER_ROLE.AGENT) && (
              <Stack gap={10} className="parent-links">
                <NavLink
                  component={Link}
                  href={paths.ROOT_DASHBOARD}
                  label={_sidebarOpen ? t("navLink.labels.dashboard") : ""}
                  leftSection={<DashboardIcon />}
                  className={`nav-item parent ${isActive(paths.ROOT_DASHBOARD) ? "active" : ""}`}
                />
              </Stack>
            )}

            {/* Admin Links */}
            {role === USER_ROLE.ADMIN && (
              <>
                <NavLink
                  component={Link}
                  href={paths.ROOT_DASHBOARD}
                  label={_sidebarOpen ? t("navLink.labels.dashboard") : ""}
                  leftSection={<DashboardIcon />}
                  className={`nav-item ${isActive(paths.ROOT_DASHBOARD) ? "active" : ""}`}
                />
                {/* User Management */}

                <Box
                  style={{ position: "relative" }}
                  onMouseEnter={(e) =>
                    !_sidebarOpen && handleMouseEnter("userManagement", e)
                  }
                  onMouseLeave={() => !_sidebarOpen && handleHoverMenuLeave()}
                  className={
                    hoveredNavLink === "userManagement" ? "hovered-parent" : ""
                  }
                >
                  <NavLink
                    component={Link}
                    href="#"
                    label={
                      _sidebarOpen ? t("navLink.labels.userManagement") : ""
                    }
                    leftSection={<UserManageIcon />}
                    rightSection={
                      _sidebarOpen ? <IconChevronDown size={16} /> : null
                    }
                    className={`nav-item dropdown ${
                      hoveredNavLink === "userManagement" ? "hovered" : ""
                    } ${
                      isActive(paths.ROOT_USER_MANAGEMENT) ||
                      isActive(paths.ROOT_INVESTOR_MANAGEMENT) ||
                      isActive(paths.ROOT_AGENT_MANAGEMENT)
                        ? "active"
                        : ""
                    }`}
                    opened={openDropdowns.userManagement}
                    onClick={() =>
                      setOpenDropdowns((prev) => ({
                        ...prev,
                        userManagement: !prev.userManagement,
                      }))
                    }
                  >
                    <NavLink
                      component={Link}
                      href={paths.ROOT_INVESTOR_MANAGEMENT}
                      label={
                        _sidebarOpen ? t("navLink.subLabels.investor") : ""
                      }
                      className={`nav-sub-item ${activeUMRole === "investor" ? "active" : ""}`}
                    />

                    <NavLink
                      component={Link}
                      href={paths.ROOT_AGENT_MANAGEMENT}
                      label={_sidebarOpen ? t("navLink.subLabels.agent") : ""}
                      className={`nav-sub-item ${activeUMRole === "agent" ? "active" : ""}`}
                    />
                  </NavLink>

                  {!_sidebarOpen &&
                    hoveredMenu === "userManagement" &&
                    renderHoverMenu([
                      {
                        href: paths.ROOT_INVESTOR_MANAGEMENT,
                        label: t("navLink.subLabels.investor"),
                      },
                      {
                        href: paths.ROOT_AGENT_MANAGEMENT,
                        label: t("navLink.subLabels.agent"),
                      },
                    ])}
                </Box>
                {/* Property Management */}
                <NavLink
                  component={Link}
                  href={paths.ROOT_PROPERTY_MANAGEMENT}
                  label={
                    _sidebarOpen ? t("navLink.labels.propertyManagement") : ""
                  }
                  leftSection={<IconSettings />}
                  className={`nav-item ${isActive(paths.ROOT_PROPERTY_MANAGEMENT) ? "active" : ""}`}
                />
              </>
            )}
          </Stack>
        </Stack>
      </ScrollArea>

      <Stack align="center" gap={15} className="nav-links sidebar-footer">
        {role === USER_ROLE.ADMIN && (
          <>
            <NavLink
              component={Link}
              href={paths.ROOT_ACCOUNT_SETTINGS}
              label={_sidebarOpen ? t("navLink.labels.setting") : ""}
              leftSection={<IconSettings size={24} />}
              className={`nav-item ${isActive(paths.ROOT_ACCOUNT_SETTINGS) ? "active" : ""}`}
            />
          </>
        )}

        {role === USER_ROLE.ADMIN && (
          <Menu shadow="md" width={200} position="top-start">
            <Menu.Target>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  transition: "background 0.2s",
                  width: "100%",
                }}
              >
                {_sidebarOpen && (
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span
                      style={{ fontWeight: 500, color: "var(--black-color)" }}
                    >
                      {userData?.full_name ?? ""}
                    </span>
                    <IconChevronUp size={18} color="var(--toggle-icon)" />
                  </Box>
                )}
              </Box>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item color="red" onClick={handleLogout}>
                {t("navLink.labels.logout")}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Stack>
    </Stack>
  );
}
