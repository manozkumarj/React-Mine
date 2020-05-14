import { combineReducers } from "redux";
import registrationReducer from "./reducers/registerAccountReducer";

const rootReducer = combineReducers({
  registration: registrationReducer,
});

export default rootReducer;
