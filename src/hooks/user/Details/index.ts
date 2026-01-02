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
} from "@/types/User/Details";

import { IUserListResponse } from "@/types/User";
import { IUpdatePassword } from "@/types/Profile";

const userDetail = new ListService();

export const USER = {
  LIST: "user-list",
  DETAIL: "user-detail",
  USER: "user",
};

export const useGetAllUserDataQuery = (params: IGetUserParams) => {
  return useQuery<IUserListResponse>({
    queryKey: [USER.LIST, params],
    queryFn: () => userDetail.getAllUser(params),
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
    mutationFn: ({ id, input }) => userDetail.updateUser(id, input),
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
    queryFn: () => userDetail.getUserById(params.id),
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
    mutationFn: ({ id }) => userDetail.deleteUser(id),
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
    mutationFn: ({ id, input }) => userDetail.addUser(id, input),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Update user failed:", error);
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
    mutationFn: ({ id, input }) => userDetail.updateUserStatus(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER.LIST] });
    },
    onError: (error) => {
      console.error("Update Expert failed:", error);
    },
  });
};

export const useUpdatePasswordMutation = (): UseMutationResult<
  Awaited<ReturnType<typeof userDetail.updatePassword>>,
  Error,
  { payload: IUpdatePassword; token: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }) => userDetail.updatePassword(payload),
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
    mutationFn: ({ input }) => userDetail.resendInvitation(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER.LIST] });
    },
    onError: (error) => {
      console.error("Update user failed:", error);
    },
  });
};
