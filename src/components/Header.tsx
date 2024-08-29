import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link as ChakraLink,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const headingSize = useBreakpointValue({
    base: "md",
    sm: "md",
    md: "lg",
    lg: "lg",
    xl: "lg",
  });

  return (
    <Box as="header" color="white" px={8} py={4}>
      <Flex align="center" justify="space-between">
        <HStack spacing={8}>
          <Heading size={headingSize} color="purple.500" mr={7}>
            <ChakraLink as={Link} to="/">
              Trading
            </ChakraLink>
          </Heading>
          {isDesktop && (
            <>
              <ChakraLink
                as={Link}
                to="/interest"
                sx={{ color: colorMode === "dark" ? "white" : "black" }}
                fontWeight="500"
              >
                관심종목
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/idea"
                sx={{ color: colorMode === "dark" ? "white" : "black" }}
                fontWeight="500"
              >
                아이디어
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/news"
                sx={{ color: colorMode === "dark" ? "white" : "black" }}
                fontWeight="500"
              >
                뉴스
              </ChakraLink>
            </>
          )}
        </HStack>
        <HStack spacing={8}>
          <ChakraLink
            as={Link}
            to="/login"
            sx={{ color: colorMode === "dark" ? "white" : "black" }}
            fontWeight="500"
          >
            Log In
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/signUp"
            sx={{ color: colorMode === "dark" ? "white" : "black" }}
            fontWeight="500"
          >
            Sign Up
          </ChakraLink>
          <Button
            onClick={toggleColorMode}
            variant="outline"
            colorScheme="teal"
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
