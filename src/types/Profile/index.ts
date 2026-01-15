export interface IChangePasswordFormValues {
  newPassword: string;
  confirmNewPassword: string;
}

export interface IUpdateProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  token: string;
}

export interface IUpdatePassword {
  newPassword: string;
}
export interface IUpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    token: string;
  };
}

export interface FailedDetail {
  [key: string]: any;
}

export interface AlreadyExistsEntry {
  email: string;
}

export type BudgetUnitOption = {
  label: string;
  value: "LAKH" | "CRORE";
};
