import {
  AgentApprovalStatusEnum,
  IGetUserDetail,
  IUserListResponse,
} from "@/types/User";
import {
  IAddUserPayload,
  IAddUserResponse,
  IGetUserDetails,
  IGetUserParams,
  IUserUpdateResponse,
  IUpdateUserPayload,
  IUpdateUserResponse,
  IResendInvitationPayload,
  IResendInvitationResponse,
  InvestorProfileFormValues,
  IAddInvestorProfileResponse,
  AgentProfileFormValues,
  IAddAgentProfileResponse,
} from "@/types/User/Details";
import { API_ENDPOINTS } from "@/utils/endpoints";
import http from "@/utils/protocol/http";
import { IUpdatePassword, IUpdateProfileResponse } from "@/types/Profile";

export class ListService {
  async getAllUser(params: IGetUserParams): Promise<IUserListResponse> {
    return http.get(API_ENDPOINTS.USER, { params });
  }
  async getUserById(id: number | null | undefined): Promise<IGetUserDetails> {
    return http.get(`${API_ENDPOINTS.USER}/${id}`);
  }
  async updateUser(
    id: number | undefined,
    payload: IUpdateUserPayload
  ): Promise<IUpdateUserResponse> {
    if (id) {
      return http.put(`${API_ENDPOINTS.USER}/${id}`, payload);
    } else {
      return http.post(`${API_ENDPOINTS.USER}`, payload);
    }
  }
  async deleteUser(id: number): Promise<IGetUserDetail> {
    return http.delete(`${API_ENDPOINTS.USER}/${id}`);
  }

  async addUser(
    id: number | undefined,
    payload: IAddUserPayload
  ): Promise<IAddUserResponse> {
    if (id) {
      return http.put(`${API_ENDPOINTS.USER}/${id}`, payload);
    } else {
      return http.post(`${API_ENDPOINTS.USER_ADD}`, payload);
    }
  }
  async addInvestorProfile(
    payload: InvestorProfileFormValues
  ): Promise<IAddInvestorProfileResponse> {
    return http.post(`${API_ENDPOINTS.INVESTOR_PROFILE}`, payload);
  }

  async addAgentProfile(
    payload: AgentProfileFormValues
  ): Promise<IAddAgentProfileResponse> {
    return http.post(`${API_ENDPOINTS.AGENT_PROFILE}`, payload);
  }
  async resendInvitation(
    payload: IResendInvitationPayload
  ): Promise<IResendInvitationResponse> {
    return http.post(`${API_ENDPOINTS.RESEND_INVITATION}`, payload);
  }

  async updateUserStatus(
    id: number,
    payload: { status: "ACTIVE" | "INACTIVE" }
  ): Promise<IUserUpdateResponse> {
    return http.patch(`${API_ENDPOINTS.USER_UPDATE}/${id}`, payload);
  }
  async updateAgentApprovalStatus(
    id: number,
    payload: { status: AgentApprovalStatusEnum }
  ): Promise<IUserUpdateResponse> {
    return http.patch(`${API_ENDPOINTS.AGENT_UPDATE_STATUS}/${id}`, payload);
  }

  async updatePassword(
    payload: IUpdatePassword
  ): Promise<IUpdateProfileResponse> {
    return http.post(API_ENDPOINTS.CHANGE_PASSWORD, payload);
  }
}
