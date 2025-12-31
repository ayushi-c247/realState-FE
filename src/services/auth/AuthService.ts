import {
  ILoginFormValues,
  ILoginResponse,
  IRefreshTokenPayload,
  IRefreshTokenResponse,
} from "@/types/Login";
import {
  IUpdatePassword,
  IUpdateProfilePayload,
  IUpdateProfileResponse,
} from "@/types/Profile";
import {
  IActivateUserPayload,
  IActivateUserResponse,
} from "@/types/ResetPassword";
import { API_ENDPOINTS } from "@/utils/endpoints";
import http from "@/utils/protocol/http";
export class AuthService {
  async login(payload: ILoginFormValues): Promise<ILoginResponse> {
    return http.post(API_ENDPOINTS.LOGIN, payload);
  }
  async logout(): Promise<void> {
    return;
  }
  async getCurrentUser(): Promise<ILoginResponse> {
    return http.get(API_ENDPOINTS.ME);
  }

  async refreshToken(
    payload: IRefreshTokenPayload
  ): Promise<IRefreshTokenResponse> {
    return http.post(API_ENDPOINTS.REFRESH, payload);
  }

  async updateProfile(
    payload: IUpdateProfilePayload
  ): Promise<IUpdateProfileResponse> {
    return http.put(API_ENDPOINTS.UPDATE_PROFILE, payload);
  }

  async updatePassword(
    payload: IUpdatePassword
  ): Promise<IUpdateProfileResponse> {
    return http.post(API_ENDPOINTS.CHANGE_PASSWORD, payload);
  }

  async resetPassword(
    payload: IActivateUserPayload
  ): Promise<IActivateUserResponse> {
    return http.post(API_ENDPOINTS.ACTIVATE_USER, payload);
  }

  async forgotPassword(payload: {
    email: string;
  }): Promise<
    | { success: boolean; message: string; data: null }
    | { success: false; message: string }
  > {
    return http.post(API_ENDPOINTS.FORGOT_PASSWORD, payload);
  }
}
