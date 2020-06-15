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
  },
  action
) {
  switch (action.type) {
    case "LOADING_COURSES":
      return { ...state, loading: true };
    case "FETCH_COURSES":
      return { ...state, courses: [...action.payload], loading: false };
    case "SET_UTIS_FORM_DATA":
      debugger;
      return { ...state, utisFormData: action.payload };
    default:
      return state;
  }
}
