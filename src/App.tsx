import React from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "./styles/theme";
import Simulator from "./Simulator";

const appTheme = extendTheme(theme);

function App() {
  return (
    <ChakraProvider theme={appTheme}>
      <Simulator />
    </ChakraProvider>
  );
}

export default App;
