import React from "react";

import { UserIconProps } from "@/types/User/Details";

const IconTime: React.FC<UserIconProps> = ({ size = 30, ...props }) => {
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
        d="M12.2031 4.5C7.78646 4.5 4.20312 8.08333 4.20312 12.5C4.20312 16.9167 7.78646 20.5 12.2031 20.5C16.6198 20.5 20.2031 16.9167 20.2031 12.5C20.2031 8.08333 16.6198 4.5 12.2031 4.5Z"
        stroke="#64748B"
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <path
        d="M12.2031 7.16797V13.168H16.2031"
        stroke="#64748B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconTime;
