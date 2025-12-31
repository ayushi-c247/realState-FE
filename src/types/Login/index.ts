export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  refreshToken: string;
  role: string;
  email: string;
  full_name: string;
  status: string;
  message: string;
  data: {
    token: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    full_name: string;
    user_id: number;
    id: number;
    status: string;
  };
}

export interface IRefreshTokenPayload {
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface IAuthGateProps {
  allowedRoles?: string[];
  children: React.ReactNode;
}

export interface IAPIUser {
  id: number;
  role: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  status: string;
}

export interface IAuthState {
  isAuthorized: boolean;
  token: string | null | Record<string, unknown>;
  email: string | null | Record<string, unknown>;
  full_name: string | null | Record<string, unknown>;
  role: string | null | Record<string, unknown>;
  userData?: IAPIUser;
}

export type IAuthAction =
  | { type: "SET_AUTHORIZED"; userData: IAPIUser }
  | { type: "SET_UNAUTHORIZED" }
  | { type: "UPDATE_USER"; userData: IAPIUser };

export type IAuthContextType = IAuthState & {
  authorize: (userData: IAPIUser) => void;
  unauthorize: () => void;
  isLoading: boolean;
};

export enum Step {
  SendOtp = "sendOtp",
  VerifyOtp = "verifyOtp",
}

export interface IResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

export interface IResetPasswordPayload {
  password: string;
  token: string;
}

export interface IResetPasswordResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface IForgotPasswordFormValues {
  email: string;
}

export interface IForgotPasswordResponse {
  success: boolean;
  message: string;
  data: null;
}
