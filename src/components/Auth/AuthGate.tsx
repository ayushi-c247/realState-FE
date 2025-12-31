"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Common/Loaders/Loader";
import { useAuth } from "@/lib/Contexts/AuthProvider";
import { paths } from "@/routes";
import { USER_ROLE, UserStatus } from "@/constants";

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { isAuthorized, isLoading, userData } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // Not logged in → login
    if (!isAuthorized) {
      router.replace(paths.ROOT_LOGIN);
      return;
    }

    if (!userData) return;

    const { role, status } = userData;

    // ✅ Admin → always dashboard
    if (role === USER_ROLE.ADMIN) {
      if (pathname !== paths.ROOT_DASHBOARD) {
        router.replace(paths.ROOT_DASHBOARD);
      }
      return;
    }

    // Investor / Agent → profile pending
    if (
      (role === USER_ROLE.INVESTOR || role === USER_ROLE.AGENT) &&
      status === UserStatus.pending
    ) {
      if (pathname !== paths.ROOT_PROFILE) {
        router.replace(paths.ROOT_PROFILE);
      }
      return;
    }

    //Profile completed → dashboard
    if (status === UserStatus.active) {
      if (pathname !== paths.ROOT_DASHBOARD) {
        router.replace(paths.ROOT_DASHBOARD);
      }
    }
  }, [isAuthorized, isLoading, userData, pathname, router]);

  // Loader while deciding
  if (isLoading || !isAuthorized) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthGate;
