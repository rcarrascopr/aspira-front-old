let productFormData = {
  title: "",
  introduction: "",
  description: "",
  steps: [""],
};

export default function productFormReducer(
  state = {
    productFormData,
  },
  action
) {
  switch (action.type) {
    case "SET_PRODUCT_FORM":
      return {
        ...state,
        productFormData: { ...state.productFormData, ...action.payload },
      };
    case "RESET_PRODUCT_FORM":
      return {
        ...state,
        productFormData: productFormData,
      };
    default:
      return state;
  }
}
