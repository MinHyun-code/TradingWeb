import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
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
    <Box as="header" color="white" px={4} py={2}>
      <Flex align="center" justify="space-between">
        <Heading size={headingSize} color="purple.500">
          Trading
        </Heading>
        <HStack spacing={4}>
          {isDesktop && (
            <>
              <Link href="#" fontWeight="bold">
                Home
              </Link>
              <Link href="#" fontWeight="bold">
                About
              </Link>
              <Link href="#" fontWeight="bold">
                Contact
              </Link>
            </>
          )}
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
