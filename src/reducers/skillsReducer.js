export default function skillsReducer(
  state = { loading: false, skills: [] },
  action
) {
  switch (action.type) {
    case "LOADING_SKILLS":
      return { ...state, loading: true };
    case "FETCH_SKILLS":
      return { ...state, centers: [...action.payload], loading: false };
    default:
      return state;
  }
}
