export default function activitiesReducer(
  state = { loading: false, activities: [], currentActivity: {} },
  action
) {
  switch (action.type) {
    case "LOADING_ACTIVITIES":
      return { ...state, loading: true };
    case "FETCH_ACTIVITY":
      return { ...state, currentActivity: action.payload, loading: false };
    case "CREATE_PRODUCT":
      let activity = { ...state.currentActivity };
      activity.product = action.payload;
      return { ...state, currentActivity: activity, loading: false };
    case "UPDATE_PRODUCT":
      let updatedActivity = { ...state.currentActivity };
      updatedActivity.product = action.payload;
      return { ...state, currentActivity: updatedActivity, loading: false };
    //   case "ADD_ACTIVITY_TO_UTIS":
    //     let utis = { ...state.currentUTIS };
    //     utis.activities.push(action.payload);
    //     return { ...state, currentUTIS: utis, loading: false };
    // case "UPDATE_ACTIVITY":
    //   let updatedUTIS = { ...state.currentUTIS };
    //   updatedUTIS.activities = updatedUTIS.activities.filter(
    //     (activity) => activity.id !== action.payload.id
    //   );
    //     updatedUTIS.activities = [...updatedUTIS.activities, action.payload];
    //     return { ...state, currentUTIS: updatedUTIS, loading: false };
    // case "DELETE_ACTIVITY":
    //   let UTISWithoutActivity = { ...state.currentUTIS };
    //   UTISWithoutActivity.activities = UTISWithoutActivity.activities.filter(
    //     (activity) => activity.id !== action.payload
    //   );
    //   return { ...state, currentUTIS: UTISWithoutActivity, loading: false };
    default:
      return state;
  }
}
