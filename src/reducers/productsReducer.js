const initialState = { loading: false, };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SET_PRODUCT":
      return { ...state, product: payload, loading: false };
    default:
      return state;
  }
};
