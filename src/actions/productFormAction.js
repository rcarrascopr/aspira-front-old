export function setProductFormAction(formData) {
  return (dispatch) => {
    dispatch({ type: "SET_PRODUCT_FORM", payload: formData });
  };
}

export function resetProductFormAction() {
  return (dispatch) => {
    dispatch({ type: "RESET_PRODUCT_FORM" });
  };
}
