export default function productFormReducer(
  state = {
    productFormData: {
      title: "",
      introduction: "",
      description: "",
      steps: [""],
    },
  },
  action
) {
  switch (action.type) {
    case "SET_PRODUCT_FORM":
      return {
        ...state,
        productFormData: { ...state.productFormData, ...action.payload },
      };
    default:
      return state;
  }
}
