import { IWarningAlertProps } from "@/types";
import { Button, Center, Group, Modal, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import React from "react";

const WarningAlertModal: React.FC<IWarningAlertProps> = ({
  isShow,
  onClose,
  isLoading,
  handleSubmit,
  description,
  showButtons = true,
}) => {
  const t = useTranslations("generic");
  return (
    <Modal
      opened={isShow}
      onClose={onClose}
      centered
      radius="lg"
      withCloseButton={false}
      closeOnClickOutside={false}
      padding="xl"
    >
      <Center>
        <IconAlertTriangle size={60} stroke={1.5} color="#FFBF00" />
      </Center>
      <Text size="lg" mt="md">
        {description}
      </Text>
      {showButtons && (
        <Group mt="lg">
          <Button onClick={handleSubmit} loading={isLoading} variant="filled" color="blue">
            {t("buttons.ok")}
          </Button>
          <Button onClick={onClose} variant="outline" color="gray">
            {t("buttons.cancel")}
          </Button>
        </Group>
      )}
    </Modal>
  );
};

export default WarningAlertModal;
