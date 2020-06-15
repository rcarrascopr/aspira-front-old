export default function utisReducer(
  state = {
    loading: false,
    courses: [],
    utisFormData: {
      name: "",
      category: "",
      semester_id: "",
      center_id: "",
      teacher_id: "",
      grade: "",
      students: [""],
    },
    newCourse: {},
  },
  action
) {
  switch (action.type) {
    case "LOADING_COURSES":
      return { ...state, loading: true };
    case "FETCH_COURSES":
      return { ...state, courses: [...action.payload], loading: false };
    case "SET_UTIS_FORM_DATA":
      return { ...state, utisFormData: action.payload, loading: false };
    case "CREATE_NEW_COURSE" || "SET_NEW_COURSE":
      return { ...state, newCourse: action.payload };
    default:
      return state;
  }
}
