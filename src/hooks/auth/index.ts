import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { useAuth } from "@/lib/Contexts/AuthProvider";
import { AuthService } from "@/services/auth/AuthService";
import { ILoginFormValues, ILoginResponse } from "@/types/Login";
import {
  IActivateUserPayload,
  IActivateUserResponse,
} from "@/types/ResetPassword";

import UtilCookieService from "@/utils/tools/cookie-service";
import UtilLocalService from "@/utils/tools/localstorage";
import { getInitialState, setInitialState } from "@/utils/tools/token-service";
import { UserStatus } from "@/constants";

const PUBLIC_ROUTES = ["/login"];

const auth = new AuthService();

const AUTH_KEY = {
  CURRENT_USER: "currentUser",
};

export const useCurrentUserQuery = () => {
  const pathname = usePathname();
  const token = getInitialState("token");

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const shouldFetch = !!token && !isPublicRoute;

  return useQuery({
    queryKey: [AUTH_KEY.CURRENT_USER],
    queryFn: () => auth.getCurrentUser(),
    enabled: shouldFetch,
    refetchOnWindowFocus: false,
  });
};

export const useLoginMutation = (): UseMutationResult<
  ILoginResponse,
  Error,
  ILoginFormValues
> => {
  const { authorize } = useAuth();
  return useMutation({
    mutationFn: (input: ILoginFormValues) => auth.login(input),
    onSuccess: async (data: any) => {
      UtilLocalService.removeLocalStorage("token");
      UtilLocalService.setLocalStorage("token", data?.data?.token);
      UtilCookieService.setCookie("token", data?.data?.token);
      UtilCookieService.setCookie("role", data?.data?.role);
      setInitialState(data.data);
      authorize(data.data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useLogoutMutation = () => {
  const { unauthorize } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => auth.logout(),
    onSuccess: async () => {
      unauthorize();
      // Clear authentication data
      UtilLocalService.removeLocalStorage("token");
      UtilCookieService.removeCookie("token");
      UtilCookieService.removeCookie("role");

      queryClient.clear();
    },
  });
};

export const useResetPasswordMutation = (): UseMutationResult<
  IActivateUserResponse,
  Error,
  IActivateUserPayload
> => {
  const { authorize } = useAuth();
  return useMutation({
    mutationFn: (payload: IActivateUserPayload) => auth.resetPassword(payload),
    onSuccess: (data: IActivateUserResponse) => {
      if (data.success && data.data) {
        if (data.data.status === UserStatus.pending) {
          // Save token and user data to localStorage and cookies
          UtilLocalService.setLocalStorage("token", data.data.token);
          UtilCookieService.setCookie("token", data.data.token);
          UtilCookieService.setCookie("role", data.data.role);
          // Save user data to localStorage
          setInitialState({
            email: data.data.email,
            first_name: data.data.first_name,
            last_name: data.data.last_name,
            role: data.data.role,
          });
          // Authorize user in auth context
          authorize({
            id: data.data.id,
            role: data.data.role,
            email: data.data.email,
            full_name: data.data.full_name,
            first_name: data.data.first_name,
            last_name: data.data.last_name,
            status: data.data.status,
          });
        }
      }
    },
    onError: (error) => {
      console.error("Password reset failed:", error);
    },
  });
};

export const useForgotPasswordMutation = (): UseMutationResult<
  Awaited<ReturnType<typeof auth.forgotPassword>>,
  Error,
  { email: string }
> => {
  return useMutation({
    mutationFn: ({ email }) => auth.forgotPassword({ email }),
    onError: (error) => {
      console.error("Forgot password failed:", error);
    },
  });
};
