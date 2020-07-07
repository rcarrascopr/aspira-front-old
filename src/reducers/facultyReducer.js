export default function facultyReducer(
  state = { loading: false, faculty: [], currentFaculty: {} },
  action
) {
  switch (action.type) {
    case "LOADING_FACULTY":
      return { ...state, loading: true };
    case "FETCH_FACULTY_USERS":
      return { ...state, faculty: [...action.payload], loading: false };
    case "FETCH_FACULTY_USER":
      return { ...state, currentFaculty: action.payload, loading: true };
    default:
      return state;
  }
}
