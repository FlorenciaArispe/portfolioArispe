import React from "react";

const ScrollDownArrow = () => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-bounce"
      >
        <path d="M5 9l7 7 7-7" />
      </svg>
    </div>
  );
};

export default ScrollDownArrow;
