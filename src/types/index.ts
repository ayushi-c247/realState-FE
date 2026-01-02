/**
 * @description: type for the admin login object
 */

import { CarouselProps } from "@mantine/carousel";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export * from "./Common";

/**
 * @description: type for the admin update profile object
 */

export interface ISearchProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  value?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
}

export interface ConfirmationModalProps {
  opened: boolean;
  title: string;
  description: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  buttonCancelText?: string;
  disabled?: boolean;
  buttonText?: string;
  copyConfirmText?: string;
}

export interface IWarningAlertProps {
  isShow: boolean;
  onClose: () => void;
  isLoading?: boolean;
  handleSubmit?: () => void;
  description: string;
  showButtons?: boolean;
}

export interface CustomCardProps {
  image?: string;
  title?: string;
  description?: string;
  age?: string;
  lessons?: string;
  tags?: string[];
  slide?: number | string;
  created_at?: string;
  onClick?: () => void;
}

export interface SidebarProps {
  sidebarOpen: boolean;
  mobileSidebarOpen?: boolean;
  onToggleSidebar: () => void;
}
export interface HeaderProps {
  mobileSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export interface TableHandlersProps {
  router: AppRouterInstance;

  pathname: string;
  searchParams: URLSearchParams;
  pageSize: number;
  sortBy?: string | null; // ? makes undefined acceptable
  sortOrder?: "asc" | "desc" | null;
}

export interface SortState {
  sortBy: string | null;
  sortOrder: "asc" | "desc" | null;
}
export interface IBlock {
  type: string;
  value: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
