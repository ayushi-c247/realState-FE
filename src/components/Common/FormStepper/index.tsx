"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Stepper, Button, Box } from "@mantine/core";

import { CommonFormStepperProps } from "@/types";
import { useTranslations } from "next-intl";

export const FormStepper = <T extends FieldValues>({
  steps,
  form,
}: CommonFormStepperProps<T>) => {
  const t_generic = useTranslations("generic");
  const [active, setActive] = useState(0);

  const nextStep = async () => {
    const currentStepFields = steps[active].fields;
    const isValid = currentStepFields.length
      ? await form.trigger(currentStepFields)
      : true;

    if (!isValid) return;
    setActive((prev) => prev + 1);
  };

  const prevStep = () => setActive((prev) => prev - 1);

  return (
    <>
      <Stepper active={active}>
        {steps.map((step, index) => (
          <Stepper.Step key={index} label={step.label}>
            {step.component}
          </Stepper.Step>
        ))}
      </Stepper>

      <Box mt="xl">
        {active > 0 && (
          <Button onClick={prevStep}>{t_generic("buttons.back")}</Button>
        )}

        {active < steps.length - 1 && (
          <Button ml="sm" onClick={nextStep}>
            {t_generic("buttons.next")}
          </Button>
        )}

        {active === steps.length - 1 && (
          <Button ml="sm" type="submit">
            {t_generic("buttons.submit")}
          </Button>
        )}
      </Box>
    </>
  );
};
