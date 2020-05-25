import { useReducer, useCallback, useMemo } from "react";

import posterReducer, {
  POSTER_ACTION_TYPES,
  defaultPostersState,
} from "../reducers/posters";
import { getDatabaseRef } from "./useFirebase";

function reshapePosterData(poster) {
  return poster;
}

export const usePostersApi = () => {
  const [state, dispatch] = useReducer(posterReducer, defaultPostersState);

  const fetchPosters = useCallback(async () => {
    dispatch({
      type: POSTER_ACTION_TYPES.LOADING_POSTERS,
      payload: true,
    });
    try {
      const postersRef = getDatabaseRef("/posters");

      const snapshot = await postersRef.once("value");

      dispatch({
        type: POSTER_ACTION_TYPES.FETCH_POSTERS_SUCCESS,
        payload: reshapePosterData(snapshot),
      });
    } catch (err) {
      dispatch({
        type: POSTER_ACTION_TYPES.FETCH_POSTERS_FAILURE,
        payload: err,
      });
    } finally {
      dispatch({
        type: POSTER_ACTION_TYPES.LOADING_POSTERS,
        payload: false,
      });
    }
  }, []);

  const api = useMemo(
    () => ({
      fetchPosters,
    }),
    [fetchPosters]
  );

  return { state, api };
};

export default usePostersApi;
