export default function centersReducer(
  state = { loading: false, centers: [], centerWithStudents: {} },
  action
) {
  switch (action.type) {
    case "LOADING_CENTERS":
      return { ...state, loading: true };
    case "FETCH_CENTERS":
      return { ...state, centers: action.payload, loading: false };
    case "FETCH_CENTER_STUDENTS":
      return { ...state, centerWithStudents: action.payload, loading: false };
    default:
      return state;
  }
}
