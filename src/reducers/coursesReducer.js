let coursesFormData = {
  name: "",
  category: "",
  semester_id: "",
  center_id: "",
  teacher_id: "",
  grade: "",
  students: [],
};

export default function coursesReducer(
  state = {
    loading: false,
    courses: [],
    coursesFormData,
    currentCourse: {},
  },
  action
) {
  switch (action.type) {
    case "LOADING_COURSES":
      return { ...state, loading: true };
    case "FETCH_COURSES":
      return { ...state, courses: [...action.payload], loading: false };
    case "SET_COURSES_FORM_DATA":
      return { ...state, coursesFormData: action.payload, loading: false };
    case "RESET_COURSES_FORM_DATA":
      return { ...state, coursesFormData, loading: false };
    case "CREATE_CURRENT_COURSE":
      return { ...state, currentCourse: action.payload, loading: false };
    case "EDIT_COURSE":
      return {
        ...state,
        courses: [
          ...state.courses.filter((course) => course.id !== action.payload.id),
          action.payload,
        ],
        loading: false,
      };
    case "SET_CURRENT_COURSE":
      return { ...state, currentCourse: action.payload, loading: false };
    case "ADD_UTIS_TO_COURSE":
      let course = { ...state.currentCourse };
      course.plans.push(action.payload);
      return { ...state, currentCourse: course, loading: false };
    case "UPDATE_UTIS":
      let updatedCourse = { ...state.currentCourse };
      updatedCourse.plans = updatedCourse.plans.filter(
        (plan) => plan.id !== action.payload.id
      );
      updatedCourse.plans = [...updatedCourse.plans, action.payload];
      return { ...state, currentCourse: updatedCourse, loading: false };
    case "DELETE_UTIS":
      let courseWithoutPlan = { ...state.currentCourse };
      courseWithoutPlan.plans = courseWithoutPlan.plans.filter(
        (plan) => plan.id !== action.payload
      );
      return { ...state, currentCourse: courseWithoutPlan, loading: false };
    default:
      return state;
  }
}
