const initialState = { loading: false, currentProduct: {} };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOADING_PRODUCTS":
      return { ...state, loading: true };
    case "SET_PRODUCT":
      return { ...state, currentProduct: payload, loading: false };
    default:
      return state;
  }
};
