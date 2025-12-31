"use client";

import { YearPickerInput, YearPickerInputProps } from "@mantine/dates";
import React from "react";
import { Control,Controller } from "react-hook-form";

interface RHFYearFieldProps extends YearPickerInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<{ [key: string]: any }>;
}

const YearField = ({ name, control, ...others }: RHFYearFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <YearPickerInput
          label="Pick year"
          placeholder="Pick year"
          {...others}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default YearField;
