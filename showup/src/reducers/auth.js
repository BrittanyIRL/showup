export const AUTH_ACTION_TYPES = {
  LOADING_AUTH: "LOADING_AUTH",
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SIGN_UP_FAILURE: "SIGNUP_FAILURE",
  SIGN_IN_FAILURE: "SIGN_IN_FAILURE",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILURE: "SIGN_OUT_FAILURE",
};

export const defaultAuthState = {
  currentUser: {},
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
};

export default function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: Boolean(action.payload?.refreshToken),
      };
    }

    case AUTH_ACTION_TYPES.LOADING_AUTH: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case AUTH_ACTION_TYPES.SIGN_UP_FAILURE:
    case AUTH_ACTION_TYPES.SIGN_IN_FAILURE:
    case AUTH_ACTION_TYPES.SIGN_OUT_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.message,
        isExistingUser: action.payload.isExistingUser,
      };
    }

    case AUTH_ACTION_TYPES.SIGN_UP_SUCCESS:
    case AUTH_ACTION_TYPES.SIGN_IN_SUCCESS: {
      return {
        ...state,
        errorMessage: "",
        isAuthenticated: true,
      };
    }

    case AUTH_ACTION_TYPES.SIGN_OUT_SUCCESS: {
      return state;
    }

    default: {
      return state;
    }
  }
}
