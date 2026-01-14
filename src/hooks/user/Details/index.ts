import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ListService } from "@/services/user/list";
import { USER_ROLE } from "@/constants";

import {
  IAddUserPayload,
  IAddUserResponse,
  IGetUserParams,
  IUpdateUserPayload,
  IUserDetailsID,
  IUserUpdate,
  IUserUpdateResponse,
  IUpdateUserResponse,
  IResendInvitationResponse,
  IResendInvitationPayload,
  InvestorProfileFormValues,
  IAddInvestorProfileResponse,
  AgentProfileFormValues,
  IAddAgentProfileResponse,
  IAgentApprovalStatusUpdate,
} from "@/types/User/Details";

import { IUserListResponse } from "@/types/User";
import { IUpdatePassword } from "@/types/Profile";

const userService = new ListService();

export const USER = {
  LIST: "user-list",
  DETAIL: "user-detail",
  USER: "user",
};

export const useGetAllUserDataQuery = (params: IGetUserParams) => {
  return useQuery<IUserListResponse>({
    queryKey: [USER.LIST, params],
    queryFn: () => userService.getAllUser(params),
    enabled: !!params,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUserMutation = (): UseMutationResult<
  IUpdateUserResponse,
  Error,
  { id: number | undefined; input: IUpdateUserPayload } // will update this type
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => userService.updateUser(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER.USER] });
      queryClient.invalidateQueries({ queryKey: [USER.DETAIL] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      console.error("Update user failed:", error);
    },
  });
};

export const useGetUserDetailsByIdQuery = (params: IUserDetailsID) => {
  return useQuery({
    queryKey: [USER.DETAIL, params],
    queryFn: () => userService.getUserById(params.id),
    enabled:
      !!params.id &&
      (params.role === USER_ROLE.ADMIN || params.role === USER_ROLE.INVESTOR),
    refetchOnWindowFocus: false,
  });
};

export const useDeleteUserMutation = (): UseMutationResult<
  any,
  Error,
  { id: number }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER.LIST] });
    },
    onError: (error) => {
      console.error("Delete user failed:", error);
    },
  });
};

export const useAddUserMutation = (): UseMutationResult<
  IAddUserResponse,
  Error,
  { id: number | undefined; input: IAddUserPayload }
> => {
  return useMutation({
    mutationFn: ({ id, input }) => userService.addUser(id, input),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Update user failed:", error);
    },
  });
};
export const useAddInvestorProfileMutation = (): UseMutationResult<
  IAddInvestorProfileResponse,
  Error,
  { input: InvestorProfileFormValues }
> => {
  return useMutation({
    mutationFn: ({ input }) => userService.addInvestorProfile(input),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Profile added failed:", error);
    },
  });
};
export const useAddAgentProfileMutation = (): UseMutationResult<
  IAddAgentProfileResponse,
  Error,
  { input: AgentProfileFormValues }
> => {
  return useMutation({
    mutationFn: ({ input }) => userService.addAgentProfile(input),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Profile added failed:", error);
    },
  });
};

export const useUpdateStatusMutation = (): UseMutationResult<
  IUserUpdateResponse,
  Error,
  IUserUpdate
> => {
  const queryClient = useQueryClient();
  return useMutation<IUserUpdateResponse, Error, IUserUpdate>({
    mutationFn: ({ id, input }) => userService.updateUserStatus(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER.LIST] });
    },
    onError: (error) => {
      console.error("Update user status failed:", error);
    },
  });
};
export const useUpdateAgentApprovalStatusMutation = (): UseMutationResult<
  IUserUpdateResponse,
  Error,
  IAgentApprovalStatusUpdate
> => {
  const queryClient = useQueryClient();
  return useMutation<IUserUpdateResponse, Error, IAgentApprovalStatusUpdate>({
    mutationFn: ({ id, input }) =>
      userService.updateAgentApprovalStatus(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER.LIST] });
    },
    onError: (error) => {
      console.error("Update agent status failed:", error);
    },
  });
};

export const useUpdatePasswordMutation = (): UseMutationResult<
  Awaited<ReturnType<typeof userService.updatePassword>>,
  Error,
  { payload: IUpdatePassword; token: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }) => userService.updatePassword(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER.DETAIL] });
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });
};

export const useResendInvitation = (): UseMutationResult<
  IResendInvitationResponse,
  Error,
  { input: IResendInvitationPayload }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ input }) => userService.resendInvitation(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER.LIST] });
    },
    onError: (error) => {
      console.error("Update user failed:", error);
    },
  });
};
