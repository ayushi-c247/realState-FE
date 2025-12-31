"use client";

import { Title } from "@mantine/core";
import { useAuth } from "@/lib/Contexts/AuthProvider";
import { USER_ROLE } from "@/constants";

import { InvestorProfileForm } from "./InvestorProfile";
import { AgentProfileForm } from "./AgentProfile";
import { useTranslations } from "next-intl";

export default function SetProfilePage() {
  const { userData } = useAuth();
  const tAuth = useTranslations("userManagement");
  return (
    <>
      <Title ta="center" mb={24}>
        {tAuth("profile.title")}
      </Title>

      {userData?.role === USER_ROLE.INVESTOR ? (
        <InvestorProfileForm />
      ) : (
        <AgentProfileForm />
      )}
    </>
  );
}
