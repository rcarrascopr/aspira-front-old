import { api_url } from "../commons/api_url";

export function fetchCourses() {
    return dispatch => {
      dispatch({ type: "LOADING_COURSES" });
      return fetch(`${api_url}courses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
        .then(response => {
          return response.json();
        })
        .then(responseJSON => {
          dispatch({ type: "FETCH_COURSES", payload: responseJSON });
        });
    };
  }