export default function dashboardReducer(
  state = {
    loading: false,
    courses: [],
  },
  action
) {
  switch (action.type) {
    case "LOADING_DASHBOARD":
      return { ...state, loading: true };
    case "FETCH_DASHBOARD_COURSES":
      return { ...state, courses: [...action.payload], loading: false };
    default:
      return state;
  }
}
