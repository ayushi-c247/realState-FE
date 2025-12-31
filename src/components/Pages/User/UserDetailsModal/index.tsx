"use client";

import { Avatar, Badge, Button, Divider, Group, Modal, Stack, Text } from "@mantine/core";
import React, { useEffect } from "react";

function toTitleCase(s?: string | null) {
  return (s || "").toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function StatusPill({ value }: { value?: string }) {
  const v = (value || "").toLowerCase();
  const color =
    v === "active" ? "green" :
      v === "inactive" ? "gray" :
        v === "blocked" ? "red" : "yellow";
  return <Badge variant="light" color={color}>{toTitleCase(value)}</Badge>;
}

function RolePill({ value }: { value?: string }) {
  return <Badge variant="light" color="violet">{toTitleCase(value)}</Badge>;
}

export default function UserDetailsModal({ opened, onClose, user }: { opened: boolean; onClose: () => void; user: any | null }) {
  if (!user) return null;

  const full =
    [user.first_name, user.last_name].filter(Boolean).join(" ").trim() || `${user.nickname}` || `User #${user.id}`;
  const initials =
    `${(user.first_name?.[0] || "").toUpperCase()}${(user.last_name?.[0] || "").toUpperCase()}` || "U";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton
      centered
      size="sm"
      radius="xl"
      overlayProps={{ blur: 2, opacity: 0.25 }}
      styles={{
        header: { paddingBottom: 0 },
        body: { paddingTop: 0 },
      }}
      title={<Text fw={700}>Participant</Text>}
    >
      <Stack gap="md" align="center" pt={8}>
        <Avatar
          src={user.avatar_link || undefined}
          radius={999}
          size={84}
          alt={full}
          styles={{ placeholder: { fontSize: 28, fontWeight: 700 } }}
        >
          {!user.avatar_link ? initials : null}
        </Avatar>

        <Stack gap={4} align="center">
          <Text fw={700} size="lg" style={{ lineHeight: 1.1, textAlign: "center" }}>
            {full}
          </Text>
          {(user.email || user?.user_name) && (
            <Text size="sm" c="dimmed" style={{ textAlign: "center" }}>
              {user.email || user?.user_name}
            </Text>
          )}
        </Stack>

        <Group gap="xs">
          <RolePill value={user.role} />
          <StatusPill value={user.status} />
          {user.country?.name ? (
            <Badge variant="light" color="blue">{user.country.name}</Badge>
          ) : null}
        </Group>

        <Divider variant="dashed" style={{ width: "100%" }} />

        <Stack gap={6} style={{ width: "100%" }}>
          <Group gap={8}>
            <Text fw={600} size="sm" style={{ width: 90 }}>User ID</Text>
            <Text size="sm" c="dimmed">#{user.id}</Text>
          </Group>
          {user.country?.code && (
            <Group gap={8}>
              <Text fw={600} size="sm" style={{ width: 90 }}>Country</Text>
              <Text size="sm" c="dimmed">
                {user.country.name} ({user.country.code})
              </Text>
            </Group>
          )}
        </Stack>

        <Group justify="center" mt="sm">
          <Button radius="xl" variant="light" onClick={onClose}>
            Close
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
