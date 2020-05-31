import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthForm from "../../organisms/auth-form";
import { AuthContext } from "../../context/authProvider";

export default function Signup() {
  let history = useHistory();
  const {
    state: { errorMessage, isAuthenticated, isExistingUser },
    actions: { submitSignUp },
  } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/contributor");
    }
  }, [history, isAuthenticated]);

  return (
    <>
      <h1>Signup</h1>
      <AuthForm handleSubmit={submitSignUp} />
      {errorMessage && <p>{errorMessage}</p>}
      {isExistingUser && <Link to="/login">Log in with existing account</Link>}
    </>
  );
}
