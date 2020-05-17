import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_STATE,
  RESET_STATE,
} from "./../actionTypes/registerAccountTypes";

const initialState = {
  registrationAccountDetails: [],
  isRegistrationSuccess: false,
  registrationSuccessToken: null,
  registrationError: "",
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationSuccessToken: action.payload,
        isRegistrationSuccess: true,
        registrationError: "",
      };
      break;

    case REGISTRATION_FAILED:
      return {
        ...state,
        registrationAccountDetails: [],
        registrationError: action.payload,
        isRegistrationSuccess: false,
      };
      break;

    case REGISTRATION_STATE:
      return state;
      break;

    case RESET_STATE:
      return initialState;
      break;

    default:
      return state;
  }
};

export default registrationReducer;
