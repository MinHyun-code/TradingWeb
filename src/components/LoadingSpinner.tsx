import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center dark:bg-darkMode z-50" // 화면 전체를 덮는 스타일
    >
      <svg
        className="animate-spin h-12 w-12 text-gray-600" // 스피너 스타일
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M4 12a8 8 0 1 1 8 8 8 8 0 0 1-8-8" />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
