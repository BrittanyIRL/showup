import React, { createContext, useMemo } from "react";
import PropTypes from "prop-types";

import usePostersApi from "./usePostersApi";

export const AppContext = createContext({ state: {}, actions: {} });

export default function AppProvider({ children }) {
  const { state, api } = usePostersApi();

  const value = useMemo(() => {
    return {
      state,
      actions: api,
    };
  }, [api, state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node,
};
