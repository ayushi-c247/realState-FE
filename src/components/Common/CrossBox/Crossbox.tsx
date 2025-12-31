import React from 'react';
const CrossBoxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
    className="choiceChecked"
  >
    <rect
      x="2"
      y="2"
      width="16"
      height="16"
      stroke="black"
      strokeWidth="1"
      fill="white"
      shapeRendering="crispEdges"
    />
    <line
      x1="2"
      y1="2"
      x2="18"
      y2="18"
      stroke="black"
      strokeWidth="1"
      className="cross-x"
    />
    <line
      x1="18"
      y1="2"
      x2="2"
      y2="18"
      stroke="black"
      strokeWidth="1"
      className="cross-x"
    />
  </svg>
);

export default CrossBoxIcon;