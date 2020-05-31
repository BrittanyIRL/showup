import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

export default function AuthForm({ handleSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("values: ", email, password);
      handleSubmit({ email, password });
    },
    [email, password, handleSubmit]
  );

  return (
    <form>
      <label htmlFor="signupEmail">Your Email</label>
      <input
        type="text"
        id="signupEmail"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <label htmlFor="signupPassword">Your Password</label>
      <input
        type="password"
        id="signupPassword"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />

      <button type="submit" onClick={handleSignUpSubmit}>
        Sign Up!
      </button>
    </form>
  );
}

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
