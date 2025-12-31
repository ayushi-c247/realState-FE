import React from "react";

import { IconParentProps } from "@/constants/validationSchemas/frontSide/svgPropsTypes";

const IconTrash: React.FC<IconParentProps> = ({ size = 30, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.5 6.6H6.27778M6.27778 6.6H20.5M6.27778 6.6V19.2C6.27778 19.6774 6.46508 20.1352 6.79848 20.4728C7.13187 20.8104 7.58406 21 8.05556 21H16.9444C17.4159 21 17.8681 20.8104 18.2015 20.4728C18.5349 20.1352 18.7222 19.6774 18.7222 19.2V6.6M8.94444 6.6V4.8C8.94444 4.32261 9.13175 3.86477 9.46514 3.52721C9.79854 3.18964 10.2507 3 10.7222 3H14.2778C14.7493 3 15.2015 3.18964 15.5349 3.52721C15.8683 3.86477 16.0556 4.32261 16.0556 4.8V6.6M10.7222 11.1V16.5M14.2778 11.1V16.5"
        stroke="#EA3535"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconTrash;
