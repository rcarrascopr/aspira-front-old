export default function usersReducer(
  state = {
    loading: false,
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
    teachers: [],
  },
  action
) {
  switch (action.type) {
    case "LOADING_USER":
      return { ...state, loading: true };
    // case "FETCH_CURRENT_USER":
    //   return { loading: false, currentUser: action.payload };
    case "LOGIN":
      return { loading: false, currentUser: action.payload };
    case "LOGOUT_USER":
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      return { loading: false, currentUser: null };
    // case "SIGNUP":
    //   return { ...state, loading: false };
    case "CREATE_USER":
      return { ...state, loading: false };
    case "FETCH_TEACHERS":
      return { ...state, teachers: action.payload, loading: false };
    default:
      return state;
  }
}
