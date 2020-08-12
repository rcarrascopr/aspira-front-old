import { combineReducers } from "redux";
// import reducers
import centersReducer from "./centersReducer";
import eventsReducer from "./eventsReducer";
import productFormReducer from "./productFormReducer";
import productsReducer from "./productsReducer";
import skillsReducer from "./skillsReducer";
import studentsReducer from "./studentsReducer";
import facultyReducer from "./facultyReducer";
import semestersReducer from "./semestersReducer";
import usersReducer from "./usersReducer";
import coursesReducer from "./coursesReducer";
import utisReducer from "./utisReducer";
import activitiesReducer from "./activitiesReducer";

const rootReducer = combineReducers({
  centers: centersReducer,
  events: eventsReducer,
  productForm: productFormReducer,
  products: productsReducer,
  semesters: semestersReducer,
  skills: skillsReducer,
  productForm: productFormReducer,
  students: studentsReducer,
  faculty: facultyReducer,
  semesters: semestersReducer,
  users: usersReducer,
  courses: coursesReducer,
  utis: utisReducer,
  activities: activitiesReducer,
});

export default rootReducer;
