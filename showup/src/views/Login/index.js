import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthForm from "../../organisms/auth-form";
import { AuthContext } from "../../context/authProvider";

export default function Login() {
  let history = useHistory();
  const {
    state: { isAuthenticated, errorMessage },
    actions: { submitSignIn },
  } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/contributor");
    }
  }, [history, isAuthenticated]);

  return (
    <>
      <h1>Login</h1>
      <AuthForm handleSubmit={submitSignIn} />
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}
