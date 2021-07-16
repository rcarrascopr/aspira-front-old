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
    case "UPDATE_ACTIVITY":
      let updatedUTIS = { ...state.currentUTIS };
      updatedUTIS.activities = updatedUTIS.activities.filter(
        (activity) => activity.id !== action.payload.id
      );
      updatedUTIS.activities = [...updatedUTIS.activities, action.payload];
      return { ...state, currentUTIS: updatedUTIS, loading: false };
    case "DELETE_ACTIVITY":
      let UTISWithoutActivity = { ...state.currentUTIS };
      UTISWithoutActivity.activities = UTISWithoutActivity.activities.filter(
        (activity) => activity.id !== action.payload
      );
      return { ...state, currentUTIS: UTISWithoutActivity, loading: false };
    case "DELETE_PRODUCT":
      let UTISWithoutProduct = { ...state.currentUTIS };
      UTISWithoutProduct.activities = UTISWithoutProduct.activities.map(
        (activity) => {
          if (activity.product && activity.product.id === action.payload) {
            return { ...activity, product: null };
          }
          return activity;
        }
      );
      return { ...state, currentUTIS: UTISWithoutProduct, loading: false };
    case "SORT_ACTIVITIES":
      return {...state, loading: false}
    default:
      return state;
  }
}
