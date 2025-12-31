import React from "react";

import { UserIconProps } from "@/types/User/Details";

const IconCheck: React.FC<UserIconProps> = ({ size = 30, ...props }) => {
  return (
    <svg
      width={size}
      height="10"
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.83398 4.69076L5.16732 8.02409L11.834 1.35742"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconCheck;
