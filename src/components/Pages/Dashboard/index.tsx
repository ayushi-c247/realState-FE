"use client";

import React from "react";
import Image from "next/image";
import { Box, Container, Grid, Paper, Text, Flex, Card } from "@mantine/core";
import {
  IconHome,
  IconUsers,
  IconUser,
  IconUserShield,
  IconHeart,
  IconListDetails,
  IconFriends,
  IconMapPin,
} from "@tabler/icons-react";
import SectionHeader from "@/components/Common/SectionHeader";
import { useAuth } from "@/lib/Contexts/AuthProvider";
import { USER_ROLE } from "@/constants";
import { Carousel } from "@mantine/carousel";

function StatCard({ icon, label, value }: any) {
  return (
    <Paper shadow="sm" radius="lg" p="lg" withBorder>
      <Flex align="center" gap="md">
        {icon}
        <Box>
          <Text size="sm" c="dimmed">
            {label}
          </Text>
          <Text size="xl" fw={700}>
            {value}
          </Text>
        </Box>
      </Flex>
    </Paper>
  );
}

function DashboardComponent() {
  // 👉 Later replace these with API data
  const counts = {
    totalProperties: 120,
    totalUsers: 450,
    totalInvestors: 180,
    totalAgents: 80,
    totalClients: 65,
    totalFavouriteProperties: 40,
    totalPropertyList: 95,
  };
  const suggestedProperties = [
    {
      title: "Luxury Villa",
      location: "Mumbai, Maharashtra",
      images: [
        "/real-state-logo.png",
        "/real-state-logo.png",
        "/real-state-logo.png",
      ],
    },
    {
      title: "Premium Apartment",
      location: "Bangalore, Karnataka",
      images: ["/real-state-logo.png", "/real-state-logo.png"],
    },
  ];
  const { userData } = useAuth();
  function SuggestedPropertiesSection() {
    return (
      <>
        <SectionHeader title="Suggested Properties" />

        <Grid mt="md">
          {suggestedProperties.map((property, i) => (
            <Grid.Col span={{ base: 12, md: 6 }} key={i}>
              <Card radius="lg" shadow="sm" withBorder>
                <Carousel withIndicators>
                  {property.images.map((img, idx) => (
                    <Carousel.Slide key={idx}>
                      <Image
                        src={img}
                        alt={property.title}
                        height={220}
                        width={220}
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>

                <Box mt="sm">
                  <Text fw={700} size="lg">
                    {property.title}
                  </Text>

                  <Flex align="center" gap={6}>
                    <IconMapPin size={18} />
                    <Text c="dimmed">{property.location}</Text>
                  </Flex>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </>
    );
  }

  const renderCards = () => {
    if (userData?.role === USER_ROLE.ADMIN) {
      return (
        <>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<IconHome size={36} />}
              label="Total Properties"
              value={counts.totalProperties}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<IconUsers size={36} />}
              label="Total Users"
              value={counts.totalUsers}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<IconUser size={36} />}
              label="Total Investors"
              value={counts.totalInvestors}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<IconUserShield size={36} />}
              label="Total Agents"
              value={counts.totalAgents}
            />
          </Grid.Col>
        </>
      );
    }

    if (userData?.role === USER_ROLE.AGENT) {
      return (
        <>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <StatCard
              icon={<IconHome size={36} />}
              label="Total Properties"
              value={counts.totalProperties}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <StatCard
              icon={<IconFriends size={36} />}
              label="Total Clients"
              value={counts.totalClients}
            />
          </Grid.Col>
        </>
      );
    }

    if (userData?.role === USER_ROLE.INVESTOR) {
      return (
        <>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <StatCard
              icon={<IconUserShield size={36} />}
              label="Total Agents"
              value={counts.totalAgents}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <StatCard
              icon={<IconListDetails size={36} />}
              label="Total Properties"
              value={counts.totalPropertyList}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <StatCard
              icon={<IconHeart size={36} />}
              label="Total Favourite Properties"
              value={counts.totalFavouriteProperties}
            />
          </Grid.Col>
          <Box mt={30}>
            <SuggestedPropertiesSection />
          </Box>
        </>
      );
    }
  };

  return (
    <Container size="xxl" className="max-container">
      <SectionHeader title="Dashboard Overview">
        <Box pt={10} />
      </SectionHeader>

      <Grid mt="md">{renderCards()}</Grid>
    </Container>
  );
}

export default DashboardComponent;
