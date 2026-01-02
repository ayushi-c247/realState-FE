"use client";

import { CommonFormStepperProps } from "@/types";
import { Stepper, Button, Box } from "@mantine/core";
import { useState } from "react";

export const FormStepper = ({ steps, onSubmit }: CommonFormStepperProps) => {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => Math.min(current + 1, steps.length));

  const prevStep = () => setActive((current) => Math.max(current - 1, 0));

  return (
    <>
      <Stepper active={active}>
        {steps.map((step, index) => (
          <Stepper.Step key={index} label={step.label}>
            {step.component}
          </Stepper.Step>
        ))}

        <Stepper.Completed>
          {steps[steps.length - 1].component}
        </Stepper.Completed>
      </Stepper>

      <Box mt="xl">
        {active > 0 && <Button onClick={prevStep}>Back</Button>}

        {active < steps.length - 1 && (
          <Button ml="sm" onClick={nextStep}>
            Next
          </Button>
        )}

        {active === steps.length - 1 && (
          <Button ml="sm" onClick={onSubmit}>
            Submit
          </Button>
        )}
      </Box>
    </>
  );
};
