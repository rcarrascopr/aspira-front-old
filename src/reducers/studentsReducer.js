export default function studentsReducer(
  state = { loading: false, students: [] },
  action
) {
  switch (action.type) {
    case "LOADING_STUDENTS":
      return { ...state, loading: true };
    case "FETCH_STUDENTS":
      return { ...state, students: [...action.payload], loading: false };
    default:
      return state;
  }
}
