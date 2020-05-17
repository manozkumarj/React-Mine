import { combineReducers } from "redux";
import centralReducer from "./reducers/centralReducer";

const rootReducer = combineReducers({
  central: centralReducer,
});

export default rootReducer;
