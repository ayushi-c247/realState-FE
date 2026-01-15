import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface EmptyStateProps {
  image?: string;
  heading: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export interface DeleteModalProps {
  opened: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemDetails?: {
    label: string;
    value: string;
  }[];
  confirmText?: string;
  cancelText?: string;
  warningText?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

export type TriggerMode = "change" | "enter";

export interface AdvancedSearchInputProps
  extends Omit<import("@mantine/core").InputProps, "onChange" | "value"> {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onSearch?: (value: string) => void;
  debounceMs?: number;
  throttleMs?: number;
  triggerOn?: TriggerMode;
}

export interface PaginationBarProps {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions: string[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  labelPerPage: string;
}

export type StepConfig<T> = {
  label: string;
  component: React.ReactNode;
  fields: Path<T>[]; // IMPORTANT
  isCompleted?: boolean;
};

export type CommonFormStepperProps<T extends FieldValues> = {
  steps: StepConfig<T>[];
  form: UseFormReturn<T>;
};
