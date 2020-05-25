import React, { useContext, useEffect } from "react";

import { AppContext } from "../../context/appProvider";

export default function Landing() {
  const {
    actions: { fetchPosters },
    state: { posters },
  } = useContext(AppContext);
  console.log("what we got? ", posters);
  useEffect(() => {
    fetchPosters();
  }, [fetchPosters]);

  return <h1>Landing</h1>;
}
