import { combineReducers } from "redux";
// import reducers
import centersReducer from "./centersReducer";
import productFormReducer from "./productFormReducer";
import productsReducer from "./productsReducer";
import semestersReducer from "./semestersReducer";
import skillsReducer from "./skillsReducer";
import usersReducer from "./usersReducer";
import utisReducer from "./utisReducer";

const rootReducer = combineReducers({
  centers: centersReducer,
  productForm: productFormReducer,
  products: productsReducer,
  semesters: semestersReducer,
  skills: skillsReducer,
  users: usersReducer,
  utis: utisReducer,
});

export default rootReducer;
