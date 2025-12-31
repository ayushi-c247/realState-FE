/**
 * @description: type for the admin login object
 */

import { CarouselProps } from "@mantine/carousel";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export * from "./Common";

export type LoginFormValues = {
  email: string;
  password: string;
};
/**
 * @description: type for the admin update profile object
 */
export type UpdateProfileFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  token: string;
};
export type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  role: string;
  email: string;
  name: string;
  data: {
    token: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    name: string;
  };
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  token: string;
}

export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
}
export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    token: string;
  };
}

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
  examNames?: {
    original: string | null;
    copy: string | null;
  };
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

export interface IRoundBadgeProp {
  bgColor?: string;
  minWidth?: string;
  maxWidth?: string;
  title?: string;
  color?: string;
}
// country type and interface
interface ICountry {
  id: number | string;
  name: string;
  code: string;
}

export interface IGetCountriesResponse {
  success: boolean;
  message: string;
  data: ICountry[];
}
// age group type and interface
type AgeGroup = {
  id: number | string;
  age: string;
};

export interface IGetAgeGroupsResponse {
  success: boolean;
  message: string;
  data: AgeGroup[];
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

export interface ContentRendererProps {
  block: IBlock;
  values: any[];
  t: (key: string) => string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface CommonCarouselProps extends Partial<CarouselProps> {
  list?: any[];
  renderItem: (item: any) => React.ReactNode;
  showControls?: boolean;
  showIndicators?: boolean;
  slideKey?: string | number; // default "id"
}
