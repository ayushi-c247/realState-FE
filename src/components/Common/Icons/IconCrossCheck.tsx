import React from "react";
import { UserIconProps } from "@/types/User/Details";

const IconCrossCheck: React.FC<UserIconProps> = ({ size = 21, color, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" width="20" height="20" rx="10" fill="#FFEBEB" />
      <path
        d="M14.5 6L6.5 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 6L14.5 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconCrossCheck;
