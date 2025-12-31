import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import {
  Stack,
  TextInput,
  ScrollArea,
  Avatar,
  Text,
  Paper,
  Group,
  ActionIcon,
  Box,
  Tabs,
} from "@mantine/core";
import {
  IconSend,
  IconBooks,
  IconVideo,
  IconBulb,
  IconMoodSmile,
  IconMessage,
  IconMinus,
  IconMaximize,
  IconX,
} from "@tabler/icons-react";
import { useAuth } from "@/lib/Contexts/AuthProvider";

export interface ChatMessage {
  id: string;
  sender: "ADMIN" | "EXPERT";
  text: string;
  timestamp: string;
  userName?: string;
  section?: string; // Add section to identify which section the message belongs to
}

interface ChatDrawerProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  messages: Record<string, ChatMessage[]>; // Changed to support all sections
  allMessages: ChatMessage[]; // New prop for all messages combined
  onSendMessage: (messageText: string, section: string) => void; // Updated to include section
  currentUserRole: "ADMIN" | "EXPERT";
  isPolling: boolean;
  activeSection: string; // Current active section from parent
  onTabChange?: (tabId: string) => void; // New callback for tab changes
}

export default function ChatDrawer({
  opened,
  onClose,
  title,
  messages = {},
  allMessages = [],
  onSendMessage,
  currentUserRole,
  isPolling,
  activeSection,
  onTabChange,
}: ChatDrawerProps) {
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<string>(activeSection || "read");
  const [isMinimized, setIsMinimized] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const { userData } = useAuth();

  // Define tab configuration
  const tabConfig = [
    { id: "read", label: "Read", icon: IconBooks },
    { id: "watch", label: "Watch", icon: IconVideo },
    { id: "practical", label: "Practical Tips", icon: IconBulb },
    { id: "reflection", label: "Reflection", icon: IconMoodSmile },
    { id: "resources", label: "Additional Resources", icon: IconBooks },
    { id: "all", label: "All Messages", icon: IconMessage },
  ];

  // Get messages for current active tab
  const getCurrentMessages = () => {
    if (activeTab === "all") {
      return allMessages;
    }
    return messages[activeTab] || [];
  };

  // Handle tab change with parent notification
  const handleTabChange = (tabId: string | null) => {
    const newTab = tabId || "read";
    setActiveTab(newTab);

    // Always notify parent component about tab change
    // Let parent decide whether to fetch comments or not
    if (onTabChange) {
      onTabChange(newTab);
    }
  };

  // Update active tab when activeSection changes
  useEffect(() => {
    setActiveTab(activeSection);
  }, [activeSection]);

  const scrollToBottom = () => {
    viewport.current?.scrollTo({ top: viewport.current.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (opened) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [messages, allMessages, opened, activeTab]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Don't send section for "all" tab, let parent handle it
      const sectionToSend = activeTab === "all" ? "" : activeTab;
      onSendMessage(newMessage.trim(), sectionToSend);
      setNewMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const currentMessages = getCurrentMessages();

  if (!opened) return null;

  return (
    <Box
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: isMinimized ? "300px" : "750px",
        height: isMinimized ? "60px" : "75vh",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out",
        overflow: "hidden",
        border: "1px solid var(--mantine-color-gray-3)",
      }}
      className="chat-floating-window"
    >
      {/* Header with controls */}
      <Box
        style={{
          padding: "12px 16px",
          backgroundColor: "var(--mantine-color-orange-6)",
          borderRadius: "12px 12px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "60px",
        }}
      >
        <Group gap="xs">
          <Text c="white" fw={600} size="sm">
            Lesson Chat
          </Text>
          {isPolling && (
            <Box
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#14AE5C",
                animation: "pulse 2s infinite",
              }}
            />
          )}
        </Group>
        <Group gap="xs">
          {/* <ActionIcon
            size="sm"
            variant="subtle"
            color="white"
            onClick={() => setIsMinimized(!isMinimized)}
            style={{ color: 'white' }}
          >
            {isMinimized ? <IconMaximize size={16} /> : <IconMinus size={16} />}
          </ActionIcon> */}
          <ActionIcon
            size="sm"
            variant="subtle"
            color="white"
            onClick={onClose}
            style={{ color: "white" }}
          >
            <IconX size={16} />
          </ActionIcon>
        </Group>
      </Box>

      {!isMinimized && (
        <Box style={{ height: "50%", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Tabs */}
          <Box style={{ padding: "12px 16px 0", backgroundColor: "white" }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="pills">
              <Tabs.List style={{ flexWrap: "wrap", gap: "4px" }} className="chat-tabs">
                {tabConfig.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Tabs.Tab
                      key={tab.id}
                      value={tab.id}
                      color="var(--toggle-icon)"
                      leftSection={<Icon size={14} />}
                      style={{
                        fontSize: "14px",
                        padding: "6px 12px",
                        borderRadius: "15px",
                      }}
                    >
                      {tab.id === "practical"
                        ? "Tips"
                        : tab.id === "resources"
                          ? "Resources"
                          : tab.id === "all"
                            ? "All"
                            : tab.label}
                    </Tabs.Tab>
                  );
                })}
              </Tabs.List>
            </Tabs>
          </Box>

          {/* Messages Area */}
          <Box
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f8f9fa",
              margin: "8px 16px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <ScrollArea
              style={{ flex: 1, padding: "12px" }}
              viewportRef={viewport}
              scrollbarSize={4}
            >
              <Stack gap="md">
                {currentMessages.map((message) => {
                  const isCurrentUser = message.sender === currentUserRole;
                  return (
                    <Group
                      key={message.id}
                      justify={isCurrentUser ? "flex-end" : "flex-start"}
                      align="flex-start"
                    >
                      {!isCurrentUser && (
                        <Avatar color="blue" radius="xl" size="sm">
                          {message.sender.charAt(0)}
                        </Avatar>
                      )}
                      <Box style={{ maxWidth: "75%", minWidth: "50%" }}>
                        <Paper
                          withBorder={false}
                          p="sm"
                          radius="md"
                          style={{
                            backgroundColor: isCurrentUser
                              ? "var(--mantine-color-gray-2)"
                              : "white",
                            color: isCurrentUser ? "white" : "var(--mantine-color-dark-7)",
                            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {/* Show section for "All Messages" tab */}
                          {activeTab === "all" && message.section && (
                            <Text
                              size="xs"
                              c={isCurrentUser ? "gray.6" : "orange"}
                              fw="bold"
                              mb="xs"
                            >
                              {message.section.toUpperCase()}
                            </Text>
                          )}
                          <Text size="xs" fw={500}>
                            {message.text}
                          </Text>
                          <Text
                            size="xs"
                            mt={2}
                            ta={isCurrentUser ? "right" : "left"}
                            opacity={0.6}
                          >
                            {dayjs(message?.timestamp).format("h:mm A")}
                          </Text>
                        </Paper>
                        {message?.userName && (
                          <Text size="xs" c="dimmed" mt={2} ta={isCurrentUser ? "right" : "left"}>
                            {message?.userName.toUpperCase()}
                          </Text>
                        )}
                      </Box>
                      {isCurrentUser && (
                        <Avatar color="orange" radius="xl" size="sm">
                          {message.sender.charAt(0)}
                        </Avatar>
                      )}
                    </Group>
                  );
                })}
                {currentMessages.length === 0 && (
                  <Box style={{ textAlign: "center", padding: "20px 10px" }}>
                    <Text c="dimmed" size="xs">
                      No messages yet. Start the conversation!
                    </Text>
                  </Box>
                )}
              </Stack>
            </ScrollArea>
          </Box>

          {activeTab !== "all" && (
            <Box
              px={16}
              py={12}
              bg="white"
              style={{
                borderTop: "1px solid var(--mantine-color-gray-2)",
                borderRadius: "0 0 12px 12px",
              }}
            >
              <Group gap="sm" align="flex-end">
                <TextInput
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.currentTarget.value)}
                  onKeyPress={handleKeyPress}
                  flex={1}
                  radius="xl"
                  size="sm"
                  styles={{
                    input: {
                      borderColor: "var(--mantine-color-gray-3)",
                      "&:focus": { borderColor: "var(--mantine-color-orange-6)" },
                    },
                  }}
                />

                <ActionIcon
                  onClick={handleSendMessage}
                  variant="filled"
                  size="md"
                  radius="xl"
                  color="orange"
                  disabled={!newMessage.trim()}
                  style={{
                    transition: "all 0.2s ease",
                    transform: newMessage.trim() ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <IconSend size={16} />
                </ActionIcon>
              </Group>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
