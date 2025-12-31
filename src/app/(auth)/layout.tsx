import React, { ReactNode } from "react";

import LoginLayout from "@/components/Pages/Login/Layout";

function CommonLoginLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <LoginLayout>{children}</LoginLayout>;
}

export default CommonLoginLayout;
