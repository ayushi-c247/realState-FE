import React, { ReactNode } from "react";

import CreatePassword from "@/components/Pages/CreatePassword/Layout";

function CreatePasswordLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <CreatePassword>{children}</CreatePassword>;
}

export default CreatePasswordLayout;
