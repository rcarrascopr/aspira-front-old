const initialState = { loading: false, adminReport: {} };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOADING_REPORTS":
      return { ...state, loading: true };
    case "SET_REPORTS":
      return { ...state, adminReport: payload, loading: false };
    default:
      return state;
  }
};
