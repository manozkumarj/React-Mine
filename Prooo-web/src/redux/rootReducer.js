import { combineReducers } from "redux";
import centralReducer from "./reducers/centralReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  central: centralReducer,
});

export default rootReducer;
