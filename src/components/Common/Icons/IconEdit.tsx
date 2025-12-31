import React from "react";

import { IconParentProps } from "@/constants/validationSchemas/frontSide/svgPropsTypes";

const IconEdit: React.FC<IconParentProps> = ({ size = 30, ...props }) => {
  return (
    <svg
      width={size}
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.6566 5.68682H6.09035C5.66857 5.68682 5.26405 5.85438 4.9658 6.15263C4.66755 6.45088 4.5 6.85539 4.5 7.27718V18.4096C4.5 18.8314 4.66755 19.2359 4.9658 19.5342C5.26405 19.8324 5.66857 20 6.09035 20H17.2228C17.6446 20 18.0491 19.8324 18.3474 19.5342C18.6456 19.2359 18.8132 18.8314 18.8132 18.4096V12.8434M17.6204 4.49406C17.9368 4.17772 18.3658 4 18.8132 4C19.2605 4 19.6896 4.17772 20.0059 4.49406C20.3223 4.8104 20.5 5.23945 20.5 5.68682C20.5 6.1342 20.3223 6.56325 20.0059 6.87959L12.4518 14.4338L9.27106 15.2289L10.0662 12.0482L17.6204 4.49406Z"
        stroke="#43ACFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconEdit;
