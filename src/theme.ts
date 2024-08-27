import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  // 기본 테마 설정
  styles: {
    global: {
      body: {
        fontFamily: "-apple-system",
      },
    },
  },
});

export default theme;
