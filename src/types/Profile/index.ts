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
  // Define the structure of failedDetails if known, here's a placeholder
  // Example: field: string; message: string;
  [key: string]: any;
}

export interface AlreadyExistsEntry {
  email: string;
}
