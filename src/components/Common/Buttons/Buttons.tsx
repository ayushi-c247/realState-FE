"use client";
import { Button } from "@mantine/core";
import React from "react";

import { ExtendedButtonProps } from "@/types/button.types";

const Buttons = ({ variant, ...others }: ExtendedButtonProps) => {
  return (
    <Button variant={variant || "filled"} {...others}>
      {others.children || "Button"}
    </Button>
  );
};

export default Buttons;
