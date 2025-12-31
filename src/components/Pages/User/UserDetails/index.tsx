"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Loader,
  Text,
} from "@mantine/core";
import React from "react";
import { useTranslations } from "next-intl";
import IconMail from "@/components/Common/Icons/IconMail";

import { useGetUserDetailsByIdQuery } from "@/hooks/user/Details";
import { USER_ROLE } from "@/constants";
import { IconArrowLeft, IconUser } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const t = useTranslations("userManagement");
  const { data: userDetails, isLoading } = useGetUserDetailsByIdQuery({
    id: Number(id),
    role: USER_ROLE.ADMIN,
  });

  if (isLoading) {
    return (
      <Container size="xxl" className="max-container" mih="100vh">
        <Flex w="100%" h="100vh" justify="center" align="center">
          <Loader size="xl" variant="dots" />
        </Flex>
      </Container>
    );
  }
  const userData = userDetails?.data;
  const status = userData?.status?.toLowerCase();
  const result = status
    ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
    : "-";
  0;
  const role = String(userData?.role || "").toUpperCase();
  const handleBackToList = () => {
    router.back();
  };
  return (
    <>
      <Container size="xxl" className="max-container">
        <Box mb="md">
          <Button
            variant="subtle"
            onClick={handleBackToList}
            leftSection={<IconArrowLeft size={20} />}
            fz={14}
            fw={500}
            c="var(--amethyst-glow)"
            className="arrow-back"
          >
            {t("details.back")}
          </Button>
        </Box>
        <Grid gutter={24}>
          <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
            <Card radius={24} className="user-details-card" p={0}>
              <Box className="card-header" w="100%" display="flex" p={24}>
                <Text
                  fz={14}
                  tt="capitalize"
                  fw={500}
                  mb={8}
                  py={4}
                  px={26}
                  className={`user-status ${userData?.status.toLowerCase()}`}
                >
                  {result ||
                    (userData?.status === "ACTIVE" ? "ACTIVE" : "INACTIVE")}
                </Text>

                <Text
                  fz={16}
                  fw={500}
                  mt={16}
                  c="var(--body-color)"
                  tt="capitalize"
                >
                  {[userData?.first_name, userData?.last_name]
                    .filter(Boolean)
                    .join(" ") || "-"}
                </Text>
              </Box>
              <Box className="card-body" p={24}>
                <Group className="group" gap={6} mb={16}>
                  <Flex gap={10} align={"center"}>
                    <Box w={32} h={32} bg="#EFEBF1" className="icon-group">
                      {role !== USER_ROLE.INVESTOR ? (
                        <IconMail size={18} />
                      ) : (
                        <IconUser size={18} />
                      )}
                    </Box>
                    <Text
                      component="strong"
                      tt={"capitalize"}
                      fz={14}
                      fw={400}
                      className="text-break"
                    >
                      {userData?.email || "-"}
                    </Text>
                  </Flex>
                </Group>
              </Box>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
