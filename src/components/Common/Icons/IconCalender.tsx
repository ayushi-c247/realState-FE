import React from "react";

import { UserIconProps } from "@/types/User/Details";

const IconCalender: React.FC<UserIconProps> = ({ size = 30, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.4237 6.60156H7.57467C5.94561 6.60156 4.625 7.92217 4.625 9.55123V16.9254C4.625 18.5545 5.94561 19.8751 7.57467 19.8751H16.4237C18.0527 19.8751 19.3734 18.5545 19.3734 16.9254V9.55123C19.3734 7.92217 18.0527 6.60156 16.4237 6.60156Z"
        stroke="#64748B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.04951 5.125V8.07467M14.9488 5.125V8.07467M4.625 11.0243H19.3734"
        stroke="#64748B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconCalender;
