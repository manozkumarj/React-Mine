import {
  SET_TOKEN,
  REMOVE_TOKEN,
  AUTH_STATE,
} from "./../actionTypes/authTypes";

const userToken = localStorage.getItem("authToken");

const initialState = {
  authToken: userToken,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
      break;

    case REMOVE_TOKEN:
      return {
        ...state,
        authToken: null,
      };
      break;

    case AUTH_STATE:
      return {
        ...state,
        authToken: action.payload,
      };
      break;

    default:
      return state;
  }
};

export default authReducer;
