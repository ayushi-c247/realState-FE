import { Button, ButtonProps } from "@mantine/core";
import React from "react";

type ButtonsProps = { orientation?: "horizontal" | "vertical" } & ButtonProps;

const Buttons = ({ orientation, ...others }: ButtonsProps) => {
  return (
    <Button.Group orientation={orientation}>
      <Button variant="default" {...others}>
        First
      </Button>
      <Button variant="default" {...others}>
        Second
      </Button>
      <Button variant="default" {...others}>
        Third
      </Button>
    </Button.Group>
  );
};

export default Buttons;
