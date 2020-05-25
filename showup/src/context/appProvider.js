import React, { createContext, useMemo } from "react";
import PropTypes from "prop-types";

import usePostersApi from "./usePostersApi";

export const AppContext = createContext({ state: {}, actions: {} });

export default function AppProvider({ children }) {
  const postersApi = usePostersApi();

  const value = useMemo(
    () => ({
      state: postersApi.state,
      actions: postersApi.api,
    }),
    [postersApi]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node,
};
