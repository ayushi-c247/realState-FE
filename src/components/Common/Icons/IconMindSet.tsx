import React from "react";

import { IconParentProps } from "@/constants/validationSchemas/frontSide/svgPropsTypes";

const MindSetIcon: React.FC<IconParentProps> = ({ size = 30, ...props }) => {
  return (
    <svg
      width={size}
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5004 9.7957C13.4886 9.7957 15.1004 8.18393 15.1004 6.1957C15.1004 4.20748 13.4886 2.5957 11.5004 2.5957C9.51217 2.5957 7.90039 4.20748 7.90039 6.1957C7.90039 8.18393 9.51217 9.7957 11.5004 9.7957Z"
        stroke="#081021"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6004 20.5961C19.6004 16.1226 15.9738 12.4961 11.5004 12.4961C7.02694 12.4961 3.40039 16.1226 3.40039 20.5961"
        stroke="#081021"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5012 20.5961L13.3012 18.3461L11.5012 12.4961L9.70117 18.3461L11.5012 20.5961Z"
        stroke="#081021"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MindSetIcon;
