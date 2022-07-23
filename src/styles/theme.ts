import { type ThemeConfig } from "@chakra-ui/react";
import type { GlobalStyleProps } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
  disableTransitionOnChange: false,
};

const theme = {
  styles: {
    global: (props: GlobalStyleProps) => ({
      "html, body, #root, #root>div": {
        width: "100%",
        bg: props.colorMode === "dark" ? "gray.800" : "gray.50",
      },
      header: {
        bg: props.colorMode === "dark" ? "gray.800" : "gray.50",
      },
      footer: {
        bg: props.colorMode === "dark" ? "gray.700" : "white",
      },
      "*": {
        transition: "background-color .3s linear",
      },
    }),
  },
  config,
};

export default theme;
