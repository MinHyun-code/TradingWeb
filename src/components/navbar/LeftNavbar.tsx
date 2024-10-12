import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/ThemeProvider";

interface MenuData {
  idea: MenuItem[];
  home: MenuItem[];
}

interface MenuItem {
  name: string;
  value: string;
  svg: React.ReactNode;
}

const menuData: MenuData = {
  idea: [
    {
      name: "아이디어",
      value: "",
      svg: (
        <path d="M3 3h18v16H11l-4 4v-4H3V3zm5.222 4.67c4.143 0 7.501 3.358 7.501 7.5h2a9.5 9.5 0 00-9.5-9.5v2zm3.5 7.5a3.5 3.5 0 00-3.5-3.5v-2a5.5 5.5 0 015.5 5.5h-2zm-3.5 1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      ),
    },
    {
      name: "피드",
      value: "/feed",
      svg: (
        <path d="M9 4h11.5v12a4 4 0 01-4 4H8a3.5 3.5 0 01-3.5-3.5V10H9V4zm0 8.5H7v4a1 1 0 102 0v-4zM11.758 7h6v2h-6V7zm6 4h-6v2h6v-2z" />
      ),
    },
  ],
  home: [{ name: "home", value: "", svg: "" }],
};

const LeftNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useTheme();

  const currentPath = location.pathname;

  // 경로에서 첫 번째 슬래시 이후의 부분 추출
  const basePath = currentPath.split("/")[1];

  // 현재 경로에 따라 표시할 메뉴 항목 결정
  const currentMenu = React.useMemo(() => {
    if (basePath === "idea") {
      return menuData.idea;
    }
    return menuData.home; // 기본 메뉴 항목
  }, [basePath]);

  // 현재 경로와 버튼의 URL이 같은지 여부를 확인하는 함수
  const isActive = (value: string) => {
    if (value === "") {
      return currentPath === `/${basePath}`;
    }
    return currentPath === `/${basePath}${value}`;
  };

  const menuMove = (value: string) => {
    navigate(`/${basePath}` + value);
  };

  return (
    <div>
      <div className="block w-full">
        <div className="flex flex-col">
          {currentMenu.map((item) => (
            <a
              key={item.value}
              className={`font-semibold text-left items-center px-6 py-3 rounded-lg mb-3 flex cursor-pointer ${
                isActive(item.value)
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500"
              }`}
              onClick={() => menuMove(item.value)}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill={isActive(item.value) ? (darkMode ? "#ffffff" : "") : "#64748b"} 
                >
                  {item.svg}
                </svg>
              </div>
              <div className="ml-3">{item.name}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
