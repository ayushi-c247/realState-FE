import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/Pages/Auth/ResetPassword";

export default async function ResetPasswordPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) redirect("/dashboard");
  return <ResetPasswordForm />;
}

