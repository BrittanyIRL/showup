import React, { useContext, useEffect } from "react";

import { AppContext } from "../../context/appProvider";

export default function Landing() {
  const {
    actions: { fetchPosters },
  } = useContext(AppContext);

  useEffect(() => {
    fetchPosters();
  }, [fetchPosters]);

  return <h1>Landing</h1>;
}
