export interface IResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface IResetPasswordPayload {
  token: string;
  password: string;
}

export interface IResetPasswordResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    status: string;
    token: string;
  };
}
export interface IActivateUserPayload {
  token: string;
  password: string;
}

export interface IActivateUserResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    role: string;
    status: string;
    token: string;
  };
}
