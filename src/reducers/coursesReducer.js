export default function coursesReducer(
  state = {
    loading: false,
    courses: [],
    coursesFormData: {
      name: "",
      category: "",
      semester_id: "",
      center_id: "",
      teacher_id: "",
      grade: "",
      students: [],
    },
    currentCourse: "",
  },
  action
) {
  switch (action.type) {
    case "LOADING_COURSES":
      return { ...state, loading: true };
    case "FETCH_COURSES":
      return { ...state, courses: [...action.payload], loading: false };
    case "SET_COURSES_FORM_DATA":
      return { ...state, coursesFormData: action.payload, loading: false };
    case "CREATE_CURRENT_COURSE":
      return { ...state, currentCourse: action.payload };
    case "EDIT_COURSE":
      return {
        ...state,
        courses: [
          ...state.courses.filter((course) => course.id !== action.payload.id),
          action.payload,
        ],
        loading: false,
      };
    case "SET_CURRENT_COURSE":
      return { ...state, currentCourse: action.payload };
    default:
      return state;
  }
}
