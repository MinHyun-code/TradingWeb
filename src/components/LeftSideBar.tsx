import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menuData = {
  news: [
    { name: "매일경제", value: "mk" },
    { name: "코인데스크", value: "coindesk" },
    { name: "코인텔레그래프", value: "cointelegraph" },
  ],
  home: [{ name: "코인텔레그래프", value: "cointelegraph" }],
};

const LeftSideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  // 경로에서 첫 번째 슬래시 이후의 부분 추출
  const basePath = currentPath.split("/")[1];

  // 현재 경로에 따라 표시할 메뉴 항목 결정
  const currentMenu = React.useMemo(() => {
    if (basePath) {
      return menuData.news;
    }
    return menuData.home; // 기본 메뉴 항목
  }, [basePath]);

  // 현재 경로와 버튼의 URL이 같은지 여부를 확인하는 함수
  const isActive = (value: string) => {
    return currentPath === `/${basePath}/${value}`;
  };

  return (
    <div>
      {/* PC */}
      <aside
        className={`hidden md:block p-4 ${basePath ? "w-40" : "w-32"}`} // 모바일에서는 숨기기, 큰 화면에서는 고정 너비
      >
        <div className="flex flex-col space-y-4">
          {currentMenu.map((item) => (
            <button
              key={item.value}
              className={`text-left font-semibold ${
                isActive(item.value)
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500"
              }`}
              onClick={() => navigate("/" + basePath + "/" + item.value)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </aside>

      {/* 모바일 */}
      <div className="block md:hidden w-full">
        <div className="flex justify-evenly">
          {currentMenu.map((item) => (
            <button
              key={item.value}
              className={`font-medium ${
                isActive(item.value)
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500"
              }`}
              onClick={() => navigate("/" + basePath + "/" + item.value)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
