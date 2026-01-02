"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import Loader from "@/components/Common/Loaders/Loader";
import { useAuth } from "@/lib/Contexts/AuthProvider";
import { paths } from "@/routes";

export default function Home() {
  const router = useRouter();
  const { isLoading, isAuthorized } = useAuth();

  useEffect(() => {
    if (isAuthorized && !isLoading) {
      router.push(paths.ROOT_DASHBOARD);
    } else {
      router.push(paths.ROOT_LOGIN);
    }
  }, [isLoading, isAuthorized]);

  return isLoading ? <Loader /> : null;
}
