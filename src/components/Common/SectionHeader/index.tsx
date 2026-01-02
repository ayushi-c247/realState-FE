import { Group, Text } from "@mantine/core";
import React from "react";

interface SectionHeaderProps extends React.PropsWithChildren {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, children }) => {
  return (
    <Group
      justify="space-between"
      align="selft-start"
      wrap="wrap"
      p="xs"
      mb={10}
      pos={"sticky"}
      top={0}
      style={{
        borderBottom: "1px solid var(--border-color)",
        zIndex:1
      }}
      pb={20}
      bg={"var(--white-color)"}
      
    >
      <Text
        size="md"
        c="var(--black-color)"
        fw={600}
        mb={{ base: 8, lg: 0 }}
        style={{ whiteSpace: "nowrap" }}
        pt={10}
      >
        {title}
      </Text>
      {children}
    </Group>
  );
};

export default SectionHeader;
