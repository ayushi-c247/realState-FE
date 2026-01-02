import React from "react";

interface DashboardIconProps {
  color?: string;
  size?: number;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({ color = "currentColor", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.1875 12.375V18M12.375 15.1875H18M4.875 8.625H6.75C7.78553 8.625 8.625 7.78553 8.625 6.75V4.875C8.625 3.83947 7.78553 3 6.75 3H4.875C3.83947 3 3 3.83947 3 4.875V6.75C3 7.78553 3.83947 8.625 4.875 8.625ZM14.25 8.625H16.125C17.1605 8.625 18 7.78553 18 6.75V4.875C18 3.83947 17.1605 3 16.125 3H14.25C13.2145 3 12.375 3.83947 12.375 4.875V6.75C12.375 7.78553 13.2145 8.625 14.25 8.625ZM4.875 18H6.75C7.78553 18 8.625 17.1605 8.625 16.125V14.25C8.625 13.2145 7.78553 12.375 6.75 12.375H4.875C3.83947 12.375 3 13.2145 3 14.25V16.125C3 17.1605 3.83947 18 4.875 18Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DashboardIcon;
