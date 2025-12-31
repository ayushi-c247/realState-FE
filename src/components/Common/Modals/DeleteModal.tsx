"use client";
import { Box, Button, Group, List, Modal, Paper, Text } from "@mantine/core";

import { useTranslations } from "next-intl";
import React from "react";
import { DeleteModalProps } from "@/types/Common";
import IconTrash from "../Icons/IconTrash";

export default function DeleteModal({
  opened,
  onCancel,
  onConfirm,
  title,
  description,
  itemDetails,
  confirmText,
  warningText,
  cancelText,
  loading = false,
  children,
}: DeleteModalProps) {
  const t = useTranslations("generic");

  return (
    <Modal
      opened={opened}
      onClose={onCancel}
      centered
      withCloseButton={false}
      radius={16}
      padding="lg"
    >
      {/* Delete Icon */}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        <Box
          style={{
            width: 56,
            height: 56,
            borderRadius: 48,
            background: "var(--error-outline-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconTrash size={28} />
        </Box>
      </Box>

      {/* Title */}
      <Text ta="center" fw={600} size={"var(--font-size-lg"} mb={8} c="var(--body-color)">
        {title || t("modal.delete.title")}
      </Text>

      {/* Description */}
      <Text
        ta="center"
        size="var(--font-size-sm)"
        c="var(--text-color)"
        lh="md"
        mb={{ base: 12, xl: 16 }}
      >
        {description || t("modal.delete.description")}
      </Text>

      {/* Item Details Card */}
      {itemDetails && itemDetails.length > 0 && (
        <Box style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box className="delete-item">
            {itemDetails.map((detail, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <Text fw={500} fz={14} c="var(--body-color)" style={{ flexShrink: 0 }}>
                  {detail.label} :
                </Text>
                <Text fw={400} fz={14} c="var(--body-color)" className="text-break">
                  {detail.value || "-"}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Custom children content */}
      {children && <Box mb="lg">{children}</Box>}
      {warningText && (
        <List mb={{ base: "sm", xl: "lg" }} px={{ base: "sm", lg: "md" }}>
          <List.Item fz={12} fw={400} c="var(--text-color)">
            {warningText}
          </List.Item>
        </List>
      )}
      {/* Action Buttons */}
      <Group justify="center" gap="md">
        <Button variant="outline" className="outline-button" onClick={onCancel} disabled={loading}>
          {cancelText || t("buttons.cancel")}
        </Button>
        <Button
          variant="gradient"
          className="gradiant-button"
          disabled={loading}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText || t("buttons.delete")}
        </Button>
      </Group>
    </Modal>
  );
}
