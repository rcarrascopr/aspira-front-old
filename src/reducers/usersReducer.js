export default function usersReducer(
  state = {
    loading: false,
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
  },
  action
) {
  switch (action.type) {
    case "LOADING":
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
    default:
      return state;
  }
}
