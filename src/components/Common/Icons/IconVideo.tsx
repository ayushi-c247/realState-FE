import React from "react";
import { UserIconProps } from "@/types/User/Details";

const IconMovie: React.FC<UserIconProps> = ({ size = 26, color = "#8390A2", ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 0.25L21.75 5.5H18.25L16.5 0.25H13.875L15.625 5.5H12.125L10.375 0.25H7.75L9.5 5.5H6L4.25 0.25H3.375C2.67881 0.25 2.01113 0.526562 1.51884 1.01884C1.02656 1.51113 0.75 2.17881 0.75 2.875V15.125C0.75 15.8212 1.02656 16.4889 1.51884 16.9812C2.01113 17.4734 2.67881 17.75 3.375 17.75H22.625C23.3212 17.75 23.9889 17.4734 24.4812 16.9812C24.9734 16.4889 25.25 15.8212 25.25 15.125V0.25H20Z"
        fill={color}
      />
    </svg>
  );
};

export default IconMovie;
