"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import React, { JSX } from "react";
import { Control, useController } from "react-hook-form";

interface ToggleThemeProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const ToggleTheme = ({ name, control }: ToggleThemeProps): JSX.Element => {
  const { field } = useController({ name, control });
  const dark = field.value;

  const { toggleColorScheme } = useMantineColorScheme();

  const handleToggle = () => {
    const newValue = !dark;
    toggleColorScheme();
    field.onChange(newValue);
  };

  return (
    <ActionIcon
      radius="md"
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={handleToggle}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
};

export default ToggleTheme;
