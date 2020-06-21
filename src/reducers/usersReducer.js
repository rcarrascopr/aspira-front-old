export default function usersReducer(
  state = {
    loading: false,
    error: "",
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
    fetchedUser: "",
    teachers: [],
    defaultValues: {
      id: "",
      email: "",
      created_at: "",
      updated_at: "",
      first_name: "",
      second_name: "",
      maternal_surname: "",
      paternal_surname: "",
      center_id: 1,
      academic_level: "9",
      badge_id: "",
      gender: "",
      phone_number: "",
      residence_municipality: "",
    },
  },
  action
) {
  switch (action.type) {
    case "LOADING_USER":
      return { ...state, loading: true, fetchedUser: "", error: "" };
    // case "FETCH_CURRENT_USER":
    //   return { loading: false, currentUser: action.payload };
    case "LOGIN":
      return { loading: false, currentUser: action.payload, error: "" };
    case "LOGOUT_USER":
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      return { loading: false, currentUser: null };
    // case "SIGNUP":
    //   return { ...state, loading: false };
    case "CREATE_USER":
      return { ...state, loading: false };
    case "FETCH_USER":
      return {
        ...state,
        loading: false,
        fetchedUser: action.payload,
        error: "",
      };
    case "FETCH_TEACHERS":
      return {
        ...state,
        teachers: action.payload,
        loading: false,
        error: "",
      };
    case "SET_USER_ERRORS":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_USER_ERRORS":
      return { ...state, error: "" };
    default:
      return state;
  }
}
