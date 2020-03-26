import { combineReducers } from "redux";
// import reducers
import usersReducer from "./usersReducer" 

const rootReducer = combineReducers({
    users: usersReducer
});
 
export default rootReducer;
