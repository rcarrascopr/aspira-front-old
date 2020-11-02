export default function centersReducer(
  state = { loading: false, centers: [], centerWithStudents: {} },
  action
) {
  switch (action.type) {
    case "LOADING_CENTERS":
      return { ...state, loading: true };
    case "FETCH_CENTERS":
      return { ...state, centers: action.payload, loading: false };
    case "FETCH_CENTER_STUDENTS":
      return { ...state, centerWithStudents: action.payload, loading: false };
    case "EDIT_COURSE":
      let center = state.centers.find((c) => {
        return c.courses.find((course) => course.id === action.payload.id);
      });
      center.courses = [
        ...center.courses.filter((course) => course.id !== action.payload.id),
        action.payload,
      ];
      let updatedCenters = [...state.centers.filter((c) => center.id !== c.id), center];
      return { ...state, centers: updatedCenters, loading: false };
    default:
      return state;
  }
}
