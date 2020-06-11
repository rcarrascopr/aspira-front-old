import { combineReducers } from "redux";
// import reducers
import usersReducer from "./usersReducer";
import centersReducer from "./centersReducer";
import utisReducer from "./utisReducer";
import skillsReducer from "./skillsReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  centers: centersReducer,
  utis: utisReducer,
  skills: skillsReducer,
});

export default rootReducer;
