import { combineReducers } from "redux";
import registrationReducer from "./reducers/registerAccountReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  registration: registrationReducer,
  auth: authReducer,
});

export default rootReducer;
