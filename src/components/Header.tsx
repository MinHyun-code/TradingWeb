import React from "react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"; // heroicons에서 아이콘 가져오기
import { useTheme } from "@/ThemeProvider";

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="px-8 py-4 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            <Link to="/">Trading</Link>
          </h1>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/interest"
              className="font-semibold text-blue-900 dark:text-white"
            >
              관심종목
            </Link>
            <Link
              to="/idea"
              className="font-semibold text-blue-900 dark:text-white"
            >
              아이디어
            </Link>
            <Link
              to="/news"
              className="font-semibold text-blue-900 dark:text-white"
            >
              뉴스
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-8">
          <Link
            to="/login"
            className="font-semibold text-blue-900 dark:text-white"
          >
            Log In
          </Link>
          <Link
            to="/signUp"
            className="font-semibold text-blue-900 dark:text-white"
          >
            Sign Up
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-gray-800 text-white dark:bg-gray-300 dark:text-gray-800"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
