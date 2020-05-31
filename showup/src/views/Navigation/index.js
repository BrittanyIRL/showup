import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authProvider";

export default function Navigation() {
  const {
    actions: { submitSignOut },
    state: { isAuthenticated },
  } = useContext(AuthContext);

  return (
    <>
      <ul>
        <li>
          {" "}
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/contributor">Contributor (temp)</Link>
            </li>
            <li>
              <button onClick={submitSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
}
