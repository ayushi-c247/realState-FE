import { Button, Group, Modal, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import React, { FC } from "react";

import { truncateName } from "@/utils";
import { ConfirmationModalProps } from "@/types";
import { useTranslations } from "next-intl";

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  opened,
  title,
  description,
  confirmText = "Leave",
  cancelText = "Stay",
  onConfirm,
  onCancel,
  buttonCancelText,
  disabled,
  buttonText,
  examNames,
  copyConfirmText,
}) => {
  const t = useTranslations("generic");
  return (
  <Modal opened={opened} onClose={onCancel} centered withCloseButton={false}>
    <Text size="lg" mb="md">
      {title}
    </Text>
    <Text size="sm" c="dimmed" mb="lg">
      {buttonText?.includes("Copy") && description}
    </Text>
    <Text size="md" mb="md" fw={500}>
      {examNames?.original ? (
        <>
          {t("modal.confirmation.original")}: {truncateName(examNames.original, 25)}
          <Tooltip
            label={examNames.original}
            multiline
            withArrow
            w={250}
            position="top"
            offset={10}
            styles={{
              tooltip: {
                padding: "8px 12px",
                whiteSpace: "normal",
                wordBreak: "break-word",
              },
            }}
          >
            <IconInfoCircle size={16} style={{ marginLeft: 6, cursor: "pointer" }} />
          </Tooltip>
        </>
      ) : null}
    </Text>

    <Text size="md" mb="md" fw={500}>
      {examNames?.copy ? (
        <>
          {t("modal.confirmation.newExam")}: {truncateName(examNames.copy, 25)}
          <Tooltip
            label={examNames.copy}
            multiline
            withArrow
            w={250}
            position="top"
            offset={10}
            styles={{
              tooltip: {
                padding: "8px 12px",
                whiteSpace: "normal",
                wordBreak: "break-word",
              },
            }}
          >
            <IconInfoCircle size={16} style={{ marginLeft: 6, cursor: "pointer" }} />
          </Tooltip>
        </>
      ) : null}
    </Text>
    <Text size="sm" c="dimmed" mb="lg">
      {!buttonText?.includes("Copy") && description}
    </Text>
    <Text size="sm" c="dimmed" mb="lg">
      {copyConfirmText ?? ""}
    </Text>
    <Group>
      <Button variant="outline" onClick={onCancel}>
        {buttonCancelText || cancelText}
      </Button>
      <Button color="red" onClick={onConfirm} disabled={disabled}>
        {buttonText || confirmText}
      </Button>
    </Group>
  </Modal>
)};

export default ConfirmationModal;
