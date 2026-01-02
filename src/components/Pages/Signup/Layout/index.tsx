import { Card, Center } from "@mantine/core";
import Image from "next/image";
import React from "react";

import logo from "../../../../../public/real-state-logo.png";

function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="login-wrapper">
      {/* Logo fixed at top */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Image
          src={logo}
          alt="RealState logo"
          width={200}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Card vertically centered */}
      <Center style={{ flex: 1 }}>
        <Card
          style={{ width: "470px", zIndex: 10 }}
          shadow="var(--box-shadow)"
          padding="var(--padding-xxl)"
          radius="var(--radius-xl)"
          styles={{
            root: {
              border: "1px solid var(--border-color)",
            },
          }}
        >
          {children}
        </Card>
      </Center>
    </div>
  );
}

export default LoginLayout;
