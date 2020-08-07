// import events from "../commons/data/events";

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
      let events = action.payload;
      let currentUserRole = JSON.parse(localStorage.getItem("currentUser"))
        .role;
      if (events.length > 0) {
        if (currentUserRole === "Teacher") {
          events = events.filter(
            (e) => e.category === "general" || e.category === "faculty"
          );
        } else if (currentUserRole === "Student") {
          events = events.filter((e) => e.category === "general");
        }
      }

      return { ...state, events, loading: false };
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
