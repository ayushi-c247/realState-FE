import { Box, Button, Group, Modal, Text, Title } from "@mantine/core";
import React from "react";
import { useTranslations } from "next-intl";

export default function PublishConfirmation(props: {
  opened: boolean;
  onClose: () => void;
  onClick: () => Promise<void>;
  loading: any;
}) {
  const t = useTranslations("eventManagement");

  const body = t.rich("publishConfirmation.body", {
    b: (chunks) => <b>{chunks}</b>,
    br: () => <br />,
  });

  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      centered
      radius="lg"
      withCloseButton
      title={null}
      padding="lg"
      closeButtonProps={{ disabled: props.loading }}
      styles={{
        header: { justifyContent: "center" },
        title: { width: "100%", textAlign: "center" },
        body: { textAlign: "center" },
      }}
    >
      <Box style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <Box
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "#FFFBEB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          🚀
        </Box>
      </Box>
      <Title order={3} style={{ marginBottom: 8 }} c={"#081021"}>
        {t("publishConfirmation.title")}
      </Title>
      <Text c="dimmed" size="sm" style={{ lineHeight: 1.6 }}>
        {body}
      </Text>
      <Group justify="center" mt="xl" gap={12}>
        <Button className="outline-button" onClick={props.onClose} disabled={props.loading}>
          {t("publishConfirmation.back")}
        </Button>
        <Button className="gradiant-button" onClick={props.onClick} loading={props.loading} disabled={props.loading}>
          {t("publishConfirmation.confirm")}
        </Button>
      </Group>
    </Modal>
  );
}
