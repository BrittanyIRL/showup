import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <ul>
      <li>
        {" "}
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/contributor">Contributor (temp)</Link>
      </li>
    </ul>
  );
}
