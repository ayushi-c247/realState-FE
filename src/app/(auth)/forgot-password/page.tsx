import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ForgotPassword from "@/components/Pages/Auth/forgot-password";

export default async function ForgotPasswordPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) redirect("/dashboard");
  return <ForgotPassword />;
}


