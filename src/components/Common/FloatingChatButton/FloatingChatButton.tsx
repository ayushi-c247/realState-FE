import { Box, ActionIcon, Badge } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import React from "react";

interface FloatingChatButtonProps {
  onClick: () => void;
  messageCount: number;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick, messageCount }) => {
  return (
    <Box className="floating-chat-button-container">
      <ActionIcon
        className="floating-chat-button"
        size={60}
        radius="xl"
        variant="gradient"
        gradient={{ from: "#5C3B74", to: "#AD6FDA" }}
        onClick={onClick}
      >
        {messageCount > 0 && (
          <Badge color="orange" variant="filled" radius="xl" onClick={onClick} className="message-count">
            {messageCount}
          </Badge>
        )}
        <IconMessage size={28} color="white" />
      </ActionIcon>
    </Box>
  );
};

export default FloatingChatButton;
