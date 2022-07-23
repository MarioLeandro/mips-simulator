import React from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "./styles/theme";
import Fon from "./Fon";

const appTheme = extendTheme(theme);

function App() {
  return (
    <ChakraProvider theme={appTheme}>
      <Fon />
    </ChakraProvider>
  );
}

export default App;
