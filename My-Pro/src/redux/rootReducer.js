import { combineReducers } from "redux";
import registrationReducer from "./reducers/registerAccountReducer";
import authReducer from "./reducers/authReducer";
import loginReducer from "./reducers/loginReducer";

const rootReducer = combineReducers({
  registration: registrationReducer,
  auth: authReducer,
  login: loginReducer,
});

export default rootReducer;
