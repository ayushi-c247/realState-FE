import { investorProfileSchema } from "@/constants/validationSchemas/user";
import { AgentApprovalStatusEnum } from "@/types/User";
import type { InferType } from "yup";
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
export interface IAddInvestorProfileResponse {
  success: boolean;
  message: string;
  data?: InvestorProfileFormValues;
}
export interface IAddAgentProfileResponse {
  success: boolean;
  message: string;
  data?: AgentProfileFormValues;
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
export interface IAgentApprovalStatusUpdate {
  id: number;
  input: {
    status: AgentApprovalStatusEnum;
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

export interface AgentProfileFormValues {
  company_name: string;
  contact_number: string;
  license_number: string;
}
export type BudgetUnit = "LAKH" | "CRORE";
export type InvestorProfileFormValues = {
  budget_min: number;
  budget_max: number;
  budget_unit: BudgetUnit;
  risk_tolerance: string;
  investment_horizon: string;
  primary_objective: string;
  ownership_structure: string;
  country: string;
  state: string;
  cities: string[];
  preferred_property_types: string;
  tourism_preferences: string;
  renovation_willingness: string;
};
