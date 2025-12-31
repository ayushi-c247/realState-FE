"use client";

import { MonthPickerInput, MonthPickerInputProps } from "@mantine/dates";
import React from "react";
import { Control,Controller } from "react-hook-form";

interface RHFMonthFieldProps extends MonthPickerInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<{ [key: string]: any }>;
}

const MonthField = ({ name, control, ...others }: RHFMonthFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <MonthPickerInput
          label="Pick month"
          placeholder="Pick month"
          {...others}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default MonthField;
