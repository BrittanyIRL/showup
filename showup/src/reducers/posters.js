export const POSTER_ACTION_TYPES = {
  LOADING_POSTERS: "LOADING_POSTERS",
  FETCH_POSTERS_SUCCESS: "FETCH_POSTERS_SUCCESS",
  FETCH_POSTERS_FAILURE: "FETCH_POSTERS_FAILURE",
};

export const defaultPostersState = {
  isLoading: false,
  posters: [],
  error: null,
};

export default function posterReducer(state, action) {
  switch (action.type) {
    case POSTER_ACTION_TYPES.LOADING_POSTERS: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case POSTER_ACTION_TYPES.FETCH_POSTERS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case POSTER_ACTION_TYPES.FETCH_POSTERS_SUCCESS: {
      return {
        ...state,
        posters: action.payload,
      };
    }

    default:
      return state;
  }
}
