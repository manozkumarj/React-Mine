import { combineReducers } from "redux";
import registrationReducer from "./reducers/registerAccountReducer";
import authReducer from "./reducers/authReducer";
import loginReducer from "./reducers/loginReducer";
import centralReducer from "./reducers/centralReducer";

const rootReducer = combineReducers({
  registration: registrationReducer,
  auth: authReducer,
  login: loginReducer,
  central: centralReducer,
});

export default rootReducer;
