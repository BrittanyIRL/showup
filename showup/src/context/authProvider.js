import React, { createContext, useMemo } from "react";
import PropTypes from "prop-types";

import useAuthApi from "./useAuthApi";

export const AuthContext = createContext({ state: {}, actions: {} });

export default function AuthProvider({ children }) {
  const { state, api } = useAuthApi();

  const value = useMemo(() => {
    return {
      state,
      actions: api,
    };
  }, [state, api]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
