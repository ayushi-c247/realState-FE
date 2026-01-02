export interface IAddUser {
  first_name: string;
  last_name: string;
  email: string;
}

export interface IAddUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
export interface IAddUserResponse {
  success: boolean;
  message: string;
  data?: IAddUserPayload;
}

export interface IGetUserParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string; // backend field, e.g., "first_name"
  sortOrder?: "asc" | "desc";
  filter?: string;
}

export interface IUpdateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface IResendInvitationResponse {
  success: boolean;
  message: string;
}
export interface IUpdateUserResponse {
  success: boolean;
  message: string;
  data?: IUpdateUserPayload;
}

export interface IUserDetailsID {
  id: number | null | undefined;
  role: string;
}

export interface IGetUserDetails {
  success: boolean;
  message: string;
  data?: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    last_login_date: string | null;
    status: string;
    role: string;
  };
}

// User Update Types
export interface IUserUpdate {
  id: number;
  input: {
    status: "ACTIVE" | "INACTIVE";
  };
}

export interface IUserUpdateResponse {
  success: boolean;
  message: string;
  data: boolean;
}

// Removed local SortStatus to use DataTable's generic sort status where needed

export interface AddUserFormProps {
  onCloseModal?: () => void;
  role: string;
}

export interface UserDetailsProps {
  user?: import("@/types/User").IUserList;
  userId: number;
}

export interface UserIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export interface IResendInvitationPayload {
  user_id: number;
}

export interface InvestorProfileForm {
  risk_tolerance: string;
  budget_min: number;
  budget_max: number;
  preferred_property_types: string[];
}

export interface AgentProfileForm {
  company_name: string;
  contact_number: string;
  license_number: string;
}
