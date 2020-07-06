export default function studentsReducer(
  state = { loading: false, students: [], currentStudent: {} },
  action
) {
  switch (action.type) {
    case "LOADING_STUDENTS":
      return { ...state, loading: true };
    case "FETCH_STUDENTS":
      return { ...state, students: [...action.payload], loading: false };
    case "FETCH_STUDENT":
      return { ...state, currentStudent: action.payload, loading: true };
    default:
      return state;
  }
}
