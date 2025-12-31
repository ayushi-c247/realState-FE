import React from "react";

import Layout from "@/components/Common/Layout";
import AuthGate from "@/components/Auth/AuthGate";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
      <AuthGate>
        <Layout>{children}</Layout>
      </AuthGate>
  );
}
