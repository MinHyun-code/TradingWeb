import React from "react";
import { Box, VStack, Button, Flex, HStack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

const menuData = {
  news: [
    { name: "매일경제", value: "mk" },
    { name: "코인데스크", value: "coindesk" },
    { name: "코인텔레그래프", value: "cointelegraph" },
  ],
  home: [{ name: "코인텔레그래프", value: "cointelegraph" }],
};

const LeftSideBar = () => {
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

  // 색상 모드에 따라 버튼 색상 설정
  const activeColor = useColorModeValue("teal.500", "teal.300");
  const inactiveColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box>
      {/* PC */}
      <Box
        as="aside"
        width={{ base: "full", md: "150px" }} // 모바일에서는 전체 너비, 큰 화면에서는 고정 너비
        p={4}
        display={{ base: "none", md: "block" }} // 모바일에서는 숨기기
      >
        <VStack spacing={4} align="start">
          {currentMenu.map((item, index) => (
            <Button
              key={index}
              variant="link"
              color={isActive(item.value) ? activeColor : inactiveColor}
              onClick={() => navigate("/" + basePath + "/" + item.value)}
            >
              {item.name}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* 모바일 */}
      <Box width="full" display={{ base: "block", md: "none" }}>
        <HStack spacing={4} align="start" justifyContent="space-evenly">
          {currentMenu.map((item, index) => (
            <Button
              key={index}
              variant="link"
              color={isActive(item.value) ? activeColor : inactiveColor}
              onClick={() => navigate("/" + basePath + "/" + item.value)}
            >
              {item.name}
            </Button>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
