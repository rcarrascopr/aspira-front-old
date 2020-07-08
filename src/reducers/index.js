import { combineReducers } from "redux";
// import reducers
import usersReducer from "./usersReducer";
import centersReducer from "./centersReducer";
import utisReducer from "./utisReducer";
import productsReducer from "./productsReducer";
import skillsReducer from "./skillsReducer";
import productFormReducer from "./productFormReducer";
import studentsReducer from "./studentsReducer";
import facultyReducer from "./facultyReducer";
import semestersReducer from "./semestersReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  centers: centersReducer,
  utis: utisReducer,
  products: productsReducer,
  skills: skillsReducer,
  productForm: productFormReducer,
  students: studentsReducer,
  faculty: facultyReducer,
  semesters: semestersReducer,
});

export default rootReducer;
