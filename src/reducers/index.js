import { combineReducers } from "redux";
// import reducers
import usersReducer from "./usersReducer";
import centersReducer from "./centersReducer";
import utisReducer from "./utisReducer";
import skillsReducer from "./skillsReducer";
import productFormReducer from "./productFormReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  centers: centersReducer,
  utis: utisReducer,
  skills: skillsReducer,
  productForm: productFormReducer,
});

export default rootReducer;
