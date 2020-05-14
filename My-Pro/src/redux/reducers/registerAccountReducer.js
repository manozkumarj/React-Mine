import { REGISTER_ACCOUNT } from "./../actionTypes/registerAccountTypes";
import { DUMMY_TYPE } from "./../actionTypes/registerAccountTypes";

const initialState = {
  numOfItems: 10,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case DUMMY_TYPE:
      return {
        ...state,
        numOfItems: state.numOfItems - action.payload,
      };

    default:
      return state;
  }
};

export default registrationReducer;
