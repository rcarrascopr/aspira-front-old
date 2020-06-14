export function setProductFormAction(formData) {
  return (dispatch) => {
    dispatch({ type: "SET_PRODUCT_FORM", payload: formData });
  };
}
