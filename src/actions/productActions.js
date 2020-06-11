import { api_url } from "../commons/api_url";

export function fetchProduct(productId) {
  const url = `${api_url}products/${productId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING" });
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
