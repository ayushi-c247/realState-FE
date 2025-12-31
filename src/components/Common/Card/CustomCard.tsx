import React, { FC, memo } from "react";
import { Box, Card, Text } from "@mantine/core";

import { CustomCardProps } from "@/types/CustomCard";

const CustomCard: FC<CustomCardProps> = ({ icon, title, description, mb, children }) => {
  return (
    <Card
      className="card child-card"
      w="100%"
      maw={{ base: 300, md: 550, lg: 575 }}
      radius={24}
      p={{ base: 24, md: 48 }}
      shadow="md"
      mx={{ base: 8, md: "unset" }}
    >
      <Box ta="center" mb={{ base: 20, md: mb }}>
        {icon && (
          <Box w={100} h={100} display="flex" ta="center" bdrs={50} m="auto" className="icon-box">
            {icon || null}
          </Box>
        )}
        {title && (
          <Text component="h4" fw={600} fz={24} mb={8} className="title">
            {title || null}
          </Text>
        )}
        {description && (
          <Text component="p" fw={400} fz={14} lts={0.3} className="description">
            {description || null}
          </Text>
        )}
      </Box>

      {children || null}
    </Card>
  );
};

export default memo(CustomCard);
