"use client";

import { DateInput, DateInputProps } from "@mantine/dates";
import React from "react";
import { Control,Controller } from "react-hook-form";

interface RHFDateFieldProps extends DateInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<{ [key: string]: any }>;
}

const DateField = ({ name, control, ...others }: RHFDateFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <DateInput
          label="Pick date"
          placeholder="Pick date"
          {...others}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default DateField;
