import { DateTimePicker, DateTimePickerProps } from "@mantine/dates";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface RHFDateTimeFieldProps<TFieldValues extends FieldValues>
  extends Omit<DateTimePickerProps, "value" | "onChange"> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
}

function DateTimeField<TFieldValues extends FieldValues>({
  name,
  control,
  ...others
}: RHFDateTimeFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const value = field.value ? new Date(field.value as string) : null

        return (
          <DateTimePicker
            {...others}
            value={value}
            onChange={(dt) => field.onChange(dt ?? null)}
            error={fieldState.error?.message}
          />
        );
      }}
    />
  );
}

export default DateTimeField;
