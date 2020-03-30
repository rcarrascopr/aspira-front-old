import { api_url } from "../commons/api_url";

export function fetchCenters() {
    return dispatch => {
      dispatch({ type: "LOADING" });
      return fetch(`${api_url}centers`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
        .then(response => {
          return response.json();
        })
        .then(responseJSON => {
          dispatch({ type: "FETCH_CENTERS", payload: responseJSON });
        });
    };
  }