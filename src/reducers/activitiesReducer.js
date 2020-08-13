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

    case "CREATE_LINK":
      if (action.payload) {
        let activityWithLinks = { ...state.currentActivity };
        if (action.payload.assignment_type === "Activity") {
          activityWithLinks.links.push(action.payload);
        } else if (action.payload.assignment_type === "Product") {
          activityWithLinks.product.links.push(action.payload);
        }
        return { ...state, currentActivity: activityWithLinks, loading: false };
      }

    case "UPDATE_LINK":
      if (action.payload) {
        let updatedActivityWithLink = { ...state.currentActivity };
        if (action.payload.assignment_type === "Activity") {
          updatedActivityWithLink.links = updatedActivityWithLink.links.filter(
            (link) => link.id !== action.payload.id
          );
          updatedActivityWithLink.links.push(action.payload);
        } else if (action.payload.assignment_type === "Product") {
          updatedActivityWithLink.product.links = updatedActivityWithLink.product.links.filter(
            (link) => link.id !== action.payload.id
          );
          updatedActivityWithLink.product.links.push(action.payload);
        }
        return {
          ...state,
          currentActivity: updatedActivityWithLink,
          loading: false,
        };
      }

    case "DELETE_LINK":
      if (action.payload) {
        let activityWithoutLink = { ...state.currentActivity };

        let link = activityWithoutLink.links.find(
          (link) => link.id === action.payload
        );

        if (link) {
          activityWithoutLink.links = activityWithoutLink.links.filter(
            (link) => link.id !== action.payload
          );
        } else {
          link = activityWithoutLink.product.links.find(
            (link) => link.id === action.payload
          );
          if (link) {
            activityWithoutLink.product.links = activityWithoutLink.product.links.filter(
              (link) => link.id !== action.payload
            );
          }
        }
        return {
          ...state,
          currentActivity: activityWithoutLink,
          loading: false,
        };
      }

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
