import React, { memo, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ActionIcon, Box, Flex, Group, Image, List, Text } from "@mantine/core";
import { useClickOutside, useMediaQuery } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconMenu2 } from "@tabler/icons-react";
import { USER_ROLE } from "@/constants";
import { useLogoutMutation } from "@/hooks/auth";
import { useAuth } from "@/lib/Contexts/AuthProvider";
import { paths } from "@/routes";
import IconLogout from "../Icons/IconLogout";
import IconSetting from "../Icons/IconSetting";
import { HeaderProps } from "@/types";

function Header({ onToggleSidebar }: HeaderProps) {
  const t = useTranslations("header");
  const isBelow992 = useMediaQuery("(max-width: 992px)");

  const [open, setOpen] = useState(false);
  const { userData, role } = useAuth();
  const { mutateAsync: logout } = useLogoutMutation();
  const router = useRouter();

  const ref = useClickOutside(() => {
    setOpen(false);

    const profile = document.querySelector(".header-profile");
    if (profile) {
      profile.classList.add("hide-profile-layer");
    }
  });

  useEffect(() => {
    const profile = document.querySelector(".header-profile");
    if (!profile) return;

    if (open) {
      profile.classList.remove("hide-profile-layer");
    }
  }, [open]);

  const handleLogout = async () => {
    // Proceed with logout
    await logout();

    router.push(paths.ROOT_LOGIN);
  };

  return (
    <>
      <Flex
        className="header"
        px="md"
        py="md"
        align="center"
        justify="space-between"
        bg="var(--white-color)"
      >
        <Flex
          align="center"
          justify="space-between"
          gap={10}
          style={{
            flex: role === USER_ROLE.ADMIN ? "100%" : "initial",
          }}
        >
          <Box
            w={127}
            h={38}
            className="logo-box"
            onClick={() => router.push("/dashboard")}
          >
            <Image
              src="/skillsome-logo.svg"
              alt="Skillsome Logo"
              h={"100%"}
              w={"100%"}
              fit="contain"
              mr="auto"
              ml="0"
            />
          </Box>
          {(role === USER_ROLE.INVESTOR ||
            role === USER_ROLE.AGENT ||
            (role === USER_ROLE.ADMIN && isBelow992)) && (
            <ActionIcon
              variant="outline"
              c={"var(--amethyst-glow)"}
              display={{ base: "block", md: "none" }}
              onClick={onToggleSidebar}
              bd={0}
            >
              <IconMenu2 />
            </ActionIcon>
          )}
        </Flex>

        {role !== USER_ROLE.ADMIN && (
          <Flex
            ref={ref}
            gap={16}
            align="center"
            w={222}
            pos="relative"
            justify="flex-end"
            onClick={() => setOpen((prev) => !prev)}
            className="header-profile"
          >
            <Text fz={14} lh="20px" fw={500} c="var(--toggle-icon)">
              {userData?.full_name?.split(" ")[0]}
            </Text>
            {open ? (
              <IconChevronUp
                size={18}
                color="var(--toggle-icon)"
                style={{ flexShrink: 0 }}
              />
            ) : (
              <IconChevronDown
                size={18}
                color="var(--toggle-icon)"
                style={{ flexShrink: 0 }}
              />
            )}
            {open && (
              <List
                spacing="xs"
                size="sm"
                center
                withPadding
                pos="absolute"
                top="100%"
                right={0}
                bg="var(--white-color)"
                className="header-dropdown"
                listStyleType="none"
                pl={0}
                w="100%"
                mt="lg"
                miw={210}
                maw={320}
                ref={ref}
              >
                {(role === USER_ROLE.INVESTOR || role === USER_ROLE.AGENT) && (
                  <>
                    <List.Item
                      px={20}
                      py={12}
                      className="header-navigation"
                      onClick={() => {
                        router.push(paths.ROOT_ACCOUNT_SETTINGS);
                      }}
                    >
                      <IconSetting size={20} color="var(--text-color)" />
                      <Text
                        component="span"
                        fz={14}
                        lh="20px"
                        fw={500}
                        c="var(--text-color)"
                      >
                        {t("menu.link.accountSetting")}
                      </Text>
                    </List.Item>
                  </>
                )}
                {role === USER_ROLE.INVESTOR && (
                  <List.Item
                    px={20}
                    py={12}
                    className="header-navigation"
                    onClick={() => {
                      router.push(paths.ROOT_ACCOUNT_SETTINGS);
                    }}
                  >
                    <IconSetting size={20} color="var(--text-color)" />
                    <Text
                      component="span"
                      fz={14}
                      lh="20px"
                      fw={500}
                      c="var(--text-color)"
                    >
                      {t("menu.link.accountSetting")}
                    </Text>
                  </List.Item>
                )}
                <List.Item
                  px={20}
                  py={12}
                  bg="var(--error-outline-color)"
                  onClick={handleLogout}
                  className="header-navigation"
                >
                  <Text
                    component="span"
                    fz={14}
                    lh="20px"
                    fw={500}
                    c="var(--error-color)"
                  >
                    {t("menu.button.Logout")}
                  </Text>
                  <IconLogout size={20} color="var(--error-color)" />
                </List.Item>
              </List>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
}

export default memo(Header);
