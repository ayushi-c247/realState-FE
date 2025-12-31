import React from "react";
import { UserIconProps } from "@/types/User/Details";

const IconRightCheck: React.FC<UserIconProps> = ({ size = 21, color = "#14AE5C", ...props }) => {
  return (
    <svg
      width={size}
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="20" height="20" rx="10" fill={color} />
      <path
        d="M16.0483 7.14026L10.3441 14.8811C10.2081 15.0616 10.0052 15.1798 9.78115 15.2093C9.55706 15.2388 9.33053 15.177 9.15247 15.0378L5.07913 11.7811C4.71969 11.4934 4.66148 10.9689 4.94913 10.6094C5.23678 10.25 5.76135 10.1918 6.1208 10.4794L9.51747 13.1969L14.7066 6.15442C14.8768 5.89908 15.1735 5.75791 15.479 5.78696C15.7844 5.816 16.0492 6.01057 16.1682 6.2934C16.2872 6.57624 16.2411 6.90158 16.0483 7.14026Z"
        fill="white"
      />
    </svg>
  );
};

export default IconRightCheck;
