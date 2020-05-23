import React, { StrictMode } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navigation } from "./views";
import { routes } from "./routes";
import theme from "./theme";

export const GlobalStyle = createGlobalStyle`
	*,
	*::after,
	*::before {
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.temporaryThing.foo};
    }
  
`;

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <StrictMode>
        <Router>
          <div>
            <Navigation />

            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </div>
        </Router>
      </StrictMode>
    </ThemeProvider>
  );
}

export default App;
