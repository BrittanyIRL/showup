import React, { StrictMode, Suspense } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import { Navigation, Router } from "./views";
import theme from "./theme";
import AppProvider from "./context/appProvider";
import AuthProvider from "./context/authProvider";

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
        <BrowserRouter>
          <AuthProvider>
            <AppProvider>
              <Suspense>
                <Router />
                <Navigation />
              </Suspense>
            </AppProvider>
          </AuthProvider>
        </BrowserRouter>
      </StrictMode>
    </ThemeProvider>
  );
}

export default App;
