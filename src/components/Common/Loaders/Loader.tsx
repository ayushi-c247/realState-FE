import { Flex, Loader, Stack, Text } from "@mantine/core";
import React from "react";

const Loading = () => {
  return (
    <Flex h="100vh" justify="center" align="center">
      <Stack align="center">
        <Loader type="oval" />
        <Text>Please wait...</Text>
      </Stack>
    </Flex>
  );
};

export default Loading;
