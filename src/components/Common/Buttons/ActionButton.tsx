import { ActionIcon, ActionIconProps, rem } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import React from "react";

type ActionButtonProps = { iconSize?: number } & ActionIconProps;

const ActionButton = ({ iconSize, ...others }: ActionButtonProps) => {
  return (
    <ActionIcon variant="subtle" {...others}>
      <IconUser size={iconSize || rem(16)} stroke={1.5} />
    </ActionIcon>
  );
};

export default ActionButton;
