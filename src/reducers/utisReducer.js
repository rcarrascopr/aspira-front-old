export default function utisReducer(
  state = { loading: false, utis: [], currentUTIS: {} },
  action
) {
  switch (action.type) {
    case "LOADING_UTIS":
      return { ...state, loading: true };
    case "FETCH_UTIS":
      return { ...state, currentUTIS: action.payload, loading: false };
    case "ADD_ACTIVITY_TO_UTIS":
      let utis = { ...state.currentUTIS };
      utis.activities.push(action.payload);
      return { ...state, currentUTIS: utis, loading: false };

    default:
      return state;
  }
}
