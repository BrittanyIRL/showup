import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/authProvider";

export default function Contributor() {
  let history = useHistory();

  const {
    state: { isAuthenticated, currentUser },
    actions: { getCurrentUser },
  } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <>
      <h1>Contributor</h1>
      <p>lajdlfkjaldfkjalkfdjalkfd</p>
    </>
  );
}
