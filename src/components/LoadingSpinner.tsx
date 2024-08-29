import React from "react";
import { Spinner, Box } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="overlay" // z-index를 설정하여 모든 요소 위에 표시
    >
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" />
    </Box>
  );
};

export default LoadingSpinner;
