const initialState = {
  loading: false,
  error: "",
  success: "",
  currentUser: JSON.parse(localStorage.getItem("currentUser")),
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
    gender: "M",
    phone_number: "",
    residence_municipality: "Carolina",
    password: "",
    password_confirmation: "",
    role: "",
  },
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING_USER":
      return { ...state, loading: true, error: "" };
    // case "FETCH_CURRENT_USER":
    //   return { loading: false, currentUser: action.payload };
    case "LOGIN":
      return { loading: false, currentUser: action.payload, error: "" };
    case "LOGOUT_USER":
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      return { ...initialState, currentUser: null };
    // case "SIGNUP":
    //   return { ...state, loading: false };
    case "CREATE_USER":
      return { ...state, loading: false };
    case "SET_USER":
      const payload = action.payload;
      // payload.center_id = payload.center.id;
      // delete payload.center;
      const newDefaultValues = { ...state.defaultValues, ...payload };
      return {
        ...state,
        loading: false,
        defaultValues: newDefaultValues,
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
    case "SET_USER_SUCCESS":
      return { ...state, success: action.payload, error: "", loading: false };
    default:
      return state;
  }
}
