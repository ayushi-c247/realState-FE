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

export interface AsyncMultiSelectProps {
  label?: string;
  placeholder?: string;
  value?: string[];
  onChange?: (values: string[]) => void;
  isDisabled?: boolean;
  isClearable?: boolean;
  initialData?: { value: string; label: string }[];
  minSearchLength?: number;
  debounceMs?: number;
  dataType?: "tag" | "category" | "user" | "cluster";
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

export type StepConfig = {
  label: string;
  component?: React.ReactNode;
};

export type CommonFormStepperProps = {
  steps: StepConfig[];
  onSubmit: () => void;
};
