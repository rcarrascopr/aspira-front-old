import { api_url } from "../commons/api_url";

export function fetchStudents() {
    return dispatch => {
      dispatch({ type: "LOADING_STUDENTS" });
      return fetch(`${api_url}students`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
        .then(response => {
          return response.json();
        })
        .then(responseJSON => {
          dispatch({ type: "FETCH_STUDENTS", payload: responseJSON });
        });
    };
  }