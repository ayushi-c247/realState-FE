"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import { useTranslations } from "next-intl";
import IconMail from "@/components/Common/Icons/IconMail";
import { useGetUserDetailsByIdQuery } from "@/hooks/user/Details";
import { USER_ROLE } from "@/constants";
import { IconArrowLeft, IconUser } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import SectionHeader from "@/components/Common/SectionHeader";

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
  const displayStatus = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "-";
  const role = String(userData?.role || "").toUpperCase();

  const handleBackToList = () => {
    router.back();
  };

  const investorProfile = userData?.investor_profile;
  const agentProfile = userData?.agent_profile;

  return (
    <Container size="xxl" className="max-container">
      <SectionHeader title={t("details.title")} />
      {/* Back Button */}
      <Box mb="md">
        <Button
          variant="subtle"
          onClick={handleBackToList}
          leftSection={<IconArrowLeft size={20} />}
          fz={14}
          fw={500}
          c="var(--amethyst-glow)"
        >
          {t("details.back")}
        </Button>
      </Box>

      <Grid gutter={24}>
        {/* Personal Details Section */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card radius={24} p={32} className="user-details-section">
            <Text fz={16} fw={600} mb={20}>
              {t("details.personalDetails")}
            </Text>

            <Stack>
              {/* Name */}
              <Flex gap={12} align="center">
                <Text fz={14} fw={500}>
                  Name:
                </Text>
                <Text fz={14} fw={400} tt="capitalize">
                  {[userData?.first_name, userData?.last_name]
                    .filter(Boolean)
                    .join(" ") || "-"}
                </Text>
              </Flex>

              {/* Email */}
              <Flex gap={12} align="center">
                <Text fz={14} fw={500}>
                  Email:
                </Text>
                <Flex gap={10} align="center">
                  <Box w={32} h={32} bg="#EFEBF1" className="icon-group">
                    {role !== USER_ROLE.INVESTOR ? (
                      <IconMail size={18} />
                    ) : (
                      <IconUser size={18} />
                    )}
                  </Box>
                  <Text fz={14} fw={400}>
                    {userData?.email || "-"}
                  </Text>
                </Flex>
              </Flex>

              {/* Status */}
              <Flex gap={12} align="center">
                <Text fz={14} fw={500}>
                  Status:
                </Text>
                <Text fz={14} fw={400} className={`user-status ${status}`}>
                  {displayStatus}
                </Text>
              </Flex>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Profile Information Section */}
        {(investorProfile || agentProfile) && (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card radius={24} p={32} className="user-details-section">
              <Text fz={16} fw={600} mb={20}>
                {t("details.profileInformation")}
              </Text>

              <Stack>
                {/* Investor Profile */}
                {investorProfile && (
                  <>
                    <Flex gap={12}>
                      <Text fz={14} fw={500}>
                        Budget:
                      </Text>
                      <Text fz={14} fw={400}>
                        {investorProfile.budget_min || "-"}
                      </Text>
                    </Flex>
                    <Flex gap={12}>
                      <Text fz={14} fw={500}>
                        Investment Horizon:
                      </Text>
                      <Text fz={14} fw={400}>
                        {investorProfile.investment_horizon || "-"}
                      </Text>
                    </Flex>
                    <Flex gap={12}>
                      <Text fz={14} fw={500}>
                        Ownership Structure:
                      </Text>
                      <Text fz={14} fw={400}>
                        {investorProfile.ownership_structure || "-"}
                      </Text>
                    </Flex>
                    <Flex gap={12}>
                      <Text fz={14} fw={500}>
                        Primary Objective:
                      </Text>
                      <Text fz={14} fw={400}>
                        {investorProfile.primary_objective || "-"}
                      </Text>
                    </Flex>
                    <Flex gap={12}>
                      <Text fz={14} fw={500}>
                        Country:
                      </Text>
                      <Text fz={14} fw={400}>
                        {investorProfile.country || "-"}
                      </Text>
                    </Flex>
                    <Flex gap={12}>
                      <Text fz={14} fw={500}>
                        State:
                      </Text>
                      <Text fz={14} fw={400}>
                        {investorProfile.state || "-"}
                      </Text>
                    </Flex>
                    <Flex gap={12}>
                      <Text fz={14} fw={500}>
                        Preferred Property Types:
                      </Text>
                      <Text fz={14} fw={400}>
                        {investorProfile.preferred_property_types || "-"}
                      </Text>
                    </Flex>
                    <Flex gap={12}>
                      <Text fz={14} fw={500}>
                        Tourism Preferences:
                      </Text>
                      <Text fz={14} fw={400}>
                        {investorProfile.tourism_preferences || "-"}
                      </Text>
                    </Flex>
                  </>
                )}

                {/* Agent Profile */}
                {agentProfile && (
                  <>
                    <Flex gap={12}>
                      <Text fz={14} fw={500}>
                        License Number:
                      </Text>
                      <Text fz={14} fw={400}>
                        {agentProfile.license_number || "-"}
                      </Text>
                    </Flex>
                    <Flex gap={12}>
                      <Text fz={14} fw={500}>
                        Agency Name:
                      </Text>
                      <Text fz={14} fw={400}>
                        {agentProfile.agency_name || "-"}
                      </Text>
                    </Flex>
                  </>
                )}
              </Stack>
            </Card>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}
