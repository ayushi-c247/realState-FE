import React from "react";
import { UserIconProps } from "@/types/User/Details";

const IconRefresh: React.FC<UserIconProps> = ({ size = 21, color, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.91392 5.98793C4.00823 4.0993 5.75161 2.67272 7.81945 1.97382C9.8873 1.27492 12.1387 1.35134 14.1544 2.18885C16.1701 3.02635 17.8127 4.56786 18.7764 6.52635C19.7401 8.48484 19.9593 10.7268 19.393 12.8349C18.8267 14.9429 17.5136 16.7733 15.6983 17.9852C13.8829 19.1972 11.6889 19.7081 9.52487 19.4228C7.36083 19.1375 5.37422 18.0755 3.93494 16.4345C2.49565 14.7935 1.70179 12.6853 1.70117 10.5025"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.32616 6.00244H2.82617V1.50244"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconRefresh;
