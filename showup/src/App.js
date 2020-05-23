import React, { StrictMode } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import theme from "./theme";

export const GlobalStyle = createGlobalStyle`
	*,
	*::after,
	*::before {
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.temporaryThing.foo};
    }
  
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StrictMode>
        <h1>Hola Mundo</h1>
      </StrictMode>
    </ThemeProvider>
  );
}

export default App;
