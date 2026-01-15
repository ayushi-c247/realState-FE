export enum AgentApprovalStatusEnum {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export interface IUserList {
  id: number;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  email: string | null;
  last_login_date: string | null;
  created_at: string;
  updated_at: string;
  role: string;
  status: string;
  is_email_verified: boolean;
  agent_profile?: {
    user_id: number;
    approval_status: AgentApprovalStatusEnum;
  } | null;
}

export interface IUserListResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    users: IUserList[];
  };
}

export interface IGetUserListPagination {
  page: number;
  limit: number;
  search?: string;
}

export interface IGetUserDetail {
  id: string | number;
  role: string;
  data?: {
    first_name: string;
    last_name: string;
    email: string;
    user_id: number;
    role: string;
  };
}

export interface FailedDetail {
  // Define the structure of failedDetails if known, here's a placeholder
  // Example: field: string; message: string;
  [key: string]: string;
}
export interface AlreadyExistsEntry {
  email: string;
}

export const AgentApprovalStatusLabels: Record<
  AgentApprovalStatusEnum,
  string
> = {
  [AgentApprovalStatusEnum.APPROVED]: "Approved",
  [AgentApprovalStatusEnum.PENDING]: "Pending",
  [AgentApprovalStatusEnum.REJECTED]: "Rejected",
};
