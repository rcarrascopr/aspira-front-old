import { api_url } from "../commons/api_url";

export function fetchCenters() {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`${api_url}centers`, {
      // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "FETCH_CENTERS", payload: data });
      })
      .catch((error) => {
        console.log("Error from centersAction: ", error);
      });
  };
}
