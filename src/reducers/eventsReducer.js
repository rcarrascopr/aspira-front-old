import events from "../commons/data/events";

export default function eventsReducer(
  state = {
    loading: false,
    events: [],
  },
  action
) {
  switch (action.type) {
    case "LOADING_EVENTS":
      return { ...state, loading: true };
    case "FETCH_EVENTS":
      return { ...state, events: [...action.payload], loading: false };
    //   case "SET_UTIS_FORM_DATA":
    //     return { ...state, utisFormData: action.payload, loading: false };
    case "CREATE_EVENT":
      return { ...state, events: [...state.events, action.payload] };
    case "EDIT_EVENT":
      return {
        ...state,
        events: [
          ...state.events.filter((event) => event.id !== action.payload.id),
          action.payload,
        ],
        loading: false,
      };
    default:
      return state;
  }
}
