import { api_url } from "../commons/api_url";

export function fetchProduct(productId) {
  const url = `${api_url}products/${productId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_PRODUCT" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_PRODUCT", payload: data }));
  };
}

export function createProduct(formData) {
  const url = `${api_url}products`;
  return (dispatch) => {
    dispatch({ type: "LOADING_PRODUCT" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({product: formData}),
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_PRODUCT", payload: data }));
  };
}
