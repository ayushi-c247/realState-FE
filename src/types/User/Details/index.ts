export interface IUserTableRecord {
  id: number;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  user_name: string | null;
  role: "Investor" | "Agent" | string;
  status: "ACTIVE" | "INACTIVE" | string;
  // last_login_date: string;
  created_at: string;
  updated_at: string;
}
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
    user_name: string | null;
    nickname: string | null;
    display_name: string;
    email: string;
    last_login_date: string | null;
    dob: string | null;
    country_id: number | null;
    avatar_link: string | null;
    status: "INACTIVE" | "ACTIVE" | string;
    role: "CoParent" | "Parent" | "Admin" | string;
    country: string | null;
    childCount?: number | null;
    user_relationships_user_id?: Array<{
      relation_type: string;
      related_user_id: number;
      user_id: number;
      related_user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        display_name: string;
        status: string;
        role: string;
        country_id?: number;
        user_name?: string;
        nickname?: string;
        dob?: string;
        age_group_id?: number;
      };
    }>;
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
