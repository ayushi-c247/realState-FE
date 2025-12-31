"use client";
import React from "react";
import { Card, Image, Text, Badge, Box, Flex } from "@mantine/core";
import IconAge from "@/components/Common/Icons/IconAge";
import IconLesson from "@/components/Common/Icons/IconLesson";
import { CustomCardProps } from "@/types";
import { IconCalendar } from "@tabler/icons-react";
import { formatPublishedDate } from "@/utils";
import IconCalender from "../Icons/IconCalender";

export default function CustomCard({
  image,
  title,
  description,
  lessons,
  tags,
  created_at,
  onClick,
}: CustomCardProps) {
  return (
    <Card
      className="custom-card"
      w="100%"
      maw={354}
      bd="1px solid transparent"
      bg="var(--sidebar-bg)"
      h="auto"
      padding="lg"
      radius={24}
      p={0}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Box w="100%" pos="relative" bd="3px solid transparent" className="card-image">
        <Image
          src={
            image ||
            "/placeholder-image.svg"
          }
          fit="cover"
          alt={title || "Learning Program"}
          radius={20}
          height="100%"
          width="100%"
          style={{
            objectPosition: "center",
            aspectRatio: "16 / 9",
          }}
        />
      </Box>
      <Box p={16} pb={0} style={{boxShadow:"none"}}>
        <Text
          component="h4"
          className="card-heading"
          fz={16}
          lh="normal"
          fw={600}
          c="var(--body-color)"
          mb={10}
          lineClamp={2}
          tt="capitalize"
          mih={40}
        >
          {title}
        </Text>
        <Text
          component="p"
          className="card-content"
          fz={14}
          fw={400}
          lh="normal"
          c="var(--text-color)"
          mb={12}
          lineClamp={2}
          tt="capitalize"
          mih={40}
        >
          {description || "No description"}
        </Text>
      </Box>
      <Box px={16}>
        {lessons && (
          <Badge
            fz="sm"
            fw="400"
            tt={"capitalize"}
            c="var(--toggle-icon)"
            bg="var(--default-color)"
            radius={24}
            py={4}
            px={12}
            bd="1px solid var(--border-color)"
            leftSection={<IconLesson size={20} />}
            h={29}
            mb={8}
            display={"flex"}
          >
            {lessons}
          </Badge>
        )}
        <Flex gap={8} wrap="wrap">
          {tags && tags.length > 0
            ? tags.map((tag) => (
                <Badge
                  key={tag} // for use if tags may duplicate
                  fz="sm"
                  fw="400"
                  tt={"capitalize"}
                  c="var(--text-color)"
                  bg="var(--white-color)"
                  radius={24}
                  py={4}
                  px={12}
                  h={29}
                  mb={8}
                  display={"flex"}
                  bd="1px solid transparent"
                  className="badge-hover"
                >
                  {tag}
                </Badge>
              ))
            : null}
        </Flex>
        {created_at && (
          <Flex gap={4} align="center" mb={10}>
            <IconCalender size={24} />{" "}
            <Text
              component="p"
              className="card-content"
              fz={{ base: 12, xl: 14 }}
              fw={400}
              c="var(--text-color)"
              mih="auto"
            >
              Published Date :
            </Text>
            <Text component="strong" fz={{ base: 12, xl: 14 }} fw={400} c="var(--body-color)">
              {formatPublishedDate(created_at)}
            </Text>
          </Flex>
        )}
      </Box>
    </Card>
  );
}
