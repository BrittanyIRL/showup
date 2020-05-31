import { useCallback, useMemo, useReducer } from "react";
import {
  getFirebaseCurrentUser,
  getFirebaseSignIn,
  getFirebaseSignUp,
  getFirebaseSignOut,
} from "./useFirebase";
import authReducer, { defaultAuthState, AUTH_ACTION_TYPES } from "../reducers/auth";

const useAuthApi = () => {
  const [state, dispatch] = useReducer(authReducer, defaultAuthState);

  const getCurrentUser = useCallback(async () => {
    try {
      const { email, refreshToken, uid } = await getFirebaseCurrentUser();

      if (state.currentUser?.refreshToken !== refreshToken) {
        dispatch({
          type: AUTH_ACTION_TYPES.SET_CURRENT_USER,
          payload: { email, refreshToken, uid },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const submitSignIn = useCallback(async ({ email, password }) => {
    dispatch({
      type: AUTH_ACTION_TYPES.LOADING_AUTH,
      payload: true,
    });

    try {
      await getFirebaseSignIn({ email, password });

      dispatch({
        type: AUTH_ACTION_TYPES.SIGN_IN_SUCCESS,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: AUTH_ACTION_TYPES.SIGN_IN_FAILURE,
        payload: { message: err.message },
      });
    } finally {
      dispatch({
        type: AUTH_ACTION_TYPES.LOADING_AUTH,
        payload: false,
      });
    }
  }, []);

  const submitSignUp = useCallback(async ({ email, password }) => {
    dispatch({
      type: AUTH_ACTION_TYPES.LOADING_AUTH,
      payload: true,
    });

    try {
      await getFirebaseSignUp({ email, password });

      dispatch({
        type: AUTH_ACTION_TYPES.SIGN_UP_SUCCESS,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: AUTH_ACTION_TYPES.SIGN_UP_FAILURE,
        payload: {
          message: err.message,
          isExistingUser: err.code === "auth/email-already-in-use",
        },
      });
    } finally {
      dispatch({
        type: AUTH_ACTION_TYPES.LOADING_AUTH,
        payload: false,
      });
    }
  }, []);

  const submitSignOut = useCallback(async () => {
    dispatch({
      type: AUTH_ACTION_TYPES.LOADING_AUTH,
      payload: true,
    });

    try {
      await getFirebaseSignOut();

      dispatch({
        type: AUTH_ACTION_TYPES.SIGN_OUT_SUCCESS,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: AUTH_ACTION_TYPES.SIGN_OUT_FAILURE,
        payload: { message: err.message },
      });
    } finally {
      dispatch({
        type: AUTH_ACTION_TYPES.LOADING_AUTH,
        payload: false,
      });
    }
  }, []);

  const api = useMemo(
    () => ({
      getCurrentUser,
      submitSignIn,
      submitSignUp,
      submitSignOut,
    }),
    [getCurrentUser, submitSignIn, submitSignUp, submitSignOut]
  );

  return { api, state };
};

export default useAuthApi;
