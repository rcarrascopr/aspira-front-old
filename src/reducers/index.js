import { combineReducers } from "redux";
// import reducers
import usersReducer from "./usersReducer";
import centersReducer from "./centersReducer";
import utisReducer from "./utisReducer";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  centers: centersReducer,
  utis: utisReducer,
  products: productsReducer,
});

export default rootReducer;
