import { combineReducers } from "redux";
// import reducers
import usersReducer from "./usersReducer";
import centersReducer from "./centersReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  centers: centersReducer
});

export default rootReducer;
