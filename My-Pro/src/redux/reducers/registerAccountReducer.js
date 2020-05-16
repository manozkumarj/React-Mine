import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_STATE,
} from "./../actionTypes/registerAccountTypes";

const initialState = {
  registeredAccountDetails: [],
  isRegistrationSuccess: false,
  registrationError: "",
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registeredAccountDetails: action.payload,
        isRegistrationSuccess: true,
        registrationError: "",
      };
      break;

    case REGISTRATION_FAILED:
      return {
        ...state,
        registeredAccountDetails: [],
        registrationError: action.payload,
        isRegistrationSuccess: false,
      };
      break;

    case REGISTRATION_STATE:
      return state;
      break;

    default:
      return state;
  }
};

export default registrationReducer;
