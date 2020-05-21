export default function utisReducer(
  state = { loading: false, courses: [] },
  action
) {
  switch (action.type) {
    case "LOADING_COURSES":
      return { ...state, loading: true };
    case "FETCH_COURSES":
      return { ...state, courses: [...action.payload], loading: false };
    default:
      return state;
  }
}
