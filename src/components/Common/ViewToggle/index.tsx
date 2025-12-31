"use client";

import { ActionIcon, Group } from "@mantine/core";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import React, { useState } from "react";

type ViewType = "grid" | "list";

export default function ViewToggle({ onChange }: Readonly<{ onChange: (view: ViewType) => void }>) {
  const [view, setView] = useState<ViewType>("grid");

  const handleToggle = (newView: ViewType) => {
    setView(newView);
    onChange(newView);
  };

  return (
    <Group>
      <ActionIcon
        variant={view === "grid" ? "filled" : "default"}
        onClick={() => handleToggle("grid")}
      >
        <IconLayoutGrid />
      </ActionIcon>
      <ActionIcon
        variant={view === "list" ? "filled" : "default"}
        onClick={() => handleToggle("list")}
      >
        <IconList />
      </ActionIcon>
    </Group>
  );
}
