import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <Box flex="1" p={4}>
      <Outlet />
    </Box>
  );
};

export default Main;
