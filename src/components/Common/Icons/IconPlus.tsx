import React from "react";

import { UserIconProps } from "@/types/User/Details";

const IconMorePlus: React.FC<UserIconProps> = ({ size = 30, ...props }) => {
  return (
    <svg
      width={size}
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M36 24V48"
        stroke="#FF9A00"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 36H48"
        stroke="#FF9A00"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconMorePlus;
