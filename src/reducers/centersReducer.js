export default function centersReducer(
  state = { loading: false, centers: [] },
  action
) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "FETCH_CENTERS":
      return { ...state, centers: [...action.payload], loading: false };
    default:
      return state;
  }
}
