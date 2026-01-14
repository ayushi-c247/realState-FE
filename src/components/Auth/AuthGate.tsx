"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Common/Loaders/Loader";
import { useAuth } from "@/lib/Contexts/AuthProvider";
import { paths } from "@/routes";
import { USER_ROLE, UserStatus } from "@/constants";
import { AgentApprovalStatusEnum } from "@/types/User";
import { useLogoutMutation } from "@/hooks/auth";

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { isAuthorized, isLoading, userData } = useAuth();
  const { mutateAsync: logout } = useLogoutMutation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthorized) {
      router.replace(paths.ROOT_LOGIN);
      return;
    }

    if (!userData) return;
    const { role, status } = userData;

    if (
      role === USER_ROLE.AGENT &&
      status === UserStatus.active &&
      userData?.agent_profile &&
      userData.agent_profile?.approval_status ===
        AgentApprovalStatusEnum.PENDING
    ) {
      logout();
    }
    if (
      (role === USER_ROLE.INVESTOR || role === USER_ROLE.AGENT) &&
      status === UserStatus.pending
    ) {
      router.replace(paths.ROOT_PROFILE);
      return;
    }
    if (
      (USER_ROLE.INVESTOR == role ||
        USER_ROLE.ADMIN === role ||
        (USER_ROLE.AGENT === role &&
          userData?.agent_profile?.approval_status ===
            AgentApprovalStatusEnum.APPROVED)) &&
      status === UserStatus.active
    ) {
      if (pathname === paths.ROOT_PROFILE) {
        router.replace(paths.ROOT_DASHBOARD);
      }
      return;
    }
  }, [isAuthorized, isLoading, userData, pathname, router]);

  // Loader while deciding
  if (isLoading || !isAuthorized) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthGate;
