import Main from "@/components/Main";
import Header from "@/components/Header";
import React from "react";
import LeftSideBar from "@/components/LeftSideBar";
import { Flex, useBreakpointValue } from "@chakra-ui/react";

function LeftSideLayout() {
  // Flex 컨테이너의 최대 너비 설정
  const containerMaxW = useBreakpointValue({
    base: "100%", // 모바일에서는 전체 너비
    md: "90%", // 중간 화면에서는 90% 너비
    lg: "80%", // 큰 화면에서는 80% 너비
    xl: "70%", // 매우 큰 화면에서는 70% 너비
  });

  return (
    <>
      <Header></Header>
      <Flex
        as="main"
        direction={{ md: "row" }} // 모바일에서는 열 방향, 큰 화면에서는 행 방향
        mx="auto" // 좌우 마진을 자동으로 설정하여 중앙 정렬
        maxW={containerMaxW} // 최대 너비 설정
        mt={4} // 상단 여백 추가
      >
        <LeftSideBar></LeftSideBar>
        <Main></Main>
      </Flex>
    </>
  );
}

export default LeftSideLayout;
