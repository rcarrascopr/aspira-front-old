export default function semestersReducer(
  state = { loading: false, semesters: [], currentSemester: {} },
  action
) {
  switch (action.type) {
    case "LOADING_SEMESTERS":
      return { ...state, loading: true };
    case "FETCH_SEMESTERS":
      return { ...state, semesters: [...action.payload], loading: false };
    case "FETCH_SEMESTER":
      return { ...state, currentSemester: action.payload, loading: false };
    case "CREATE_SEMESTER":
      return { ...state, semesters: [...state.semesters, action.payload] };
    case "EDIT_SEMESTER":
      return {
        ...state,
        semesters: [
          ...state.semesters.filter(
            (semester) => semester.id !== action.payload.id
          ),
          action.payload,
        ],
      };
    default:
      return state;
  }
}
