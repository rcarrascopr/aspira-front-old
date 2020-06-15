const initialState = {
  loading: false,
  semesters: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOADING_SEMESTER":
      return { ...state, loading: true };
    case "FETCH_SEMESTERS":
      return { ...state, semesters: payload, loading: false };
    default:
      return state;
  }
};
