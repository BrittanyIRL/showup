import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { AuthContext } from "../../context/authProvider";
import { Contributor, Landing, Login, Signup } from "../";

const PrivateRoute = ({ component, ...options }) => {
  const {
    state: { isAuthenticated },
  } = useContext(AuthContext);

  const finalComponent = isAuthenticated ? component : Login;

  return <Route {...options} component={finalComponent} />;
};

const Router = () => (
  <Switch>
    <Route path="/" exact={true} render={() => <Landing />} />
    <Route path="/login" render={() => <Login />} />
    <Route path="/signup" render={() => <Signup />} />
    <PrivateRoute path="/contributor" render={() => <Contributor />} />
  </Switch>
);

export default Router;
