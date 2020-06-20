export default function usersReducer(
  state = {
    loading: false,
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
    fetchedUser: "",
    teachers: [],
    defaultValues: {
      id: 26,
      email: "prosacco_nanci@aspira.edu",
      jti: "8aa72ef5-41ad-49d6-8359-4bbb943d81d3",
      created_at: "2020-06-10T20:04:34.077Z",
      updated_at: "2020-06-15T02:25:21.574Z",
      first_name: "Nanci",
      second_name: "Prosacco",
      maternal_surname: "Abbott",
      paternal_surname: "Kshlerin",
      center_id: 2,
      academic_level: "9",
      badge_id: "S2020140626",
      gender: "F",
      phone_number: "958-451-7943",
      residence_municipality: "Buckbury",
    },
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
    case "FETCH_USER":
      return {
        ...state,
        loading: false,
        fetchedUser: action.payload,
      };
    case "FETCH_TEACHERS":
      return {
        ...state,
        teachers: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
